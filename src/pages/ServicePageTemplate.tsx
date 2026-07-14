import { useParams, Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  duration: string;
  image: string;
  eyebrow: string;
}

const getServices = (tStr: (p: string) => string): ServiceDetail[] => [
  {
    slug: 'hieronta',
    eyebrow: tStr('servicePages.classic.eyebrow'),
    title: tStr('servicePages.classic.title'),
    subtitle: tStr('servicePages.classic.subtitle'),
    description: tStr('servicePages.classic.description'),
    benefits: tStr('servicePages.classic.benefits').split('|'),
    duration: tStr('servicePages.classic.duration'),
    image: '/assets/me_hero.jpg',
  },
  {
    slug: 'kuumakivihieronta',
    eyebrow: tStr('servicePages.hotStone.eyebrow'),
    title: tStr('servicePages.hotStone.title'),
    subtitle: tStr('servicePages.hotStone.subtitle'),
    description: tStr('servicePages.hotStone.description'),
    benefits: tStr('servicePages.hotStone.benefits').split('|'),
    duration: tStr('servicePages.hotStone.duration'),
    image: '/assets/me_mathias.jpg',
  },
  {
    slug: 'purentalihashieronta',
    eyebrow: tStr('servicePages.jaw.eyebrow'),
    title: tStr('servicePages.jaw.title'),
    subtitle: tStr('servicePages.jaw.subtitle'),
    description: tStr('servicePages.jaw.description'),
    benefits: tStr('servicePages.jaw.benefits').split('|'),
    duration: tStr('servicePages.jaw.duration'),
    image: '/assets/me_hero.jpg',
  },
  {
    slug: 'faskiarautakasittely',
    eyebrow: tStr('servicePages.iastm.eyebrow'),
    title: tStr('servicePages.iastm.title'),
    subtitle: tStr('servicePages.iastm.subtitle'),
    description: tStr('servicePages.iastm.description'),
    benefits: tStr('servicePages.iastm.benefits').split('|'),
    duration: tStr('servicePages.iastm.duration'),
    image: '/assets/me_mathias.jpg',
  },
];

export function ServicePageTemplate() {
  const { tStr } = useLang();
  const { slug } = useParams<{ slug: string }>();
  const services = getServices(tStr);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="bg-[#F7F5F2] pt-32 pb-20 px-6 text-center">
        <h1 className="font-cormorant text-2xl text-[#1F1F1F] mb-4">{tStr("servicePages.classic.title")}</h1>
        <Link to="/" className="font-inter text-[13px] text-[#4A4A4A] hover:text-[#1F1F1F]">
          {tStr("servicePages.backToHome")}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5F2] min-h-[100dvh]">
      {/* Header spacer */}
      <div className="h-[60px] md:h-[68px]" />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[55vh] overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="font-inter text-[11px] font-medium uppercase tracking-[3px] text-white/40 mb-4">
              {service.eyebrow}
            </p>
            <h1 className="font-cormorant text-[28px] md:text-[36px] text-white leading-[1.2] mb-4">
              {service.title}
            </h1>
            <p className="font-inter text-[14px] text-white/60 max-w-[400px] mx-auto">
              {service.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-inter text-[13px] text-[#4A4A4A] hover:text-[#1F1F1F] transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              {tStr("servicePages.backToHome")}
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-cormorant text-[22px] md:text-[26px] text-[#1F1F1F] leading-[1.3] mb-6">
              {service.subtitle}
            </h2>
            <p className="font-inter text-[15px] text-[#4A4A4A] leading-[1.75] mb-10">
              {service.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h3 className="font-inter text-[13px] font-semibold uppercase tracking-[2px] text-[#565656] mb-5">
              {tStr("servicePages.benefits")}
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {(typeof service.benefits === "string" ? (service.benefits as unknown as string).split("|") : service.benefits).map((b: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#2B2B2B]/50 shrink-0" />
                  <span className="font-inter text-[14px] text-[#2B2B2B]">{b}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex items-center gap-4 mb-10 py-4 border-t border-b border-[#1A1A1A]/[0.05]">
              <span className="font-inter text-[13px] font-semibold uppercase tracking-[2px] text-[#565656]">
                Kesto
              </span>
              <span className="font-inter text-[15px] font-medium text-[#2B2B2B]">
                {service.duration}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <a
              href="https://memassage.fi/ajanvaraus"
              className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#1F1F1F] text-white hover:bg-[#3A3A3A] transition-colors duration-300 mb-4"
            >
              {tStr("pricing.bookNow")}
            </a>
            <p className="font-inter text-[13px] text-[#565656]/60">
              {tStr("servicePages.backToHome").includes("Takaisin") ? "tai soita" : "or call"} <a href="tel:+358408338512" className="text-[#565656] hover:text-[#2B2B2B]">040 833 8512</a>
            </p>
          </ScrollReveal>

          {/* All services nav */}
          <ScrollReveal delay={0.25}>
            <div className="mt-14 pt-10 border-t border-[#1A1A1A]/[0.05]">
              <h3 className="font-inter text-[13px] font-semibold uppercase tracking-[2px] text-[#565656] mb-5">
                {tStr("servicePages.allServices")}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/palvelut/${s.slug}`}
                    className={`font-inter text-[13px] py-2 transition-colors duration-300 flex items-center gap-1.5 ${
                      s.slug === service.slug
                        ? 'text-[#2B2B2B] font-medium'
                        : 'text-[#2B2B2B] hover:text-[#2B2B2B]'
                    }`}
                  >
                    {s.title.split(' ')[0]}
                    {s.slug !== service.slug && <ArrowRight size={11} strokeWidth={1.5} />}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
