import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { locations } from '@/data/locations';
import { ajasServiceDurations, buildAjasBookingUrl, type ServiceKey } from '@/data/ajas';
import type { BookingModalOptions } from '@/contexts/BookingModalContext';

interface BookingLocationModalProps {
  open: boolean;
  onClose: () => void;
  /** Element that opened the modal — focus is returned here on close. */
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  /** When set, the modal runs the questionnaire-guided flow: duration → location. */
  options?: BookingModalOptions;
}

/**
 * Shared two-step booking dialog.
 *
 * Generic mode: "Varaa aika" CTAs open a simple location picker routed to the
 * location's plain Ajas booking URL.
 *
 * Guided mode (questionnaire): the service is already decided, so the modal
 * first asks for duration (recommended one preselected) and then location,
 * and deep-links into Ajas with locale + office + service preselected.
 */
export function BookingLocationModal({ open, onClose, triggerRef, options }: BookingLocationModalProps) {
  const { tStr, lang } = useLang();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLElement>(null);

  const guided = !!options?.serviceKey;
  const serviceKey = options?.serviceKey as ServiceKey | undefined;
  const durationOptions = serviceKey ? ajasServiceDurations[serviceKey] : [];
  const initialDuration =
    options?.recommendedDuration && durationOptions.some((o) => o.duration === options.recommendedDuration)
      ? options.recommendedDuration
      : durationOptions[0]?.duration;

  const [step, setStep] = useState<'duration' | 'location'>('duration');
  const [duration, setDuration] = useState<number | undefined>(initialDuration);
  const [prevOpen, setPrevOpen] = useState(false);

  // Reset guided flow state whenever the dialog opens (set-during-render pattern).
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setStep('duration');
      setDuration(initialDuration);
    }
  }

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

  const locationHref = (officeId: number) =>
    guided && serviceKey && duration
      ? buildAjasBookingUrl({ locale: lang, officeId, serviceKey, duration })
      : buildAjasBookingUrl({ locale: lang, officeId });

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
            className="relative w-full max-w-[420px] max-h-[calc(100dvh-40px)] overflow-y-auto bg-[#F7F5F2] rounded-xl border border-[#152238]/10 shadow-[0_24px_64px_rgba(0,0,0,0.3)] px-7 py-8 md:px-9 md:py-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label={tStr('bookingModal.close')}
              className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full text-[#5A6A7A] hover:text-[#152238] hover:bg-[#152238]/[0.06] transition-colors duration-200 cursor-pointer bg-transparent border-none"
            >
              <X size={17} strokeWidth={1.5} />
            </button>

            {guided && step === 'duration' && serviceKey ? (
              <>
                <h2
                  id="booking-modal-title"
                  className="font-cormorant text-[24px] md:text-[26px] text-[#152238] leading-[1.25] mb-1.5"
                >
                  {tStr('bookingModal.durationTitle')}
                </h2>
                <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.6] mb-6">
                  {tStr(`shop.serviceNames.${serviceKey}`)}
                </p>
                <div className="flex flex-col gap-2.5 mb-6">
                  {durationOptions.map((opt, i) => {
                    const selected = duration === opt.duration;
                    const recommended = opt.duration === initialDuration;
                    return (
                      <button
                        key={opt.duration}
                        ref={i === 0 ? (firstButtonRef as React.RefObject<HTMLButtonElement>) : undefined}
                        onClick={() => setDuration(opt.duration)}
                        aria-pressed={selected}
                        className={`relative flex items-center justify-between w-full min-h-[52px] px-5 py-3 rounded-lg font-inter text-[15px] transition-all duration-200 cursor-pointer border ${
                          selected
                            ? 'bg-[#152238] text-white border-[#152238]'
                            : 'bg-white text-[#152238] border-[#94A3B8]/50 hover:border-[#152238]/40'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 font-semibold tracking-wide">
                          {selected && <Check size={15} strokeWidth={2.5} />}
                          {opt.duration} min
                          {recommended && (
                            <span className={`font-inter text-[10px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full ${selected ? 'bg-white/15 text-white' : 'bg-[#152238]/[0.07] text-[#152238]'}`}>
                              {tStr('bookingModal.recommended')}
                            </span>
                          )}
                        </span>
                        <span className={selected ? 'text-white/85' : 'text-[#5A6A7A]'}>{opt.price} €</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setStep('location')}
                  className="inline-flex w-full min-h-[52px] items-center justify-center px-6 py-3 rounded-lg font-inter text-[15px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300 cursor-pointer border-none"
                >
                  {tStr('bookingModal.continue')}
                </button>
              </>
            ) : (
              <>
                <h2
                  id="booking-modal-title"
                  className="font-cormorant text-[24px] md:text-[26px] text-[#152238] leading-[1.25] mb-2"
                >
                  {tStr('bookingModal.title')}
                </h2>
                <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.6] mb-7">
                  {guided && serviceKey
                    ? `${tStr(`shop.serviceNames.${serviceKey}`)} · ${duration} min`
                    : tStr('bookingModal.support')}
                </p>

                <div className="flex flex-col gap-3">
                  {locations.map((loc, i) => (
                    <a
                      key={loc.slug}
                      ref={i === 0 ? (firstButtonRef as React.RefObject<HTMLAnchorElement>) : undefined}
                      href={locationHref(loc.officeId)}
                      className="inline-flex w-full min-h-[52px] items-center justify-center px-6 py-3 rounded-lg font-inter text-[15px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#152238]/60 transition-colors duration-300"
                    >
                      {tStr(`bookingModal.${loc.slug}`)}
                    </a>
                  ))}
                </div>
                {guided && (
                  <button
                    onClick={() => setStep('duration')}
                    className="font-inter text-[13px] text-[#5A6A7A] hover:text-[#152238] transition-colors mt-5 cursor-pointer bg-transparent border-none"
                  >
                    {tStr('bookingModal.back')}
                  </button>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
