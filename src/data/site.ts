// Coordonnées et réglages globaux.
export const SITE = {
  name: 'Légal Séjour',
  url: 'https://legal-sejour.fr',
  phone: '07 52 28 26 76', // vide → bouton téléphone masqué
  email: 'contact@legal-sejour.fr',
  // Cal.com : page de réservation (synchronisée avec Google Agenda)
  cal: 'legal-sejour/rendez-vous-gratuit-30min',
  // Mentions légales (source : synthèse Guichet unique, formalité J00304160591). Sans nom, à la demande du client.
  legal: {
    form: 'Entreprise individuelle (micro-entreprise)',
    siren: '133 336 362',
    address: '38 rue de Ménilmontant, 75020 Paris, France',
    ape: '8211Z',
    vat: 'TVA non applicable, art. 293 B du CGI',
    host: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — https://vercel.com/contact',
  },
};

export const telHref = (p: string) => 'tel:+33' + p.replace(/\D/g, '').replace(/^0/, '');
