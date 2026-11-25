import { SLUGS, OQTF_PATH } from '../data/services';
import { SITE } from '../data/site';
import { LANGS, lp } from '../i18n';

export function GET() {
  const bare = ['/', '/services/', OQTF_PATH, ...SLUGS.map((s) => `/services/${s}/`), '/pourquoi-nous/', '/prendre-rendez-vous/'];
  const urls = bare.map((p) => {
    const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE.url}${lp(l, p)}"/>`).join('\n');
    return LANGS.map((l) => `  <url>\n    <loc>${SITE.url}${lp(l, p)}</loc>\n${alts}\n  </url>`).join('\n');
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
