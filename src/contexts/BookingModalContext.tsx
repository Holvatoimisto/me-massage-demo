import { useCallback, useRef, useState } from 'react';
import { BookingLocationModal } from '@/components/BookingLocationModal';
import { BookingModalContext, type BookingModalOptions } from '@/contexts/bookingModal';

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
