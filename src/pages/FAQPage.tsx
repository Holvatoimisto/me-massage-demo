import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export function FAQPage() {
  const { tStr, tArr } = useLang();

  const faqs = tArr<{question: string; answer: string}>('faqPage.faqs');

  return (
    <div className="bg-[#F7F5F2] min-h-[100dvh]">
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
              {tStr('faqPage.supportText', { phone: '040 833 8512' })}
            </p>
          </ScrollReveal>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="border-t border-[#E2E8F0] py-6">
                  <h3 className="font-inter text-[16px] font-medium text-[#152238] leading-[1.5] mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-inter text-[14px] text-[#1F2937] leading-[1.7]">
                    {faq.answer}
                  </p>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-[#E2E8F0]" />
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <p className="font-inter text-[14px] text-[#152238] mb-5">
                {tStr('faqPage.notFound')}
              </p>
              <a
                href="tel:+358408338512"
                className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300"
              >
                {tStr('faqPage.callButton')} 040 833 8512
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
