// Shared site-wide business facts, used by the homepage template and the
// global Footer so they stay in one place.
export const businessInfo = {
  name: 'ME massage',
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

// Phone contacts by location, shown in the global Footer. Mathias works at
// both locations; Janina is associated with Klaukkala.
export const locationPhoneContacts = [
  {
    location: 'Klaukkala',
    people: [
      { name: 'Mathias', phone: '040 833 8512', phoneLink: 'tel:+358408338512' },
      { name: 'Janina', phone: '045 127 2928', phoneLink: 'tel:+358451272928' },
    ],
  },
  {
    location: 'Vaasa',
    people: [
      { name: 'Mathias', phone: '040 833 8512', phoneLink: 'tel:+358408338512' },
    ],
  },
];

// Footer navigation metadata is language-neutral: labels render through
// translation keys (see Footer.tsx). Contact facts live in `locations` and
// `locationPhoneContacts`, not here.
export const footerColumns = [
  {
    titleKey: 'footer.services',
    links: [
      { labelKey: 'services.primary.classic.title', href: '/palvelut/hieronta' },
      { labelKey: 'services.primary.hotStone.title', href: '/palvelut/kuumakivihieronta' },
      { labelKey: 'services.jaw', href: '/palvelut/purentalihashieronta' },
      { labelKey: 'services.iastm', href: '/palvelut/faskiarautakasittely' },
    ],
  },
  {
    titleKey: 'footer.company',
    links: [
      { labelKey: 'footer.team', href: '/#tiimi' },
      { labelKey: 'footer.customerReviews', href: '/asiakkaiden-kokemuksia' },
      { labelKey: 'nav.faq', href: '/usein-kysyttya' },
      { labelKey: 'nav.webshop', href: '/verkkokauppa' },
    ],
  },
];

export const footerMeta = {
  // Union of payment methods shown on memassage.fi (location pages) and the
  // previous project copy. NEEDS MATHIAS CONFIRMATION (esp. MobilePay and
  // invoicing) — keep centralized in translations via footer.paymentMethods.
  paymentMethods: 'Maksutavat: Käteinen, kortti, MobilePay, ePassi, Edenred ja laskutus',
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
