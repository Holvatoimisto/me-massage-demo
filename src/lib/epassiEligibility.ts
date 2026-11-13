import type { CartItem } from '@/contexts/cart';

/**
 * UX-only eligibility hint for a future payment UI.
 * Final Epassi eligibility MUST be revalidated server-side in WooCommerce.
 * Frontend eligibility is never authoritative.
 */
export function isCartPotentiallyEpassiEligible(items: CartItem[]): boolean {
  return items.length > 0 && items.every((item) => item.recipientType === 'self');
}
