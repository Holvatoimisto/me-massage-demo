import { Phone } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { businessInfo } from '@/data/site';

/**
 * Compact final CTA for the dedicated subpages — same dark navy treatment,
 * two equal location booking buttons and trust line as the homepage Final
 * CTA, without the full-screen background image.
 */
export function FinalCtaSection() {
  const { tStr } = useLang();

  return (
    <section className="bg-[#152238] py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-[520px] mx-auto text-center">
        <ScrollReveal>
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-4">{tStr('finalCta.eyebrow')}</p>
          <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#FFFFFF] leading-[1.25] mb-4">{tStr('finalCta.headline')}</h2>
          <p className="font-inter text-[15px] text-white/80 leading-[1.6] mb-10 max-w-[360px] mx-auto">{tStr('finalCta.supportText')}</p>

          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-[480px]">
              {[tStr('finalCta.bookKlaukkala'), tStr('finalCta.bookVaasa')].map((label) => {
                const splitAt = label.lastIndexOf(' ');
                return (
                  <a
                    key={label}
                    href={businessInfo.bookingUrl}
                    className="inline-flex w-full sm:flex-1 min-h-[64px] flex-col items-center justify-center gap-[5px] px-6 py-3 rounded-lg bg-[#F6F8FB] border border-[#152238]/15 shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:bg-white hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 transition-all duration-300"
                  >
                    <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-[#5A6A7A] leading-none">
                      {label.slice(0, splitAt)}
                    </span>
                    <span className="font-inter text-[16px] font-semibold tracking-wide text-[#152238] leading-tight">
                      {label.slice(splitAt + 1)}
                    </span>
                  </a>
                );
              })}
            </div>
            <a href={businessInfo.phoneLink} className="inline-flex items-center justify-center gap-2 font-inter text-[15px] font-medium text-white/90 tracking-wide no-underline hover:text-white transition-colors duration-300 py-2">
              <Phone size={15} strokeWidth={1.5} />
              {businessInfo.phone}
            </a>
            <p className="font-inter text-[12px] text-white/80 tracking-wide">{tStr('finalCta.phoneSupport')}</p>
          </div>

          <span className="font-inter text-[12px] text-white/80 tracking-wide">{tStr('finalCta.trustLine')}</span>
        </ScrollReveal>
      </div>
    </section>
  );
}
