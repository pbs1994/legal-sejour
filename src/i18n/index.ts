import fr from './fr';
import en from './en';
import ru from './ru';
import ro from './ro';
import es from './es';

export const LANGS = ['fr', 'en', 'ru', 'ro', 'es'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT: Lang = 'fr';
export const OTHER_LANGS = LANGS.filter((l) => l !== DEFAULT);
export const CODE: Record<Lang, string> = { fr: 'FRA', en: 'ENG', ru: 'RUS', ro: 'ROU', es: 'ESP' };

const DICT = { fr, en, ru, ro, es };

export const t = (lang: Lang) => DICT[lang].ui;
export const svcText = (lang: Lang, slug: string) => DICT[lang].services[slug];

/** Langue déduite de l'URL (/en/..., /ru/...) ; français sans préfixe. */
export function getLang(url: URL): Lang {
  const seg = url.pathname.split('/')[1] as Lang;
  return (LANGS as readonly string[]).includes(seg) && seg !== DEFAULT ? seg : DEFAULT;
}

/** Chemin sans préfixe de langue. */
export function stripLang(pathname: string): string {
  const seg = pathname.split('/')[1];
  return OTHER_LANGS.includes(seg as Lang) ? pathname.slice(seg.length + 1) || '/' : pathname;
}

/** Préfixe un chemin interne pour la langue donnée. */
export const lp = (lang: Lang, p: string) => (lang === DEFAULT ? p : `/${lang}${p}`);

// Pages qui n'existent qu'en français (textes réglementaires).
export const FR_ONLY = ['/mentions-legales/', '/politique-de-confidentialite/'];
export const langStaticPaths = () => OTHER_LANGS.map((lang) => ({ params: { lang } }));
