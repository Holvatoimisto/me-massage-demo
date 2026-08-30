import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp, Phone, Star } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { ReviewCard, type ReviewCardData } from '@/components/ReviewCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { locations, type LocationData } from '@/data/locations';
import { locationReviews, type LocationReviewsData } from '@/data/reviews';
import { teamAtLocation, type TeamMember } from '@/data/team';
import { buildAjasBookingUrl } from '@/data/ajas';
import { businessInfo } from '@/data/site';

const INITIAL_REVIEWS = 6;

/**
 * Highlighted review quotes attached to one therapist. Only reviews whose
 * text genuinely fits the therapist are passed in (see reviews.ts); an empty
 * list renders no quote area rather than implying unattributed quotes.
 */
function TherapistQuotes({ quotes }: { quotes: LocationReviewsData['reviews'] }) {
  if (quotes.length === 0) return null;
  return (
    <div className="mt-6 space-y-5">
      {quotes.map((quote) => (
        <blockquote key={quote.id} className="border-l-2 border-[#152238]/15 pl-5">
          <p className="font-inter text-[14px] text-[#1F2937] leading-[1.75] italic whitespace-pre-line">&ldquo;{quote.text}&rdquo;</p>
          <footer className="mt-2 font-inter text-[12px] text-[#5A6A7A]">
            — {quote.author}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}

/**
 * Editorial "people behind the experiences" block. Klaukkala shows Mathias
 * and Janina, Vaasa shows Mathias only (team.ts is the single source).
 */
function TherapistSection({ members, data }: { members: TeamMember[]; data: LocationReviewsData }) {
  const { tStr } = useLang();
  return (
    <div className="space-y-14 md:space-y-16">
      {members.map((member) => {
        const highlightIds = data.highlightedByTherapist[member.id] ?? [];
        const quotes = data.highlights.filter((review) => highlightIds.includes(review.id));
        return (
          <ScrollReveal key={member.id}>
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-7 md:gap-12 items-start">
              <div className="rounded-xl overflow-hidden bg-[#E2E8F0]/40 max-w-[320px] md:max-w-none">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
              </div>
              <div className="pt-1">
                <h3 className="font-cormorant text-[26px] md:text-[30px] text-[#152238] leading-[1.2] mb-1">{member.name}</h3>
                <p className="font-inter text-[12px] uppercase tracking-[0.1em] text-[#5A6A7A] mb-2">{tStr(member.titleKey)}</p>
                <TherapistQuotes quotes={quotes} />
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

export function ReviewsPage() {
  const { lang, tStr } = useLang();
  const t = (key: string) => tStr(`pages.reviews.${key}`);

  const [selectedSlug, setSelectedSlug] = useState<LocationData['slug']>('klaukkala');
  const [showAll, setShowAll] = useState(false);

  const location = locations.find((l) => l.slug === selectedSlug) ?? locations[0];
  const data: LocationReviewsData = locationReviews[selectedSlug];
  const therapists = teamAtLocation(selectedSlug);

  const visibleReviews = showAll ? data.reviews : data.reviews.slice(0, INITIAL_REVIEWS);
  const canExpand = data.reviews.length > INITIAL_REVIEWS;

  const selectLocation = (slug: LocationData['slug']) => {
    setSelectedSlug(slug);
    setShowAll(false);
  };

  const bookingUrl = buildAjasBookingUrl({ locale: lang, officeId: location.officeId });
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

      <PageHero eyebrow={t('eyebrow')} title={t('headline')} support={t('supportText')} />

      {/* Shared brand-level reputation — stays constant across locations */}
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

      {/* Location selector — only content below this section changes */}
      <section className="bg-white pt-14 md:pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#152238] leading-[1.25] mb-6">{t('selectorHeading')}</h2>
              <div
                role="tablist"
                aria-label={t('selectorHeading')}
                className="inline-flex w-full max-w-[400px] rounded-full border border-[#E2E8F0] bg-[#F7F5F2] p-1"
              >
                {locations.map((l) => {
                  const active = l.slug === selectedSlug;
                  return (
                    <button
                      key={l.slug}
                      role="tab"
                      aria-selected={active}
                      onClick={() => selectLocation(l.slug)}
                      className={`flex-1 min-h-[44px] px-6 rounded-full font-inter text-[14px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#152238]/60 ${
                        active
                          ? 'bg-[#152238] text-white font-semibold shadow-[0_2px_8px_rgba(21,34,56,0.25)]'
                          : 'text-[#5A6A7A] hover:text-[#152238] cursor-pointer'
                      }`}
                    >
                      {l.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Selected location reputation summary */}
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-14">
              <h3 className="font-cormorant text-[22px] md:text-[26px] text-[#152238] leading-[1.25] mb-4">
                {businessInfo.name} {location.name}
              </h3>
              <div className="flex items-center justify-center gap-1 mb-2 text-[#152238]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} fill="currentColor" strokeWidth={1.5} />
                ))}
              </div>
              <p className="font-inter text-[15px] text-[#1F2937] mb-1">
                <span className="font-semibold">{data.rating} / 5</span>
                {data.reviewCount !== undefined && (
                  <span className="text-[#5A6A7A]"> · {data.reviewCount} {t('ratingCount')}</span>
                )}
              </p>
              <p className="font-inter text-[12px] text-[#5A6A7A] tracking-wide mb-4">{t('ratingSource')}</p>
              <a
                href={location.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 hover:decoration-[#152238]/70 transition-colors duration-300"
              >
                {t('googleLink')}
              </a>
            </div>
          </ScrollReveal>

          {/* Location review collection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {visibleReviews.map((review, i) => {
              const card: ReviewCardData = { name: review.author, text: review.text, rating: review.rating };
              return (
                <ScrollReveal key={review.id} delay={0.05 + (i % 3) * 0.06} className="h-full">
                  <ReviewCard review={card} />
                </ScrollReveal>
              );
            })}
          </div>

          {canExpand && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="inline-flex items-center gap-2 font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 hover:decoration-[#152238]/70 transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#152238]/60 rounded-sm"
              >
                {showAll ? t('showLess') : t('showMore')}
                {showAll ? <ChevronUp size={14} strokeWidth={1.5} /> : <ChevronDown size={14} strokeWidth={1.5} />}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* People behind the experiences */}
      <section className="bg-[#F7F5F2] py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[860px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-14">
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#152238] leading-[1.25]">{t('peopleHeading')}</h2>
            </div>
          </ScrollReveal>
          <TherapistSection members={therapists} data={data} />
        </div>
      </section>

      {/* Location-specific final CTA — direct booking, no location modal */}
      <section className="bg-[#152238] py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[520px] mx-auto text-center">
          <ScrollReveal>
            <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-4">{tStr('finalCta.eyebrow')}</p>
            <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#FFFFFF] leading-[1.25] mb-4">{tStr('finalCta.headline')}</h2>
            <p className="font-inter text-[15px] text-white/80 leading-[1.6] mb-10 max-w-[360px] mx-auto">{tStr('finalCta.supportText')}</p>

            <div className="flex flex-col items-center gap-3 mb-8">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-[280px] min-h-[56px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[16px] font-semibold tracking-wide bg-[#F6F8FB] text-[#152238] border border-[#152238]/15 shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:bg-white hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 transition-all duration-300"
              >
                {bookingLabel}
              </a>
              <a href={businessInfo.phoneLink} className="inline-flex items-center justify-center gap-2 font-inter text-[15px] font-medium text-white/90 tracking-wide no-underline hover:text-white transition-colors duration-300 py-2">
                <Phone size={15} strokeWidth={1.5} />
                {businessInfo.phone}
              </a>
              <p className="font-inter text-[12px] text-white/80 tracking-wide">{tStr('finalCta.phoneSupport')}</p>
            </div>

            <span className="font-inter text-[12px] text-white/80 tracking-wide">
              {tStr('finalCta.trustLine', { rating: businessInfo.googleRating })}
            </span>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
