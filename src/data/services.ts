import { svcText, lp, type Lang } from '../i18n';

// Structure des services ; les textes sont dans src/i18n/<langue>.ts (clé = slug).
type Node = { slug: string; group: 'naturalisation' | 'titre-de-sejour' | 'visa' | 'complementaires'; parent?: string };

const NODES: Node[] = [
  { slug: 'naturalisation', group: 'naturalisation' },
  { slug: 'naturalisation/par-decret', group: 'naturalisation', parent: 'naturalisation' },
  { slug: 'naturalisation/par-mariage', group: 'naturalisation', parent: 'naturalisation' },
  { slug: 'naturalisation/parent-enfant-francais', group: 'naturalisation', parent: 'naturalisation' },
  { slug: 'naturalisation/par-fratrie', group: 'naturalisation', parent: 'naturalisation' },
  { slug: 'naturalisation/par-reintegration', group: 'naturalisation', parent: 'naturalisation' },
  { slug: 'titre-de-sejour', group: 'titre-de-sejour' },
  { slug: 'titre-de-sejour/renouvellement', group: 'titre-de-sejour', parent: 'titre-de-sejour' },
  { slug: 'titre-de-sejour/vie-privee-familiale', group: 'titre-de-sejour', parent: 'titre-de-sejour' },
  { slug: 'titre-de-sejour/salarie-travailleur', group: 'titre-de-sejour', parent: 'titre-de-sejour' },
  { slug: 'titre-de-sejour/etudiant', group: 'titre-de-sejour', parent: 'titre-de-sejour' },
  { slug: 'titre-de-sejour/carte-de-resident', group: 'titre-de-sejour', parent: 'titre-de-sejour' },
  { slug: 'titre-de-sejour/carte-talent', group: 'titre-de-sejour', parent: 'titre-de-sejour' },
  { slug: 'visa', group: 'visa' },
  { slug: 'visa/court-sejour', group: 'visa', parent: 'visa' },
  { slug: 'visa/etudiant', group: 'visa', parent: 'visa' },
  { slug: 'visa/long-sejour', group: 'visa', parent: 'visa' },
  { slug: 'visa/renouvellement-visa', group: 'visa', parent: 'visa' },
  { slug: 'visa/vls-ts', group: 'visa', parent: 'visa' },
  { slug: 'regroupement-familial', group: 'complementaires' },
  { slug: 'dalo', group: 'complementaires' },
  { slug: 'dcem', group: 'complementaires' },
];

export const SLUGS = NODES.map((n) => n.slug);
export const GROUP_IDS = ['naturalisation', 'titre-de-sejour', 'visa', 'complementaires'] as const;
export const OQTF_PATH = '/services/contestation-oqtf/';

export type Service = Node & ReturnType<typeof svcText> & { href: string };

export function services(lang: Lang): Service[] {
  return NODES.map((n) => ({ ...n, ...svcText(lang, n.slug), href: lp(lang, `/services/${n.slug}/`) }));
}
export const bySlug = (lang: Lang, s: string) => services(lang).find((x) => x.slug === s);
export const childrenOf = (lang: Lang, s: string) => services(lang).filter((x) => x.parent === s);
export const inGroup = (lang: Lang, g: string) => services(lang).filter((x) => x.group === g);
export const groupHref = (lang: Lang, g: string) => lp(lang, g === 'complementaires' ? '/services/' : `/services/${g}/`);
