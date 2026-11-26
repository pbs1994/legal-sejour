// Dictionnaire de référence (français). Les autres langues doivent avoir exactement la même forme.
// Règle : jamais « juridique » (ni équivalent dans les autres langues) — uniquement « administratif ».

export type SvcText = {
  title: string; menu: string; line: string; lead: string;
  forWho?: string[]; docs?: string[]; note?: string; faq?: { q: string; a: string }[];
};
type QA = { q: string; a: string };
type TD = { t: string; d: string };

const services: Record<string, SvcText> = {
  // ——— Naturalisation
  'naturalisation': {
    menu: 'Naturalisation', line: 'Devenir citoyen français', title: 'Naturalisation',
    lead: 'De la préparation des pièces au dépôt du dossier, une demande complète et cohérente.',
    forWho: ['Résidence stable en France', 'Niveau de français requis', 'Ressources et insertion professionnelle'],
    docs: ['Pièces d’état civil traduites', 'Justificatifs de résidence et de ressources', 'Diplôme ou attestation de français'],
    faq: [
      { q: 'Quel est le délai de traitement ?', a: 'Le délai légal est de 18 mois à compter du dossier complet, réduit à 12 mois après 10 ans de résidence en France.' },
      { q: 'Y a-t-il un entretien ?', a: 'Oui, un entretien d’assimilation en préfecture. Nous vous aidons à vous y préparer.' },
    ],
  },
  'naturalisation/par-decret': {
    menu: 'Par décret', line: 'Voie classique après 5 ans en France', title: 'Naturalisation par décret',
    lead: 'La voie classique pour les personnes installées durablement en France.',
    forWho: ['5 ans de résidence habituelle (2 ans après des études supérieures en France)', 'Titre de séjour en cours de validité', 'Niveau de français et connaissance des valeurs de la République'],
    docs: ['Acte de naissance', 'Titres de séjour successifs', 'Avis d’imposition', 'Justificatifs d’activité'],
  },
  'naturalisation/par-mariage': {
    menu: 'Par mariage', line: 'Conjoint de Français', title: 'Nationalité par mariage',
    lead: 'La déclaration de nationalité pour le conjoint d’un Français.',
    forWho: ['4 ans de mariage', 'Communauté de vie affective et matérielle', 'Conjoint français au jour du mariage'],
    docs: ['Acte de mariage', 'Preuves de vie commune', 'Justificatif de nationalité du conjoint'],
    note: 'La durée de mariage est portée à 5 ans sans 3 ans de résidence continue en France.',
  },
  'naturalisation/parent-enfant-francais': {
    menu: 'Parent d’enfant français', line: 'Déclaration de nationalité', title: 'Parent d’enfant français',
    lead: 'La déclaration de nationalité ouverte aux ascendants de Français.',
    forWho: ['65 ans ou plus', '25 ans de résidence habituelle en France', 'Au moins un enfant français'],
    docs: ['Acte de naissance', 'Preuve de la nationalité de l’enfant', 'Justificatifs de résidence'],
  },
  'naturalisation/par-fratrie': {
    menu: 'Par fratrie', line: 'Frère ou sœur d’un Français', title: 'Nationalité par fratrie',
    lead: 'La déclaration pour les frères et sœurs de Français arrivés jeunes en France.',
    forWho: ['Arrivée en France avant 6 ans', 'Scolarité obligatoire suivie en France', 'Frère ou sœur devenu français'],
    docs: ['Acte de naissance', 'Certificats de scolarité', 'Preuve de la nationalité du frère ou de la sœur'],
  },
  'naturalisation/par-reintegration': {
    menu: 'Par réintégration', line: 'Recouvrer la nationalité perdue', title: 'Réintégration dans la nationalité',
    lead: 'Recouvrer une nationalité française perdue, par décret ou par déclaration.',
    forWho: ['Nationalité française perdue', 'Attaches avec la France', 'Résidence en France (pour la voie du décret)'],
    docs: ['Preuve de la nationalité antérieure', 'Acte de naissance', 'Justificatifs de résidence'],
  },
  // ——— Titre de séjour
  'titre-de-sejour': {
    menu: 'Titre de séjour', line: 'Vivre et travailler en France', title: 'Titre de séjour',
    lead: 'Première demande ou renouvellement : le bon titre, le bon dossier, au bon moment.',
    docs: ['Passeport', 'Justificatif de domicile', 'Photos d’identité', 'Pièces propres au motif de séjour'],
    faq: [
      { q: 'Où déposer ma demande ?', a: 'La plupart des titres se demandent en ligne sur l’ANEF. Certaines situations relèvent encore d’un dépôt en préfecture.' },
      { q: 'Que faire en cas de refus ?', a: 'Un refus peut être contesté dans des délais courts. Contactez-nous dès réception.' },
    ],
  },
  'titre-de-sejour/renouvellement': {
    menu: 'Renouvellement', line: 'Prolonger votre titre', title: 'Renouvellement du titre de séjour',
    lead: 'Anticiper pour ne jamais se retrouver sans droit au séjour.',
    forWho: ['Demande entre 4 et 2 mois avant l’expiration', 'Conditions du titre toujours remplies', 'Titre expiré : une démarche reste possible'],
    docs: ['Titre en cours', 'Passeport', 'Justificatif de domicile', 'Justificatifs propres au titre'],
  },
  'titre-de-sejour/vie-privee-familiale': {
    menu: 'Vie privée et familiale', line: 'Liens familiaux en France', title: 'Vie privée et familiale',
    lead: 'Pour les personnes dont les attaches personnelles et familiales sont en France.',
    forWho: ['Conjoint ou parent de Français', 'Liens personnels et familiaux en France', 'Entrée ou résidence selon le cas'],
    docs: ['Actes d’état civil', 'Preuves de vie commune ou de contribution à l’enfant', 'Preuves de présence en France'],
  },
  'titre-de-sejour/salarie-travailleur': {
    menu: 'Salarié / Travailleur', line: 'Activité professionnelle', title: 'Salarié / Travailleur temporaire',
    lead: 'Le titre adapté à votre contrat et à votre employeur.',
    forWho: ['Contrat de travail ou promesse d’embauche', 'Autorisation de travail de l’employeur', 'Métiers en tension : voie spécifique'],
    docs: ['Contrat de travail', 'Bulletins de salaire', 'Autorisation de travail'],
  },
  'titre-de-sejour/etudiant': {
    menu: 'Étudiant', line: 'Inscription dans un établissement', title: 'Titre de séjour étudiant',
    lead: 'Poursuivre vos études en France, année après année.',
    forWho: ['Inscription dans un établissement', 'Ressources suffisantes', 'Progression des études'],
    docs: ['Certificat de scolarité', 'Relevés de notes', 'Justificatifs de ressources'],
  },
  'titre-de-sejour/carte-de-resident': {
    menu: 'Carte de résident', line: 'Séjour de longue durée', title: 'Carte de résident',
    lead: 'Dix ans de stabilité pour ceux qui ont fait leur vie en France.',
    forWho: ['Résidence régulière et ininterrompue', 'Ressources stables', 'Intégration et niveau de français'],
    docs: ['Titres de séjour successifs', 'Avis d’imposition', 'Attestation de niveau de français'],
  },
  'titre-de-sejour/carte-talent': {
    menu: 'Carte Talent', line: 'Profils qualifiés', title: 'Carte Talent',
    lead: 'Pour les profils qualifiés, chercheurs, créateurs d’entreprise et investisseurs.',
    forWho: ['Diplôme ou qualification élevée', 'Projet professionnel ou d’entreprise', 'Seuil de rémunération selon la catégorie'],
    docs: ['Diplômes', 'Contrat ou projet', 'Justificatifs de rémunération'],
  },
  // ——— Visa
  'visa': {
    menu: 'Visa', line: 'Entrer sur le territoire', title: 'Visa',
    lead: 'Le bon visa, un dossier solide, un rendez-vous consulaire bien préparé.',
    docs: ['Passeport valide', 'Justificatifs du séjour', 'Ressources et assurance'],
    faq: [
      { q: 'Quel visa choisir ?', a: 'Il dépend de la durée et de l’objet du séjour. Le premier rendez-vous sert précisément à le déterminer.' },
      { q: 'Et après un refus ?', a: 'Un recours administratif préalable est possible dans un délai de 30 jours. Ne laissez pas passer ce délai.' },
    ],
  },
  'visa/court-sejour': {
    menu: 'Court séjour (type C)', line: 'Jusqu’à 90 jours', title: 'Visa court séjour (type C)',
    lead: 'Tourisme, famille ou affaires : jusqu’à 90 jours dans l’espace Schengen.',
    forWho: ['Séjour de 90 jours maximum', 'Objet du voyage justifié', 'Garanties de retour'],
    docs: ['Passeport', 'Réservations ou attestation d’accueil', 'Assurance voyage', 'Ressources'],
  },
  'visa/etudiant': {
    menu: 'Visa étudiant', line: 'Études en France', title: 'Visa étudiant',
    lead: 'De l’admission à l’arrivée en France.',
    forWho: ['Admission dans un établissement', 'Ressources suffisantes', 'Projet d’études cohérent'],
    docs: ['Attestation d’admission', 'Justificatifs de ressources', 'Diplômes antérieurs'],
  },
  'visa/long-sejour': {
    menu: 'Long séjour (type D)', line: 'Plus de 90 jours', title: 'Visa long séjour (type D)',
    lead: 'Pour s’installer en France plus de trois mois.',
    forWho: ['Travail, famille, études ou visiteur', 'Motif justifié', 'Ressources et logement'],
    docs: ['Passeport', 'Pièces liées au motif', 'Justificatif d’hébergement'],
  },
  'visa/renouvellement-visa': {
    menu: 'Renouvellement visa', line: 'Prolonger votre séjour', title: 'Renouvellement de visa',
    lead: 'Prolongation exceptionnelle ou passage vers un titre de séjour.',
    forWho: ['Visa arrivant à expiration', 'Motif sérieux de prolongation', 'Relais par un titre de séjour selon le cas'],
    docs: ['Visa en cours', 'Justificatif du motif', 'Ressources'],
  },
  'visa/vls-ts': {
    menu: 'VLS-TS', line: 'Visa valant titre de séjour', title: 'Visa long séjour valant titre de séjour',
    lead: 'Valider votre VLS-TS dans les temps, puis préparer la suite.',
    forWho: ['Validation en ligne dans les 3 mois suivant l’arrivée', 'Taxe à acquitter', 'Renouvellement par un titre de séjour'],
    docs: ['VLS-TS', 'Date d’entrée en France', 'Adresse en France'],
  },
  // ——— Complémentaires
  'regroupement-familial': {
    menu: 'Regroupement familial', line: 'Faire venir votre famille', title: 'Regroupement familial',
    lead: 'Réunir votre famille en France, sur un dossier sans faille.',
    forWho: ['18 mois de séjour régulier', 'Ressources stables et suffisantes', 'Logement adapté à la famille'],
    docs: ['Titre de séjour', 'Justificatifs de ressources', 'Bail ou titre de propriété', 'Actes d’état civil'],
  },
  'dalo': {
    menu: 'DALO', line: 'Droit au logement opposable', title: 'DALO',
    lead: 'Faire reconnaître votre droit à un logement décent.',
    forWho: ['Demande de logement social sans réponse', 'Logement indigne, suroccupé ou absence de logement', 'Séjour régulier'],
    docs: ['Numéro unique de demande', 'Justificatifs de situation', 'Ressources'],
  },
  'dcem': {
    menu: 'DCEM', line: 'Document de circulation pour mineur', title: 'Document de circulation pour étranger mineur',
    lead: 'Permettre à votre enfant de voyager et de revenir en France.',
    forWho: ['Enfant mineur résidant en France', 'Parent en situation régulière ou enfant né en France', 'Entrée régulière ou regroupement familial'],
    docs: ['Acte de naissance', 'Titre de séjour du parent', 'Justificatif de domicile'],
  },
};

