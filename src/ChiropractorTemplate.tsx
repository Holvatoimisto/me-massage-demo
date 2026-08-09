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
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PricingExplorer } from '@/components/PricingExplorer';
import { businessInfo, footerColumns, footerMeta } from '@/data/site';
import { pricingTabs } from '@/data/pricing';

const templateData = {
  business: businessInfo,
  hero: {
    backgroundImage: '/assets/me_hero_new.png',
    eyebrow: 'ME MASSAGE',
    headline: 'Ammattitaitoista hierontaa Klaukkalassa ja Vaasassa',
    subheadline: 'Klassinen hieronta, kuumakivihieronta, purentalihashieronta ja faskiarautakäsittely. Koulutetut hierojat sinua varten.',
    ctaPrimary: { label: 'Varaa aika', href: 'https://memassage.fi/ajanvaraus' },
    ctaSecondary: { label: 'Tutustu palveluihin', href: '#palvelut' },
    stats: [
      { value: '5.0', label: 'Google-arvostelu' },
      { value: '120+', label: 'arvostelua' },
      { value: '2', label: 'Toimipistettä' },
    ],
  },
  intro: {
    text: 'Ammattitaitoista hierontaa ja kehonhuoltoa',
    backgroundColor: '#152238',
  },
  services: {
    eyebrow: 'PALVELUT',
    headline: 'Hierontaa ja kehonhuoltoa',
    body: 'Valitse tarpeisiisi sopiva hoito. Kaikki hoidot räätälöidään yksilöllisesti.',
    reassurance: 'Etkö ole varma, mikä palvelu sopii sinulle? Soita 040 833 8512 ja kysy.',
    primaryServices: [
      {
        image: '/assets/me_service_classic.png',
        title: 'Klassinen hieronta',
        description: 'Perinteinen hieronta lihaskireyksiin ja rentoutumiseen. Voimakkuus räätälöidään aina asiakkaan tarpeiden mukaan.',
        linkText: 'Tutustu hierontaan',
        linkHref: '/palvelut/hieronta',
      },
      {
        image: '/assets/me_service_hot_stone.png',
        title: 'Kuumakivihieronta',
        description: 'Lämpimillä kivillä tehtävä rauhallinen hoito, joka auttaa rentoutumaan ja pehmentämään lihaskireyksiä.',
        linkText: 'Tutustu kuumakivihierontaan',
        linkHref: '/palvelut/kuumakivihieronta',
      },
    ],
    secondaryLabel: 'Myös saatavilla',
    secondaryServices: [
      { image: '/assets/me_service_jaw.png', title: 'Purentalihashieronta', titleKey: 'services.jaw', linkHref: '/palvelut/purentalihashieronta' },
      { image: '/assets/me_service_iastm.png', title: 'Faskiarautakäsittely', titleKey: 'services.iastm', linkHref: '/palvelut/faskiarautakasittely' },
      { image: '/assets/memassage_lahjakortti.png', title: 'Lahja- ja sarjakortit', titleKey: 'services.giftCards', linkHref: 'tel:+358408338512' },
    ],
  },
  pricing: {
    eyebrow: 'HINNASTO',
    headline: 'Selkeät hinnat, ei yllätyksiä',
    body: 'Kaikki hoidot räätälöidään yksilöllisesti tarpeidesi mukaan.',
    tabs: pricingTabs,
  },
  reviews: {
    eyebrow: 'ASIAKASKOKEMUKSIA',
    headline: 'Mitä asiakkaat sanovat',
    description: 'Kiitettävät arvostelut Googlesta.',
    items: [
      { name: 'Anni K.', text: 'Mathias on ehdottomasti paras hieroja, jolla olen käynyt. Ammattitaitoinen, kuuntelee ja osaa kohdistaa hoidon oikein. Suosittelen lämpimästi!', service: 'Klassinen hieronta' },
      { name: 'Mikael L.', text: 'Upea hierontakokemus! Mathias otti hyvin huomioon toiveeni ja keskittyi juuri niihin kohtiin, jotka kaipasivat huomiota. Tulen ehdottomasti uudelleen.', service: 'Klassinen hieronta' },
      { name: 'Sanna R.', text: 'Kuumakivihieronta oli aivan mieletön elämys. Lämmin ja rauhallinen tunnelma, ja hieronta rentoutti koko kehon. Kiitos!', service: 'Kuumakivihieronta' },
      { name: 'Petri H.', text: 'Purentalihashieronta auttoi minua todella paljon. Olen kärsinyt leukakivuista vuosia ja nyt ne ovat vihdoin helpottaneet. Kiitos Mathias!', service: 'Purentalihashieronta' },
      { name: 'Laura M.', text: 'Faskiarautakäsittely oli tehokasta ja ammattimaista. Mathias osaa kertoa mitä tekee ja miksi. Tulen varmasti uudelleen!', service: 'Faskiarautakäsittely' },
      { name: 'Jussi T.', text: 'Erittäin ammattitaitoinen hieroja. Rentouttava ilmapiiri ja laadukas hoito. Suosittelen kaikille!', service: 'Klassinen hieronta' },
      { name: 'Tiina S.', text: 'Paras hieronta Kokemukseni Klaukkalassa. Mathias kuuntelee asiakasta ja räätälöi hoidon tarpeiden mukaan.', service: 'Kuumakivihieronta' },
      { name: 'Marko P.', text: 'Säännöllinen hieronta Mathiaksella on auttanut selkäkipuihin merkittävästi. Ammattitaitoista ja ystävällistä palvelua.', service: 'Klassinen hieronta' },
    ],
  },
  team: {
    eyebrow: 'TUTUSTU MEIHIN',
    headline: 'Asiantuntijat sinua varten',
    members: [
      {
        name: 'Mathias Eklund',
        firstName: 'Mathiakselta',
        title: 'Koulutettu hieroja, yrittäjä',
        role: 'Hieroja',
        image: '/assets/me_mathias.jpg',
        avatar: '/assets/me_mathias.jpg',
        bio: 'Mathias on ME massagen perustaja ja koulutettu hieroja. Hän aloitti yritystoiminnan vuonna 2023 ja palvelee asiakkaita sekä Klaukkalassa että Vaasassa.\n\nMathiakselta saat monipuolisia hieronta- ja kehonhuoltopalveluita: klassinen hieronta, kuumakivihieronta, purentalihashieronta ja faskiarautakäsittely (IASTM).\n\nHänelle tärkeää on kohdata jokainen asiakas yksilöllisesti, kuunnella toiveita ja räätälöidä hoito vastaamaan juuri sinun tarpeitasi.',
        testimonial: 'Tärkeintä minulle on, että jokainen asiakas lähtee vastaanotolta paremminvoivana.',
      },
      {
        name: 'Janina Honkanen',
        firstName: 'Janinalta',
        title: 'Koulutettu hieroja',
        role: 'Hieroja',
        image: '/assets/me_janina.png',
        avatar: '/assets/me_janina.png',
        bio: 'Janina on koulutettu hieroja, joka liittyi ME massagen tiimiin vuonna 2024. Hän tuo mukanaan lämpöistä ja ammattitaitoista otetta hierontapalveluihin.\n\nJaninalta saat klassista hierontaa ja kuumakivihierontaa. Hän on erityisen kiinnostunut kokonaisvaltaisesta hyvinvoinnista ja kehonhuollosta.',
        testimonial: 'Haluan auttaa asiakkaitani löytämään keinot rentoutumiseen ja kivunlievitykseen.',
      },
    ],
  },
  faq: {
    eyebrow: 'ENNEN ENSIMMÄISTÄ KÄYNTIÄ',
    headline: 'Usein kysyttyä',
    items: [
      {
        question: 'Minkä pituinen hieronta minulle?',
        answer: 'Ensikertalaisille suosittelemme 45–60 minuutin hoitoa. 30 min riittää, jos haluat keskittyä vain yhteen alueeseen. 90 min antaa aikaa koko keholle perusteellisesti.',
        includePhone: false,
      },
      {
        question: 'Sopiiko hieronta minulle?',
        answer: 'Kyllä! Hieronta sopii kaikille ikään ja kuntoon katsomatta. Meille ovat tervetulleita niin urheilijat, toimistotyöntekijät kuin senioritkin.',
        includePhone: false,
      },
      {
        question: 'Mitä eroa on klassisella hieronnalla ja kuumakivihieronnalla?',
        answer: 'Klassinen hieronta on perinteistä lihaskäsittelyä, joka räätälöidään tarpeidesi mukaan. Kuumakivihieronnassa käytetään lämpimiä kiviä, jotka rentouttavat syvällä tasolla ja lievittävät lihaskireyksiä tehokkaasti.',
        includePhone: false,
      },
      {
        question: 'Miten ajanvaraus toimii?',
        answer: 'Varaa aika helposti nettiajanvarauksestamme tai soita 040 833 8512. Voit myös lähettää sähköpostia.',
        includePhone: true,
      },
    ],
  },
  finalCta: {
    backgroundImage: '/assets/me_hero.jpg',
    eyebrow: 'VARAA AIKA',
    headline: 'Hoida kehoasi, se ansaitsee huolenpitoa',
    supportText: 'Varaa hieronta jo tänään ja aloita matkasi kohti parempaa hyvinvointia.',
    ctaLabel: 'Varaa aika',
    phone: '040 833 8512',
    phoneSupport: 'Soita tai lähetä sähköpostia',
    trustItems: [
      { icon: 'star', label: '4.9 Google-arvostelu' },
      { icon: 'clock', label: 'Koulutettu hieroja' },
      { icon: 'calendar', label: 'Kaksi toimipistettä' },
    ],
  },
  footer: {
    columns: footerColumns,
    paymentMethods: footerMeta.paymentMethods,
    copyright: footerMeta.copyright,
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
    image: '/assets/memassage_klaukkala.webp',
    description: tStr('locations.supportingCopy'),
    cta: tStr('locations.ctaKlaukkala'),
    href: '/toimipisteet/klaukkala',
  },
  {
    name: 'Vaasa',
    address: 'Vaasanpuistikko 1 A1, 65100 Vaasa',
    image: '/assets/memassage_vaasa.webp',
    description: tStr('locations.supportingCopy'),
    cta: tStr('locations.ctaVaasa'),
    href: '/toimipisteet/vaasa',
  },
];

