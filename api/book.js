// Vercel Function — réservation d'un créneau Cal.com (POST /api/book, JSON).
//
// Le calendrier du site (src/components/CalBooking.astro) lit les créneaux libres
// directement sur l'API publique Cal.com, puis envoie la réservation ici. On crée
// le rendez-vous chez Cal.com (→ Google Agenda + e-mail de confirmation au client,
// dans sa langue), on l'écrit dans les logs et on prévient LEAD_TO par e-mail.
//
// Politique : les envois suspects sont SIGNALÉS, jamais supprimés.

import { sendMail, json, EMAIL_RE, toE164 } from './_mail.js';

const CAL_LINK = process.env.CAL_LINK || 'legal-sejour/rendez-vous-gratuit-30min';
const LANGS = ['fr', 'en', 'ru', 'ro', 'es'];
const DEMARCHES = ['Titre de séjour', 'Naturalisation', 'Regroupement familial', 'Contestation OQTF', 'Autre'];

const str = (v, max = 160) => String(v ?? '').replace(/[\r\0]/g, '').trim().slice(0, max);

export async function POST(request) {
  let b;
  try { b = await request.json(); } catch { return json({ ok: false }, 400); }

  const lead = {
    start: str(b.start, 40),
    firstname: str(b.firstname), lastname: str(b.lastname),
    email: str(b.email), phone: str(b.phone, 40),
    demarche: DEMARCHES.includes(b.demarche) ? b.demarche : 'Autre',
    mode: b.mode === 'phone' ? 'phone' : 'video',
    message: str(b.message, 4000),
    lang: LANGS.includes(b.lang) ? b.lang : 'fr',
    source: str(b.source, 200),
  };
  const when = new Date(lead.start);
  const phone = toE164(lead.phone);
  const name = `${lead.firstname} ${lead.lastname}`.trim();

  if (!name || !EMAIL_RE.test(lead.email) || isNaN(+when)) return json({ ok: false, error: 'invalid' }, 422);
  if (!phone) return json({ ok: false, error: 'phone' }, 422);

  const flags = [];
  if (str(b.website)) flags.push('honeypot');
  const elapsed = parseInt(b.elapsed, 10) || 0;
  if (elapsed > 0 && elapsed < 4) flags.push(`rapide:${elapsed}s`);
  if ((lead.message.match(/https?:\/\//gi) || []).length > 2) flags.push('liens');
  if (b.consent !== true) flags.push('sans-consentement');

  console.log('BOOKING', JSON.stringify({ at: new Date().toISOString(), flags, ...lead, phone }));

  // ---- création du rendez-vous chez Cal.com
  const [username, eventTypeSlug] = CAL_LINK.split('/');
  let r, data;
  try {
    r = await fetch('https://api.cal.com/v2/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cal-api-version': '2024-08-13' },
      body: JSON.stringify({
        username, eventTypeSlug,
        start: when.toISOString(),
        attendee: { name, email: lead.email, phoneNumber: phone, timeZone: 'Europe/Paris', language: lead.lang },
        location: lead.mode === 'phone' ? { type: 'phone' } : { type: 'integration', integration: 'google-meet' },
        bookingFieldsResponses: { 'votre-demarche': [lead.demarche], ...(lead.message ? { notes: lead.message } : {}) },
        metadata: { langue: lead.lang, source: lead.source.slice(0, 200) || 'direct', ...(flags.length ? { flags: flags.join(',') } : {}) },
      }),
    });
    data = await r.json().catch(() => ({}));
  } catch (e) {
    console.error('Cal.com injoignable', e);
    return json({ ok: false, error: 'cal' }, 502);
  }

  if (!r.ok || data.status !== 'success') {
    const msg = JSON.stringify(data.error ?? data).slice(0, 500);
    console.error('Cal.com', r.status, msg);
    const taken = r.status === 409 || /available|already has|out_of_bounds|in the past|not.*free/i.test(msg);
    return json({ ok: false, error: taken ? 'taken' : 'cal' }, taken ? 409 : 502);
  }

  const bk = data.data || {};
  const meet = bk.meetingUrl || (typeof bk.location === 'string' && bk.location.startsWith('http') ? bk.location : '');

  // ---- e-mail interne (en plus de la notification Cal.com) — un échec n'annule pas la réservation
  const paris = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', dateStyle: 'full', timeStyle: 'short' }).format(when);
  const isOqtf = lead.demarche === 'Contestation OQTF';
  const prefix = (flags.length ? `[À VÉRIFIER: ${flags.join(', ')}] ` : '') + (isOqtf ? '[URGENT OQTF] ' : '');
  const rows = [
    ['Créneau', `${paris} (heure de Paris)`], ['Nom', name], ['E-mail', lead.email], ['Téléphone', phone],
    ['Démarche', lead.demarche], ['Format', lead.mode === 'phone' ? 'Téléphone (nous appelons)' : `Google Meet${meet ? ' — ' + meet : ''}`],
    ['Message', lead.message], ['Langue', lead.lang], ['Page', lead.source], ['Cal.com', bk.uid ? `https://app.cal.com/booking/${bk.uid}` : ''],
  ];
  let text = rows.filter(([, v]) => v).map(([k, v]) => `${(k + ':').padEnd(12)}${v}`).join('\n') + '\n';
  if (flags.length) text += `\nFlags: ${flags.join(', ')}\n`;
  await sendMail({ subject: `${prefix}RDV confirmé — ${paris} — ${name} — ${lead.demarche}`, text, replyTo: lead.email, urgent: isOqtf });

  return json({ ok: true, start: bk.start || when.toISOString(), meet: Boolean(meet) });
}
