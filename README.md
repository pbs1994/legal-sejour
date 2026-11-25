# legal-sejour.fr

Site statique (Astro) — accompagnement administratif : contestation d’OQTF (service prioritaire), titre de séjour, naturalisation, visa, regroupement familial, DALO, DCEM.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/ (à téléverser tel quel)
```

## Langues
FR (racine), EN `/en/`, RU `/ru/`, RO `/ro/`, ES `/es/`. Textes : `src/i18n/<langue>.ts` (même forme que `fr.ts`, vérifiée par `npx astro check`). Pages : `src/views/*.astro`, routes dans `src/pages` et `src/pages/[lang]`. Mentions légales et confidentialité : français uniquement.

## Structure
- `src/data/site.ts` — coordonnées (téléphone, e-mail, horaires), mentions légales, étapes du processus
- `src/data/services.ts` — arborescence des services ; leurs textes sont dans `src/i18n/<langue>.ts`
- `src/pages/services/contestation-oqtf.astro` — page OQTF (mise en avant)
- `src/pages/prendre-rendez-vous.astro` — 1er RDV gratuit avec calendrier
- `public/api/contact.php` — envoi des formulaires par e-mail (PHP 8, ex. OVH). Les envois suspects sont signalés, jamais supprimés ; les demandes OQTF arrivent avec `[URGENT OQTF]`.

## Règles de rédaction
- Ne jamais utiliser « juridique » ni se présenter comme avocat / cabinet : uniquement « accompagnement administratif ».
- Site impersonnel : aucun nom, aucune photo.

## À compléter avant mise en ligne
- [x] Téléphone : 07 52 28 26 76
- [x] Mentions légales : EI, SIREN, adresse, APE (sans nom, à la demande du client)
- [ ] Hébergeur dans `SITE.legal.host`
- [ ] Vérifier l’adresse e-mail `contact@legal-sejour.fr` et l’envoi depuis `site@legal-sejour.fr`
- [ ] Le formulaire nécessite un hébergement PHP (sur Vercel / Netlify il faut un autre endpoint)
