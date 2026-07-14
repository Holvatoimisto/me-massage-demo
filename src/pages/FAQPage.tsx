import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export function FAQPage() {
  const { tStr, tArr } = useLang();

  const faqs = tArr<{question: string; answer: string}>('faqPage.faqs');

  return (
    <div className="bg-white min-h-[100dvh]">
      <div className="h-[60px] md:h-[68px]" />

      <section className="pt-16 md:pt-20 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-inter text-[13px] text-[#565656] hover:text-[#2B2B2B] transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              {tStr('servicePages.backToHome')}
            </Link>
            <p className="font-inter text-[10px] font-medium uppercase tracking-[4px] text-[#2B2B2B]/60 mb-5">
              {tStr('faqPage.eyebrow')}
            </p>
            <h1 className="font-cormorant text-[26px] md:text-[32px] text-[#2B2B2B] leading-[1.25] mb-5">
              {tStr('faqPage.headline')}
            </h1>
            <p className="font-inter text-[14px] text-[#2B2B2B] leading-[1.7] mb-12 max-w-[440px]">
              {tStr('faqPage.supportText', { phone: '040 833 8512' })}
            </p>
          </ScrollReveal>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="border-t border-[#1A1A1A]/[0.06] py-6">
                  <h3 className="font-inter text-[16px] font-medium text-[#2B2B2B] leading-[1.5] mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-inter text-[14px] text-[#565656] leading-[1.7]">
                    {faq.answer}
                  </p>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-[#1A1A1A]/[0.06]" />
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <p className="font-inter text-[14px] text-[#2B2B2B] mb-5">
                {tStr('faqPage.notFound')}
              </p>
              <a
                href="tel:+358408338512"
                className="inline-flex items-center justify-center px-10 py-[14px] rounded font-inter text-[14px] font-semibold bg-[#2B2B2B] text-white hover:bg-[#565656] transition-colors duration-300"
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
