import { SERVICES } from '../data/services';
import { SITE } from '../data/site';

export function GET() {
  const paths = ['/', '/services/', '/services/contestation-oqtf/', ...SERVICES.map((s) => `/services/${s.slug}/`), '/pourquoi-nous/', '/prendre-rendez-vous/'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${SITE.url}${p}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
