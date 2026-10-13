import { ScrollReveal } from '@/components/ScrollReveal';

/**
 * Compact page hero used on the dedicated subpages. Sits below the fixed
 * Header spacer and keeps the same editorial hierarchy across pages.
 * `logoSrc` is optional — pages without it render exactly as before.
 */
export function PageHero({ eyebrow, title, support, logoSrc, logoAlt }: { eyebrow: string; title: string; support: string; logoSrc?: string; logoAlt?: string }) {
  return (
    <section className="bg-[#F7F5F2] pt-14 md:pt-20 pb-14 md:pb-16 px-6 md:px-12">
      <div className="max-w-[640px] mx-auto text-center">
        <ScrollReveal>
          {logoSrc && (
            <img src={logoSrc} alt={logoAlt ?? ''} className="w-14 md:w-16 h-auto mx-auto mb-6" />
          )}
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{eyebrow}</p>
          <h1 className="font-cormorant text-[32px] md:text-[42px] text-[#152238] leading-[1.15] mb-5">{title}</h1>
          <p className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.7] max-w-[440px] mx-auto">{support}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
