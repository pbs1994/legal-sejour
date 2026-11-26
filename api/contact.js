// Vercel Function — réception des formulaires (POST /api/contact).
//
// Politique : les envois suspects sont SIGNALÉS dans l'objet, jamais supprimés.
// Chaque demande est aussi écrite dans les logs Vercel (secours si l'e-mail échoue).
// Variables d'environnement : voir api/_mail.js.

import { sendMail, json, EMAIL_RE } from './_mail.js';

const LABELS = {
  firstname: 'Prénom', lastname: 'Nom', email: 'E-mail', phone: 'Téléphone', service: 'Demande',
  notified: 'Notif. OQTF', slot: 'Créneau', mode: 'Mode', message: 'Message', page: 'Page', lang: 'Langue',
};
const MAX = { message: 4000, page: 200, lang: 5 };

export async function POST(request) {
  let form;
  try { form = await request.formData(); } catch { return json({ ok: false }, 400); }

  const field = (k) => String(form.get(k) ?? '').replace(/[\r\0]/g, '').trim().slice(0, MAX[k] ?? 160);
  const lead = Object.fromEntries(Object.keys(LABELS).map((k) => [k, field(k)]));

  if ((!lead.firstname && !lead.lastname) || (!lead.email && !lead.phone)) return json({ ok: false }, 422);

  // ---- signaux de spam : signaler, ne jamais supprimer
  const flags = [];
  if (field('website')) flags.push('honeypot');
  const elapsed = parseInt(field('elapsed'), 10) || 0;
  if (elapsed > 0 && elapsed < 4) flags.push(`rapide:${elapsed}s`);
  if (lead.email && !EMAIL_RE.test(lead.email)) flags.push('email-invalide');
  if ((lead.message.match(/https?:\/\//gi) || []).length > 2) flags.push('liens');
  if (form.get('consent') !== '1') flags.push('sans-consentement');

  const isOqtf = /OQTF/i.test(lead.service);
  const name = `${lead.firstname} ${lead.lastname}`.trim();
  const prefix = (flags.length ? `[À VÉRIFIER: ${flags.join(', ')}] ` : '') + (isOqtf ? '[URGENT OQTF] ' : '');
  const subject = `${prefix}${lead.slot ? 'Rendez-vous' : 'Demande'} — ${name}${lead.service ? ` — ${lead.service}` : ''}`;

  let text = '';
  for (const [k, label] of Object.entries(LABELS)) if (lead[k]) text += `${(label + ':').padEnd(14)}${lead[k]}\n`;
  text += `\nIP: ${request.headers.get('x-forwarded-for') ?? '-'}\nUA: ${(request.headers.get('user-agent') ?? '-').slice(0, 200)}\n`;
  if (flags.length) text += `Flags: ${flags.join(', ')}\n`;

  // ---- journal de secours (Vercel → Logs)
  console.log('LEAD', JSON.stringify({ at: new Date().toISOString(), flags, ...lead }));

  const validEmail = lead.email && !flags.includes('email-invalide');
  const sent = await sendMail({ subject, text, replyTo: validEmail ? lead.email : undefined, urgent: isOqtf });
  return sent ? json({ ok: true }) : json({ ok: false }, process.env.RESEND_API_KEY ? 502 : 500);
}
