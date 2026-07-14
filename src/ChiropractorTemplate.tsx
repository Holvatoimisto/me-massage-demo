import { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Plus,
  Minus,
  Globe,
} from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useClickOutside } from '@/hooks/useClickOutside';

const templateData = {
  business: {
    name: 'ME massage',
    tagline: 'Hierontaa ja kehonhuoltoa',
    fullTagline: 'ME MASSAGE — HIERONTAA JA KEHONHUOLTOA',
    address: 'Lepsämäntie 1, 2 krs, 01800 Klaukkala',
    phone: '040 833 8512',
    phoneLink: 'tel:+358408338512',
    email: 'info.klaukkala@memassage.fi',
    emailLink: 'mailto:info.klaukkala@memassage.fi',
    bookingUrl: 'https://memassage.fi/ajanvaraus',
    googleReviewUrl: 'https://g.page/r/CeK1L8vJ3Z1KEAE',
    googleMapsUrl: 'https://maps.google.com/?q=ME+massage+Klaukkala',
    facebookUrl: 'https://www.facebook.com/memassage',
    instagramUrl: 'https://www.instagram.com/memassage',
  },
  navigation: {
    logo: '/assets/me_logo.png',
    logoDark: '/assets/me_logo.png',
    backgroundColor: '#1F1F1F',
    links: [
      { label: 'ETUSIVU', href: '#' },
      { label: 'Palvelut', href: '#palvelut' },
      { label: 'Hinnasto', href: '#hinnasto' },
      { label: 'Yhteystiedot', href: '#yhteystiedot' },
    ],
    extraLinks: [
      { label: 'Asiakkaiden kokemuksia', href: '#arvostelut' },
      { label: 'Usein kysyttyä', href: '/usein-kysyttya' },
    ],
    ctaButton: { label: 'Varaa aika', href: 'https://memassage.fi/ajanvaraus' },
  },
  hero: {
    backgroundImage: '/assets/me_hero.jpg',
    eyebrow: 'ME MASSAGE',
    headline: 'Ammattitaitoista hierontaa Klaukkalassa ja Vaasassa',
    subheadline: 'Klassinen hieronta, kuumakivihieronta, purentalihashieronta ja faskiarautakäsittely. Koulutettu hieroja Mathias Eklund.',
    ctaPrimary: { label: 'Varaa aika', href: 'https://memassage.fi/ajanvaraus' },
    ctaSecondary: { label: 'Tutustu palveluihin', href: '#palvelut' },
    stats: [
      { value: '4.9', label: 'Google-arvostelu' },
      { value: '2023', label: 'Vuodesta lähtien' },
      { value: '2', label: 'Toimipistettä' },
    ],
  },
  intro: {
    text: 'Ammattitaitoista hierontaa ja kehonhuoltoa',
    backgroundColor: '#1F1F1F',
  },
  services: {
    eyebrow: 'PALVELUT',
    headline: 'Hierontaa ja kehonhuoltoa',
    body: 'Valitse tarpeisiisi sopiva hoito. Kaikki hoidot räätälöidään yksilöllisesti.',
    reassurance: 'Etkö ole varma mikä palvelu sopii sinulle? Soita 040 833 8512 ja kysy.',
    primaryServices: [
      {
        image: '/assets/me_hero.jpg',
        title: 'Klassinen hieronta',
        description: 'Perinteinen hieronta lihaskireyksiin ja rentoutumiseen. Voimakkuus räätälöidään aina asiakkaan tarpeiden mukaan.',
        linkText: 'Tutustu hierontaan',
        linkHref: '/palvelut/hieronta',
      },
      {
        image: '/assets/me_mathias.jpg',
        title: 'Kuumakivihieronta',
        description: 'Lämpimien kivien avulla tehtävä hieronta, joka rentouttaa syvällä tasolla ja lievittää lihaskireyksiä.',
        linkText: 'Tutustu kuumakivihierontaan',
        linkHref: '/palvelut/kuumakivihieronta',
      },
    ],
    secondaryLabel: 'Myös saatavilla',
    secondaryServices: [
      { image: '/assets/me_hero.jpg', title: 'Purentalihashieronta', linkHref: '/palvelut/purentalihashieronta' },
      { image: '/assets/me_mathias.jpg', title: 'Faskiarautakäsittely', linkHref: '/palvelut/faskiarautakasittely' },
    ],
  },
  pricing: {
    eyebrow: 'HINNASTO',
    headline: 'Selkeät hinnat, ei yllätyksiä',
    body: 'Kaikki hoidot räätälöidään yksilöllisesti tarpeidesi mukaan.',
    tabs: [
      {
        key: 'hieronta',
        label: 'Klassinen hieronta',
        description: 'Klassinen hieronta kaikilla tekniikoilla. Voimakkuus räätälöidään aina asiakkaan tarpeiden mukaan.',
        items: [
          { duration: '30 min', price: '35' },
          { duration: '45 min', price: '45' },
          { duration: '60 min', price: '55' },
          { duration: '75 min', price: '65' },
          { duration: '90 min', price: '75' },
          { duration: '120 min', price: '95' },
        ],
      },
      {
        key: 'kuumakivihieronta',
        label: 'Kuumakivihieronta',
        description: 'Lämpimien kivien avulla tehtävä hieronta, joka rentouttaa syvällä tasolla ja lievittää lihaskireyksiä.',
        items: [
          { duration: '60 min', price: '70' },
          { duration: '75 min', price: '80' },
          { duration: '90 min', price: '85' },
        ],
      },
      {
        key: 'purentalihashieronta',
        label: 'Purentalihashieronta',
        description: 'Erikoishoito leukojen ja purentalihasten alueelle. Lievittää jännitystä ja parantaa alueen toimintaa.',
        items: [
          { duration: '45 min', price: '60' },
          { duration: '60 min', price: '70' },
        ],
      },
      {
        key: 'faskiarautakasittely',
        label: 'Faskiarautakäsittely',
        description: 'IASTM-tekniikka lihaskireyksien ja fascian käsittelyyn. Tehokas apuvälinehoito.',
        items: [
          { duration: '30 min', price: '50' },
          { duration: '45 min', price: '65' },
          { duration: '60 min', price: '80' },
          { duration: '75 min', price: '95' },
          { duration: '90 min', price: '110' },
        ],
      },
    ],
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
    columns: [
      {
        title: 'Palvelut',
        links: [
          { label: 'Klassinen hieronta', href: '/palvelut/hieronta' },
          { label: 'Kuumakivihieronta', href: '/palvelut/kuumakivihieronta' },
          { label: 'Purentalihashieronta', href: '/palvelut/purentalihashieronta' },
          { label: 'Faskiarautakäsittely', href: '/palvelut/faskiarautakasittely' },
        ],
      },
      {
        title: 'Yritys',
        links: [
          { label: 'Tutustu tiimiin', href: '#tiimi' },
          { label: 'Asiakkaiden kokemuksia', href: '#arvostelut' },
          { label: 'Usein kysyttyä', href: '/usein-kysyttya' },
        ],
      },
      {
        title: 'Yhteystiedot',
        links: [
          { label: '040 833 8512', href: 'tel:+358408338512' },
          { label: 'info.klaukkala@memassage.fi', href: 'mailto:info.klaukkala@memassage.fi' },
          { label: 'Lepsämäntie 1, 2 krs, Klaukkala', href: '#' },
          { label: 'Vaasanpuistikko 1 A1, Vaasa', href: '#' },
        ],
      },
    ],
    paymentMethods: 'Maksutavat: Käteinen, MobilePay, Edenred, Smartum, Epassi',
    copyright: 'ME massage. Kaikki oikeudet pidätetään.',
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

const getServiceDropdownItems = (tStr: (p: string) => string) => [
  { label: tStr('services.primary.classic.title'), href: '/palvelut/hieronta' },
  { label: tStr('services.primary.hotStone.title'), href: '/palvelut/kuumakivihieronta' },
  { label: tStr('services.jaw'), href: '/palvelut/purentalihashieronta' },
  { label: tStr('services.iastm'), href: '/palvelut/faskiarautakasittely' },
];

export function ChiropractorTemplate() {
  const { lang, setLang, tStr, tArr } = useLang();
  const langRef = useRef<HTMLDivElement>(null);
  useClickOutside(langRef, () => setLangOpen(false));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [teamTransitioning, setTeamTransitioning] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [activePricingTab, setActivePricingTab] = useState(0);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);
  const [langOpen, setLangOpen] = useState(false);

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1F1F1F] shadow-[0_1px_12px_rgba(0,0,0,0.18)]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-[60px] md:h-[68px] flex items-center justify-between">
          <Link to="/" className="relative z-10">
            <img
              src={templateData.navigation.logo}
              alt={templateData.business.name}
              className="h-9 md:h-10 w-auto transition-opacity duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {/* Etusivu */}
            <a
              href="#"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.12em] text-[#FFFFFF]/90 hover:text-[#DEDEDE] transition-colors duration-300"
            >
              Etusivu
            </a>

            {/* Palvelut dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 font-inter text-[13px] font-semibold uppercase tracking-[0.12em] text-[#FFFFFF]/90 hover:text-[#DEDEDE] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Palvelut
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 w-[240px] bg-[#3A3A3A] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[#F4F4F4]/[0.06] py-2 overflow-hidden"
                >
                  {getServiceDropdownItems(tStr).map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-2.5 font-inter text-[13px] text-[#FFFFFF]/80 hover:text-[#DEDEDE] hover:bg-[#F4F4F4]/[0.04] transition-colors duration-200"
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-[#F4F4F4]/[0.06] mt-1 pt-1">
                    <a
                      href="#palvelut"
                      className="block px-4 py-2.5 font-inter text-[12px] font-semibold uppercase tracking-wider text-[#DEDEDE]/80 hover:text-[#DEDEDE] transition-colors duration-200"
                      onClick={() => setServicesOpen(false)}
                    >
                      Kaikki palvelut →
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Hinnasto */}
            <a
              href="#hinnasto"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.12em] text-[#FFFFFF]/90 hover:text-[#DEDEDE] transition-colors duration-300"
            >
              Hinnasto
            </a>

            {/* Yhteystiedot */}
            <a
              href="#yhteystiedot"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.12em] text-[#FFFFFF]/90 hover:text-[#DEDEDE] transition-colors duration-300"
            >
              Yhteystiedot
            </a>

            {/* Extra links */}
            {templateData.navigation.extraLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-inter text-[13px] font-medium tracking-[0.12em] text-[#FFFFFF]/90 hover:text-[#DEDEDE] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-inter text-[13px] font-medium tracking-[0.12em] text-[#FFFFFF]/90 hover:text-[#DEDEDE] transition-colors duration-300"
                >
                  {link.label}
                </a>
              )
            )}

            {/* Language selector */}
            <div ref={langRef} className="relative hidden lg:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 font-inter text-[12px] font-semibold uppercase tracking-[0.1em] text-[#FFFFFF]/70 hover:text-[#FFFFFF] transition-colors duration-300 bg-transparent border-none cursor-pointer"
              >
                <Globe size={14} strokeWidth={1.5} />
                {lang === 'fi' ? 'FI' : lang === 'en' ? 'EN' : 'SV'}
              </button>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-1 w-[52px] bg-[#3A3A3A] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[#F4F4F4]/[0.06] py-1.5 overflow-hidden"
                >
                  {[
                    { code: 'fi' as const, label: 'FI' },
                    { code: 'en' as const, label: 'EN' },
                    { code: 'sv' as const, label: 'SV' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`block w-full text-left px-3 py-1.5 font-inter text-[12px] transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                        l.code === lang
                          ? 'text-[#FFFFFF] font-semibold'
                          : 'text-[#FFFFFF]/50 hover:text-[#FFFFFF]/80'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* CTA Button */}
            <a
              href={templateData.navigation.ctaButton.href}
              className="inline-flex min-h-[40px] items-center justify-center px-5 py-2 rounded-md font-inter text-[13px] font-semibold tracking-[0.06em] bg-white text-[#1F1F1F] hover:bg-[#F0F0F0] transition-colors duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
            >
              {templateData.navigation.ctaButton.label}
            </a>
          </div>

          {/* Mobile: language + menu buttons */}
          <div className="md:hidden flex items-center gap-2 relative z-10">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-0.5 font-inter text-[11px] font-semibold uppercase tracking-wider text-[#FFFFFF]/70 bg-transparent border-none cursor-pointer px-1.5 py-1"
            >
              <Globe size={16} strokeWidth={1.5} />
              {lang === 'fi' ? 'FI' : lang === 'en' ? 'EN' : 'SV'}
            </button>
            {langOpen && (
              <div className="absolute top-full right-8 mt-1 w-[52px] bg-[#3A3A3A] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[#F4F4F4]/[0.06] py-1.5 overflow-hidden">
                {[
                  { code: 'fi' as const, label: 'FI' },
                  { code: 'en' as const, label: 'EN' },
                  { code: 'sv' as const, label: 'SV' },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`block w-full text-left px-3 py-1.5 font-inter text-[12px] transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                      l.code === lang
                        ? 'text-[#FFFFFF] font-semibold'
                        : 'text-[#FFFFFF]/50 hover:text-[#FFFFFF]/80'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-[#FFFFFF] transition-colors bg-transparent border-none cursor-pointer"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#1F1F1F] border-t border-white/[0.08] px-5 py-6"
          >
            <a href="#" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">{tStr('nav.home')}</a>

            {/* Mobile services dropdown */}
            <div className="border-b border-[#F4F4F4]/[0.06]">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-3 font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 bg-transparent border-none cursor-pointer"
              >
                <span>{tStr('nav.services')}</span>
                <ChevronDown size={16} strokeWidth={1.5} className={`text-[#FFFFFF]/50 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pb-3 pl-3">
                  {getServiceDropdownItems(tStr).map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block py-2 font-inter text-[13px] text-[#FFFFFF]/70 hover:text-[#DEDEDE] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a href="#palvelut" onClick={() => setMobileOpen(false)} className="block py-2 font-inter text-[12px] font-semibold uppercase tracking-wider text-[#FFFFFF]/70">{tStr('nav.allServices')} →</a>
                </div>
              )}
            </div>

            <a href="#hinnasto" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">{tStr('nav.pricing')}</a>
            <a href="#yhteystiedot" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">{tStr('nav.contact')}</a>

            {templateData.navigation.extraLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-inter text-[14px] text-[#FFFFFF]/60 py-3 border-b border-[#F4F4F4]/[0.06] last:border-0"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-inter text-[14px] text-[#FFFFFF]/60 py-3 border-b border-[#F4F4F4]/[0.06] last:border-0"
                >
                  {link.label}
                </a>
              )
            )}

            {/* Mobile language selector */}
            <div className="mt-4 pt-4 border-t border-[#F4F4F4]/[0.06] flex items-center justify-center gap-1">
              <Globe size={14} strokeWidth={1.5} className="text-[#FFFFFF]/40 mr-1" />
              {[
                { code: 'fi' as const, label: 'Suomi' },
                { code: 'en' as const, label: 'English' },
                { code: 'sv' as const, label: 'Sverige' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`font-inter text-[13px] px-2.5 py-1.5 rounded transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                    l.code === lang
                      ? 'text-[#FFFFFF] font-semibold'
                      : 'text-[#FFFFFF]/40 hover:text-[#FFFFFF]/70'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="mt-3">
              <a
                href={templateData.navigation.ctaButton.href}
                className="inline-flex min-h-[40px] items-center justify-center w-full px-5 py-2 rounded-md font-inter text-[14px] font-semibold tracking-wide bg-white text-[#1F1F1F] hover:bg-[#F0F0F0] transition-colors duration-300"
              >
                {templateData.navigation.ctaButton.label}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{ backgroundImage: `url(${templateData.hero.backgroundImage})` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(31,31,31,0.58) 0%, rgba(31,31,31,0.42) 42%, rgba(31,31,31,0.76) 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.03 }} />
        <div className="relative z-10 w-full max-w-[800px] mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-[60px]">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-inter text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#B3B3B3] mb-5"
          >
            {tStr('hero.eyebrow')}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-cormorant text-[36px] md:text-[48px] lg:text-[56px] text-[#FFFFFF] leading-[1.15] mb-6 max-w-[700px]"
          >
            {tStr('hero.headline')}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-[14px] md:text-[16px] text-[#DEDEDE]/65 leading-[1.7] mb-10 max-w-[520px]"
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
              className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-white text-[#1F1F1F] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-[#F0F0F0] transition-colors duration-300"
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
                <p className="font-cormorant text-[22px] md:text-[26px] text-[#FFFFFF] leading-none mb-1.5">{stat.value}</p>
                <p className="font-inter text-[10px] md:text-[11px] text-[#B3B3B3] tracking-[0.06em]">
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
          <p className="font-cormorant text-[17px] md:text-[20px] text-[#DEDEDE]/70 tracking-[0.02em]">
            {tStr('intro')}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="palvelut" className="bg-[#F7F5F2] pt-16 md:pt-20 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[920px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-18">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A7A7A] mb-5">{tStr('services.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#1F1F1F] leading-[1.35] mb-6">{tStr('services.headline')}</h2>
              <p className="font-inter text-[14px] text-[#4A4A4A] leading-[1.75] max-w-[440px] mx-auto">{tStr('services.body')}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {templateData.services.primaryServices.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <Link to={service.linkHref} className="group block rounded-[12px] overflow-hidden bg-white border border-[#1F1F1F]/[0.06] shadow-[0_8px_28px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
                  <div className="relative overflow-hidden">
                    <img src={service.image} alt={service.title} loading="lazy" className="w-full aspect-[16/10.5] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(86,86,86,0.018) 0%, transparent 40%, rgba(222,222,222,0.15) 100%)', mixBlendMode: 'multiply' }} />
                  </div>
                  <div className="px-8 pt-7 pb-9 md:px-10 md:pt-8 md:pb-10">
                    <h3 className="font-cormorant text-[26px] md:text-[28px] text-[#1F1F1F] mb-4">{i === 0 ? tStr('services.primary.classic.title') : tStr('services.primary.hotStone.title')}</h3>
                    <p className="font-inter text-[14px] text-[#4A4A4A] leading-[1.75] mb-8 max-w-[340px]">{i === 0 ? tStr('services.primary.classic.description') : tStr('services.primary.hotStone.description')}</p>
                    <span className="inline-flex items-center gap-1.5 font-inter text-[13px] text-[#1F1F1F]/60 group-hover:text-[#1F1F1F] transition-colors duration-300">
                      {i === 0 ? tStr('services.primary.classic.link') : tStr('services.primary.hotStone.link')}
                      <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-18 md:mt-22 pt-12 border-t border-[#2B2B2B]/[0.04]">
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-[#565656]/70 text-center mb-10">{tStr('services.secondaryLabel')}</p>
              <div className="grid grid-cols-3 gap-4 md:gap-5">
                {templateData.services.secondaryServices.map((service, i) => (
                  <Link key={i} to={service.linkHref} className="group block rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                    <div className="relative overflow-hidden aspect-[4/3.2]">
                      <img src={service.image} alt={service.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" style={service.title === 'Dry Needling' ? { objectPosition: 'left center' } : undefined} />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(43,43,43,0.3) 100%)' }} />
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <p className="font-cormorant text-[15px] md:text-[17px] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">{i === 0 ? tStr('services.jaw') : tStr('services.iastm')}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Symptom Survey */}
              <div className="mt-14 md:mt-18 max-w-[520px] mx-auto">
                {surveyStep === 0 ? (
                  /* Intro view */
                  <div className="text-center">
                    <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#565656] mb-4">{tStr('survey.eyebrow')}</p>
                    <h3 className="font-cormorant text-[22px] md:text-[26px] text-[#2B2B2B] leading-[1.35] mb-3">{tStr('survey.headline')}</h3>
                    <p className="font-inter text-[14px] text-[#565656] leading-[1.7] mb-6">{tStr('survey.description')}</p>
                    <button
                      onClick={() => { setSurveyStep(1); setSurveyAnswers([]); }}
                      className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#1F1F1F] text-white hover:bg-[#3A3A3A] transition-colors duration-300 cursor-pointer"
                    >
                      {tStr('survey.startButton')}
                    </button>
                    <p className="font-inter text-[12px] text-[#565656]/50 mt-3">{tStr('survey.duration')}</p>
                  </div>
                ) : surveyStep <= 4 ? (
                  /* Question views */
                  <div>
                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mb-8">
                      <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565656]">{tStr('survey.step')} {surveyStep} {tStr('survey.of')} 4</span>
                      <div className="flex-1 h-[2px] bg-[#2B2B2B]/[0.08] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2B2B2B] rounded-full transition-all duration-500" style={{ width: `${(surveyStep / 4) * 100}%` }} />
                      </div>
                    </div>
                    {/* Question */}
                    <h3 className="font-cormorant text-[22px] md:text-[24px] text-[#2B2B2B] leading-[1.35] mb-6">{getSurveyQuestions(tStr)[surveyStep - 1].question}</h3>
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
                          className="text-left px-5 py-4 rounded-xl bg-white/[0.5] border border-[#B3B3B3]/60 hover:bg-white hover:border-[#2B2B2B]/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer"
                        >
                          <span className="font-inter text-[14px] text-[#2B2B2B]">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                    {/* Back button */}
                    {surveyStep > 1 && (
                      <button
                        onClick={() => { setSurveyStep(surveyStep - 1); }}
                        className="font-inter text-[13px] text-[#565656] hover:text-[#2B2B2B] transition-colors cursor-pointer"
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
                        <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#565656] mb-4">{tStr('survey.resultEyebrow')}</p>
                        <h3 className="font-cormorant text-[24px] md:text-[28px] text-[#2B2B2B] leading-[1.3] mb-4">{rec.title}</h3>
                        <p className="font-inter text-[14px] text-[#565656] leading-[1.75] mb-8">{rec.description}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                          <a
                            href={rec.bookingUrl}
                            className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#1F1F1F] text-white hover:bg-[#3A3A3A] transition-colors duration-300"
                          >
                            Varaa aika
                          </a>
                          <Link
                            to={rec.serviceLink}
                            className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-[#1F1F1F] border border-[#1F1F1F]/30 hover:bg-[#1F1F1F]/5 transition-colors duration-300"
                          >
                            {tStr('survey.exploreService')}
                          </Link>
                        </div>
                        <button
                          onClick={() => { setSurveyStep(0); setSurveyAnswers([]); }}
                          className="font-inter text-[13px] text-[#565656] hover:text-[#2B2B2B] transition-colors mt-6 cursor-pointer"
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
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A7A7A] mb-5">{tStr('pricing.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[30px] text-[#1F1F1F] leading-[1.35] mb-4">{tStr('pricing.headline')}</h2>
              <p className="font-inter text-[14px] text-[#4A4A4A] leading-[1.75] max-w-[400px] mx-auto">{tStr('pricing.body')}</p>
            </div>
          </ScrollReveal>

          {/* Tab selector */}
          <ScrollReveal delay={0.1}>
            <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-8 pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {templateData.pricing.tabs.map((tab, i) => (
                <button
                  key={tab.key}
                  onClick={() => setActivePricingTab(i)}
                  className={`shrink-0 px-4 py-2.5 rounded-lg font-inter text-[13px] font-medium tracking-wide transition-all duration-200 cursor-pointer border ${
                    i === activePricingTab
                      ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] shadow-[0_2px_8px_rgba(0,0,0,0.16)]'
                      : 'bg-transparent text-[#1F1F1F] border-[#1F1F1F]/20 hover:bg-[#1F1F1F]/5'
                  }`}
                >
                  {tStr(`pricing.tabs.${tab.key}.label`)}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Active tab content */}
          <ScrollReveal delay={0.15}>
            <div className="mb-8">
              <p className="font-inter text-[13px] text-[#565656] mb-4">{tStr(`pricing.tabs.${templateData.pricing.tabs[activePricingTab].key}.description`)}</p>
              <div className="border-t border-[#2B2B2B]/[0.1]">
                {templateData.pricing.tabs[activePricingTab].items.map((item, ii) => (
                  <div
                    key={ii}
                    className={`flex justify-between items-baseline py-4 ${
                      ii < templateData.pricing.tabs[activePricingTab].items.length - 1 ? 'border-b border-[#2B2B2B]/[0.08]' : ''
                    }`}
                  >
                    <span className="font-inter text-[15px] font-medium text-[#2B2B2B]">{item.duration}</span>
                    <span className="flex items-baseline gap-1">
                      <span className="font-cormorant text-[22px] text-[#2B2B2B]">{item.price}</span>
                      <span className="font-inter text-[13px] text-[#565656]/60">&euro;</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={templateData.business.bookingUrl}
                className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#1F1F1F] text-white hover:bg-[#3A3A3A] transition-colors duration-300"
              >
                Varaa aika
              </a>
              <a
                href={templateData.business.phoneLink}
                className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-[#1F1F1F] border border-[#1F1F1F]/30 hover:bg-[#1F1F1F]/5 transition-colors duration-300"
              >
                {tStr('pricing.askService')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews */}
      <section id="arvostelut" className="bg-[#1F1F1F] pt-20 md:pt-28 pb-14 md:pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 25%, rgba(86,86,86,0.05) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.02 }} />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 mb-5">{tStr('reviews.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#FFFFFF] leading-[1.35] mb-6">{tStr('reviews.headline')}</h2>
              <p className="font-inter text-[14px] text-white/60 leading-[1.7] max-w-[420px] mx-auto">{tStr('reviews.description')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative">
              {/* Cards + side arrows */}
              <div className="flex items-center gap-3 md:gap-4">
                {/* Left arrow */}
                <button onClick={prevReview} className="shrink-0 w-10 h-10 rounded-full border border-[#F4F4F4]/10 flex items-center justify-center text-[#FFFFFF]/40 hover:text-[#DEDEDE] hover:border-[#DEDEDE]/30 transition-colors bg-transparent cursor-pointer">
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>

                {/* Cards */}
                <div className="flex-1 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {visibleReviews.map((review, i) => (
                    <div key={`${reviewIndex}-${i}`} className="flex-shrink-0 w-[260px] md:w-[290px] snap-start">
                      <div className="bg-[#2A2A2A] rounded-xl p-7 md:p-9 border border-white/[0.05] shadow-[0_8px_24px_rgba(0,0,0,0.16)] h-full flex flex-col">
                        <p className="font-inter text-[14px] text-[#FFFFFF]/90 leading-[1.75] italic flex-1">&ldquo;{review.text}&rdquo;</p>
                        <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#FFFFFF]/[0.06]">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="font-cormorant text-[15px] text-[#FFFFFF]/60">{review.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-inter text-[14px] font-bold text-[#FFFFFF]">{review.name}</p>
                            <p className="font-inter text-[11px] text-[#DEDEDE]/50">{review.service}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right arrow */}
                <button onClick={nextReview} className="shrink-0 w-10 h-10 rounded-full border border-[#F4F4F4]/10 flex items-center justify-center text-[#FFFFFF]/40 hover:text-[#DEDEDE] hover:border-[#DEDEDE]/30 transition-colors bg-transparent cursor-pointer">
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Bottom CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <a
                  href="https://www.google.com/search?q=me+massage+arvostelut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-white text-[#1F1F1F] shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#F0F0F0] transition-colors duration-300"
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
      <section id="tiimi" className="relative bg-[#F7F5F2] pt-20 md:pt-28 pb-8 md:pb-10 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 25%, rgba(86,86,86,0.05) 0%, transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
        <div className="relative max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A7A7A] mb-5">{tStr('team.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#1F1F1F] leading-[1.2]">{tStr('team.headline')}</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-[38%_1fr] gap-8 md:gap-14 items-start">
            <div style={{ opacity: teamTransitioning ? 0 : 1, transform: teamTransitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 350ms ease-in-out, transform 350ms ease-out' }}>
              <div className="relative overflow-hidden rounded-lg mx-auto md:mx-0 max-w-[320px] md:max-w-none">
                <img src={activeTeamMember.image} alt={activeTeamMember.name} loading="lazy" className="w-full aspect-[4/5] object-cover object-[center_20%]" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 65%, rgba(43,43,43,0.45) 100%)' }} />
              </div>
            </div>

            <div style={{ opacity: teamTransitioning ? 0 : 1, transform: teamTransitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 350ms ease-in-out, transform 350ms ease-out' }}>
              <p className="font-cormorant text-[22px] md:text-[24px] text-[#1F1F1F] mb-2">{activeTeamMember.name}</p>
              <p className="font-inter text-[12px] font-medium text-[#7A7A7A] tracking-[0.12em] uppercase mb-8">{activeTeamMember.title}</p>
              <div className="font-inter text-[14px] text-[#4A4A4A] leading-[1.8] mb-8 max-w-[420px] space-y-4">
                {activeTeamMember.bio.split('\\n\\n').map((para, pi) => (
                  <p key={pi}>{para}</p>
                ))}
              </div>

              {activeTeamMember.testimonial && (
                <div className="mb-8 max-w-[420px]">
                  <div className="pl-3 border-l border-[#1F1F1F]/10">
                    <p className="font-inter text-[13px] italic text-[#7A7A7A] leading-[1.7]">&ldquo;{activeTeamMember.testimonial}&rdquo;</p>
                  </div>
                </div>
              )}

              {/* Profile selector */}
              <div className="flex gap-5 md:gap-7 mb-7">
                {teamMembers.map((t, i) => (
                  <button key={i} onClick={() => handleTeamSelect(i)} className="group flex flex-col items-center text-center cursor-pointer bg-transparent border-none p-0">
                    <div className={`rounded-full overflow-hidden mb-2 transition-all duration-300 ${i === activeTeamIndex ? 'w-12 h-12 md:w-14 md:h-14 border-2 border-[#B3B3B3] opacity-100 scale-105' : 'w-10 h-10 md:w-11 md:h-11 border border-[#565656]/20 opacity-60 group-hover:opacity-85 scale-100'}`}>
                      <img src={t.avatar} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <p className={`font-inter text-[11px] mb-px transition-colors duration-300 ${i === activeTeamIndex ? 'text-[#1F1F1F]' : 'text-[#7A7A7A] group-hover:text-[#1F1F1F]'}`}>{t.name.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F5F2] pt-16 md:pt-20 pb-6 md:pb-8 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-14">
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A7A7A] mb-5">{tStr('faq.eyebrow')}</p>
              <h2 className="font-cormorant text-[26px] md:text-[32px] text-[#1F1F1F] leading-[1.25]">{tStr('faq.headline')}</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-12 md:mb-14">
              {tArr<{question: string; answer: string; includePhone?: boolean}>('faq.items').map((faq, i) => (
                <div key={i} className="border-t border-[#2B2B2B]/[0.06]">
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className="group w-full flex items-start justify-between gap-4 py-5 md:py-6 text-left bg-transparent border-none cursor-pointer">
                    <span className="font-inter text-[15px] md:text-[16px] font-semibold text-[#1F1F1F] leading-[1.5]">{faq.question}</span>
                    <span className="shrink-0 mt-[2px] text-[#565656]/50 group-hover:text-[#565656]/70 transition-colors duration-300">
                      {openFaqIndex === i ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                    </span>
                  </button>
                  <div className="overflow-hidden transition-all duration-[400ms] ease-out" style={{ maxHeight: openFaqIndex === i ? '220px' : '0px', opacity: openFaqIndex === i ? 1 : 0 }}>
                    <div className="font-inter text-[14px] text-[#4A4A4A] leading-[1.75] pb-5 md:pb-6 max-w-[540px]">
                      {faq.answer.replace('{phone}', templateData.business.phone)}
                      {faq.includePhone && (
                        <a href={templateData.business.phoneLink} className="block mt-3 font-inter text-[14px] text-[#2B2B2B]/70 tracking-wider no-underline hover:text-[#2B2B2B] hover:underline underline-offset-4 decoration-[#4A4540]/20 transition-colors duration-300">
                          📞 {templateData.business.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#2B2B2B]/[0.06]" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{ backgroundImage: `url(${templateData.finalCta.backgroundImage})` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(31,31,31,0.84) 0%, rgba(31,31,31,0.58) 42%, rgba(31,31,31,0.92) 100%)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }} />
        <div className="relative z-10 w-full max-w-[480px] mx-auto px-6 pt-[2vh]">
          <ScrollReveal>
            <div className="text-center">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B0B0B0] mb-4">{tStr('finalCta.eyebrow')}</p>
              <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#FFFFFF] leading-[1.25] mb-4">{tStr('finalCta.headline')}</h2>
              <p className="font-inter text-[15px] text-[#D8D8D8] leading-[1.6] mb-10 max-w-[340px] mx-auto">{tStr('finalCta.supportText')}</p>

              <div className="flex flex-col items-center gap-3 mb-8">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[480px]">
                  <a href="https://memassage.fi/ajanvaraus" className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-white text-[#1F1F1F] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-[#F0F0F0] transition-colors duration-300 w-full sm:w-1/2">
                    {tStr('finalCta.bookKlaukkala')}
                  </a>
                  <a href="https://memassage.fi/ajanvaraus" className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-white text-[#1F1F1F] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-[#F0F0F0] transition-colors duration-300 w-full sm:w-1/2">
                    {tStr('finalCta.bookVaasa')}
                  </a>
                </div>
                <a href={templateData.business.phoneLink} className="inline-flex items-center justify-center gap-2 font-inter text-[15px] font-medium text-[#D8D8D8] tracking-wide no-underline hover:text-[#FFFFFF] transition-colors duration-300 py-2">
                  <Phone size={15} strokeWidth={1.5} />
                  {templateData.business.phone}
                </a>
                <p className="font-inter text-[12px] text-[#A0A0A0] tracking-wide">{tStr('finalCta.phoneSupport')}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="font-inter text-[12px] text-[#D0D0D0] tracking-wide">{tStr('finalCta.trustLine')}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer id="yhteystiedot" className="bg-[#1F1F1F] pt-14 md:pt-16 pb-10 md:pb-12 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10">
            <div>
              <h3 className="font-cormorant text-[18px] text-[#FFFFFF] mb-1">{templateData.business.name}</h3>
              <p className="font-inter text-[13px] text-[#565656]/60 mb-4">{templateData.business.tagline}</p>
              <ul className="space-y-2">
                <li className="font-inter text-[14px] text-[#565656] flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" /> {templateData.business.address}
                </li>
                <li>
                  <a href={templateData.business.phoneLink} className="font-inter text-[14px] text-[#565656] hover:text-[#FFFFFF] transition-colors flex items-center gap-2 no-underline">
                    <Phone size={14} className="shrink-0" /> {templateData.business.phone}
                  </a>
                </li>
                <li>
                  <a href={templateData.business.emailLink} className="font-inter text-[14px] text-[#565656] hover:text-[#FFFFFF] transition-colors flex items-center gap-2 no-underline">
                    <Mail size={14} className="shrink-0" /> {templateData.business.email}
                  </a>
                </li>
              </ul>
            </div>
            {templateData.footer.columns.map((col, i) => (
              <div key={i}>
                <h4 className="font-inter text-[13px] font-semibold uppercase tracking-wider text-[#FFFFFF] mb-4">{tStr(`footer.${col.title === 'Palvelut' ? 'services' : col.title === 'Yritys' ? 'company' : 'contact'}`)}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href} className="font-inter text-[14px] text-[#565656] hover:text-[#FFFFFF] transition-colors no-underline">{link.label}</Link>
                      ) : (
                        <a href={link.href} className="font-inter text-[14px] text-[#565656] hover:text-[#FFFFFF] transition-colors no-underline">{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Google Maps */}
          <div className="border-t border-[#F4F4F4]/[0.06] pt-10 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-inter text-[12px] font-semibold uppercase tracking-wider text-[#FFFFFF]/80 mb-3">{tStr('footer.maps.klaukkala')}</p>
                <p className="font-inter text-[13px] text-[#565656] mb-3">{tStr('footer.klaukkala')}</p>
                <div className="rounded-lg overflow-hidden border border-[#F4F4F4]/[0.08]" style={{ filter: 'grayscale(25%) contrast(95%) brightness(90%)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1966.0!2d24.7554!3d60.3819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468e45c6a8e8c1b5%3A0x8e1e2b3c4d5e6f7a!2sLeps%C3%A4m%C3%A4ntie+1%2C+01800+Klaukkala!5e0!3m2!1sfi!2sfi!4v1"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ME massage Klaukkala"
                  />
                </div>
              </div>
              <div>
                <p className="font-inter text-[12px] font-semibold uppercase tracking-wider text-[#FFFFFF]/80 mb-3">{tStr('footer.maps.vaasa')}</p>
                <p className="font-inter text-[13px] text-[#565656] mb-3">{tStr('footer.maps.vaasaAddress')}</p>
                <div className="rounded-lg overflow-hidden border border-[#F4F4F4]/[0.08]" style={{ filter: 'grayscale(25%) contrast(95%) brightness(90%)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1966.0!2d21.6152!3d63.0951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x467d5c5c5c5c5c5c%3A0x5d5e5f5a5b5c5d5e!2sVaasanpuistikko+1+A1%2C+65100+Vaasa!5e0!3m2!1sfi!2sfi!4v1"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ME massage Vaasa"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#F4F4F4]/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-inter text-[12px] text-[#565656]/45">{tStr('footer.copyright')}</p>
            <p className="font-inter text-[12px] text-[#565656]/35">{tStr('footer.paymentMethods')}</p>
            <div className="flex gap-4">
              <a href={templateData.business.instagramUrl} className="text-[#565656]/50 hover:text-[#FFFFFF]/70 transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
              <a href={templateData.business.facebookUrl} className="text-[#565656]/50 hover:text-[#FFFFFF]/70 transition-colors"><Facebook size={18} strokeWidth={1.5} /></a>
              <a href={templateData.business.phoneLink} className="text-[#565656]/50 hover:text-[#FFFFFF]/70 transition-colors"><Phone size={18} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
