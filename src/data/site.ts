// Coordonnées et réglages globaux — à compléter avant la mise en ligne.
export const SITE = {
  name: 'Légal Séjour',
  url: 'https://legal-sejour.fr',
  // Laissé vide → le bouton téléphone est masqué.
  phone: '07 52 28 26 76',
  email: 'contact@legal-sejour.fr',
  area: 'Paris & Île-de-France',
  hours: 'Lun. — Ven. : 9h30 — 19h00',
  // Mentions légales — TODO: à compléter (forme juridique, SIREN, adresse, directeur de publication).
  legal: {
    company: '[Raison sociale]',
    siren: '[SIREN]',
    address: '[Adresse du siège]',
    publisher: '[Directeur de la publication]',
    host: '[Hébergeur — nom, adresse, téléphone]',
  },
};

export const telHref = (p: string) => 'tel:+33' + p.replace(/\D/g, '').replace(/^0/, '');

// Étapes communes à toutes les démarches
export const STEPS = [
  { t: 'Premier rendez-vous gratuit', d: '20 minutes pour comprendre votre situation et vous orienter.' },
  { t: 'Constitution du dossier', d: 'Liste des pièces, vérification, mise en forme.' },
  { t: 'Dépôt et suivi', d: 'Dépôt en ligne ou en préfecture, relances, compléments.' },
  { t: 'Décision', d: 'Nous restons à vos côtés jusqu’à la réponse de l’administration.' },
];
