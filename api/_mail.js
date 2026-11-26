// Envoi d'e-mail via Resend (partagé par /api/contact et /api/book).
// Les fichiers préfixés par « _ » ne sont pas exposés comme fonctions par Vercel.
//
//   RESEND_API_KEY  clé API Resend
//   LEAD_TO         destinataire(s), séparés par des virgules (défaut : legal.sejour.france@gmail.com)
//   LEAD_FROM       expéditeur (défaut : Légal Séjour <site@legal-sejour.fr>) ; le domaine doit être vérifié chez Resend

/** @returns {Promise<boolean>} true si Resend a accepté l'e-mail */
export async function sendMail({ subject, text, replyTo, urgent = false }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.error('RESEND_API_KEY manquante — demande conservée uniquement dans les logs'); return false; }
  const to = (process.env.LEAD_TO || 'legal.sejour.france@gmail.com').split(',').map((s) => s.trim()).filter(Boolean);
  const from = process.env.LEAD_FROM || 'Légal Séjour <site@legal-sejour.fr>';
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from, to, subject, text,
        ...(replyTo ? { reply_to: replyTo } : {}),
        ...(urgent ? { headers: { 'X-Priority': '1' } } : {}),
      }),
    });
    if (!r.ok) { console.error('Resend', r.status, await r.text()); return false; }
    return true;
  } catch (e) {
    console.error('Resend injoignable', e);
    return false;
  }
}

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'X-Robots-Tag': 'noindex' } });

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Numéro au format international E.164, ou null. 06… → +336…, 00… → +… */
export function toE164(raw) {
  let s = String(raw || '').replace(/[\s.\-()/]/g, '');
  if (s.startsWith('00')) s = '+' + s.slice(2);
  else if (/^0\d{9}$/.test(s)) s = '+33' + s.slice(1);
  return /^\+[1-9]\d{7,14}$/.test(s) ? s : null;
}
