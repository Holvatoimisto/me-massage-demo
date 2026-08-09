import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { locations } from '@/data/locations';
import { businessInfo } from '@/data/site';

export function ContactPage() {
  const { tStr } = useLang();
  const t = (key: string) => tStr(`pages.contact.${key}`);

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

      {/* Contact methods */}
      <section className="bg-white py-14 md:py-16 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            <ScrollReveal>
              <div>
                <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-3">{t('phoneLabel')}</p>
                <a
                  href={businessInfo.phoneLink}
                  className="font-cormorant text-[26px] md:text-[30px] text-[#152238] leading-[1.2] hover:text-[#1E3A5F] transition-colors duration-300"
                >
                  {businessInfo.phone}
                </a>
                <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7] mt-3">{t('openingHours')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div>
                <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-3">{t('emailLabel')}</p>
                <div className="flex flex-col gap-2">
                  {locations.map((location) => (
                    <a
                      key={location.slug}
                      href={`mailto:${location.email}`}
                      className="inline-flex items-center gap-2 font-inter text-[14px] text-[#1F2937] hover:text-[#152238] transition-colors duration-300"
                    >
                      <Mail size={14} strokeWidth={1.5} className="text-[#5A6A7A]" />
                      {location.email}
                    </a>
                  ))}
                </div>
                <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7] mt-3">{t('emailNote')}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Location cards */}
      <section className="bg-[#F7F5F2] py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-10 text-center">{t('locationsHeading')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {locations.map((location, i) => (
              <ScrollReveal key={location.slug} delay={0.05 + i * 0.08} className="h-full">
                <article className="bg-white rounded-xl border border-[#E2E8F0]/60 overflow-hidden h-full flex flex-col">
                  <img
                    src={location.image}
                    alt={`ME massage ${location.name}`}
                    className="w-full aspect-[16/10] object-cover object-center"
                  />
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-cormorant text-[24px] text-[#152238] leading-[1.2] mb-3">{location.name}</h3>
                    <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7] mb-2 flex items-start gap-2">
                      <MapPin size={14} strokeWidth={1.5} className="shrink-0 mt-[3px]" />
                      <span>
                        {location.addressLines.map((line) => (
                          <span key={line} className="block">{line}</span>
                        ))}
                      </span>
                    </p>
                    <a
                      href={`mailto:${location.email}`}
                      className="font-inter text-[13px] text-[#5A6A7A] hover:text-[#152238] leading-[1.7] mb-6 flex items-center gap-2 transition-colors duration-300"
                    >
                      <Mail size={14} strokeWidth={1.5} className="shrink-0" />
                      {location.email}
                    </a>
                    <div className="mt-auto flex flex-col gap-3">
                      <a
                        href={location.bookingUrl}
                        className="inline-flex min-h-[48px] items-center justify-center px-6 py-3 rounded-lg font-inter text-[13px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300"
                      >
                        {tStr(location.bookingLabelKey)}
                      </a>
                      <Link
                        to={`/toimipisteet/${location.slug}`}
                        className="inline-flex min-h-[48px] items-center justify-center px-6 py-3 rounded-lg font-inter text-[13px] font-semibold tracking-wide text-[#152238] border border-[#152238]/30 hover:bg-[#152238]/5 transition-colors duration-300"
                      >
                        {tStr(`locations.cta${location.slug === 'klaukkala' ? 'Klaukkala' : 'Vaasa'}`)}
                      </Link>
                    </div>
                  </div>
                </article>
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
