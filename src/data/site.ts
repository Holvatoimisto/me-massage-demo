// Shared site-wide business facts, used by the homepage template and the
// global Footer so they stay in one place.
export const businessInfo = {
  name: 'ME massage',
  tagline: 'Hierontaa ja kehonhuoltoa',
  fullTagline: 'ME MASSAGE — HIERONTAA JA KEHONHUOLTOA',
  address: 'Lepsämäntie 1, 2 krs, 01800 Klaukkala',
  phone: '040 833 8512',
  phoneLink: 'tel:+358408338512',
  email: 'info.klaukkala@memassage.fi',
  emailLink: 'mailto:info.klaukkala@memassage.fi',
  bookingUrl: 'https://memassage.fi/ajanvaraus',
  googleReviewUrl: 'https://g.page/r/CeK1L8vJ3Z1KEAE',
  googleMapsUrl: 'https://maps.google.com/?q=ME+massage+Klaukkala',
  facebookUrl: 'https://www.facebook.com/memassage',
  instagramUrl: 'https://www.instagram.com/memassage',
  // Google rating shown site-wide. memassage.fi does not publish a numeric
  // rating; the values below come from the project data. NEEDS MATHIAS
  // CONFIRMATION — keep centralized so one edit updates every placement.
  googleRating: '5.0',
  googleReviewCount: '120+',
};

export const footerColumns = [
  {
    title: 'Palvelut',
    links: [
      { label: 'Klassinen hieronta', href: '/palvelut/hieronta' },
      { label: 'Kuumakivi- ja klassinen hieronta', href: '/palvelut/kuumakivihieronta' },
      { label: 'Purentalihashieronta', href: '/palvelut/purentalihashieronta' },
      { label: 'Faskiarautakäsittely', href: '/palvelut/faskiarautakasittely' },
    ],
  },
  {
    title: 'Yritys',
    links: [
      { label: 'Tutustu tiimiin', href: '/#tiimi' },
      { label: 'Asiakkaiden kokemuksia', href: '/asiakkaiden-kokemuksia' },
      { label: 'Usein kysyttyä', href: '/usein-kysyttya' },
      { label: 'Verkkokauppa', href: '/verkkokauppa' },
    ],
  },
  {
    title: 'Yhteystiedot',
    links: [
      { label: '040 833 8512', href: 'tel:+358408338512' },
      { label: 'info.klaukkala@memassage.fi', href: 'mailto:info.klaukkala@memassage.fi' },
      { label: 'Lepsämäntie 1, 2 krs, Klaukkala', href: '/toimipisteet/klaukkala' },
      { label: 'Rantakatu 11, Vaasa', href: '/toimipisteet/vaasa' },
    ],
  },
];

export const footerMeta = {
  // Union of payment methods shown on memassage.fi (location pages) and the
  // previous project copy. NEEDS MATHIAS CONFIRMATION (esp. MobilePay and
  // invoicing) — keep centralized in translations via footer.paymentMethods.
  paymentMethods: 'Maksutavat: Käteinen, kortti, MobilePay, ePassi, Edenred, Smartum ja laskutus',
  copyright: 'ME massage. Kaikki oikeudet pidätetään.',
};

// Global header navigation data (shared Header component).
export const navigationInfo = {
  logo: '/assets/me_logo.png',
  backgroundColor: '#152238',
  extraLinks: [
    { label: 'Asiakkaiden kokemuksia', href: '/asiakkaiden-kokemuksia', key: 'reviews' },
    { label: 'Usein kysyttyä', href: '/usein-kysyttya', key: 'faq' },
  ],
  ctaButton: { label: 'Varaa aika', href: 'https://memassage.fi/ajanvaraus' },
};
