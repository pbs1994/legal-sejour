// Vercel Function — réception des formulaires (POST /api/contact).
//
// Politique : les envois suspects sont SIGNALÉS dans l'objet, jamais supprimés.
// Chaque demande est aussi écrite dans les logs Vercel (secours si l'e-mail échoue).
//
// Variables d'environnement (Vercel → Settings → Environment Variables) :
//   RESEND_API_KEY  clé API Resend (domaine legal-sejour.fr vérifié chez Resend)
//   LEAD_TO         destinataire(s), séparés par des virgules (défaut : contact@legal-sejour.fr)
//   LEAD_FROM       expéditeur (défaut : Légal Séjour <site@legal-sejour.fr>)

const LABELS = {
  firstname: 'Prénom', lastname: 'Nom', email: 'E-mail', phone: 'Téléphone', service: 'Demande',
  notified: 'Notif. OQTF', slot: 'Créneau', mode: 'Mode', message: 'Message', page: 'Page', lang: 'Langue',
};
const MAX = { message: 4000, page: 200, lang: 5 };

const json = (ok, status = 200) =>
  new Response(JSON.stringify({ ok }), { status, headers: { 'Content-Type': 'application/json', 'X-Robots-Tag': 'noindex' } });

export async function POST(request) {
  let form;
  try { form = await request.formData(); } catch { return json(false, 400); }

  const field = (k) => String(form.get(k) ?? '').replace(/[\r\0]/g, '').trim().slice(0, MAX[k] ?? 160);
  const lead = Object.fromEntries(Object.keys(LABELS).map((k) => [k, field(k)]));

  if ((!lead.firstname && !lead.lastname) || (!lead.email && !lead.phone)) return json(false, 422);

  // ---- signaux de spam : signaler, ne jamais supprimer
  const flags = [];
  if (field('website')) flags.push('honeypot');
  const elapsed = parseInt(field('elapsed'), 10) || 0;
  if (elapsed > 0 && elapsed < 4) flags.push(`rapide:${elapsed}s`);
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) flags.push('email-invalide');
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

  // ---- e-mail via Resend
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.error('RESEND_API_KEY manquante — demande conservée uniquement dans les logs'); return json(false, 500); }
  const to = (process.env.LEAD_TO || 'contact@legal-sejour.fr').split(',').map((s) => s.trim()).filter(Boolean);
  const from = process.env.LEAD_FROM || 'Légal Séjour <site@legal-sejour.fr>';
  const validEmail = lead.email && !flags.includes('email-invalide');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from, to, subject, text,
        ...(validEmail ? { reply_to: lead.email } : {}),
        ...(isOqtf ? { headers: { 'X-Priority': '1' } } : {}),
      }),
    });
    if (!r.ok) { console.error('Resend', r.status, await r.text()); return json(false, 502); }
  } catch (e) {
    console.error('Resend injoignable', e);
    return json(false, 502);
  }
  return json(true);
}
