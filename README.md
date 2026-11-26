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
- `api/contact.js` — Vercel Function : envoi des formulaires par e-mail via Resend. Les envois suspects sont signalés, jamais supprimés ; les demandes OQTF arrivent avec `[URGENT OQTF]`. Chaque demande est aussi écrite dans les logs Vercel (`LEAD …`).

## Règles de rédaction
- Ne jamais utiliser « juridique » ni se présenter comme avocat / cabinet : uniquement « accompagnement administratif ».
- Site impersonnel : aucun nom, aucune photo.

## À compléter avant mise en ligne
- [x] Téléphone : 07 52 28 26 76
- [x] Mentions légales : EI, SIREN, adresse, APE (sans nom, à la demande du client)
- [x] Hébergeur : Vercel
- [ ] Vercel : importer le repo, ajouter le domaine legal-sejour.fr
- [ ] Resend : vérifier le domaine legal-sejour.fr (DNS), puis variables Vercel `RESEND_API_KEY`, `LEAD_TO` (et `LEAD_FROM` si besoin)
- [x] Réservation : Cal.com (`SITE.cal` dans `src/data/site.ts`), synchronisé avec Google Agenda ; démarche pré-remplie selon la page d'origine, `metadata[langue]` / `metadata[source]` transmis
- [ ] Boîte e-mail contact@legal-sejour.fr à créer, ou mettre une autre adresse dans `LEAD_TO`
