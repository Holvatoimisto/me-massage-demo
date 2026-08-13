import { useLang } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ScrollReveal';

/** "How the digital card works" + shop FAQ — shared by the shop subpages. */
export function ShopInfoSections() {
  const { tStr } = useLang();
  const t = (key: string) => tStr(`shop.${key}`);

  const steps = [
    { title: t('step1Title'), text: t('step1Text') },
    { title: t('step2Title'), text: t('step2Text') },
    { title: t('step3Title'), text: t('step3Text') },
  ];

  const faqs = [
    { q: t('faq1q'), a: t('faq1a') },
    { q: t('faq2q'), a: t('faq2a') },
    { q: t('faq3q'), a: t('faq3a') },
    { q: t('faq4q'), a: t('faq4a') },
  ];

  return (
    <>
      <section className="bg-[#F7F5F2] py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-10 md:mb-12 text-center">{t('stepsTitle')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={0.05 + i * 0.06}>
                <p className="font-cormorant text-[28px] font-semibold text-[#152238]/25 leading-none mb-3">{i + 1}.</p>
                <h3 className="font-inter text-[14px] font-semibold text-[#152238] mb-2">{step.title}</h3>
                <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7]">{step.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20 px-6 md:px-12">
        <div className="max-w-[860px] mx-auto">
          <ScrollReveal>
            <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-10 text-center">{t('faqTitle')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={0.05 + i * 0.05}>
                <h3 className="font-inter text-[14px] font-semibold text-[#152238] mb-2">{faq.q}</h3>
                <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7]">{faq.a}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
