import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLang } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { shopAssets } from '@/data/shop';

export function ShopPage() {
  const { tStr } = useLang();
  const t = (key: string) => tStr(`shop.${key}`);

  const cards = [
    {
      image: shopAssets.giftCardImage,
      imageAlt: 'ME massage lahjakortti',
      title: t('giftTitle'),
      text: t('giftText'),
      meta: t('giftFrom'),
      cta: t('giftCta'),
      href: '/verkkokauppa/lahjakortit',
    },
    {
      image: shopAssets.seriesCardImage,
      imageAlt: 'ME massage sarjakortti',
      title: t('seriesTitle'),
      text: t('seriesText'),
      meta: `${t('visits3')} · ${t('visits6')} · ${t('visits12')}`,
      cta: t('seriesCta'),
      href: '/verkkokauppa/sarjakortit',
    },
  ];

  const steps = [
    { title: t('step1Title'), text: t('step1Text') },
    { title: t('step2Title'), text: t('step2Text') },
    { title: t('step3Title'), text: t('step3Text') },
  ];

  const faqs = [
    { q: t('faq1q'), a: t('faq1a') },
    { q: t('faq2q'), a: t('faq2a') },
    { q: t('faq3q'), a: t('faq3a') },
    { q: t('faq4q'), a: t('faq4a') },
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

      {/* Hero */}
      <section className="bg-[#F7F5F2] px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center py-16 md:py-0 md:min-h-[560px]">
          <ScrollReveal>
            <div className="text-center md:text-left">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{t('heroEyebrow')}</p>
              <h1 className="font-cormorant text-[34px] md:text-[44px] text-[#152238] leading-[1.15] mb-5">{t('heroTitle')}</h1>
              <p className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.7] max-w-[420px] mx-auto md:mx-0 mb-8">{t('heroText')}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-6">
                <Link
                  to="/verkkokauppa/lahjakortit"
                  className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide whitespace-nowrap bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300"
                >
                  {t('heroCtaGift')}
                </Link>
                <Link
                  to="/verkkokauppa/sarjakortit"
                  className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide whitespace-nowrap text-[#152238] border border-[#152238]/30 hover:bg-[#152238]/5 transition-colors duration-300"
                >
                  {t('heroCtaSeries')}
                </Link>
              </div>
              <p className="font-inter text-[12px] text-[#5A6A7A] tracking-wide">{t('heroTrust')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative max-w-[520px] mx-auto w-full pb-10">
              <img
                src={shopAssets.seriesCardImage}
                alt="ME massage sarjakortti"
                className="absolute right-0 top-6 w-[72%] rounded-lg shadow-[0_12px_40px_rgba(21,34,56,0.18)] rotate-[2deg]"
              />
              <img
                src={shopAssets.giftCardImage}
                alt="ME massage lahjakortti"
                className="relative w-[82%] rounded-lg shadow-[0_16px_48px_rgba(21,34,56,0.22)] -rotate-[2deg]"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Choose your option */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#152238] leading-[1.25] mb-10 md:mb-14 text-center">{t('chooseTitle')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {cards.map((card, i) => (
              <ScrollReveal key={card.title} delay={0.05 + i * 0.08} className="h-full">
                <Link
                  to={card.href}
                  className="group block h-full rounded-xl border border-[#E2E8F0]/60 bg-[#F7F5F2] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(21,34,56,0.10)]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-full aspect-[1586/992] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="font-cormorant text-[24px] md:text-[26px] text-[#152238] leading-[1.2] mb-3">{card.title}</h3>
                    <p className="font-inter text-[14px] text-[#1F2937] leading-[1.7] mb-4">{card.text}</p>
                    <p className="font-inter text-[12px] text-[#5A6A7A] tracking-wide mb-5">{card.meta}</p>
                    <span className="font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 group-hover:decoration-[#152238]/70 transition-colors duration-300">
                      {card.cta}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How the digital card works */}
      <section className="bg-[#F7F5F2] py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-10 md:mb-12 text-center">{t('stepsTitle')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={0.05 + i * 0.06}>
                <p className="font-cormorant text-[28px] font-semibold text-[#152238]/25 leading-none mb-3">{i + 1}.</p>
                <h3 className="font-inter text-[14px] font-semibold text-[#152238] mb-2">{step.title}</h3>
                <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7]">{step.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Shop FAQ */}
      <section className="bg-white py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[860px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-10 text-center">{t('faqTitle')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={0.05 + i * 0.05}>
                <h3 className="font-inter text-[14px] font-semibold text-[#152238] mb-2">{faq.q}</h3>
                <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7]">{faq.a}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Shop final CTA */}
      <section className="bg-[#152238] py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[520px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#FFFFFF] leading-[1.25] mb-4">{t('finalGiftTitle')}</h2>
            <p className="font-inter text-[15px] text-white/80 leading-[1.6] mb-10 max-w-[360px] mx-auto">{t('finalGiftText')}</p>
            <Link
              to="/verkkokauppa/lahjakortit"
              className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#F6F8FB] text-[#152238] border border-[#152238]/15 shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:bg-white hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              {t('finalGiftCta')}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
