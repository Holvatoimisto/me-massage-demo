import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { locations } from '@/data/locations';

interface BookingLocationModalProps {
  open: boolean;
  onClose: () => void;
  /** Element that opened the modal — focus is returned here on close. */
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

/**
 * Shared two-step booking dialog: general "Varaa aika" CTAs open this modal,
 * the visitor picks a location and is routed to that location's Ajas booking
 * URL from src/data/locations.ts (single source of truth).
 */
export function BookingLocationModal({ open, onClose, triggerRef }: BookingLocationModalProps) {
  const { tStr } = useLang();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLAnchorElement>(null);

  // Move focus into the dialog on open; restore it to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    firstButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      trigger?.focus();
    };
  }, [open, triggerRef]);

  // Escape + a minimal focus trap.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#152238]/60 px-5"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-[380px] bg-[#F7F5F2] rounded-xl border border-[#152238]/10 shadow-[0_24px_64px_rgba(0,0,0,0.3)] px-7 py-8 md:px-9 md:py-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label={tStr('bookingModal.close')}
              className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full text-[#5A6A7A] hover:text-[#152238] hover:bg-[#152238]/[0.06] transition-colors duration-200 cursor-pointer bg-transparent border-none"
            >
              <X size={17} strokeWidth={1.5} />
            </button>

            <h2
              id="booking-modal-title"
              className="font-cormorant text-[24px] md:text-[26px] text-[#152238] leading-[1.25] mb-2"
            >
              {tStr('bookingModal.title')}
            </h2>
            <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.6] mb-7">
              {tStr('bookingModal.support')}
            </p>

            <div className="flex flex-col gap-3">
              {locations.map((loc, i) => (
                <a
                  key={loc.slug}
                  ref={i === 0 ? firstButtonRef : undefined}
                  href={loc.bookingUrl}
                  className="inline-flex w-full min-h-[52px] items-center justify-center px-6 py-3 rounded-lg font-inter text-[15px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#152238]/60 transition-colors duration-300"
                >
                  {tStr(`bookingModal.${loc.slug}`)}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
