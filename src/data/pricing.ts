// Centralized pricing data shared by the homepage pricing section and the
// dedicated Hinnasto page. Prices verified against memassage.fi/hinnasto.
export interface PricingItem {
  duration: string;
  price: string;
  popular?: boolean;
  normalPrice?: string;
  discount?: string;
}

export interface PricingTab {
  key: 'classic' | 'hotStone' | 'jaw' | 'iastm' | 'giftCards' | 'seriesCards';
  label: string;
  description: string;
  cta?: 'cart';
  shopUrl?: string;
  items: PricingItem[];
}

export const pricingTabs: PricingTab[] = [
  {
    key: 'classic',
    label: 'Klassinen hieronta',
    description: 'Perinteinen hieronta lihaskireyksiin, palautumiseen ja rentoutumiseen. Hoidon voimakkuus ja käsiteltävät alueet sovitetaan aina tarpeidesi mukaan.',
    items: [
      { duration: '20 min', price: '35' },
      { duration: '50 min', price: '60', popular: true },
      { duration: '80 min', price: '75' },
      { duration: '110 min', price: '95' },
    ],
  },
  {
    key: 'hotStone',
    label: 'Kuumakivi- ja klassinen hieronta',
    description: 'Lämpimien kivien avulla tehtävä hieronta, joka rentouttaa syvällä tasolla ja lievittää lihaskireyksiä.',
    items: [
      { duration: '50 min', price: '70' },
      { duration: '80 min', price: '85' },
    ],
  },
  {
    key: 'jaw',
    label: 'Purentalihashieronta',
    description: 'Purentalihasten, leuan ja kasvojen alueen käsittelyä jännityksen, kireyden ja kuormituksen helpottamiseen.',
    items: [
      { duration: '50 min', price: '70' },
    ],
  },
  {
    key: 'iastm',
    label: 'Faskiarautakäsittely',
    description: 'Faskiarautaa hyödyntävä käsittely lihaskireyksiin ja pehmytkudosten liikkuvuuden tukemiseen.',
    items: [
      { duration: '20 min', price: '50' },
      { duration: '50 min', price: '75' },
      { duration: '80 min', price: '95' },
      { duration: '110 min', price: '110' },
    ],
  },
  {
    key: 'giftCards',
    label: 'Lahjakortit',
    description: 'Lahjakortit kaikkiin hoitoihin. Saatavilla myös avoin lahjakortti, johon voit valita summan itse.',
    cta: 'cart',
    shopUrl: '/verkkokauppa/lahjakortit',
    items: [
      { duration: 'Klassinen hieronta 50 min', price: '60', popular: true },
      { duration: 'Kuumakivi- ja klassinen hieronta 50 min', price: '70' },
      { duration: 'Purentalihashieronta 50 min', price: '70' },
      { duration: 'Faskiarautakäsittely 50 min', price: '75' },
    ],
  },
  {
    key: 'seriesCards',
    label: 'Sarjakortit',
    description: 'Useamman hoitokerran sarjakortit kaikkiin hoitoihin. Mitä useampi hoitokerta, sitä enemmän säästät.',
    cta: 'cart',
    shopUrl: '/verkkokauppa/sarjakortit',
    items: [
      { duration: '3 x 50 min Klassinen hieronta', price: '160', normalPrice: '180', discount: '−10 %' },
      { duration: '6 x 50 min Klassinen hieronta', price: '300', normalPrice: '360', discount: '−15 %' },
      { duration: '12 x 50 min Klassinen hieronta', price: '575', normalPrice: '720', discount: '−20 %' },
    ],
  },
];

// Visual grouping of the pricing category buttons: three columns, two buttons each.
export const pricingTabGroups: PricingTab['key'][][] = [
  ['classic', 'iastm'],
  ['hotStone', 'jaw'],
  ['giftCards', 'seriesCards'],
];
