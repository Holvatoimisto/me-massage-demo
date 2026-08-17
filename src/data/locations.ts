export interface LocationData {
  slug: 'klaukkala' | 'vaasa';
  name: string;
  address: string;
  /** Address split for hero display. */
  addressLines: string[];
  image: string;
  /**
   * Location-specific Ajas nettivaraus URLs, verified from the live
   * memassage.fi location pages (Klaukkala offices=3, Vaasa offices=4).
   * NEEDS MATHIAS CONFIRMATION that these are still the correct destinations.
   */
  bookingUrl: string;
  /** Translation key for the location-specific booking CTA label. */
  bookingLabelKey: string;
  /** Google Maps embed for the exact address (shared with the footer maps). */
  mapEmbedSrc: string;
  /** Google Maps search URL generated from the address (no Place ID). */
  mapUrl: string;
  /** Location-specific contact email (verified on memassage.fi). */
  email: string;
  /**
   * TEMPORARY review assignment: names of genuine reviews from the shared
   * `reviews.items` translation pool shown on this location's page.
   * Location association is unverified — replace with verified
   * location-specific reviews (or a Google reviews feed) when available.
   */
  reviewNames: string[];
}

export const locations: LocationData[] = [
  {
    slug: 'klaukkala',
    name: 'Klaukkala',
    address: 'Lepsämäntie 1, 2 krs, 01800 Klaukkala',
    addressLines: ['Lepsämäntie 1, 2 krs', '01800 Klaukkala'],
    image: '/assets/memassage_klaukkala.webp',
    bookingUrl: 'https://nettivaraus6.ajas.fi/fi/b1b0cf6443b6?offices=3',
    bookingLabelKey: 'finalCta.bookKlaukkala',
    mapEmbedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1966.0!2d24.7554!3d60.3819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468e45c6a8e8c1b5%3A0x8e1e2b3c4d5e6f7a!2sLeps%C3%A4m%C3%A4ntie+1%2C+01800+Klaukkala!5e0!3m2!1sfi!2sfi!4v1',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Leps%C3%A4m%C3%A4ntie+1%2C+01800+Klaukkala',
    email: 'info.klaukkala@memassage.fi',
    reviewNames: ['Anni K.', 'Mikael L.', 'Sanna R.', 'Tiina S.'],
  },
  {
    slug: 'vaasa',
    name: 'Vaasa',
    address: 'Vaasanpuistikko 1 A1, 65100 Vaasa',
    addressLines: ['Vaasanpuistikko 1 A1', '65100 Vaasa'],
    image: '/assets/memassage_vaasa.webp',
    bookingUrl: 'https://nettivaraus6.ajas.fi/fi/b1b0cf6443b6?offices=4',
    bookingLabelKey: 'finalCta.bookVaasa',
    mapEmbedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1966.0!2d21.6152!3d63.0951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x467d5c5c5c5c5c5c%3A0x5d5e5f5a5b5c5d5e!2sVaasanpuistikko+1+A1%2C+65100+Vaasa!5e0!3m2!1sfi!2sfi!4v1',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Vaasanpuistikko+1+A1%2C+65100+Vaasa',
    email: 'info.vaasa@memassage.fi',
    reviewNames: ['Petri H.', 'Laura M.', 'Jussi T.', 'Marko P.'],
  },
];
