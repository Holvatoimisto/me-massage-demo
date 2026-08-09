import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Phone, Star } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLang } from '@/contexts/LanguageContext';
import { locations, type LocationData } from '@/data/locations';
import { businessInfo } from '@/data/site';

type ReviewItem = {
  name: string;
  text: string;
  service: string;
};

/**
 * Presentation layer for a location's reviews. Receives plain review data,
 * so the temporary name-based assignment can later be replaced with verified
 * location-specific reviews or a Google reviews feed without redesigning
 * the section.
 */
function LocationReviews({ reviews, heading, support }: { reviews: ReviewItem[]; heading: string; support: string }) {
  return (
    <section className="bg-white py-16 md:py-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-14">
            <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#152238] leading-[1.25] mb-5">{heading}</h2>
            <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.7] max-w-[420px] mx-auto">{support}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.name} delay={0.05 + (i % 3) * 0.06} className="h-full">
              <div className="bg-[#F7F5F2] rounded-xl p-7 border border-[#E2E8F0]/60 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4 text-[#152238]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={13} fill="currentColor" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="font-inter text-[14px] text-[#1F2937] leading-[1.75] italic flex-1">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-5 pt-5 border-t border-[#152238]/[0.06]">
                  <p className="font-inter text-[14px] font-semibold text-[#152238]">{review.name}</p>
                  <p className="font-inter text-[11px] text-[#5A6A7A]">{review.service}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationPage({ location }: { location: LocationData }) {
  const { tStr, tArr } = useLang();
  const t = (key: string) => tStr(`locationPage.${location.slug}.${key}`);

  const allReviews = tArr<ReviewItem>('reviews.items');
  // TEMPORARY assignment — see reviewNames in src/data/locations.ts
  const locationReviews = allReviews.filter((r) => location.reviewNames.includes(r.name));

  const bookingLabel = tStr(location.bookingLabelKey);

  return (
    <div className="bg-white min-h-[100dvh]">
      <Helmet>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Helmet>

      <Header />
      {/* Header spacer */}
      <div className="h-[60px] md:h-[68px]" />

      {/* Location hero */}
      <section className="bg-[#F7F5F2] pt-10 md:pt-14 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-inter text-[13px] text-[#1F2937] hover:text-[#152238] transition-colors duration-300 mb-10 md:mb-14"
            >
              <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              {tStr('servicePages.backToHome')}
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <ScrollReveal>
              <div>
                <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{businessInfo.name.toUpperCase()}</p>
                <h1 className="font-cormorant text-[40px] md:text-[48px] lg:text-[56px] font-semibold text-[#152238] leading-[1.05] mb-5">{location.name}</h1>
                <p className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.7] mb-6 max-w-[380px]">{t('heroSupport')}</p>
                <p className="font-inter text-[14px] text-[#1F2937] leading-[1.7] mb-8 flex items-start gap-2">
                  <MapPin size={15} strokeWidth={1.5} className="shrink-0 mt-[3px] text-[#5A6A7A]" />
                  <span>
                    {location.addressLines.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </span>
                </p>
                <a
                  href={location.bookingUrl}
                  className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300"
                >
                  {bookingLabel}
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full aspect-[4/3] object-cover object-center"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Arrival + map */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#152238] leading-[1.25] mb-5">{tStr('locationPage.arrivalHeading')}</h2>
              <p className="font-inter text-[14px] md:text-[15px] text-[#1F2937] leading-[1.75] mb-6 max-w-[420px]">{t('arrivalText')}</p>
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 hover:decoration-[#152238]/70 transition-colors duration-300"
              >
                {tStr('locationPage.openInMaps')}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-lg overflow-hidden border border-[#E2E8F0]" style={{ filter: 'grayscale(25%) contrast(95%) brightness(95%)' }}>
              <iframe
                src={location.mapEmbedSrc}
                title={`ME massage ${location.name}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full aspect-[4/3] block"
                style={{ border: 0 }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services & booking */}
      <section className="bg-[#F7F5F2] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#152238] leading-[1.25] mb-5">{tStr('locationPage.bookingHeading')}</h2>
            <p className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.7] mb-10 max-w-[420px] mx-auto">{tStr('locationPage.bookingSupport')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={location.bookingUrl}
                className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300"
              >
                {bookingLabel}
              </a>
              <Link
                to="/"
                className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-[#152238] border border-[#152238]/30 hover:bg-[#152238]/5 transition-colors duration-300"
              >
                {tStr('hero.exploreServices')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Location reviews */}
      <LocationReviews
        reviews={locationReviews}
        heading={tStr('locationPage.reviewsHeading')}
        support={tStr('reviews.description')}
      />

      {/* Location final CTA */}
      <section className="bg-[#152238] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[520px] mx-auto text-center">
          <ScrollReveal>
            <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-4">{t('finalEyebrow')}</p>
            <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#FFFFFF] leading-[1.25] mb-4">{t('finalHeading')}</h2>
            <p className="font-inter text-[15px] text-white/80 leading-[1.6] mb-10 max-w-[360px] mx-auto">{t('finalSupport')}</p>
            <div className="flex flex-col items-center gap-3">
              <a
                href={location.bookingUrl}
                className="inline-flex w-full sm:w-auto min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-white text-[#152238] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-all duration-300"
              >
                {bookingLabel}
              </a>
              <a href={businessInfo.phoneLink} className="inline-flex items-center justify-center gap-2 font-inter text-[15px] font-medium text-white/90 tracking-wide no-underline hover:text-white transition-colors duration-300 py-2">
                <Phone size={15} strokeWidth={1.5} />
                {businessInfo.phone}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export function LocationPageTemplate() {
  const { tStr } = useLang();
  const { slug } = useParams<{ slug: string }>();
  const location = locations.find((l) => l.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!location) {
    return (
      <div className="bg-[#F7F5F2] min-h-[100dvh]">
        <Header />
        <div className="h-[60px] md:h-[68px]" />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="font-cormorant text-2xl text-[#152238] mb-4">ME massage</h1>
          <Link to="/" className="font-inter text-[13px] text-[#1F2937] hover:text-[#152238]">
            {tStr('servicePages.backToHome')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return <LocationPage location={location} />;
}
