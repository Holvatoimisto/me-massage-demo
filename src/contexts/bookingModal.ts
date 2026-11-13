import { createContext, useContext } from 'react';
import type { ServiceKey } from '@/data/ajas';

export interface BookingModalOptions {
  /** Questionnaire-guided booking: preselected service + recommended duration. */
  serviceKey?: ServiceKey;
  recommendedDuration?: number;
  /**
   * Pricing-explorer booking: the duration was already picked from the pricing
   * card, so the modal skips the duration step and opens directly on the
   * location picker. Questionnaire bookings omit this and keep duration first.
   */
  skipDurationStep?: boolean;
}

export interface BookingModalContextValue {
  /** Open the shared booking dialog (generic location picker, or guided when options given). */
  openBookingModal: (options?: BookingModalOptions) => void;
}

export const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function useBookingModal(): BookingModalContextValue {
  const context = useContext(BookingModalContext);
  if (!context) throw new Error('useBookingModal must be used within BookingModalProvider');
  return context;
}
