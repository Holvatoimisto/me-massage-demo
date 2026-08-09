import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Phone } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { serviceOverviews } from '@/data/services';
import { pricingTabs } from '@/data/pricing';
import { businessInfo } from '@/data/site';

export function PalvelutPage() {
  const { tStr } = useLang();
  const t = (key: string) => tStr(`pages.palvelut.${key}`);

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

      {/* Service overview */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-10 md:gap-y-14">
            {serviceOverviews.map((service, i) => {
              const tab = pricingTabs.find((pt) => pt.key === service.pricingKey);
              const durations = tab ? tab.items.map((item) => item.duration).join(' / ') : '';
              const minPrice = tab ? Math.min(...tab.items.map((item) => Number(item.price))) : null;
              return (
                <ScrollReveal key={service.key} delay={0.05 + (i % 2) * 0.08} className="h-full">
                  <article className="h-full flex flex-col">
                    <Link to={service.href} className="block overflow-hidden rounded-lg mb-6 group">
                      <img
                        src={service.image}
                        alt={tStr(`servicePages.${service.key}.title`)}
                        className="w-full aspect-[16/10] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </Link>
                    <h2 className="font-cormorant text-[24px] md:text-[26px] text-[#152238] leading-[1.2] mb-2">
                      {tStr(`servicePages.${service.key}.title`)}
                    </h2>
                    <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.6] mb-4">
                      {tStr(`servicePages.${service.key}.subtitle`)}
                    </p>
                    <p className="font-inter text-[14px] text-[#1F2937] leading-[1.75] mb-5 flex-1">
                      {tStr(`servicePages.${service.key}.description`)}
                    </p>
                    <p className="font-inter text-[12px] text-[#5A6A7A] tracking-wide mb-5">
                      {t('durationsLabel')}: {durations}
                      {minPrice !== null && <> · {t('fromPrice').replace('{price}', String(minPrice))}</>}
                    </p>
                    <Link
                      to={service.href}
                      className="group inline-flex items-center gap-2 font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 hover:decoration-[#152238]/70 transition-colors duration-300"
                    >
                      {t('cta')}
                      <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Choosing support */}
      <section className="bg-[#F7F5F2] py-14 md:py-16 px-6 md:px-12">
        <div className="max-w-[560px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-4">{t('unsureHeading')}</h2>
            <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.7] mb-8">{t('unsureText').replace('{phone}', businessInfo.phone)}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={businessInfo.phoneLink}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300"
              >
                <Phone size={15} strokeWidth={1.5} />
                {businessInfo.phone}
              </a>
              <Link
                to="/usein-kysyttya"
                className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-[#152238] border border-[#152238]/30 hover:bg-[#152238]/5 transition-colors duration-300"
              >
                {t('faqLink')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalCtaSection />
      <Footer />
    </div>
  );
}
