import { Helmet } from 'react-helmet-async';
import { useLang } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { teamMembers } from '@/data/team';

const mathias = teamMembers.find((m) => m.id === 'mathias')!;
const janina = teamMembers.find((m) => m.id === 'janina')!;

function LocationPills({ locations }: { locations: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {locations.map((loc) => (
        <span
          key={loc}
          className="inline-flex items-center rounded-full border border-[#152238]/20 bg-white px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-[0.08em] text-[#152238]"
        >
          {loc === 'klaukkala' ? 'Klaukkala' : 'Vaasa'}
        </span>
      ))}
    </div>
  );
}

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

      {/* Mathias — featured primary profile */}
      <section className="bg-[#F7F5F2] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <ScrollReveal>
              <div className="overflow-hidden rounded-lg max-w-[420px] mx-auto md:mx-0">
                <img
                  src={mathias.image}
                  alt={mathias.name}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover object-[center_top]"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{t('profileEyebrow')}</p>
              <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#152238] leading-[1.2] mb-2">{mathias.name}</h2>
              <p className="font-inter text-[12px] font-medium text-[#5A6A7A] tracking-[0.12em] uppercase mb-5">{tStr(mathias.titleKey)}</p>
              <div className="mb-6">
                <LocationPills locations={mathias.locations} />
              </div>
              {tStr(mathias.bioKey).split('\n\n').map((para, i) => (
                <p key={i} className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.75] mb-4 last:mb-0">{para}</p>
              ))}
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

      {/* Klaukkala team — Mathias & Janina */}
      <section className="bg-[#F7F5F2] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <ScrollReveal>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/mathias-ja-janina.png"
                  alt={t('teamHeading')}
                  loading="lazy"
                  className="w-full aspect-square object-cover object-center"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{t('teamEyebrow')}</p>
              <h2 className="font-cormorant text-[28px] md:text-[34px] text-[#152238] leading-[1.2] mb-8">{t('teamHeading')}</h2>

              {/* Mathias — concise identity/location reference (full bio above) */}
              <div className="mb-8">
                <p className="font-cormorant text-[20px] text-[#152238] leading-[1.2] mb-1">{mathias.name}</p>
                <p className="font-inter text-[11px] font-medium text-[#5A6A7A] tracking-[0.12em] uppercase mb-3">{tStr(mathias.titleKey)}</p>
                <LocationPills locations={mathias.locations} />
              </div>

              {/* Janina — full centralized bio (incl. purentalihashieronta) */}
              <div>
                <p className="font-cormorant text-[20px] text-[#152238] leading-[1.2] mb-1">{janina.name}</p>
                <p className="font-inter text-[11px] font-medium text-[#5A6A7A] tracking-[0.12em] uppercase mb-3">{tStr(janina.titleKey)}</p>
                <div className="mb-4">
                  <LocationPills locations={janina.locations} />
                </div>
                {tStr(janina.bioKey).split('\n\n').map((para, i) => (
                  <p key={i} className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.75] mb-4 last:mb-0">{para}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FinalCtaSection />
      <Footer />
    </div>
  );
}
