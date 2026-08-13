import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { X } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StepHeading, Choice, Segmented } from '@/components/shop/controls';
import { PurchaseSummary } from '@/components/shop/PurchaseSummary';
import { ShopInfoSections } from '@/components/shop/ShopInfoSections';
import { shopServices, shopAssets, type ShopServiceKey, type SeriesVisits } from '@/data/shop';

type CardLang = 'fi' | 'sv' | 'en';
type RecipientType = 'gift' | 'self';

export function ShopSeriesCardsPage() {
  const { tStr } = useLang();
  const { addItem } = useCart();
  const t = (key: string) => tStr(`shop.${key}`);

  const [serviceKey, setServiceKey] = useState<ShopServiceKey>('classic');
  const [durationIdx, setDurationIdx] = useState(1); // 50 min preselected
  const [visits, setVisits] = useState<SeriesVisits>(6); // middle option preselected
  const [recipientType, setRecipientType] = useState<RecipientType>('self');
  const [recipientName, setRecipientName] = useState('');
  const [cardLang, setCardLang] = useState<CardLang>('fi');
  const [previewOpen, setPreviewOpen] = useState(false);

  const service = shopServices.find((s) => s.key === serviceKey)!;
  const duration = service.durations[Math.min(durationIdx, service.durations.length - 1)];
  const selected = duration.series.find((s) => s.visits === visits) ?? duration.series[0];
  const serviceLabel = t(`serviceNames.${serviceKey}`);
  const normalPrice = duration.price * selected.visits;

  const langLabel = (l: CardLang) => t(l === 'fi' ? 'langFi' : l === 'sv' ? 'langSv' : 'langEn');
  const visitsLabel = (v: SeriesVisits) => t(v === 3 ? 'visits3' : v === 6 ? 'visits6' : 'visits12');
  const savingsLabel = (v: SeriesVisits) => t(v === 3 ? 'save10' : v === 6 ? 'save15' : 'save20');

  const recipientLine = recipientType === 'gift' && recipientName.trim() ? `${t('summaryRecipient')}: ${recipientName.trim()}` : null;
  const summaryMeta = [
    t('electronicSeries'),
    ...(recipientLine ? [recipientLine] : []),
    `${t('summaryLang')}: ${langLabel(cardLang)}`,
  ];

  const addSeriesCard = () => {
    addItem({
      lineId: `series-${selected.productId}-${recipientType}-${recipientName.trim()}-${cardLang}`,
      productId: selected.productId,
      type: 'series',
      label: t('cartSeries'),
      details: [
        `${serviceLabel} · ${duration.duration}`,
        visitsLabel(selected.visits),
        ...(recipientLine ? [recipientLine] : []),
        `${t('summaryLang')}: ${langLabel(cardLang)}`,
      ],
      price: selected.price,
      recipientName: recipientType === 'gift' ? recipientName.trim() : undefined,
      cardLanguage: cardLang,
    });
  };

  return (
    <div className="bg-white min-h-[100dvh]">
      <Helmet>
        <title>{t('seriesMetaTitle')}</title>
        <meta name="description" content={t('seriesMetaDescription')} />
      </Helmet>

      <Header />
      {/* Header spacer */}
      <div className="h-[60px] md:h-[68px]" />

      {/* Page intro */}
      <section className="bg-[#F7F5F2] pt-14 md:pt-20 pb-10 md:pb-12 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto text-center">
          <ScrollReveal>
            <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{t('heroEyebrow')}</p>
            <h1 className="font-cormorant text-[32px] md:text-[42px] text-[#152238] leading-[1.15] mb-5">{t('seriesPageTitle')}</h1>
            <p className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.7] max-w-[460px] mx-auto">{t('seriesPageSupport')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Configurator */}
      <section className="bg-white py-12 md:py-16 px-6 md:px-12 pb-28 md:pb-16">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 md:gap-14">
          <ScrollReveal>
            <div className="flex flex-col gap-8">
              <div>
                <StepHeading>{t('stepService')}</StepHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {shopServices.map((s) => (
                    <Choice
                      key={s.key}
                      selected={s.key === serviceKey}
                      onClick={() => { setServiceKey(s.key); setDurationIdx(Math.min(durationIdx, s.durations.length - 1)); }}
                    >
                      <span className="font-inter text-[14px] font-medium text-[#152238]">{t(`serviceNames.${s.key}`)}</span>
                    </Choice>
                  ))}
                </div>
              </div>

              <div>
                <StepHeading>{t('stepDuration')}</StepHeading>
                <div className="grid grid-cols-2 gap-2.5">
                  {service.durations.map((d, i) => (
                    <Choice key={d.duration} selected={i === durationIdx} onClick={() => setDurationIdx(i)} className="flex items-baseline justify-between">
                      <span className="font-inter text-[14px] font-medium text-[#152238]">{d.duration}</span>
                      <span className="font-cormorant text-[18px] font-semibold text-[#152238]">{d.price} &euro;</span>
                    </Choice>
                  ))}
                </div>
              </div>

              <div>
                <StepHeading>{t('stepVisits')}</StepHeading>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {duration.series.map((s) => {
                    const isSelected = s.visits === selected.visits;
                    return (
                      <Choice key={s.visits} selected={isSelected} onClick={() => setVisits(s.visits)} className="flex flex-col gap-1">
                        <span className="font-inter text-[14px] font-semibold text-[#152238]">{visitsLabel(s.visits)}</span>
                        <span className="font-inter text-[12px] text-[#5A6A7A]">{savingsLabel(s.visits)}</span>
                        <span className="flex items-baseline gap-2 mt-1">
                          <span className="font-cormorant text-[22px] font-semibold text-[#152238]">{s.price} &euro;</span>
                          <span className="font-inter text-[12px] text-[#5A6A7A]/70">({t('normalPrice')} {duration.price * s.visits} &euro;)</span>
                        </span>
                      </Choice>
                    );
                  })}
                </div>
              </div>

              <div>
                <StepHeading>{t('stepRecipient')}</StepHeading>
                <Segmented
                  value={recipientType}
                  onChange={setRecipientType}
                  options={[
                    { value: 'gift', label: t('asGift') },
                    { value: 'self', label: t('forSelf') },
                  ]}
                />
                {recipientType === 'gift' && (
                  <div className="mt-3">
                    <label htmlFor="series-recipient-name" className="block font-inter text-[12px] text-[#5A6A7A] mb-1.5">{t('recipientNameLabel')}</label>
                    <input
                      id="series-recipient-name"
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full max-w-[280px] rounded-lg border border-[#E2E8F0] px-4 py-2.5 font-inter text-[14px] text-[#152238] focus:outline-none focus:border-[#152238]/50"
                    />
                    <p className="font-inter text-[11px] text-[#5A6A7A] mt-1.5">{t('recipientHelper')}</p>
                  </div>
                )}
              </div>

              <div>
                <StepHeading>{t('stepLang')}</StepHeading>
                <Segmented
                  value={cardLang}
                  onChange={setCardLang}
                  ariaLabel={t('stepLang')}
                  options={[
                    { value: 'fi', label: t('langFi') },
                    { value: 'sv', label: t('langSv') },
                    { value: 'en', label: t('langEn') },
                  ]}
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="inline-flex min-h-[44px] items-center justify-center px-6 py-2.5 rounded-lg font-inter text-[13px] font-semibold tracking-wide text-[#152238] border border-[#152238]/30 hover:bg-[#152238]/5 transition-colors duration-300 cursor-pointer bg-transparent"
                >
                  {t('previewSeries')}
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <PurchaseSummary
              image={shopAssets.seriesCardImage}
              imageAlt="ME massage sarjakortti"
              title={serviceLabel}
              subtitle={`${visitsLabel(selected.visits)} · ${duration.duration}`}
              price={selected.price}
              meta={[...summaryMeta, `${t('normalPrice')} ${normalPrice} €`]}
              note={t('deliveryNote')}
              addLabel={t('addToCart').replace('{price}', String(selected.price))}
              onAdd={addSeriesCard}
            />
          </ScrollReveal>
        </div>
      </section>

      <ShopInfoSections />
      <Footer />

      {/* Card preview modal */}
      {previewOpen && (
        <div
          className="fixed inset-0 z-[70] bg-[#152238]/60 flex items-center justify-center px-6"
          onClick={() => setPreviewOpen(false)}
          role="dialog"
          aria-label={t('previewSeries')}
        >
          <div className="relative max-w-[560px] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#152238] shadow-md cursor-pointer border-none"
              aria-label={t('cartClose')}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
            <img src={shopAssets.seriesCardImage} alt="ME massage sarjakortti" className="w-full rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)]" />
          </div>
        </div>
      )}
    </div>
  );
}
