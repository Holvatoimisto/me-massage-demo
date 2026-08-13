// Shop catalog for the new webshop frontend.
//
// The customer sees CHOICES (service → duration → visits); WooCommerce still
// sees PRODUCTS. Every selectable combination maps to the exact existing
// WooCommerce product ID on memassage.fi (verified via the WooCommerce Store
// API, see the webshop research report). These IDs are the bridge for the
// future cart/checkout integration — do not change them unless WooCommerce
// changes.

export type ShopServiceKey = 'classic' | 'hotStone' | 'jaw' | 'iastm';
export type SeriesVisits = 3 | 6 | 12;

export interface SeriesOption {
  visits: SeriesVisits;
  price: number;
  /** WooCommerce product ID for this visits × duration × service combo. */
  productId: number;
}

export interface ShopDurationOption {
  duration: string; // e.g. '50 min'
  price: number;
  /** WooCommerce product ID of the matching service gift card. */
  giftProductId: number;
  series: SeriesOption[];
}

export interface ShopService {
  key: ShopServiceKey;
  /** Finnish display label; other languages come from shop.serviceNames translations. */
  label: string;
  durations: ShopDurationOption[];
}

export const shopServices: ShopService[] = [
  {
    key: 'classic',
    label: 'Klassinen hieronta',
    durations: [
      {
        duration: '20 min', price: 35, giftProductId: 1245,
        series: [
          { visits: 3, price: 95, productId: 1309 },
          { visits: 6, price: 180, productId: 1316 },
          { visits: 12, price: 335, productId: 1323 },
        ],
      },
      {
        duration: '50 min', price: 60, giftProductId: 907,
        series: [
          { visits: 3, price: 160, productId: 1310 },
          { visits: 6, price: 300, productId: 1317 },
          { visits: 12, price: 575, productId: 1324 },
        ],
      },
      {
        duration: '80 min', price: 75, giftProductId: 1246,
        series: [
          { visits: 3, price: 200, productId: 1311 },
          { visits: 6, price: 380, productId: 1318 },
          { visits: 12, price: 720, productId: 1325 },
        ],
      },
      {
        duration: '110 min', price: 95, giftProductId: 1247,
        series: [
          { visits: 3, price: 255, productId: 1312 },
          { visits: 6, price: 485, productId: 1319 },
          { visits: 12, price: 910, productId: 1326 },
        ],
      },
    ],
  },
  {
    key: 'hotStone',
    label: 'Kuumakivi- ja klassinen hieronta',
    durations: [
      {
        duration: '50 min', price: 70, giftProductId: 1266,
        series: [
          { visits: 3, price: 190, productId: 1313 },
          { visits: 6, price: 355, productId: 1321 },
          { visits: 12, price: 670, productId: 1327 },
        ],
      },
      {
        duration: '80 min', price: 85, giftProductId: 1267,
        series: [
          { visits: 3, price: 230, productId: 1314 },
          { visits: 6, price: 430, productId: 1320 },
          { visits: 12, price: 810, productId: 1328 },
        ],
      },
    ],
  },
  {
    key: 'jaw',
    label: 'Purentalihashieronta',
    durations: [
      {
        duration: '50 min', price: 70, giftProductId: 1268,
        series: [
          { visits: 3, price: 190, productId: 1315 },
          { visits: 6, price: 355, productId: 1322 },
          { visits: 12, price: 670, productId: 1329 },
        ],
      },
    ],
  },
  {
    key: 'iastm',
    label: 'Faskiarautakäsittely',
    durations: [
      {
        duration: '20 min', price: 50, giftProductId: 1917,
        series: [
          { visits: 3, price: 135, productId: 1921 },
          { visits: 6, price: 255, productId: 1925 },
          { visits: 12, price: 480, productId: 1929 },
        ],
      },
      {
        duration: '50 min', price: 75, giftProductId: 1918,
        series: [
          { visits: 3, price: 200, productId: 1922 },
          { visits: 6, price: 380, productId: 1926 },
          { visits: 12, price: 720, productId: 1930 },
        ],
      },
      {
        duration: '80 min', price: 95, giftProductId: 1919,
        series: [
          { visits: 3, price: 255, productId: 1923 },
          { visits: 6, price: 485, productId: 1927 },
          { visits: 12, price: 910, productId: 1931 },
        ],
      },
      {
        duration: '110 min', price: 110, giftProductId: 1920,
        series: [
          { visits: 3, price: 295, productId: 1924 },
          { visits: 6, price: 560, productId: 1928 },
          { visits: 12, price: 1055, productId: 1932 },
        ],
      },
    ],
  },
];

/** Fixed-value open gift cards (no custom amount in the current WooCommerce). */
export interface OpenGiftCardValue {
  value: number;
  productId: number;
}

export const openGiftCardValues: OpenGiftCardValue[] = [
  { value: 100, productId: 1779 },
  { value: 150, productId: 1781 },
  { value: 200, productId: 1782 },
  { value: 250, productId: 1783 },
  { value: 300, productId: 1784 },
  { value: 350, productId: 1785 },
  { value: 400, productId: 1786 },
  { value: 450, productId: 1787 },
  { value: 500, productId: 1788 },
];

/** Approximate savings label per visits count (matches the live "Säästä ~N %" badges). */
export const seriesSavings: Record<SeriesVisits, number> = { 3: 10, 6: 15, 12: 20 };

export const shopAssets = {
  giftCardImage: '/assets/memassage_lahjakortti.png',
  seriesCardImage: '/assets/memassage-sarjakortti.png',
};
