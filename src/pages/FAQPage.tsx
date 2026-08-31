import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FinalCtaSection } from '@/components/FinalCtaSection';
import { ArrowLeft, ArrowRight, Plus, Minus } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { businessInfo } from '@/data/site';

interface FaqItem {
  question: string;
  answer: string;
  /** Optional structured long-form answer (paragraphs + bullet list). */
  answerParagraphs?: string[];
  answerBullets?: string[];
  answerParagraphsAfter?: string[];
  linkText?: string;
  linkHref?: string;
  [key: string]: unknown;
}

interface FaqGroup {
  title: string;
  faqs: FaqItem[];
  [key: string]: unknown;
}

export function FAQPage() {
  const { tStr, tArr } = useLang();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const groups = tArr<FaqGroup>('faqPage.groups');

  return (
    <div className="bg-[#F7F5F2] min-h-[100dvh]">
      <Helmet>
        <title>{tStr('pages.faq.metaTitle')}</title>
        <meta name="description" content={tStr('pages.faq.metaDescription')} />
      </Helmet>
      <Header />
      <div className="h-[60px] md:h-[68px]" />

      <section className="pt-16 md:pt-20 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-inter text-[13px] text-[#1F2937] hover:text-[#152238] transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              {tStr('servicePages.backToHome')}
            </Link>
            <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">
              {tStr('faqPage.eyebrow')}
            </p>
            <h1 className="font-cormorant text-[26px] md:text-[32px] text-[#152238] leading-[1.25] mb-5">
              {tStr('faqPage.headline')}
            </h1>
            <p className="font-inter text-[14px] text-[#1F2937] leading-[1.7] mb-12 max-w-[440px]">
              {tStr('faqPage.supportText', { phone: businessInfo.phone })}
            </p>
          </ScrollReveal>

          {groups.map((group, gi) => (
            <ScrollReveal key={group.title} delay={gi * 0.05}>
              <div className="mb-12">
                <h2 className="font-inter text-[13px] font-medium uppercase tracking-[0.12em] text-[#5A6A7A] mb-2">
                  {group.title}
                </h2>
                {group.faqs.map((faq, fi) => {
                  const key = `${gi}-${fi}`;
                  const isOpen = openKey === key;
                  const isLong = !!(faq.answerParagraphs || faq.answerBullets);
                  return (
                    <div key={key} className="border-t border-[#E2E8F0]">
                      <button
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        className="group w-full flex items-start justify-between gap-4 py-5 text-left bg-transparent border-none cursor-pointer"
                      >
                        <span className="font-inter text-[15px] font-semibold text-[#152238] leading-[1.5]">{faq.question}</span>
                        <span className="shrink-0 mt-[2px] text-[#5A6A7A]/50 group-hover:text-[#5A6A7A]/70 transition-colors duration-300">
                          {isOpen ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-[400ms] ease-out"
                        style={{ maxHeight: isOpen ? (isLong ? '900px' : '280px') : '0px', opacity: isOpen ? 1 : 0 }}
                      >
                        <div className="font-inter text-[14px] text-[#1F2937] leading-[1.75] pb-6 max-w-[540px]">
                          {isLong ? (
                            <div className="space-y-4">
                              {faq.answerParagraphs?.map((para, pi) => <p key={pi}>{para}</p>)}
                              {faq.answerBullets && (
                                <ul className="list-disc pl-5 space-y-1.5">
                                  {faq.answerBullets.map((bullet, bi) => <li key={bi}>{bullet}</li>)}
                                </ul>
                              )}
                              {faq.answerParagraphsAfter?.map((para, pi) => <p key={pi}>{para}</p>)}
                            </div>
                          ) : (
                            faq.answer.replace('{phone}', businessInfo.phone)
                          )}
                          {faq.linkText && faq.linkHref && (
                            <Link
                              to={faq.linkHref}
                              className="group/link inline-flex items-center gap-1.5 mt-3 font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 decoration-[#152238]/25 hover:decoration-[#152238]/70 transition-colors duration-300"
                            >
                              {faq.linkText}
                              <ArrowRight size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover/link:translate-x-0.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="border-t border-[#E2E8F0]" />
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.2}>
            <div className="mt-4 text-center">
              <p className="font-inter text-[14px] text-[#152238] mb-5">
                {tStr('faqPage.notFound')}
              </p>
              <a
                href={businessInfo.phoneLink}
                className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300"
              >
                {tStr('faqPage.callButton')} {businessInfo.phone}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <FinalCtaSection />
      <Footer />
    </div>
  );
}
