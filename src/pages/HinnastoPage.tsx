import { Helmet } from 'react-helmet-async';
import { useLang } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { PricingExplorer } from '@/components/PricingExplorer';
import { ScrollReveal } from '@/components/ScrollReveal';

export function HinnastoPage() {
  const { tStr } = useLang();
  const t = (key: string) => tStr(`pages.hinnasto.${key}`);

  const goodToKnow = [
    { heading: t('paymentHeading'), text: t('paymentText') },
    { heading: t('cancellationHeading'), text: t('cancellationText') },
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

      {/* Good to know */}
      <section className="bg-[#F7F5F2] py-14 md:py-16 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-10 text-center">{t('goodToKnow')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
            {goodToKnow.map((item, i) => (
              <ScrollReveal key={item.heading} delay={0.05 + i * 0.06}>
                <h3 className="font-inter text-[14px] font-semibold text-[#152238] mb-2">{item.heading}</h3>
                <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7]">{item.text}</p>
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
