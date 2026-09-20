import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Plus,
  Minus,
  Star,
} from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useBookingModal } from '@/contexts/BookingModalContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PricingExplorer } from '@/components/PricingExplorer';
import { SymptomSurvey } from '@/components/SymptomSurvey';
import { businessInfo } from '@/data/site';
import { bookingGlassOnDarkClasses } from '@/lib/bookingCta';
import { locations } from '@/data/locations';

const templateData = {
  business: businessInfo,
  hero: {
    backgroundImage: '/assets/me_hero_new.png',
    backgroundImages: ['/assets/me_hero_new.png'],
    eyebrow: 'ME MASSAGE',
    headline: 'Ammattitaitoista hierontaa Klaukkalassa ja Vaasassa',
    subheadline: 'Klassinen hieronta, kuumakivi ja klassinen hieronta, purentalihashieronta ja faskiarautakäsittely. Koulutetut hierojat sinua varten.',
    ctaSecondary: { label: 'Tutustu palveluihin', href: '#palvelut' },
    stats: [
      { value: businessInfo.googleRating, label: 'Google-arvostelu' },
      { value: businessInfo.googleReviewCount, label: 'arvostelua' },
      { value: '', label: 'Koulutetut hierojat' },
    ],
  },
  services: {
    eyebrow: 'PALVELUT',
    headline: 'Hierontaa ja kehonhuoltoa',
    body: 'Valitse tarpeisiisi sopiva hoito. Kaikki hoidot räätälöidään yksilöllisesti.',
    reassurance: 'Etkö ole varma, mikä palvelu sopii sinulle? Soita 040 833 8512 ja kysy.',
    primaryServices: [
      {
        image: '/assets/klassinen-hieronta-kuva-ilman-taustaa.png',
        position: 'center center',
        contain: true,
        fillScale: 1.53,
        fillOrigin: 'center 30%',
        title: 'Klassinen hieronta',
        description: 'Perinteinen hieronta lihaskireyksiin ja rentoutumiseen. Voimakkuus räätälöidään aina asiakkaan tarpeiden mukaan.',
        linkText: 'Tutustu hierontaan',
        linkHref: '/palvelut/hieronta',
      },
      {
        image: '/assets/kuuma-kivi-mathias.png',
        position: 'center center',
        contain: true,
        fillScale: 1.87,
        fillOrigin: '60% 100%',
        title: 'Kuumakivi ja klassinen hieronta',
        description: 'Lämpimillä kivillä tehtävä rauhallinen hoito, joka auttaa rentoutumaan ja pehmentämään lihaskireyksiä.',
        linkText: 'Tutustu kuumakivi ja klassiseen hierontaan',
        linkHref: '/palvelut/kuumakivihieronta',
      },
    ],
    secondaryLabel: 'Myös saatavilla',
    secondaryServices: [
      { image: '/assets/purenta-lihas-hieronta-kuva.png', position: 'center center', title: 'Purentalihashieronta', titleKey: 'services.jaw', descKey: 'services.jawDesc', linkHref: '/palvelut/purentalihashieronta' },
      { image: '/assets/mathias-fascia-hoito.png', position: 'center 78%', title: 'Faskiarautakäsittely', titleKey: 'services.iastm', descKey: 'services.iastmDesc', linkHref: '/palvelut/faskiarautakasittely' },
      { image: '/assets/lahjakortti-taustalla.png', position: 'center center', contain: true, title: 'Lahja- ja sarjakortit', titleKey: 'services.giftCards', descKey: 'services.giftCardsDesc', linkHref: '/verkkokauppa' },
    ],
  },
  finalCta: {
    backgroundImage: '/assets/me_hero.jpg',
  },
};

function ScrollReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const getLocationCards = (tStr: (p: string) => string) => [
  {
    name: 'Klaukkala',
    address: 'Lepsämäntie 1, 2 krs, 01800 Klaukkala',
    image: locations[0].image,
    hoverImage: locations[0].hoverImage,
    description: tStr('locations.supportingCopy'),
    cta: tStr('locations.ctaKlaukkala'),
    href: '/toimipisteet/klaukkala',
  },
  {
    name: 'Vaasa',
    address: 'Rantakatu 11, 65100 Vaasa',
    image: locations[1].image,
    hoverImage: locations[1].hoverImage,
    description: tStr('locations.supportingCopy'),
    cta: tStr('locations.ctaVaasa'),
    href: '/toimipisteet/vaasa',
  },
];

