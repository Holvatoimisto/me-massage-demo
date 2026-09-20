import { Helmet } from 'react-helmet-async';
import { useLang } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { ScrollReveal } from '@/components/ScrollReveal';

export function MeistaPage() {
  const { tStr } = useLang();
  const t = (key: string) => tStr(`pages.meista.${key}`);

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

      {/* Intro — who we are */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[680px] mx-auto text-center">
          <ScrollReveal>
            <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{t('introEyebrow')}</p>
            <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#152238] leading-[1.2] mb-5">{t('introHeading')}</h2>
            <p className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.75]">{t('introText')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Team — Mathias & Janina */}
      <section className="bg-[#F7F5F2] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <ScrollReveal>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/mathias-ja-janina.png"
                  alt={t('teamHeading')}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover object-center"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#152238] leading-[1.2] mb-5">{t('teamHeading')}</h2>
              <p className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.75]">{t('teamText')}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Story behind the ME name */}
      <section className="bg-[#152238] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[680px] mx-auto text-center">
          <ScrollReveal>
            <img
              src="/assets/me_logo.png"
              alt="ME massage"
              loading="lazy"
              className="w-24 md:w-28 h-auto mx-auto mb-8"
            />
            <h2 className="font-cormorant text-[28px] md:text-[34px] text-white leading-[1.2] mb-5">{t('storyHeading')}</h2>
            <p className="font-inter text-[14px] md:text-[15px] text-white/75 leading-[1.75]">{t('storyText')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Treatment philosophy */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[680px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#152238] leading-[1.2] mb-5">{t('philosophyHeading')}</h2>
            <p className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.75]">{t('philosophyText')}</p>
          </ScrollReveal>
        </div>
      </section>

      <FinalCtaSection />
      <Footer />
    </div>
  );
}
