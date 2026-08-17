import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { BookingLocationModal } from '@/components/BookingLocationModal';

interface BookingModalContextValue {
  /** Open the shared "Valitse toimipiste" booking dialog. */
  openBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openBookingModal = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => setOpen(false), []);

  return (
    <BookingModalContext.Provider value={{ openBookingModal }}>
      {children}
      <BookingLocationModal open={open} onClose={closeBookingModal} triggerRef={triggerRef} />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): BookingModalContextValue {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error('useBookingModal must be used within BookingModalProvider');
  return ctx;
}
