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
import { shopServices, openGiftCardValues, shopAssets, type ShopServiceKey } from '@/data/shop';

type CardLang = 'fi' | 'sv' | 'en';
type RecipientType = 'gift' | 'self';

export function ShopGiftCardsPage() {
  const { tStr } = useLang();
  const { addItem } = useCart();
  const t = (key: string) => tStr(`shop.${key}`);

  const [tab, setTab] = useState<'service' | 'open'>('service');
  const [previewOpen, setPreviewOpen] = useState(false);

  // Service gift card selections (classic + 50 min preselected — most popular)
  const [serviceKey, setServiceKey] = useState<ShopServiceKey>('classic');
  const [durationIdx, setDurationIdx] = useState(1);
  const [recipientType, setRecipientType] = useState<RecipientType>('gift');
  const [recipientName, setRecipientName] = useState('');
  const [cardLang, setCardLang] = useState<CardLang>('fi');

  // Open gift card selections
  const [openValue, setOpenValue] = useState<number | null>(null);
  const [openRecipientType, setOpenRecipientType] = useState<RecipientType>('gift');
  const [openRecipientName, setOpenRecipientName] = useState('');
  const [openCardLang, setOpenCardLang] = useState<CardLang>('fi');

  const langLabel = (l: CardLang) => t(l === 'fi' ? 'langFi' : l === 'sv' ? 'langSv' : 'langEn');

  const service = shopServices.find((s) => s.key === serviceKey)!;
  const duration = service.durations[Math.min(durationIdx, service.durations.length - 1)];
  const serviceLabel = t(`serviceNames.${serviceKey}`);
  const recipientLine = (name: string, type: RecipientType) =>
    name.trim() ? `${t(type === 'gift' ? 'summaryRecipient' : 'summaryOwnName')}: ${name.trim()}` : null;

  const serviceMeta = [
    t('electronicGift'),
    ...(recipientLine(recipientName, recipientType) ? [recipientLine(recipientName, recipientType)!] : []),
    `${t('summaryLang')}: ${langLabel(cardLang)}`,
  ];

  const addServiceCard = () => {
    addItem({
      lineId: `gift-${duration.giftProductId}-${recipientType}-${recipientName.trim()}-${cardLang}`,
      productId: duration.giftProductId,
      type: 'gift',
      label: t('cartGift'),
      details: [
        `${serviceLabel} · ${duration.duration}`,
        ...(recipientLine(recipientName, recipientType) ? [recipientLine(recipientName, recipientType)!] : []),
        `${t('summaryLang')}: ${langLabel(cardLang)}`,
      ],
      price: duration.price,
      recipientName: recipientName.trim() || undefined,
      cardLanguage: cardLang,
    });
  };

  const openEntry = openGiftCardValues.find((v) => v.value === openValue) ?? null;
  const openMeta = [
    t('electronicGift'),
    ...(recipientLine(openRecipientName, openRecipientType) ? [recipientLine(openRecipientName, openRecipientType)!] : []),
    `${t('summaryLang')}: ${langLabel(openCardLang)}`,
  ];

  const addOpenCard = () => {
    if (!openEntry) return;
    addItem({
      lineId: `open-${openEntry.productId}-${openRecipientType}-${openRecipientName.trim()}-${openCardLang}`,
      productId: openEntry.productId,
      type: 'open',
      label: t('cartOpen'),
      details: [
        `${openEntry.value} €`,
        ...(recipientLine(openRecipientName, openRecipientType) ? [recipientLine(openRecipientName, openRecipientType)!] : []),
        `${t('summaryLang')}: ${langLabel(openCardLang)}`,
      ],
      price: openEntry.value,
      recipientName: openRecipientName.trim() || undefined,
      cardLanguage: openCardLang,
    });
  };

  const recipientBlock = (type: RecipientType, setType: (v: RecipientType) => void, name: string, setName: (v: string) => void, id: string) => (
    <div>
      <StepHeading>{t('stepRecipient')}</StepHeading>
      <Segmented
        value={type}
        onChange={setType}
        options={[
          { value: 'gift', label: t('asGift') },
          { value: 'self', label: t('forSelf') },
        ]}
      />
      <div className="mt-3">
        <label htmlFor={id} className="block font-inter text-[12px] text-[#5A6A7A] mb-1.5">{t(type === 'gift' ? 'recipientNameLabel' : 'ownNameLabel')}</label>
        <input
          id={id}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[280px] rounded-lg border border-[#E2E8F0] px-4 py-2.5 font-inter text-[14px] text-[#152238] focus:outline-none focus:border-[#152238]/50"
        />
        <p className="font-inter text-[11px] text-[#5A6A7A] mt-1.5">{t(type === 'gift' ? 'recipientHelper' : 'ownNameHelper')}</p>
      </div>
    </div>
  );

  const langBlock = (value: CardLang, onChange: (v: CardLang) => void) => (
    <div>
      <StepHeading>{t('stepLang')}</StepHeading>
      <Segmented
        value={value}
        onChange={onChange}
        ariaLabel={t('stepLang')}
        options={[
          { value: 'fi', label: t('langFi') },
          { value: 'sv', label: t('langSv') },
          { value: 'en', label: t('langEn') },
        ]}
      />
    </div>
  );

  return (
    <div className="bg-white min-h-[100dvh]">
      <Helmet>
        <title>{t('giftMetaTitle')}</title>
        <meta name="description" content={t('giftMetaDescription')} />
      </Helmet>

      <Header />
      {/* Header spacer */}
      <div className="h-[60px] md:h-[68px]" />

      {/* Page intro + tabs */}
      <section className="bg-[#F7F5F2] pt-14 md:pt-20 pb-10 md:pb-12 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto text-center">
          <ScrollReveal>
            <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-5">{t('heroEyebrow')}</p>
            <h1 className="font-cormorant text-[32px] md:text-[42px] text-[#152238] leading-[1.15] mb-5">{t('giftPageTitle')}</h1>
            <p className="font-inter text-[14px] md:text-[15px] text-[#5A6A7A] leading-[1.7] max-w-[440px] mx-auto mb-8">{t('giftPageSupport')}</p>
            <Segmented
              value={tab}
              onChange={setTab}
              ariaLabel={t('giftPageTitle')}
              options={[
                { value: 'service', label: t('tabService') },
                { value: 'open', label: t('tabOpen') },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Configurator */}
      <section className="bg-white py-12 md:py-16 px-6 md:px-12 pb-28 md:pb-16">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 md:gap-14">
          {tab === 'service' ? (
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

                {recipientBlock(recipientType, setRecipientType, recipientName, setRecipientName, 'recipient-name')}
                {langBlock(cardLang, setCardLang)}

                <div>
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    className="inline-flex min-h-[44px] items-center justify-center px-6 py-2.5 rounded-lg font-inter text-[13px] font-semibold tracking-wide text-[#152238] border border-[#152238]/30 hover:bg-[#152238]/5 transition-colors duration-300 cursor-pointer bg-transparent"
                  >
                    {t('preview')}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="flex flex-col gap-8">
                <div>
                  <StepHeading>{t('stepValue')}</StepHeading>
                  <div className="grid grid-cols-3 gap-2.5">
                    {openGiftCardValues.map((v) => (
                      <Choice key={v.value} selected={openValue === v.value} onClick={() => setOpenValue(v.value)} className="text-center">
                        <span className="font-cormorant text-[20px] font-semibold text-[#152238]">{v.value} &euro;</span>
                      </Choice>
                    ))}
                  </div>
                </div>

                {recipientBlock(openRecipientType, setOpenRecipientType, openRecipientName, setOpenRecipientName, 'open-recipient-name')}
                {langBlock(openCardLang, setOpenCardLang)}

                <div>
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    className="inline-flex min-h-[44px] items-center justify-center px-6 py-2.5 rounded-lg font-inter text-[13px] font-semibold tracking-wide text-[#152238] border border-[#152238]/30 hover:bg-[#152238]/5 transition-colors duration-300 cursor-pointer bg-transparent"
                  >
                    {t('preview')}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.1}>
            {tab === 'service' ? (
              <PurchaseSummary
                image={shopAssets.giftCardImage}
                imageAlt="ME massage lahjakortti"
                title={serviceLabel}
                subtitle={duration.duration}
                price={duration.price}
                meta={serviceMeta}
                note={t('deliveryNote')}
                addLabel={t('addToCart').replace('{price}', String(duration.price))}
                onAdd={addServiceCard}
              />
            ) : (
              <PurchaseSummary
                image={shopAssets.giftCardImage}
                imageAlt="ME massage lahjakortti"
                title={openEntry ? t('cartOpen') : null}
                subtitle={openEntry ? `${openEntry.value} €` : null}
                price={openEntry ? openEntry.value : null}
                meta={openMeta}
                note={t('deliveryNote')}
                addLabel={openEntry ? t('addToCart').replace('{price}', String(openEntry.value)) : t('addToCart').replace('{price}', '—')}
                onAdd={addOpenCard}
              />
            )}
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
          aria-label={t('preview')}
        >
          <div className="relative max-w-[560px] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#152238] shadow-md cursor-pointer border-none"
              aria-label={t('cartClose')}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
            <img src={shopAssets.giftCardImage} alt="ME massage lahjakortti" className="w-full rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)]" />
          </div>
        </div>
      )}
    </div>
  );
}
