import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

/**
 * Cart drawer — right-side panel on desktop, full-width bottom sheet on
 * mobile. Checkout is a placeholder until the WooCommerce integration is
 * decided; the layout and behavior are final.
 */
export function CartDrawer() {
  const { tStr } = useLang();
  const { items, total, isOpen, closeCart, removeItem, setQty } = useCart();
  const t = (key: string) => tStr(`shop.${key}`);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#152238]/50"
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed z-[61] bg-white shadow-[0_8px_40px_rgba(21,34,56,0.25)] flex flex-col
              inset-x-0 bottom-0 top-auto max-h-[85dvh] rounded-t-2xl
              md:inset-y-0 md:right-0 md:left-auto md:top-0 md:bottom-0 md:max-h-none md:w-[420px] md:rounded-none"
            role="dialog"
            aria-label={t('cartTitle')}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
              <h2 className="font-cormorant text-[24px] text-[#152238] leading-[1.2]">{t('cartTitle')}</h2>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center rounded-full text-[#5A6A7A] hover:text-[#152238] hover:bg-[#152238]/5 transition-colors cursor-pointer bg-transparent border-none"
                aria-label={t('cartClose')}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <p className="font-inter text-[14px] text-[#5A6A7A] text-center py-10">{t('cartEmpty')}</p>
              ) : (
                <ul className="flex flex-col divide-y divide-[#E2E8F0]/70">
                  {items.map((item) => (
                    <li key={item.lineId} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-1">{item.label}</p>
                          {item.details.map((line, i) => (
                            <p key={i} className={`font-inter text-[13px] leading-[1.55] ${i === 0 ? 'font-semibold text-[#152238]' : 'text-[#5A6A7A]'}`}>
                              {line}
                            </p>
                          ))}
                        </div>
                        <p className="font-cormorant text-[20px] font-semibold text-[#152238] whitespace-nowrap">{item.price * item.qty} &euro;</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-[#E2E8F0] rounded-lg overflow-hidden">
                          <button
                            onClick={() => setQty(item.lineId, item.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#152238] hover:bg-[#152238]/5 transition-colors cursor-pointer bg-transparent border-none"
                            aria-label="−"
                          >
                            <Minus size={13} strokeWidth={1.5} />
                          </button>
                          <span className="w-8 text-center font-inter text-[13px] font-semibold text-[#152238]">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.lineId, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#152238] hover:bg-[#152238]/5 transition-colors cursor-pointer bg-transparent border-none"
                            aria-label="+"
                          >
                            <Plus size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.lineId)}
                          className="font-inter text-[12px] text-[#5A6A7A] hover:text-[#152238] underline underline-offset-4 decoration-[#152238]/25 hover:decoration-[#152238]/70 transition-colors cursor-pointer bg-transparent border-none"
                        >
                          {t('cartRemove')}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#E2E8F0] px-6 py-5">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-inter text-[14px] font-semibold text-[#152238]">{t('cartTotal')}</span>
                  <span className="font-cormorant text-[26px] font-semibold text-[#152238]">{total} &euro;</span>
                </div>
                <p className="font-inter text-[12px] text-[#5A6A7A] mb-4">{t('cartDelivery')}</p>
                {/* Placeholder: wired to the real checkout after the WooCommerce decision. */}
                <button
                  type="button"
                  className="inline-flex w-full min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300 cursor-pointer"
                >
                  {t('cartCheckout')}
                </button>
                <button
                  onClick={closeCart}
                  className="inline-flex w-full min-h-[44px] items-center justify-center font-inter text-[13px] font-semibold text-[#152238] hover:text-[#1E3A5F] transition-colors cursor-pointer bg-transparent border-none mt-1"
                >
                  {t('cartContinue')}
                </button>
                <p className="font-inter text-[11px] text-[#5A6A7A]/70 text-center mt-2">{t('cartNote')}</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
