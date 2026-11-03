// Service metadata for the Palvelut overview page. Texts come from the
// `servicePages` translations; pricing/durations from src/data/pricing.ts.
export interface ServiceOverview {
  /** Translation key under `servicePages`. */
  key: 'classic' | 'hotStone' | 'jaw' | 'iastm';
  /** Key of the matching tab in src/data/pricing.ts. */
  pricingKey: 'classic' | 'hotStone' | 'jaw' | 'iastm';
  href: string;
  image: string;
  /**
   * Image presentation, mirroring the homepage service cards: `contain` puts
   * the transparent PNG on a white background, `fillScale`/`fillOrigin` crop
   * it to the slot, `position` sets object-position for cover images.
   */
  contain?: boolean;
  fillScale?: number;
  fillOrigin?: string;
  position?: string;
}

export const serviceOverviews: ServiceOverview[] = [
  { key: 'classic', pricingKey: 'classic', href: '/palvelut/hieronta', image: '/assets/klassinen-hieronta-kuva-ilman-taustaa.png', contain: true, fillScale: 1.53, fillOrigin: 'center 30%' },
  { key: 'hotStone', pricingKey: 'hotStone', href: '/palvelut/kuumakivihieronta', image: '/assets/kuuma-kivi-mathias.png', contain: true, fillScale: 1.87, fillOrigin: '60% 100%' },
  { key: 'jaw', pricingKey: 'jaw', href: '/palvelut/purentalihashieronta', image: '/assets/purenta-lihas-hieronta-kuva.png' },
  { key: 'iastm', pricingKey: 'iastm', href: '/palvelut/faskiarautakasittely', image: '/assets/mathias-fascia-hoito.png', contain: true, fillScale: 1.25, fillOrigin: 'center bottom' },
];