const ui = {
  meta: { locale: 'fr_FR', intl: 'fr-FR', name: 'Français' },
  nav: {
    home: 'Accueil', services: 'Nos services', why: 'Pourquoi nous ?', oqtf: 'OQTF', all: 'Tous nos services',
    overview: 'Vue d’ensemble', priority: 'Priorité', urgent: 'Urgence', menu: 'Menu', mainNav: 'Navigation principale',
    rdvPre: '1<sup>er</sup> RDV', rdvScript: 'offert !', mobileRdv: 'Prendre rendez-vous — gratuit',
    megaText: 'Nous rédigeons et déposons votre recours, dans les délais.', megaGo: 'Agir maintenant',
    call: 'Appeler le', lang: 'Langue', skip: 'Aller au contenu',
  },
  groups: { naturalisation: 'Naturalisation', 'titre-de-sejour': 'Titre de séjour', visa: 'Visa', complementaires: 'Services complémentaires', complShort: 'Complémentaires' },
  oqtfName: 'Contestation d’OQTF',
  footer: {
    tagline: 'Accompagnement administratif en droit au séjour. Indépendant, discret, rigoureux.',
    rdv: '1<sup>er</sup> RDV gratuit', services: 'Services', refs: 'Repères', contact: 'Contact', book: 'Prendre rendez-vous',
    area: 'Paris & Île-de-France', hours: 'Lun. — Ven. : 9h30 — 19h00',
    note: 'Légal Séjour est un service privé d’accompagnement administratif. Il n’est ni un organisme public, ni un cabinet d’avocats. Les démarches officielles sont gratuites sur les sites de l’administration ; nos prestations sont payantes et font l’objet d’un devis préalable.',
    legal: 'Mentions légales', privacy: 'Confidentialité', legalNav: 'Liens légaux',
  },
  crumbs: { home: 'Accueil', services: 'Services', aria: 'Fil d’Ariane', booking: 'Rendez-vous', why: 'Pourquoi nous ?' },
  steps: {
    eyebrow: 'Processus', title: 'Quatre étapes, un seul interlocuteur.',
    items: [
      { t: 'Premier rendez-vous gratuit', d: '30 minutes pour comprendre votre situation et vous orienter.' },
      { t: 'Constitution du dossier', d: 'Liste des pièces, vérification, mise en forme.' },
      { t: 'Dépôt et suivi', d: 'Dépôt en ligne ou en préfecture, relances, compléments.' },
      { t: 'Décision', d: 'Nous restons à vos côtés jusqu’à la réponse de l’administration.' },
    ] as TD[],
  },
  faq: { eyebrow: 'FAQ', title: 'Questions fréquentes' },
  cta: { title: 'Parlons de votre situation.', text: 'Premier rendez-vous de 30 minutes, gratuit et sans engagement.', btn: 'Prendre rendez-vous' },
  formSection: {
    eyebrow: 'Premier contact', eyebrowOqtf: 'Urgence OQTF', title: 'Parlons de votre situation.',
    ticks: ['1<sup>er</sup> rendez-vous gratuit, 30 minutes', 'Par téléphone ou en visio', 'Devis clair avant tout engagement'],
    ticksOqtf: ['Rappel prioritaire', 'Recours rédigé et déposé dans le délai', 'Devis clair avant tout engagement'],
    call: 'Ou appelez-nous :', callOqtf: 'Urgence ? Appelez directement :',
  },
  form: {
    first: 'Prénom', last: 'Nom', email: 'E-mail', phone: 'Téléphone', request: 'Votre demande', select: 'Sélectionnez…',
    other: 'Autre demande', notified: 'Date de notification de l’OQTF', message: 'Message', optional: '(facultatif)',
    consent: 'J’accepte que mes données soient utilisées pour être recontacté(e).', more: 'En savoir plus',
    submit: 'Envoyer ma demande', submitOqtf: 'Être rappelé en priorité', submitBooking: 'Confirmer ma demande',
    sending: 'Envoi…', ok: 'Merci. Votre demande est bien reçue, nous vous recontactons rapidement.',
    err: 'L’envoi a échoué. Écrivez-nous à contact@legal-sejour.fr.', website: 'Site web',
  },
  delays: {
    items: [
      { n: '30', u: 'jours', d: 'OQTF avec délai de départ volontaire, le plus souvent après un refus de titre.' },
      { n: '7', u: 'jours', d: 'OQTF sans délai de départ volontaire et certaines situations particulières.' },
      { n: '24', u: 'heures', d: 'En cas de placement en rétention ou d’assignation à résidence.' },
    ],
    fine: 'Délais indicatifs. Le délai applicable est celui mentionné sur votre décision et court à compter de sa notification.',
    short: ['24 h', '7 j', '30 j'],
  },
  service: {
    talk: 'Parler à un référent', steps: 'Démarches', choose: 'Choisissez votre démarche.', discover: 'Découvrir',
    conditions: 'Conditions', forWho: 'Pour qui ?', dossier: 'Dossier', docs: 'Pièces principales',
    docsNote: 'Liste indicative. La liste complète dépend de votre situation.',
    oqtfBanner: 'Refus assorti d’une OQTF ?', oqtfGo: 'Agir dans les délais', stepsTitle: 'Un dossier bien préparé.',
    others: 'Autres démarches.', descSuffix: '1er rendez-vous gratuit.',
  },
  home: {
    title: 'Légal Séjour — Accompagnement administratif, titre de séjour et OQTF',
    desc: 'Titre de séjour, naturalisation, visa, contestation d’OQTF. Accompagnement administratif à Paris et en Île-de-France. 1er rendez-vous gratuit.',
    eyebrow: 'Accompagnement administratif', h1a: 'Votre séjour en France,', h1b: 'en règle.',
    lead: 'Titre de séjour, naturalisation, visa. Et, quand chaque jour compte, la contestation d’une OQTF.',
    book: 'Prendre rendez-vous', alertQ: 'Vous avez reçu une OQTF ?', alertD: 'Le délai de recours court dès la notification.', alertGo: 'Agir maintenant',
    demand: 'Quelle est votre demande ?',
    chips: ['Contester une OQTF', 'Titre de séjour', 'Renouvellement', 'Naturalisation', 'Visa', 'Regroupement familial', 'DALO', 'DCEM'],
    oEyebrow: 'Notre priorité', oH2: 'Contestation d’OQTF.',
    oP: 'Une obligation de quitter le territoire se conteste. Nous rédigeons votre recours et le déposons avant l’expiration du délai.',
    oBtn: 'Comprendre la démarche', oCall: 'Urgence',
    sEyebrow: 'Services', sH2: 'L’essentiel du droit au séjour.',
    rows: [
      { t: 'Contestation d’OQTF', d: 'Nous rédigeons et déposons votre recours, dans les délais.' },
      { t: 'Titre de séjour', d: 'Première demande et renouvellement.' },
      { t: 'Naturalisation', d: 'Par décret, mariage, fratrie, réintégration.' },
      { t: 'Visa', d: 'Court séjour, long séjour, étudiant, VLS-TS.' },
      { t: 'Regroupement familial', d: 'Faire venir votre famille en France.' },
      { t: 'DALO · DCEM', d: 'Logement opposable, document de circulation pour mineur.' },
    ] as TD[],
    eEyebrow: 'Engagements', eH2: 'Peu de mots. Beaucoup de rigueur.',
    eng: [
      { t: 'Un référent unique', d: 'Une seule personne suit votre dossier, du premier échange à la décision.' },
      { t: 'Un dossier vérifié', d: 'Chaque pièce est contrôlée avant dépôt. Rien n’est laissé au hasard.' },
      { t: 'Un devis clair', d: 'Vous connaissez le prix avant de vous engager. Aucune surprise.' },
    ] as TD[],
    faq: [
      { q: 'Êtes-vous un cabinet d’avocats ?', a: 'Non. Légal Séjour est un service privé d’accompagnement administratif. Nous rédigeons vos recours et dossiers et vous accompagnons jusqu’à la décision.' },
      { q: 'Le premier rendez-vous est-il vraiment gratuit ?', a: 'Oui. 30 minutes, par téléphone ou en visio, pour comprendre votre situation et vous orienter. Sans engagement.' },
      { q: 'Combien coûte l’accompagnement ?', a: 'Chaque situation est différente. Vous recevez un devis clair après le premier rendez-vous, avant tout engagement.' },
      { q: 'J’ai reçu une OQTF, que faire ?', a: 'Contactez-nous immédiatement. Nous rédigeons votre recours et le déposons dans le délai, qui peut être de 24 heures seulement.' },
    ] as QA[],
  },
  oqtf: {
    title: 'Contestation d’OQTF — agir dans les délais',
    desc: 'Vous avez reçu une OQTF ? Nous rédigeons votre recours devant le tribunal administratif et le déposons dans le délai : 30 jours, 7 jours ou 24 heures.',
    h1: 'Contestation d’OQTF.', sub1: 'Une OQTF n’est pas une fin.', sub2: 'Le délai, si.', sub3: 'Nous rédigeons votre recours et le déposons dans les temps.',
    callback: 'Être rappelé en priorité',
    howEyebrow: 'Notre intervention', howH2: 'Votre recours, rédigé et déposé.',
    how: [
      { t: 'Analyse de la décision', d: 'Nature de la mesure, délai applicable, arguments à soulever.' },
      { t: 'Rédaction du recours', d: 'Nous rédigeons votre requête devant le tribunal administratif.' },
      { t: 'Pièces et dépôt', d: 'Preuves rassemblées, classées, déposées dans le délai.' },
      { t: 'Suivi jusqu’au jugement', d: 'Mémoires complémentaires, préparation de l’audience.' },
    ] as TD[],
    keepEyebrow: 'Dès aujourd’hui', keepH2: 'Gardez précieusement.',
    keep: ['La décision et l’enveloppe de notification', 'La date exacte de remise ou de réception', 'Toute preuve de votre présence et de vos attaches en France'],
    casesEyebrow: 'Situations', casesH2: 'Nous intervenons notamment en cas de :',
    cases: ['Refus de titre de séjour avec OQTF', 'OQTF après rejet d’une demande d’asile', 'OQTF à la suite d’un contrôle', 'Interdiction de retour (IRTF)', 'Assignation à résidence', 'Placement en rétention'],
    faq: [
      { q: 'Le recours suspend-il l’OQTF ?', a: 'Le recours devant le tribunal administratif empêche en principe l’exécution de la mesure tant que le juge n’a pas statué. D’où l’importance de le former dans le délai.' },
      { q: 'Le délai est dépassé. Est-ce trop tard ?', a: 'Pas toujours. Une erreur dans la notification ou un changement de situation peut ouvrir d’autres voies. Contactez-nous pour vérifier.' },
      { q: 'Faut-il un avocat ?', a: 'Non. Devant le tribunal administratif, le recours contre une OQTF peut être présenté sans avocat. Nous rédigeons votre requête, réunissons les pièces et préparons l’audience avec vous.' },
      { q: 'Combien de temps pour rédiger le recours ?', a: 'Dans les délais de votre décision, y compris en 24 heures. Les dossiers OQTF sont traités en priorité.' },
      { q: 'Que dois-je apporter au premier échange ?', a: 'La décision, l’enveloppe, votre titre ou récépissé s’il existe, et tout document prouvant votre vie en France.' },
    ] as QA[],
    formTitle: 'Chaque heure compte.',
  },
  servicesPage: {
    title: 'Tous nos services', desc: 'Contestation d’OQTF, titre de séjour, naturalisation, visa, regroupement familial, DALO, DCEM. Accompagnement administratif.',
    h1: 'Nos services.', featD: '30 jours, 7 jours ou 24 heures : agir dans les délais.',
  },
  why: {
    title: 'Pourquoi nous ?', desc: 'Légal Séjour : spécialisation, réactivité, rigueur. Accompagnement administratif en droit au séjour.',
    h1a: 'Un seul sujet.', h1b: 'Toute notre attention.',
    points: [
      { t: 'Spécialisation', d: 'Le droit au séjour, et rien d’autre. Titres, nationalité, visas, éloignement.' },
      { t: 'Réactivité', d: 'Les situations urgentes, OQTF en tête, sont traitées en priorité.' },
      { t: 'Rigueur', d: 'Chaque pièce est vérifiée. Un dossier complet est un dossier mieux instruit.' },
      { t: 'Discrétion', d: 'Vos informations restent strictement confidentielles.' },
      { t: 'Transparence', d: 'Un devis clair, avant tout engagement. Pas de frais cachés.' },
      { t: 'Langues', d: 'Accompagnement en français, anglais, russe et ukrainien.' },
    ] as TD[],
    statement: 'Légal Séjour est un service privé et indépendant d’accompagnement administratif. Nous ne sommes ni un organisme public, ni un cabinet d’avocats : nous préparons et rédigeons vos dossiers et vos recours, et restons à vos côtés jusqu’à la décision.',
  },
  booking: {
    title: 'Prendre rendez-vous — 1er RDV gratuit',
    desc: 'Réservez votre premier rendez-vous gratuit de 30 minutes avec un référent, par téléphone ou en visio.',
    h1: '1<sup>er</sup> rendez-vous', h1Script: 'gratuit', lead: 'avec un référent Légal Séjour.',
    meta: ['30 minutes', 'Téléphone ou visio', 'Europe/Paris'],
    small: 'Confirmation immédiate par e-mail, avec le lien du rendez-vous.',
    loading: 'Chargement du calendrier…', open: 'Ouvrir le calendrier dans un nouvel onglet',
    callback: 'Vous préférez être rappelé ?', callbackLead: 'Laissez vos coordonnées, nous vous rappelons pour fixer un créneau.',
  },
};

export default { ui, services };
