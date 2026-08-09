// Service metadata for the Palvelut overview page. Texts come from the
// `servicePages` translations; pricing/durations from src/data/pricing.ts.
export interface ServiceOverview {
  /** Translation key under `servicePages`. */
  key: 'classic' | 'hotStone' | 'jaw' | 'iastm';
  /** Key of the matching tab in src/data/pricing.ts. */
  pricingKey: 'classic' | 'hotStone' | 'jaw' | 'iastm';
  href: string;
  image: string;
}

export const serviceOverviews: ServiceOverview[] = [
  { key: 'classic', pricingKey: 'classic', href: '/palvelut/hieronta', image: '/assets/me_service_classic.png' },
  { key: 'hotStone', pricingKey: 'hotStone', href: '/palvelut/kuumakivihieronta', image: '/assets/me_service_hot_stone.png' },
  { key: 'jaw', pricingKey: 'jaw', href: '/palvelut/purentalihashieronta', image: '/assets/me_service_jaw.png' },
  { key: 'iastm', pricingKey: 'iastm', href: '/palvelut/faskiarautakasittely', image: '/assets/me_service_iastm.png' },
];