export function ChiropractorTemplate() {
  const { lang, tStr, tArr } = useLang();

  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [teamTransitioning, setTeamTransitioning] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);

  const getRecommendation = (answers: string[], tStr: (p: string) => string) => {
    const [, symptom] = answers;
    if (answers[0] === 'leuka' || (answers[0] === 'niska' && symptom === 'paansarky')) {
      return {
        title: tStr('survey.results.jaw.title'),
        description: tStr('survey.results.jaw.description'),
        serviceLink: '/palvelut/purentalihashieronta',
        bookingUrl: 'https://memassage.fi/ajanvaraus',
      };
    }
    if (symptom === 'kireys' && answers[3] === 'rentoutuminen') {
      return {
        title: tStr('survey.results.hotStone.title'),
        description: tStr('survey.results.hotStone.description'),
        serviceLink: '/palvelut/kuumakivihieronta',
        bookingUrl: 'https://memassage.fi/ajanvaraus',
      };
    }
    if (answers[0] === 'selka' && symptom === 'kireys') {
      return {
        title: tStr('survey.results.iastm.title'),
        description: tStr('survey.results.iastm.description'),
        serviceLink: '/palvelut/faskiarautakasittely',
        bookingUrl: 'https://memassage.fi/ajanvaraus',
      };
    }
    return {
      title: tStr('survey.results.classic.title'),
      description: tStr('survey.results.classic.description'),
      serviceLink: '/palvelut/hieronta',
      bookingUrl: 'https://memassage.fi/ajanvaraus',
    };
  };

  const getSurveyQuestions = (tStr: (p: string) => string) => [
    {
      question: tStr('survey.questions.0.question'),
      options: [
        { label: tStr('survey.questions.0.options.0.label'), value: 'niska' },
        { label: tStr('survey.questions.0.options.1.label'), value: 'selka' },
        { label: tStr('survey.questions.0.options.2.label'), value: 'leuka' },
        { label: tStr('survey.questions.0.options.3.label'), value: 'kasi' },
        { label: tStr('survey.questions.0.options.4.label'), value: 'jalka' },
        { label: tStr('survey.questions.0.options.5.label'), value: 'useampi' },
      ],
    },
    {
      question: tStr('survey.questions.1.question'),
      options: [
        { label: tStr('survey.questions.1.options.0.label'), value: 'kireys' },
        { label: tStr('survey.questions.1.options.1.label'), value: 'kipu' },
        { label: tStr('survey.questions.1.options.2.label'), value: 'paansarky' },
        { label: tStr('survey.questions.1.options.3.label'), value: 'puutuminen' },
        { label: tStr('survey.questions.1.options.4.label'), value: 'urheiluvamma' },
        { label: tStr('survey.questions.1.options.5.label'), value: 'palautuminen' },
      ],
    },
    {
      question: tStr('survey.questions.2.question'),
      options: [
        { label: tStr('survey.questions.2.options.0.label'), value: 'viikko' },
        { label: tStr('survey.questions.2.options.1.label'), value: '4vko' },
        { label: tStr('survey.questions.2.options.2.label'), value: '6kk' },
        { label: tStr('survey.questions.2.options.3.label'), value: 'yli6kk' },
        { label: tStr('survey.questions.2.options.4.label'), value: 'toistuu' },
      ],
    },
    {
      question: tStr('survey.questions.3.question'),
      options: [
        { label: tStr('survey.questions.3.options.0.label'), value: 'kivunlievitys' },
        { label: tStr('survey.questions.3.options.1.label'), value: 'liikkuvuus' },
        { label: tStr('survey.questions.3.options.2.label'), value: 'kireydenhelpotus' },
        { label: tStr('survey.questions.3.options.3.label'), value: 'palautuminen' },
        { label: tStr('survey.questions.3.options.4.label'), value: 'selvyys' },
      ],
    },
  ];

  const handleTeamSelect = useCallback((index: number) => {
    if (index === activeTeamIndex || teamTransitioning) return;
    setTeamTransitioning(true);
    setTimeout(() => {
      setActiveTeamIndex(index);
      setTeamTransitioning(false);
    }, 350);
  }, [activeTeamIndex, teamTransitioning]);

  const prevReview = () => setReviewIndex((i) => (i === 0 ? templateData.reviews.items.length - 1 : i - 1));
  const nextReview = () => setReviewIndex((i) => (i === templateData.reviews.items.length - 1 ? 0 : i + 1));

  const teamMembers = [
    {
      name: 'Mathias Eklund',
      firstName: lang === 'sv' ? 'från Mathias' : lang === 'en' ? 'from Mathias' : 'Mathiakselta',
      title: tStr('team.mathias.title'),
      role: 'Hieroja',
      image: '/assets/me_mathias.jpg',
      avatar: '/assets/me_mathias.jpg',
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
    translatedReviews[(reviewIndex + 3) % translatedReviews.length],
  ];
  return (
    <div className="min-h-[100dvh] font-inter antialiased">
      {/* Navigation */}
      <Header />

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{ backgroundImage: `url(${templateData.hero.backgroundImage})` }} />
        <div className="absolute inset-0 bg-[#152238]/65" />
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.03 }} />
        <div className="relative z-10 w-full max-w-[800px] mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-[60px]">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-inter text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] translate-y-1 mb-4"
          >
            {tStr('hero.eyebrow')}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-cormorant text-[36px] md:text-[48px] lg:text-[56px] font-semibold text-white leading-[1.1] mb-6 max-w-[700px]"
          >
            {tStr('hero.headline')}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-[14px] md:text-[16px] text-white/80 leading-[1.7] mb-10 max-w-[520px]"
          >
            {tStr('hero.subheadline')}
          </motion.p>

          {/* CTA pair */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-10"
          >
            <a
              href={templateData.hero.ctaPrimary.href}
              className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-white text-[#152238] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-[#E2E8F0] transition-colors duration-300"
            >
              {tStr('hero.bookNow')}
            </a>
            <a
              href={templateData.hero.ctaSecondary.href}
              className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-white border border-white/30 hover:bg-white/10 transition-colors duration-300"
            >
              {tStr('hero.exploreServices')}
            </a>
          </motion.div>

          {/* Stat cards — premium glass */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex items-center justify-center gap-4 md:gap-5"
          >
            {templateData.hero.stats.map((stat, i) => (
              <div
                key={i}
                className="text-center px-5 py-4 md:px-6 md:py-5 rounded-[14px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="font-cormorant text-[22px] md:text-[26px] text-[#FFFFFF] leading-none mb-1.5 flex items-center justify-center gap-1.5">
                  <span>{stat.value}</span>
                  {stat.value === '5.0' && (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#D8BF7A]/50 bg-[#A68B5B]/25 text-[#F2D890] shadow-[0_0_16px_rgba(166,139,91,0.35)]">
                      <Star size={12} fill="currentColor" strokeWidth={1.6} />
                    </span>
                  )}
                </p>
                <p className="font-inter text-[10px] md:text-[11px] text-[#94A3B8] tracking-[0.06em]">
                  {stat.label === 'Google-arvostelu' ? tStr('hero.statRating') : stat.label === 'Vuodesta lähtien' ? tStr('hero.statSince') : stat.label === 'Toimipistettä' ? tStr('hero.statLocations') : stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative overflow-hidden" style={{ backgroundColor: templateData.intro.backgroundColor, paddingTop: '44px', paddingBottom: '44px' }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.03 }} />
        <div className="relative text-center px-6">
          <p className="font-cormorant text-[17px] md:text-[20px] text-[#E2E8F0]/70 tracking-[0.02em]">
            {tStr('intro')}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="palvelut" className="bg-[#F7F5F2] pt-16 md:pt-20 pb-16 md:pb-20 px-6 md:px-12">
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
                <Link to={service.linkHref} className="group block rounded-[12px] overflow-hidden bg-white border border-[#E2E8F0] shadow-[0_8px_28px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
                  <div className="relative overflow-hidden">
                    <img src={service.image} alt={service.title} loading="lazy" className="w-full aspect-[16/10.5] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                  </div>
                  <div className="px-8 pt-7 pb-9 md:px-10 md:pt-8 md:pb-10">
                    <h3 className="font-cormorant text-[26px] md:text-[28px] text-[#152238] mb-4">{i === 0 ? tStr('services.primary.classic.title') : tStr('services.primary.hotStone.title')}</h3>
                    <p className="font-inter text-[14px] text-[#1F2937] leading-[1.75] mb-8 max-w-[340px]">{i === 0 ? tStr('services.primary.classic.description') : tStr('services.primary.hotStone.description')}</p>
                    <span className="inline-flex items-center gap-1.5 font-inter text-[13px] text-[#152238]/60 group-hover:text-[#152238] transition-colors duration-300">
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
              <div className="grid grid-cols-3 gap-4 md:gap-5">
                {templateData.services.secondaryServices.map((service, i) => {
                  const cardClassName = 'group block rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]';
                  const cardContent = (
                    <div className="relative overflow-hidden aspect-[1586/992]">
                      <img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" style={service.title === 'Dry Needling' ? { objectPosition: 'left center' } : undefined} />
                      <div className="absolute inset-0 pointer-events-none bg-[#152238]/25" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <p className="font-cormorant text-[15px] md:text-[17px] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">{tStr(service.titleKey)}</p>
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
              {/* Symptom Survey */}
              <div className="mt-14 md:mt-18 max-w-[520px] mx-auto">
                {surveyStep === 0 ? (
                  /* Intro view */
                  <div className="text-center">
                    <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-4">{tStr('survey.eyebrow')}</p>
                    <h3 className="font-cormorant text-[22px] md:text-[26px] text-[#152238] leading-[1.35] mb-3">{tStr('survey.headline')}</h3>
                    <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.7] mb-6">{tStr('survey.description')}</p>
                    <button
                      onClick={() => { setSurveyStep(1); setSurveyAnswers([]); }}
                      className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300 cursor-pointer"
                    >
                      {tStr('survey.startButton')}
                    </button>
                    <p className="font-inter text-[12px] text-[#5A6A7A]/50 mt-3">{tStr('survey.duration')}</p>
                  </div>
                ) : surveyStep <= 4 ? (
                  /* Question views */
                  <div>
                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mb-8">
                      <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A]">{tStr('survey.step')} {surveyStep} {tStr('survey.of')} 4</span>
                      <div className="flex-1 h-[2px] bg-[#152238]/[0.08] rounded-full overflow-hidden">
                        <div className="h-full bg-[#152238] rounded-full transition-all duration-500" style={{ width: `${(surveyStep / 4) * 100}%` }} />
                      </div>
                    </div>
                    {/* Question */}
                    <h3 className="font-cormorant text-[22px] md:text-[24px] text-[#152238] leading-[1.35] mb-6">{getSurveyQuestions(tStr)[surveyStep - 1].question}</h3>
                    {/* Options grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {getSurveyQuestions(tStr)[surveyStep - 1].options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            const newAnswers = [...surveyAnswers];
                            newAnswers[surveyStep - 1] = opt.value;
                            setSurveyAnswers(newAnswers);
                            if (surveyStep < 4) {
                              setSurveyStep(surveyStep + 1);
                            } else {
                              setSurveyStep(5);
                            }
                          }}
                          className="text-left px-5 py-4 rounded-xl bg-white/[0.5] border border-[#94A3B8]/60 hover:bg-white hover:border-[#152238]/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer"
                        >
                          <span className="font-inter text-[14px] text-[#152238]">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                    {/* Back button */}
                    {surveyStep > 1 && (
                      <button
                        onClick={() => { setSurveyStep(surveyStep - 1); }}
                        className="font-inter text-[13px] text-[#5A6A7A] hover:text-[#152238] transition-colors cursor-pointer"
                      >
                        {tStr('survey.back')}
                      </button>
                    )}
                  </div>
                ) : (
                  /* Result view */
                  (() => {
                    const rec = getRecommendation(surveyAnswers, tStr);
                    return (
                      <div className="text-center">
                        <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-4">{tStr('survey.resultEyebrow')}</p>
                        <h3 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-4">{rec.title}</h3>
                        <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.75] mb-8">{rec.description}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                          <a
                            href={rec.bookingUrl}
                            className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300"
                          >
                            Varaa aika
                          </a>
                          <Link
                            to={rec.serviceLink}
                            className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-[#152238] border border-[#152238]/30 hover:bg-[#152238]/5 transition-colors duration-300"
                          >
                            {tStr('survey.exploreService')}
                          </Link>
                        </div>
                        <button
                          onClick={() => { setSurveyStep(0); setSurveyAnswers([]); }}
                          className="font-inter text-[13px] text-[#5A6A7A] hover:text-[#152238] transition-colors mt-6 cursor-pointer"
                        >
                          {tStr('survey.restart')}
                        </button>
                      </div>
                    );
                  })()
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="hinnasto" className="bg-[#F7F5F2] py-16 md:py-20 px-6 md:px-12">
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
                <div className="flex-1 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {visibleReviews.map((review, i) => (
                    <div key={`${reviewIndex}-${i}`} className="flex-shrink-0 w-[260px] md:w-[290px] snap-start">
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

              {/* Bottom CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <a
                  href="https://www.google.com/search?q=me+massage+arvostelut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-white text-[#152238] shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#E2E8F0] transition-colors duration-300"
                >
                  {tStr('reviews.allReviews')}
                </a>
                <a
                  href="https://g.page/r/CeK1L8vJ3Z1KEAE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-white border border-white/30 hover:bg-white/10 transition-colors duration-300"
                >
                  {tStr('reviews.leaveReview')}
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
                  <div className="overflow-hidden rounded-lg mb-6">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
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
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-[480px]">
                  {[tStr('finalCta.bookKlaukkala'), tStr('finalCta.bookVaasa')].map((label) => {
                    const splitAt = label.lastIndexOf(' ');
                    return (
                      <a
                        key={label}
                        href="https://memassage.fi/ajanvaraus"
                        className="inline-flex w-full sm:flex-1 min-h-[64px] flex-col items-center justify-center gap-[5px] px-6 py-3 rounded-lg bg-[#F6F8FB] border border-[#152238]/15 shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:bg-white hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 transition-all duration-300"
                      >
                        <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-[#5A6A7A] leading-none">
                          {label.slice(0, splitAt)}
                        </span>
                        <span className="font-inter text-[16px] font-semibold tracking-wide text-[#152238] leading-tight">
                          {label.slice(splitAt + 1)}
                        </span>
                      </a>
                    );
                  })}
                </div>
                <a href={templateData.business.phoneLink} className="inline-flex items-center justify-center gap-2 font-inter text-[15px] font-medium text-white/90 tracking-wide no-underline hover:text-white transition-colors duration-300 py-2">
                  <Phone size={15} strokeWidth={1.5} />
                  {templateData.business.phone}
                </a>
                <p className="font-inter text-[12px] text-white/80 tracking-wide">{tStr('finalCta.phoneSupport')}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="font-inter text-[12px] text-white/80 tracking-wide">{tStr('finalCta.trustLine')}</span>
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
