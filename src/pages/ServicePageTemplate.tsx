import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useBookingModal } from '@/contexts/BookingModalContext';
import { businessInfo } from '@/data/site';
import { pricingTabs } from '@/data/pricing';
import { teamMembers } from '@/data/team';

type ServiceKey = 'classic' | 'hotStone' | 'jaw' | 'iastm';

interface ProcessStep {
  title: string;
  text: string;
  [key: string]: unknown;
}

interface DurationGuideItem {
  duration: string;
  text: string;
  [key: string]: unknown;
}

interface ServiceFaqItem {
  question: string;
  answer: string;
  [key: string]: unknown;
}

interface ServiceDetail {
  key: ServiceKey;
  slug: string;
  image: string;
}

const SERVICES: ServiceDetail[] = [
  { key: 'classic', slug: 'hieronta', image: '/assets/me_service_classic.png' },
  { key: 'hotStone', slug: 'kuumakivihieronta', image: '/assets/me_service_hot_stone.png' },
  { key: 'jaw', slug: 'purentalihashieronta', image: '/assets/me_service_jaw.png' },
  { key: 'iastm', slug: 'faskiarautakasittely', image: '/assets/me_service_iastm.png' },
];

const locationNames = (memberLocations: ('klaukkala' | 'vaasa')[]): string =>
  memberLocations.length === 2 ? 'Klaukkala ja Vaasa' : 'Klaukkala';

