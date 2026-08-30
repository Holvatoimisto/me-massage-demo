import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useBookingModal } from '@/contexts/BookingModalContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { pricingTabs, pricingTabGroups } from '@/data/pricing';

/**
 * Interactive pricing explorer shared by the homepage pricing section and
 * the dedicated Hinnasto page. Data comes from src/data/pricing.ts; labels
 * and descriptions from the `pricing.tabs` translations.
 */
export function PricingExplorer() {
  const { tStr } = useLang();
  const { openBookingModal } = useBookingModal();
  const [activePricingTab, setActivePricingTab] = useState(0);
  // Selected price per pricing tab; preselect the popular item of each tab.
  const [selectedPrices, setSelectedPrices] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    pricingTabs.forEach((tab, i) => {
      const idx = tab.items.findIndex((item) => item.popular);
      initial[i] = idx >= 0 ? idx : 0;
    });
    return initial;
  });

  const activeTab = pricingTabs[activePricingTab];

  return (
    <div>
      {/* Tab selector — 3 columns × 2 rows, grouped by label length */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-8">
          {pricingTabGroups.map((group, gi) => (
            <div key={gi} className="flex flex-col gap-2">
              {group.map((key) => {
                const i = pricingTabs.findIndex((t) => t.key === key);
                return (
                  <button
                    key={key}
                    onClick={() => setActivePricingTab(i)}
                    className={`px-4 py-2.5 rounded-lg font-inter text-[13px] font-medium tracking-wide text-center transition-all duration-200 cursor-pointer border ${
                      gi === 2 ? 'sm:px-8' : ''
                    } ${
                      i === activePricingTab
                        ? 'bg-[#152238] text-white border-[#152238] shadow-sm'
                        : 'bg-transparent text-[#152238] border-[#152238]/20 hover:bg-[#152238]/5'
                    }`}
                  >
                    {tStr(`pricing.tabs.${key}.label`)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Active tab content */}
      <ScrollReveal delay={0.15}>
        <div className="mb-8">
          <p className="font-inter text-[13px] text-[#5A6A7A] mb-4">{tStr(`pricing.tabs.${activeTab.key}.description`)}</p>
          <div className="flex flex-col gap-2.5">
            {activeTab.items.map((item, ii) => {
              const isSelected = selectedPrices[activePricingTab] === ii;
              const isPopular = !!item.popular;
              return (
                <button
                  key={ii}
                  onClick={() => setSelectedPrices({ ...selectedPrices, [activePricingTab]: ii })}
                  aria-pressed={isSelected}
                  className={`relative flex justify-between items-baseline rounded-lg px-4 md:px-5 py-4 text-left border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#152238] border-[#152238] shadow-[0_8px_24px_rgba(21,34,56,0.25)]'
                      : 'bg-transparent border-[#E2E8F0] hover:border-[#152238]/30 hover:bg-[#152238]/5'
                  }`}
                >
                  {isPopular && (
                    <span className={`absolute -top-2.5 left-4 px-2.5 py-[3px] rounded-full font-inter text-[10px] font-semibold uppercase tracking-[0.1em] ${
                      isSelected ? 'bg-white text-[#152238]' : 'bg-[#152238] text-white'
                    }`}>
                      {tStr('pricing.popular')}
                    </span>
                  )}
                  <span className="flex items-baseline gap-2">
                    <span className={`font-inter text-[15px] font-medium ${isSelected ? 'text-white' : 'text-[#152238]'}`}>{item.duration}</span>
                    {item.discount && (
                      <span className={`font-inter text-[12px] ${isSelected ? 'text-white/50' : 'text-[#5A6A7A]/60'}`}>
                        ({item.discount})
                      </span>
                    )}
                  </span>
                  <span className="flex items-baseline gap-1">
                    <span className={`font-cormorant text-[22px] font-semibold ${isSelected ? 'text-white' : 'text-[#152238]'}`}>{item.price}</span>
                    <span className={`font-inter text-[13px] ${isSelected ? 'text-white/60' : 'text-[#5A6A7A]/60'}`}>&euro;</span>
                    {item.normalPrice && (
                      <span className={`font-inter text-[12px] ml-1 ${isSelected ? 'text-white/50' : 'text-[#5A6A7A]/60'}`}>
                        ({tStr('pricing.normalPrice')} {item.normalPrice} &euro;)
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* CTAs */}
      <ScrollReveal delay={0.2}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {activeTab.cta === 'cart' && activeTab.shopUrl ? (
            // Shop tab: route to the matching internal webshop page.
            <Link
              to={activeTab.shopUrl}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide whitespace-nowrap bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300"
            >
              <ShoppingCart size={16} strokeWidth={1.5} />
              {tStr('pricing.gotoShop')}
            </Link>
          ) : (
            <button
              onClick={() => openBookingModal()}
              className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide whitespace-nowrap bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300 cursor-pointer border-none"
            >
              {tStr('pricing.bookNow')}
            </button>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
