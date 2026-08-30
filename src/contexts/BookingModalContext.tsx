import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { BookingLocationModal } from '@/components/BookingLocationModal';
import type { ServiceKey } from '@/data/ajas';

export interface BookingModalOptions {
  /** Questionnaire-guided booking: preselected service + recommended duration. */
  serviceKey?: ServiceKey;
  recommendedDuration?: number;
}

interface BookingModalContextValue {
  /** Open the shared booking dialog (generic location picker, or guided when options given). */
  openBookingModal: (options?: BookingModalOptions) => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<BookingModalOptions | undefined>(undefined);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openBookingModal = useCallback((opts?: BookingModalOptions) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setOptions(opts);
    setOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setOpen(false);
    setOptions(undefined);
  }, []);

  return (
    <BookingModalContext.Provider value={{ openBookingModal }}>
      {children}
      <BookingLocationModal open={open} onClose={closeBookingModal} triggerRef={triggerRef} options={options} />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): BookingModalContextValue {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error('useBookingModal must be used within BookingModalProvider');
  return ctx;
}
