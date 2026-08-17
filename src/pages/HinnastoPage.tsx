import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { PricingExplorer } from '@/components/PricingExplorer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { pricingTabs, type PricingTab } from '@/data/pricing';
import { serviceOverviews } from '@/data/services';

interface DurationGuideItem {
  duration: string;
  text: string;
  [key: string]: unknown;
}

const serviceTabs = pricingTabs.filter(
  (tab): tab is PricingTab & { key: 'classic' | 'hotStone' | 'jaw' | 'iastm' } =>
    tab.key === 'classic' || tab.key === 'hotStone' || tab.key === 'jaw' || tab.key === 'iastm'
);

export function HinnastoPage() {
  const { tStr, tArr } = useLang();
  const t = (key: string) => tStr(`pages.hinnasto.${key}`);

  const goodToKnow = [
    { heading: t('paymentHeading'), text: t('paymentText') },
    { heading: t('cancellationHeading'), text: t('cancellationText') },
    { heading: t('benefitsHeading'), text: t('benefitsText') },
    { heading: t('shopHeading'), text: t('shopText') },
  ];

  return (
    <div className="bg-white min-h-[100dvh]">
      <Helmet>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Helmet>

      <Header />
      {/* Header spacer */}
      <div className="h-[60px] md:h-[68px]" />

      <PageHero eyebrow={t('eyebrow')} title={t('headline')} support={t('supportText')} />

      {/* Pricing explorer */}
      <section className="bg-white py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <PricingExplorer />
        </div>
      </section>

      {/* How to choose the duration */}
      <section className="bg-[#F7F5F2] py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-cormorant text-[24px] md:text-[30px] text-[#152238] leading-[1.3] mb-4">{t('durationGuideHeading')}</h2>
              <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.7] max-w-[480px] mx-auto">{t('durationGuideText')}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-14 md:gap-y-12">
            {serviceTabs.map((tab, i) => {
              const guide = tArr<DurationGuideItem>(`servicePages.${tab.key}.durationGuide.items`);
              const overview = serviceOverviews.find((s) => s.pricingKey === tab.key);
              return (
                <ScrollReveal key={tab.key} delay={0.05 + (i % 2) * 0.06}>
                  <h3 className="font-cormorant text-[20px] md:text-[22px] text-[#152238] leading-[1.25] mb-5">
                    {tStr(`servicePages.${tab.key}.title`)}
                  </h3>
                  <div>
                    {tab.items.map((item) => {
                      const text = guide.find((g) => g.duration === item.duration)?.text;
                      return (
                        <div key={item.duration} className="border-t border-[#E2E8F0] py-4">
                          <div className="flex items-baseline justify-between gap-4 mb-1">
                            <span className="font-inter text-[14px] font-semibold text-[#152238]">{item.duration}</span>
                            <span className="font-inter text-[14px] text-[#5A6A7A]">{item.price} &euro;</span>
                          </div>
                          {text && (
                            <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.65]">{text}</p>
                          )}
                        </div>
                      );
                    })}
                    <div className="border-t border-[#E2E8F0]" />
                  </div>
                  {overview && (
                    <Link
                      to={overview.href}
                      className="group inline-flex items-center gap-2 mt-4 font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 hover:decoration-[#152238]/70 transition-colors duration-300"
                    >
                      {tStr('pages.palvelut.cta')}
                      <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Good to know */}
      <section className="bg-white py-14 md:py-16 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-10 text-center">{t('goodToKnow')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10 max-w-[760px] mx-auto">
            {goodToKnow.map((item, i) => (
              <ScrollReveal key={item.heading} delay={0.05 + i * 0.06}>
                <h3 className="font-inter text-[14px] font-semibold text-[#152238] mb-2">{item.heading}</h3>
                <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7]">{item.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gift & series card bridge to the webshop */}
      <section className="bg-[#F7F5F2] py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-10 text-center">{t('shopHeading')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {[
              { image: '/assets/memassage_lahjakortti.png', text: t('giftCardText'), cta: t('giftCardCta'), href: '/verkkokauppa/lahjakortit' },
              { image: '/assets/memassage-sarjakortti.png', text: t('seriesCardText'), cta: t('seriesCardCta'), href: '/verkkokauppa/sarjakortit' },
            ].map((card, i) => (
              <ScrollReveal key={card.href} delay={0.05 + i * 0.08} className="h-full">
                <Link
                  to={card.href}
                  className="group block bg-white rounded-xl border border-[#E2E8F0]/60 overflow-hidden h-full transition-colors duration-300 hover:border-[#152238]/25"
                >
                  <div className="overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.cta}
                      loading="lazy"
                      className="w-full aspect-[16/9] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.65] mb-4">{card.text}</p>
                    <span className="inline-flex items-center gap-2 font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 group-hover:decoration-[#152238]/70 transition-colors duration-300">
                      {card.cta}
                      <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection />
      <Footer />
    </div>
  );
}