export function ChiropractorTemplate() {
  const { lang, tStr, tArr } = useLang();
  const { openBookingModal } = useBookingModal();

  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [teamTransitioning, setTeamTransitioning] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);

  const handleTeamSelect = useCallback((index: number) => {
    if (index === activeTeamIndex || teamTransitioning) return;
    setTeamTransitioning(true);
    setTimeout(() => {
      setActiveTeamIndex(index);
      setTeamTransitioning(false);
    }, 350);
  }, [activeTeamIndex, teamTransitioning]);

  const prevReview = () => setReviewIndex((i) => (i === 0 ? translatedReviews.length - 1 : i - 1));
  const nextReview = () => setReviewIndex((i) => (i === translatedReviews.length - 1 ? 0 : i + 1));

  const teamMembers = [
    {
      name: 'Mathias Eklund',
      firstName: lang === 'sv' ? 'från Mathias' : lang === 'en' ? 'from Mathias' : 'Mathiakselta',
      title: tStr('team.mathias.title'),
      role: 'Hieroja',
      image: '/mathias-esittely-kuva-uusi.png',
      avatar: '/mathias-esittely-kuva-uusi.png',
      bio: tStr('team.mathias.bio'),
      testimonial: tStr('team.mathias.quote'),
    },
    {
      name: 'Janina Honkanen',
      firstName: lang === 'sv' ? 'från Janina' : lang === 'en' ? 'from Janina' : 'Janinalta',
      title: tStr('team.janina.title'),
      role: 'Hieroja',
      image: '/assets/me_janina.png',
      avatar: '/assets/me_janina.png',
      bio: tStr('team.janina.bio'),
      testimonial: tStr('team.janina.quote'),
    },
  ];
  const activeTeamMember = teamMembers[activeTeamIndex];
  const translatedReviews = tArr<{name: string; text: string; service: string}>('reviews.items');
  const visibleReviews = [
    translatedReviews[reviewIndex % translatedReviews.length],
    translatedReviews[(reviewIndex + 1) % translatedReviews.length],
    translatedReviews[(reviewIndex + 2) % translatedReviews.length],
  ];
  return (
    <div className="min-h-[100dvh] font-inter antialiased">
      {/* Navigation */}
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 scale-110" aria-hidden="true">
          <img
            src={templateData.hero.backgroundImages[0]}
            alt=""
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[#152238]/65" />
        {/* Local overlay behind the left content column: strongest at the left
            edge, faded out by ~60% width so the right side of the image keeps
            its current look. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,24,40,0.55)_0%,rgba(13,24,40,0.38)_32%,rgba(13,24,40,0)_60%)]" aria-hidden="true" />
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.03 }} />
        {/* Content column: left-aligned with the same grid line as the header
            container; centers vertically inside the viewport minus the fixed
            header, growing taller instead of sliding under it on short screens. */}
        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 md:px-10 min-[1200px]:pl-28 min-[1200px]:pr-12 flex flex-col items-start justify-center text-left min-h-[100dvh] pt-[80px] pb-10 md:pt-[88px] md:pb-12">
          {/* Content column's left edge shares the header logo's x anchor (same
              container + left padding), so the logo reads as the hero's brand
              marker. */}
          <div className="w-full max-w-[760px]">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-cormorant text-[38px] md:text-[50px] lg:text-[60px] font-semibold text-white leading-[1.08] mb-7 md:[@media(max-height:800px)]:mb-4 max-w-[720px]"
          >
            {tStr('hero.headline')}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-[14px] md:text-[16px] text-white/80 leading-[1.7] mb-11 md:[@media(max-height:800px)]:mb-6 max-w-[520px] lg:max-w-[860px] text-balance"
          >
            {tStr('hero.subheadline')}
          </motion.p>

          {/* CTA pair */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-11 md:[@media(max-height:800px)]:mb-6"
          >
            <button
              onClick={() => openBookingModal()}
              className={`inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide cursor-pointer bg-white text-[#152238] border border-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:bg-[#F3F0EB] hover:shadow-[0_8px_28px_rgba(0,0,0,0.32)] transition-all duration-300`}
            >
              {tStr('hero.bookNow')}
            </button>
            <a
              href={templateData.hero.ctaSecondary.href}
              className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-white border border-white/30 hover:bg-white/10 transition-colors duration-300"
            >
              {tStr('hero.exploreServices')}
            </a>
          </motion.div>

          {/* Trust row — minimal inline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 font-inter text-[13px] text-white/85 tracking-[0.02em]"
          >
            {templateData.hero.stats.map((stat, i) => (
              <span key={i} className="inline-flex items-center gap-4">
                {i > 0 && <span className="text-white/30" aria-hidden="true">•</span>}
                <span className="inline-flex items-center gap-1.5">
                  {stat.value && <span className="font-semibold text-white/95">{stat.value}</span>}
                  {stat.value === '5.0' && (
                    <Star size={12} fill="currentColor" strokeWidth={1.6} className="text-[#F2D890]" />
                  )}
                  <span className="text-white/65">
                    {stat.label === 'Google-arvostelu' ? tStr('hero.statRating') : stat.label === 'Vuodesta lähtien' ? tStr('hero.statSince') : stat.label === 'Koulutetut hierojat' ? tStr('hero.statTrained') : stat.label}
                  </span>
                </span>
              </span>
            ))}
          </motion.div>
          </div>
        </div>
      </section>

      {/* Brand intro */}
      <section className="bg-[#F6F4F1] py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1150px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-16 items-center">
              <div className="md:order-1">
                <span className="block w-10 h-px bg-[#C9BFAF] mb-6" aria-hidden="true" />
                <h2 className="font-cormorant text-[32px] md:text-[40px] text-[#152238] leading-[1.12] tracking-[-0.01em] mb-6 max-w-[420px]">{tStr('brandIntro.headline')}</h2>
                <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.8] max-w-[460px] mb-5">{tStr('brandIntro.p1')}</p>
                <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.8] max-w-[460px]">{tStr('brandIntro.p2')}</p>
              </div>
              <div className="md:order-2">
                <div className="relative">
                  <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[18px] bg-[#EAE5DD]" aria-hidden="true" />
                  <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-[16px] border border-white/70 shadow-[0_20px_50px_rgba(21,34,56,0.10)]">
                    <img src="/assets/klaukkala-interior.png" alt="ME Massage Klaukkalan vastaanottotila" loading="lazy" className="w-full h-full object-cover object-center" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section id="palvelut" className="bg-[linear-gradient(to_bottom,#F6F4F1_0%,#FFFFFF_140px)] pt-16 md:pt-20 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[920px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-18">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{tStr('services.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#152238] leading-[1.35] mb-6">{tStr('services.headline')}</h2>
              <p className="font-inter text-[14px] text-[#1F2937] leading-[1.75] max-w-[440px] mx-auto">{tStr('services.body')}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {templateData.services.primaryServices.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <Link to={service.linkHref} className="group block rounded-[12px] overflow-hidden bg-[#152238] border border-[#E2E8F0] shadow-[0_8px_28px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
                  <div className={`relative overflow-hidden ${service.contain ? 'bg-white' : ''}`}>
                    {/* fillScale: transparent-background PNGs fill the slot
                        horizontally (slot is wider than the image aspect);
                        wrapper scales, origin top center crops the bottom. */}
                    <div className="w-full aspect-[16/10.5]" style={service.fillScale ? { transform: `scale(${service.fillScale})`, transformOrigin: service.fillOrigin || 'top center' } : undefined}>
                      <img src={service.image} alt={service.title} loading="lazy" className={`w-full h-full ${service.contain ? 'object-contain' : 'object-cover'} transition-transform duration-700 ease-out group-hover:scale-[1.02]`} style={service.position ? { objectPosition: service.position } : undefined} />
                    </div>
                  </div>
                  <div className="bg-[#152238] px-8 pt-7 pb-9 md:px-10 md:pt-8 md:pb-10">
                    <h3 className="font-cormorant text-[26px] md:text-[28px] text-white mb-4">{i === 0 ? tStr('services.primary.classic.title') : tStr('services.primary.hotStone.title')}</h3>
                    <p className="font-inter text-[14px] text-white/80 leading-[1.75] mb-8 max-w-[340px]">{i === 0 ? tStr('services.primary.classic.description') : tStr('services.primary.hotStone.description')}</p>
                    <span className="inline-flex items-center gap-1.5 font-inter text-[13px] text-white/70 group-hover:text-white transition-colors duration-300">
                      {i === 0 ? tStr('services.primary.classic.link') : tStr('services.primary.hotStone.link')}
                      <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-18 md:mt-22 pt-12 border-t border-[#E2E8F0]">
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] text-center mb-10">{tStr('services.secondaryLabel')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
                {templateData.services.secondaryServices.map((service, i) => {
                  const cardClassName = 'group block h-full rounded-lg overflow-hidden border border-[#E2E8F0] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]';
                  // Single image card: all three cards share the gift card's
                  // footprint — plain object-cover fill, no forced zoom; the
                  // title and CTA sit on a navy bottom gradient. Aspect 16/15
                  // keeps the card height ≈ the old image+body total.
                  const cardContent = (
                    <div className="relative h-full aspect-[2/1] sm:aspect-[4/3] overflow-hidden bg-white">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full ${service.contain ? 'object-contain' : 'object-cover'} transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
                        style={service.position ? { objectPosition: service.position } : undefined}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,34,56,0.92)_0%,rgba(21,34,56,0.5)_36%,rgba(21,34,56,0)_66%)]" aria-hidden="true" />
                      <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-5">
                        <p className="font-cormorant text-[15px] md:text-[21px] text-white leading-tight min-w-0 hyphens-auto break-words">{tStr(service.titleKey)}</p>
                        <span className="inline-flex items-center gap-1.5 mt-1.5 md:mt-2 font-inter text-[11px] md:text-[12px] font-medium text-white/70 group-hover:text-white transition-colors duration-300">
                          {tStr('services.secondaryCta')}
                          <ArrowRight size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                  return service.linkHref.startsWith('/') ? (
                    <Link key={i} to={service.linkHref} className={cardClassName}>{cardContent}</Link>
                  ) : (
                    <a key={i} href={service.linkHref} className={cardClassName}>{cardContent}</a>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Symptom survey — same reusable component as on the Palvelut page */}
          <ScrollReveal delay={0.1}>
            <div className="mt-18 md:mt-22 pt-12 border-t border-[#E2E8F0]">
              <SymptomSurvey />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="hinnasto" className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-10">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{tStr('pricing.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[30px] text-[#152238] leading-[1.35] mb-4">{tStr('pricing.headline')}</h2>
              <p className="font-inter text-[14px] text-[#1F2937] leading-[1.75] max-w-[400px] mx-auto">{tStr('pricing.body')}</p>
            </div>
          </ScrollReveal>

          <PricingExplorer />
        </div>
      </section>

      {/* Reviews */}
      <section id="arvostelut" className="bg-[#152238] pt-20 md:pt-28 pb-14 md:pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.02 }} />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-5">{tStr('reviews.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#FFFFFF] leading-[1.35] mb-6">{tStr('reviews.headline')}</h2>
              <p className="font-inter text-[14px] text-white/60 leading-[1.7] max-w-[420px] mx-auto">{tStr('reviews.description')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative">
              {/* Cards + side arrows */}
              <div className="flex items-center gap-3 md:gap-4">
                {/* Left arrow */}
                <button onClick={prevReview} className="shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors bg-transparent cursor-pointer">
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>

                {/* Cards */}
                <div className="flex-1 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:max-w-[95%] md:mx-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {visibleReviews.map((review, i) => (
                    <div key={`${reviewIndex}-${i}`} className="flex-shrink-0 w-[260px] md:w-auto md:flex-1 md:basis-0 snap-start">
                      <div className="bg-[#1E3A5F] rounded-xl p-7 md:p-9 border border-white/[0.05] shadow-[0_8px_24px_rgba(0,0,0,0.16)] h-full flex flex-col">
                        <p className="font-inter text-[14px] text-[#FFFFFF]/90 leading-[1.75] italic flex-1">&ldquo;{review.text}&rdquo;</p>
                        <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#FFFFFF]/[0.06]">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="font-cormorant text-[15px] text-[#FFFFFF]/60">{review.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-inter text-[14px] font-bold text-[#FFFFFF]">{review.name}</p>
                            <p className="font-inter text-[11px] text-white/50">{review.service}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right arrow */}
                <button onClick={nextReview} className="shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors bg-transparent cursor-pointer">
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Light text links */}
              <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 mt-8 text-center">
                <Link
                  to="/asiakkaiden-kokemuksia"
                  className="font-inter text-[13px] font-semibold text-white/80 underline underline-offset-4 decoration-white/25 hover:text-white hover:decoration-white/70 transition-colors duration-300"
                >
                  {tStr('reviews.pageLink')}
                </Link>
                <a
                  href="https://g.page/r/CeK1L8vJ3Z1KEAE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-[13px] font-semibold text-white/80 underline underline-offset-4 decoration-white/25 hover:text-white hover:decoration-white/70 transition-colors duration-300"
                >
                  {tStr('reviews.leaveReview')} →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team */}
      <section id="tiimi" className="relative bg-[#152238] pt-20 md:pt-28 pb-8 md:pb-10 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
        <div className="relative max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-5">{tStr('team.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#FFFFFF] leading-[1.2]">{tStr('team.headline')}</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-[38%_1fr] gap-8 md:gap-14 items-start">
            <div style={{ opacity: teamTransitioning ? 0 : 1, transform: teamTransitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 350ms ease-in-out, transform 350ms ease-out' }}>
              <div className="relative overflow-hidden rounded-lg mx-auto md:mx-0 max-w-[320px] md:max-w-none">
                <img src={activeTeamMember.image} alt={activeTeamMember.name} loading="lazy" className="w-full aspect-[4/5] object-cover object-[center_20%]" />
                <div className="absolute inset-0 pointer-events-none bg-[#152238]/[0.08]" />
              </div>
            </div>

            <div style={{ opacity: teamTransitioning ? 0 : 1, transform: teamTransitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 350ms ease-in-out, transform 350ms ease-out' }}>
              <p className="font-cormorant text-[22px] md:text-[24px] text-[#FFFFFF] mb-2">{activeTeamMember.name}</p>
              <p className="font-inter text-[12px] font-medium text-[#94A3B8] tracking-[0.12em] uppercase mb-8">{activeTeamMember.title}</p>
              <div className="font-inter text-[14px] text-white/80 leading-[1.8] mb-8 max-w-[420px] space-y-4">
                {activeTeamMember.bio.split('\\n\\n').map((para, pi) => (
                  <p key={pi}>{para}</p>
                ))}
              </div>

              {activeTeamMember.testimonial && (
                <div className="mb-8 max-w-[420px]">
                  <div className="pl-3 border-l border-white/15">
                    <p className="font-inter text-[13px] italic text-white/70 leading-[1.7]">&ldquo;{activeTeamMember.testimonial}&rdquo;</p>
                  </div>
                </div>
              )}

              {/* Profile selector */}
              <div className="flex gap-5 md:gap-7 mb-7">
                {teamMembers.map((t, i) => (
                  <button key={i} onClick={() => handleTeamSelect(i)} className="group flex flex-col items-center text-center cursor-pointer bg-transparent border-none p-0">
                    <div className={`rounded-full overflow-hidden mb-2 transition-all duration-300 ${i === activeTeamIndex ? 'w-12 h-12 md:w-14 md:h-14 border-2 border-white opacity-100 scale-105' : 'w-10 h-10 md:w-11 md:h-11 border border-white/20 opacity-70 group-hover:opacity-100 scale-100'}`}>
                      <img src={t.avatar} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <p className={`font-inter text-[11px] mb-px transition-colors duration-300 ${i === activeTeamIndex ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{t.name.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-[#F7F5F2] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-14">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{tStr('locations.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#152238] leading-[1.25] mb-5">{tStr('locations.headline')}</h2>
              <p className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.7] max-w-[520px] mx-auto">{tStr('locations.supportText')}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
            {getLocationCards(tStr).map((loc, i) => (
              <ScrollReveal key={loc.name} delay={0.1 + i * 0.08}>
                <Link
                  to={loc.href}
                  className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#152238]/40 focus-visible:ring-offset-4"
                >
                  <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:-translate-x-full"
                    />
                    <img
                      src={loc.hoverImage}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center translate-x-full transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:translate-x-0"
                    />
                  </div>
                  <h3 className="font-cormorant text-[24px] md:text-[26px] text-[#152238] leading-[1.2] mb-1">{loc.name}</h3>
                  <p className="font-inter text-[13px] text-[#5A6A7A] tracking-wide mb-3">{loc.address}</p>
                  <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.65] mb-5 max-w-[360px]">{loc.description}</p>
                  <span className="inline-flex items-center font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 group-hover:decoration-[#152238]/70 transition-colors duration-300">
                    {loc.cta}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F5F2] pt-16 md:pt-20 pb-6 md:pb-8 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-14">
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{tStr('faq.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#152238] leading-[1.25]">{tStr('faq.headline')}</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-12 md:mb-14">
              {tArr<{question: string; answer: string; includePhone?: boolean}>('faq.items').map((faq, i) => (
                <div key={i} className="border-t border-[#E2E8F0]">
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className="group w-full flex items-start justify-between gap-4 py-5 md:py-6 text-left bg-transparent border-none cursor-pointer">
                    <span className="font-inter text-[15px] md:text-[16px] font-semibold text-[#152238] leading-[1.5]">{faq.question}</span>
                    <span className="shrink-0 mt-[2px] text-[#5A6A7A]/50 group-hover:text-[#5A6A7A]/70 transition-colors duration-300">
                      {openFaqIndex === i ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                    </span>
                  </button>
                  <div className="overflow-hidden transition-all duration-[400ms] ease-out" style={{ maxHeight: openFaqIndex === i ? '220px' : '0px', opacity: openFaqIndex === i ? 1 : 0 }}>
                    <div className="font-inter text-[14px] text-[#1F2937] leading-[1.75] pb-5 md:pb-6 max-w-[540px]">
                      {faq.answer.replace('{phone}', templateData.business.phone)}
                      {faq.includePhone && (
                        <a href={templateData.business.phoneLink} className="block mt-3 font-inter text-[14px] text-[#152238]/70 tracking-wider no-underline hover:text-[#152238] hover:underline underline-offset-4 decoration-[#4A4540]/20 transition-colors duration-300">
                          📞 {templateData.business.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#E2E8F0]" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="text-center mb-10 md:mb-12">
              <Link
                to="/usein-kysyttya"
                className="font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 hover:decoration-[#152238]/70 transition-colors duration-300"
              >
                {tStr('faq.viewAll')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{ backgroundImage: `url(${templateData.finalCta.backgroundImage})` }} />
        <div className="absolute inset-0 bg-[#152238]/80" style={{ backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }} />
        <div className="relative z-10 w-full max-w-[480px] mx-auto px-6 pt-[2vh]">
          <ScrollReveal>
            <div className="text-center">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-4">{tStr('finalCta.eyebrow')}</p>
              <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#FFFFFF] leading-[1.25] mb-4">{tStr('finalCta.headline')}</h2>
              <p className="font-inter text-[15px] text-white/80 leading-[1.6] mb-10 max-w-[340px] mx-auto">{tStr('finalCta.supportText')}</p>

              <div className="flex flex-col items-center gap-3 mb-8">
                <button
                  onClick={() => openBookingModal()}
                  className={`inline-flex w-full max-w-[280px] min-h-[56px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[16px] font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 cursor-pointer ${bookingGlassOnDarkClasses}`}
                >
                  {tStr('pricing.bookNow')}
                </button>
                <a href={templateData.business.phoneLink} className="inline-flex items-center justify-center gap-2 font-inter text-[15px] font-medium text-white/90 tracking-wide no-underline hover:text-white transition-colors duration-300 py-2">
                  <Phone size={15} strokeWidth={1.5} />
                  {templateData.business.phone}
                </a>
                <p className="font-inter text-[12px] text-white/80 tracking-wide">{tStr('finalCta.phoneSupport')}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="font-inter text-[12px] text-white/80 tracking-wide">{tStr('finalCta.trustLine', { rating: businessInfo.googleRating })}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
