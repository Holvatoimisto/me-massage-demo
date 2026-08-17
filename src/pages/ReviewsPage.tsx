import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Star } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { ReviewCard, type ReviewCardData } from '@/components/ReviewCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { locations } from '@/data/locations';
import { serviceOverviews } from '@/data/services';
import { businessInfo } from '@/data/site';

export function ReviewsPage() {
  const { tStr, tArr } = useLang();
  const t = (key: string) => tStr(`pages.reviews.${key}`);

  // Genuine reviews from the shared translation pool. Presentation is kept
  // separate from data so a Google Reviews feed can replace the source later.
  const reviews = tArr<ReviewCardData>('reviews.items');

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

      {/* Trust summary */}
      <section className="bg-white pt-14 md:pt-16 pb-4 px-6 md:px-12">
        <div className="max-w-[480px] mx-auto text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-1.5 mb-3 text-[#152238]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={18} fill="currentColor" strokeWidth={1.5} />
              ))}
            </div>
            <p className="font-cormorant text-[40px] md:text-[48px] font-semibold text-[#152238] leading-none mb-2">{businessInfo.googleRating}</p>
            <p className="font-inter text-[14px] text-[#1F2937] mb-1">{businessInfo.googleReviewCount} {t('ratingCount')}</p>
            <p className="font-inter text-[12px] text-[#5A6A7A] tracking-wide mb-5">{t('ratingSource')}</p>
            <a
              href={businessInfo.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 hover:decoration-[#152238]/70 transition-colors duration-300"
            >
              {t('googleLink')}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.name} delay={0.05 + (i % 3) * 0.06} className="h-full">
                <ReviewCard review={review} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service bridge */}
      <section className="bg-white pb-14 md:pb-20 px-6 md:px-12">
        <div className="max-w-[820px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-4">{t('servicesHeading')}</h2>
              <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.7] max-w-[420px] mx-auto">{t('servicesSupport')}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 max-w-[640px] mx-auto">
            {serviceOverviews.map((service, i) => (
              <ScrollReveal key={service.key} delay={0.05 + (i % 2) * 0.06}>
                <Link
                  to={service.href}
                  className="group flex items-baseline justify-between gap-4 border-t border-[#E2E8F0] py-4"
                >
                  <span className="font-inter text-[14px] font-semibold text-[#152238]">
                    {tStr(`servicePages.${service.key}.title`)}
                  </span>
                  <ArrowRight size={14} strokeWidth={1.5} className="shrink-0 text-[#5A6A7A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#152238]" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="border-t border-[#E2E8F0] max-w-[640px] mx-auto" />
        </div>
      </section>

      {/* Location bridge */}
      <section className="bg-[#F7F5F2] py-14 md:py-16 px-6 md:px-12">
        <div className="max-w-[820px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-4">{t('locationsHeading')}</h2>
              <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.7] max-w-[420px] mx-auto">{t('locationsSupport')}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {locations.map((location, i) => (
              <ScrollReveal key={location.slug} delay={0.05 + i * 0.08} className="h-full">
                <Link
                  to={`/toimipisteet/${location.slug}`}
                  className="group block bg-white rounded-xl border border-[#E2E8F0]/60 p-7 h-full transition-colors duration-300 hover:border-[#152238]/25"
                >
                  <h3 className="font-cormorant text-[22px] text-[#152238] leading-[1.2] mb-2">{location.name}</h3>
                  <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.6] mb-4">{location.address}</p>
                  <span className="font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 group-hover:decoration-[#152238]/70 transition-colors duration-300">
                    {tStr(`locations.cta${location.slug === 'klaukkala' ? 'Klaukkala' : 'Vaasa'}`)}
                  </span>
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
