export type Service = {
  slug: string; // chemin après /services/
  title: string; // titre de page (H1)
  menu: string; // libellé court dans le menu
  line: string; // une ligne sous le libellé
  group: 'oqtf' | 'naturalisation' | 'titre-de-sejour' | 'visa' | 'complementaires';
  parent?: string;
  lead: string; // phrase d'accroche
  forWho?: string[]; // pour qui / conditions
  docs?: string[]; // pièces principales
  note?: string;
  faq?: { q: string; a: string }[];
};

export const GROUPS = [
  { id: 'naturalisation', label: 'Naturalisation', href: '/services/naturalisation/', line: 'Devenir citoyen français' },
  { id: 'titre-de-sejour', label: 'Titre de séjour', href: '/services/titre-de-sejour/', line: 'Vivre et travailler en France' },
  { id: 'visa', label: 'Visa', href: '/services/visa/', line: 'Entrer sur le territoire français' },
  { id: 'complementaires', label: 'Services complémentaires', href: '/services/', line: '' },
] as const;

export const OQTF = {
  slug: 'contestation-oqtf',
  href: '/services/contestation-oqtf/',
  menu: 'Contestation d’OQTF',
  line: 'Agir vite, dans les délais',
};

export const SERVICES: Service[] = [
  // ——— Naturalisation
  {
    slug: 'naturalisation', group: 'naturalisation', menu: 'Naturalisation', line: 'Devenir citoyen français',
    title: 'Naturalisation',
    lead: 'De la préparation des pièces au dépôt du dossier, une demande complète et cohérente.',
    forWho: ['Résidence stable en France', 'Niveau de français requis', 'Ressources et insertion professionnelle'],
    docs: ['Pièces d’état civil traduites', 'Justificatifs de résidence et de ressources', 'Diplôme ou attestation de français'],
    faq: [
      { q: 'Quel est le délai de traitement ?', a: 'Le délai légal est de 18 mois à compter du dossier complet, réduit à 12 mois après 10 ans de résidence en France.' },
      { q: 'Y a-t-il un entretien ?', a: 'Oui, un entretien d’assimilation en préfecture. Nous vous aidons à vous y préparer.' },
    ],
  },
  {
    slug: 'naturalisation/par-decret', parent: 'naturalisation', group: 'naturalisation', menu: 'Par décret', line: 'Voie classique après 5 ans en France',
    title: 'Naturalisation par décret',
    lead: 'La voie classique pour les personnes installées durablement en France.',
    forWho: ['5 ans de résidence habituelle (2 ans après des études supérieures en France)', 'Titre de séjour en cours de validité', 'Niveau de français et connaissance des valeurs de la République'],
    docs: ['Acte de naissance', 'Titres de séjour successifs', 'Avis d’imposition', 'Justificatifs d’activité'],
  },
  {
    slug: 'naturalisation/par-mariage', parent: 'naturalisation', group: 'naturalisation', menu: 'Par mariage', line: 'Conjoint de Français',
    title: 'Nationalité par mariage',
    lead: 'La déclaration de nationalité pour le conjoint d’un Français.',
    forWho: ['4 ans de mariage', 'Communauté de vie affective et matérielle', 'Conjoint français au jour du mariage'],
    docs: ['Acte de mariage', 'Preuves de vie commune', 'Justificatif de nationalité du conjoint'],
    note: 'La durée de mariage est portée à 5 ans sans 3 ans de résidence continue en France.',
  },
  {
    slug: 'naturalisation/parent-enfant-francais', parent: 'naturalisation', group: 'naturalisation', menu: 'Parent d’enfant français', line: 'Déclaration de nationalité',
    title: 'Parent d’enfant français',
    lead: 'La déclaration de nationalité ouverte aux ascendants de Français.',
    forWho: ['65 ans ou plus', '25 ans de résidence habituelle en France', 'Au moins un enfant français'],
    docs: ['Acte de naissance', 'Preuve de la nationalité de l’enfant', 'Justificatifs de résidence'],
  },
  {
    slug: 'naturalisation/par-fratrie', parent: 'naturalisation', group: 'naturalisation', menu: 'Par fratrie', line: 'Frère ou sœur d’un Français',
    title: 'Nationalité par fratrie',
    lead: 'La déclaration pour les frères et sœurs de Français arrivés jeunes en France.',
    forWho: ['Arrivée en France avant 6 ans', 'Scolarité obligatoire suivie en France', 'Frère ou sœur devenu français'],
    docs: ['Acte de naissance', 'Certificats de scolarité', 'Preuve de la nationalité du frère ou de la sœur'],
  },
  {
    slug: 'naturalisation/par-reintegration', parent: 'naturalisation', group: 'naturalisation', menu: 'Par réintégration', line: 'Recouvrer la nationalité perdue',
    title: 'Réintégration dans la nationalité',
    lead: 'Recouvrer une nationalité française perdue, par décret ou par déclaration.',
    forWho: ['Nationalité française perdue', 'Attaches avec la France', 'Résidence en France (pour la voie du décret)'],
    docs: ['Preuve de la nationalité antérieure', 'Acte de naissance', 'Justificatifs de résidence'],
  },

  // ——— Titre de séjour
  {
    slug: 'titre-de-sejour', group: 'titre-de-sejour', menu: 'Titre de séjour', line: 'Vivre et travailler en France',
    title: 'Titre de séjour',
    lead: 'Première demande ou renouvellement : le bon titre, le bon dossier, au bon moment.',
    docs: ['Passeport', 'Justificatif de domicile', 'Photos d’identité', 'Pièces propres au motif de séjour'],
    faq: [
      { q: 'Où déposer ma demande ?', a: 'La plupart des titres se demandent en ligne sur l’ANEF. Certaines situations relèvent encore d’un dépôt en préfecture.' },
      { q: 'Que faire en cas de refus ?', a: 'Un refus peut être contesté dans des délais courts. Contactez-nous dès réception.' },
    ],
  },
  {
    slug: 'titre-de-sejour/renouvellement', parent: 'titre-de-sejour', group: 'titre-de-sejour', menu: 'Renouvellement', line: 'Prolonger votre titre',
    title: 'Renouvellement du titre de séjour',
    lead: 'Anticiper pour ne jamais se retrouver sans droit au séjour.',
    forWho: ['Demande entre 4 et 2 mois avant l’expiration', 'Conditions du titre toujours remplies', 'Titre expiré : une démarche reste possible'],
    docs: ['Titre en cours', 'Passeport', 'Justificatif de domicile', 'Justificatifs propres au titre'],
  },
  {
    slug: 'titre-de-sejour/vie-privee-familiale', parent: 'titre-de-sejour', group: 'titre-de-sejour', menu: 'Vie privée et familiale', line: 'Liens familiaux en France',
    title: 'Vie privée et familiale',
    lead: 'Pour les personnes dont les attaches personnelles et familiales sont en France.',
    forWho: ['Conjoint ou parent de Français', 'Liens personnels et familiaux en France', 'Entrée ou résidence selon le cas'],
    docs: ['Actes d’état civil', 'Preuves de vie commune ou de contribution à l’enfant', 'Preuves de présence en France'],
  },
  {
    slug: 'titre-de-sejour/salarie-travailleur', parent: 'titre-de-sejour', group: 'titre-de-sejour', menu: 'Salarié / Travailleur', line: 'Activité professionnelle',
    title: 'Salarié / Travailleur temporaire',
    lead: 'Le titre adapté à votre contrat et à votre employeur.',
    forWho: ['Contrat de travail ou promesse d’embauche', 'Autorisation de travail de l’employeur', 'Métiers en tension : voie spécifique'],
    docs: ['Contrat de travail', 'Bulletins de salaire', 'Autorisation de travail'],
  },
  {
    slug: 'titre-de-sejour/etudiant', parent: 'titre-de-sejour', group: 'titre-de-sejour', menu: 'Étudiant', line: 'Inscription dans un établissement',
    title: 'Titre de séjour étudiant',
    lead: 'Poursuivre vos études en France, année après année.',
    forWho: ['Inscription dans un établissement', 'Ressources suffisantes', 'Progression des études'],
    docs: ['Certificat de scolarité', 'Relevés de notes', 'Justificatifs de ressources'],
  },
  {
    slug: 'titre-de-sejour/carte-de-resident', parent: 'titre-de-sejour', group: 'titre-de-sejour', menu: 'Carte de résident', line: 'Séjour de longue durée',
    title: 'Carte de résident',
    lead: 'Dix ans de stabilité pour ceux qui ont fait leur vie en France.',
    forWho: ['Résidence régulière et ininterrompue', 'Ressources stables', 'Intégration et niveau de français'],
    docs: ['Titres de séjour successifs', 'Avis d’imposition', 'Attestation de niveau de français'],
  },
  {
    slug: 'titre-de-sejour/carte-talent', parent: 'titre-de-sejour', group: 'titre-de-sejour', menu: 'Carte Talent', line: 'Profils qualifiés',
    title: 'Carte Talent',
    lead: 'Pour les profils qualifiés, chercheurs, créateurs d’entreprise et investisseurs.',
    forWho: ['Diplôme ou qualification élevée', 'Projet professionnel ou d’entreprise', 'Seuil de rémunération selon la catégorie'],
    docs: ['Diplômes', 'Contrat ou projet', 'Justificatifs de rémunération'],
  },

  // ——— Visa
  {
    slug: 'visa', group: 'visa', menu: 'Visa', line: 'Entrer sur le territoire',
    title: 'Visa',
    lead: 'Le bon visa, un dossier solide, un rendez-vous consulaire bien préparé.',
    docs: ['Passeport valide', 'Justificatifs du séjour', 'Ressources et assurance'],
    faq: [
      { q: 'Quel visa choisir ?', a: 'Il dépend de la durée et de l’objet du séjour. Le premier rendez-vous sert précisément à le déterminer.' },
      { q: 'Et après un refus ?', a: 'Un recours administratif préalable est possible dans un délai de 30 jours. Ne laissez pas passer ce délai.' },
    ],
  },
  {
    slug: 'visa/court-sejour', parent: 'visa', group: 'visa', menu: 'Court séjour (type C)', line: 'Jusqu’à 90 jours',
    title: 'Visa court séjour (type C)',
    lead: 'Tourisme, famille ou affaires : jusqu’à 90 jours dans l’espace Schengen.',
    forWho: ['Séjour de 90 jours maximum', 'Objet du voyage justifié', 'Garanties de retour'],
    docs: ['Passeport', 'Réservations ou attestation d’accueil', 'Assurance voyage', 'Ressources'],
  },
  {
    slug: 'visa/etudiant', parent: 'visa', group: 'visa', menu: 'Visa étudiant', line: 'Études en France',
    title: 'Visa étudiant',
    lead: 'De l’admission à l’arrivée en France.',
    forWho: ['Admission dans un établissement', 'Ressources suffisantes', 'Projet d’études cohérent'],
    docs: ['Attestation d’admission', 'Justificatifs de ressources', 'Diplômes antérieurs'],
  },
  {
    slug: 'visa/long-sejour', parent: 'visa', group: 'visa', menu: 'Long séjour (type D)', line: 'Plus de 90 jours',
    title: 'Visa long séjour (type D)',
    lead: 'Pour s’installer en France plus de trois mois.',
    forWho: ['Travail, famille, études ou visiteur', 'Motif justifié', 'Ressources et logement'],
    docs: ['Passeport', 'Pièces liées au motif', 'Justificatif d’hébergement'],
  },
  {
    slug: 'visa/renouvellement-visa', parent: 'visa', group: 'visa', menu: 'Renouvellement visa', line: 'Prolonger votre séjour',
    title: 'Renouvellement de visa',
    lead: 'Prolongation exceptionnelle ou passage vers un titre de séjour.',
    forWho: ['Visa arrivant à expiration', 'Motif sérieux de prolongation', 'Relais par un titre de séjour selon le cas'],
    docs: ['Visa en cours', 'Justificatif du motif', 'Ressources'],
  },
  {
    slug: 'visa/vls-ts', parent: 'visa', group: 'visa', menu: 'VLS-TS', line: 'Visa valant titre de séjour',
    title: 'Visa long séjour valant titre de séjour',
    lead: 'Valider votre VLS-TS dans les temps, puis préparer la suite.',
    forWho: ['Validation en ligne dans les 3 mois suivant l’arrivée', 'Taxe à acquitter', 'Renouvellement par un titre de séjour'],
    docs: ['VLS-TS', 'Date d’entrée en France', 'Adresse en France'],
  },

  // ——— Complémentaires
  {
    slug: 'regroupement-familial', group: 'complementaires', menu: 'Regroupement familial', line: 'Faire venir votre famille',
    title: 'Regroupement familial',
    lead: 'Réunir votre famille en France, sur un dossier sans faille.',
    forWho: ['18 mois de séjour régulier', 'Ressources stables et suffisantes', 'Logement adapté à la famille'],
    docs: ['Titre de séjour', 'Justificatifs de ressources', 'Bail ou titre de propriété', 'Actes d’état civil'],
  },
  {
    slug: 'dalo', group: 'complementaires', menu: 'DALO', line: 'Droit au logement opposable',
    title: 'DALO',
    lead: 'Faire reconnaître votre droit à un logement décent.',
    forWho: ['Demande de logement social sans réponse', 'Logement indigne, suroccupé ou absence de logement', 'Séjour régulier'],
    docs: ['Numéro unique de demande', 'Justificatifs de situation', 'Ressources'],
  },
  {
    slug: 'dcem', group: 'complementaires', menu: 'DCEM', line: 'Document de circulation pour mineur',
    title: 'Document de circulation pour étranger mineur',
    lead: 'Permettre à votre enfant de voyager et de revenir en France.',
    forWho: ['Enfant mineur résidant en France', 'Parent en situation régulière ou enfant né en France', 'Entrée régulière ou regroupement familial'],
    docs: ['Acte de naissance', 'Titre de séjour du parent', 'Justificatif de domicile'],
  },
];

export const bySlug = (s: string) => SERVICES.find((x) => x.slug === s);
export const childrenOf = (s: string) => SERVICES.filter((x) => x.parent === s);
export const inGroup = (g: string) => SERVICES.filter((x) => x.group === g);
export const href = (s: Service) => `/services/${s.slug}/`;