export function ServicePageTemplate() {
  const { t, tStr, tArr } = useLang();
  const { openBookingModal } = useBookingModal();
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="bg-[#F7F5F2] min-h-[100dvh]">
        <Header />
        <div className="h-[60px] md:h-[68px]" />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="font-cormorant text-2xl text-[#152238] mb-4">ME massage</h1>
          <Link to="/palvelut" className="font-inter text-[13px] text-[#1F2937] hover:text-[#152238]">
            {tStr('servicePages.allServices')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const p = (key: string) => `servicePages.${service.key}.${key}`;
  const title = tStr(p('title'));
  const subtitle = tStr(p('subtitle'));
  const introParagraphs = t(p('intro')) as string[];
  const benefits = t(p('benefits')) as string[];
  const process = {
    heading: tStr(p('process.heading')),
    steps: tArr<ProcessStep>(p('process.steps')),
  };
  const durationGuide = tArr<DurationGuideItem>(p('durationGuide.items'));
  const serviceFaqs = tArr<ServiceFaqItem>(p('faq'));
  const areasHeading = tStr(p('areas.heading'));
  const areas = Array.isArray(t(p('areas.items'))) ? (t(p('areas.items')) as string[]) : [];
  const expectationsHeading = tStr(p('expectations.heading'));
  const expectations = Array.isArray(t(p('expectations.items'))) ? (t(p('expectations.items')) as string[]) : [];

  // Prices always come from the centralized pricing data; the duration guide
  // texts are matched to them by duration label.
  const pricingTab = pricingTabs.find((tab) => tab.key === service.key);
  const durationRows = (pricingTab?.items ?? []).map((item) => ({
    duration: item.duration,
    price: item.price,
    text: durationGuide.find((g) => g.duration === item.duration)?.text ?? '',
  }));

  return (
    <div className="bg-[#F7F5F2] min-h-[100dvh]">
      <Helmet>
        <title>{tStr(p('metaTitle'))}</title>
        <meta name="description" content={tStr(p('metaDescription'))} />
      </Helmet>
      <Header />
      {/* Header spacer */}
      <div className="h-[60px] md:h-[68px]" />

      {/* Hero */}
      <section className="relative h-[52vh] md:h-[56vh] overflow-hidden">
        <img src={service.image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#152238]/65" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8] mb-4">
              {tStr('servicePages.heroEyebrow')}
            </p>
            <h1 className="font-cormorant text-[30px] md:text-[40px] font-semibold text-white leading-[1.15] mb-4">
              {title}
            </h1>
            <p className="font-inter text-[14px] text-white/80 max-w-[420px] mx-auto mb-8">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openBookingModal}
                className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-white text-[#152238] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-[#E2E8F0] transition-colors duration-300 cursor-pointer border-none"
              >
                {tStr('pricing.bookNow')}
              </button>
              <Link
                to="/hinnasto"
                className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-white border border-white/30 hover:bg-white/10 transition-colors duration-300"
              >
                {tStr('servicePages.viewPricing')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is this treatment */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <Link
              to="/palvelut"
              className="group inline-flex items-center gap-2 font-inter text-[13px] text-[#1F2937] hover:text-[#152238] transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              {tStr('servicePages.allServices')}
            </Link>
            <h2 className="font-cormorant text-[24px] md:text-[30px] text-[#152238] leading-[1.25] mb-6">
              {tStr(p('introHeading'))}
            </h2>
            <div className="space-y-5">
              {introParagraphs.map((paragraph, i) => (
                <p key={i} className="font-inter text-[15px] text-[#1F2937] leading-[1.8]">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Treatment process */}
      <section className="bg-[#F7F5F2] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[30px] text-[#152238] leading-[1.25] mb-10">
              {process.heading}
            </h2>
          </ScrollReveal>
          <div>
            {process.steps.map((step, i) => (
              <ScrollReveal key={i} delay={0.05 + i * 0.06}>
                <div className="flex gap-6 md:gap-8 border-t border-[#E2E8F0] py-7">
                  <span className="font-cormorant text-[28px] md:text-[32px] text-[#152238]/25 leading-none shrink-0 w-8">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-inter text-[15px] font-semibold text-[#152238] leading-[1.5] mb-2">
                      {step.title}
                    </h3>
                    <p className="font-inter text-[14px] text-[#1F2937] leading-[1.75]">
                      {step.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-[#E2E8F0]" />
          </div>

          {/* Treatment areas (jaw) */}
          {areas.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div className="mt-14">
                <h3 className="font-cormorant text-[20px] md:text-[24px] text-[#152238] leading-[1.3] mb-6">
                  {areasHeading}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {areas.map((area, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-[6px] h-[6px] rounded-full bg-[#152238]/40 shrink-0" />
                      <span className="font-inter text-[14px] text-[#152238]">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Duration & price guidance */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[30px] text-[#152238] leading-[1.25] mb-3">
              {tStr('servicePages.chooseDuration')}
            </h2>
            <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7] mb-10">
              {tStr('servicePages.durationPriceNote')}
            </p>
          </ScrollReveal>
          <div>
            {durationRows.map((row, i) => (
              <ScrollReveal key={row.duration} delay={0.05 + i * 0.05}>
                <div className="border-t border-[#E2E8F0] py-6">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <span className="font-inter text-[15px] font-semibold text-[#152238]">{row.duration}</span>
                    <span className="font-cormorant text-[22px] font-semibold text-[#152238]">{row.price} &euro;</span>
                  </div>
                  {row.text && (
                    <p className="font-inter text-[14px] text-[#1F2937] leading-[1.7]">{row.text}</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-[#E2E8F0]" />
          </div>

          {/* What to expect (IASTM) */}
          {expectations.length > 0 && (
            <ScrollReveal delay={0.1}>
              <div className="mt-14">
                <h3 className="font-cormorant text-[20px] md:text-[24px] text-[#152238] leading-[1.3] mb-6">
                  {expectationsHeading}
                </h3>
                <div className="space-y-4">
                  {expectations.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-[6px] h-[6px] rounded-full bg-[#152238]/40 shrink-0 mt-[9px]" />
                      <p className="font-inter text-[14px] text-[#1F2937] leading-[1.75]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Benefits */}
          <ScrollReveal delay={0.1}>
            <div className="mt-14">
              <h3 className="font-inter text-[13px] font-medium uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">
                {tStr('servicePages.benefits')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#152238]/40 shrink-0" />
                    <span className="font-inter text-[14px] text-[#152238]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Therapist trust */}
      <section className="bg-[#152238] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-cormorant text-[24px] md:text-[30px] text-white leading-[1.25] mb-4">
                {tStr('servicePages.therapistsHeading')}
              </h2>
              <p className="font-inter text-[14px] text-white/70 leading-[1.7] max-w-[480px] mx-auto">
                {tStr('servicePages.therapistsText')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-[640px] mx-auto">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.id} delay={0.05 + i * 0.08}>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border border-white/15">
                    <img src={member.image} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-cormorant text-[20px] text-white leading-[1.2] mb-1">{member.name}</p>
                    <p className="font-inter text-[12px] text-[#94A3B8] leading-[1.5] mb-1.5">{tStr(member.titleKey)}</p>
                    <p className="font-inter text-[11px] text-white/50 tracking-wide flex items-center gap-1.5">
                      <MapPin size={11} strokeWidth={1.5} />
                      {locationNames(member.locations)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQ */}
      <section className="bg-[#F7F5F2] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[30px] text-[#152238] leading-[1.25] mb-10">
              {tStr('servicePages.faqHeading')}
            </h2>
          </ScrollReveal>
          <div>
            {serviceFaqs.map((faq, i) => (
              <ScrollReveal key={i} delay={0.05 + i * 0.05}>
                <div className="border-t border-[#E2E8F0] py-6">
                  <h3 className="font-inter text-[15px] font-medium text-[#152238] leading-[1.5] mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-inter text-[14px] text-[#1F2937] leading-[1.75]">
                    {faq.answer.replace('{phone}', businessInfo.phone)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-[#E2E8F0]" />
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <h2 className="font-inter text-[13px] font-medium uppercase tracking-[0.12em] text-[#5A6A7A] mb-6">
              {tStr('servicePages.allServices')}
            </h2>
            <div>
              {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
                <Link
                  key={s.slug}
                  to={`/palvelut/${s.slug}`}
                  className="group flex items-baseline justify-between gap-4 border-t border-[#E2E8F0] py-5"
                >
                  <span>
                    <span className="block font-inter text-[15px] font-semibold text-[#152238] mb-1">
                      {tStr(`servicePages.${s.key}.title`)}
                    </span>
                    <span className="block font-inter text-[13px] text-[#5A6A7A] leading-[1.6]">
                      {tStr(`servicePages.${s.key}.subtitle`)}
                    </span>
                  </span>
                  <ArrowRight size={15} strokeWidth={1.5} className="shrink-0 text-[#5A6A7A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#152238]" />
                </Link>
              ))}
              <div className="border-t border-[#E2E8F0]" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalCtaSection />
      <Footer />
    </div>
  );
}
