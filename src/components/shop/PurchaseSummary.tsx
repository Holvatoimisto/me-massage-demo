import { useLang } from '@/contexts/LanguageContext';

/**
 * Sticky purchase summary shown next to the shop configurators on desktop.
 * On mobile it collapses to a compact bottom purchase bar once the required
 * selections are made (price != null).
 */
export function PurchaseSummary({
  image,
  imageAlt,
  serviceImage,
  serviceImageAlt,
  selectionBadge,
  title,
  subtitle,
  price,
  meta,
  note,
  addLabel,
  onAdd,
}: {
  image: string;
  imageAlt: string;
  /** Selected treatment image; when set, it becomes the main visual and `image`
   *  (the card artwork) is shown as a smaller overlay. Omit for open-value cards. */
  serviceImage?: string;
  serviceImageAlt?: string;
  /** Small selection badge on the composed visual, e.g. "50 min" or "6 käyntiä". */
  selectionBadge?: string;
  /** e.g. "Klassinen hieronta" — null until selections are made. */
  title: string | null;
  /** e.g. "50 min" or "6 käyntiä · 50 min". */
  subtitle?: string | null;
  price: number | null;
  /** Small meta lines, e.g. ["Sähköinen lahjakortti", "Saaja: Anna", "Kieli: Suomi"]. */
  meta: string[];
  /** Small note under the CTA. */
  note: string;
  addLabel: string;
  onAdd: () => void;
}) {
  const { tStr } = useLang();

  return (
    <>
      {/* Desktop sticky panel */}
      <div className="hidden md:block md:sticky md:top-[92px]">
        <div className="rounded-xl border border-[#E2E8F0]/60 bg-white p-6 shadow-[0_4px_20px_rgba(21,34,56,0.06)]">
          {serviceImage ? (
            <div className="relative overflow-hidden rounded-lg mb-6 bg-[#F7F5F2] aspect-[1586/992]">
              <img
                src={serviceImage}
                alt={serviceImageAlt ?? ''}
                className="absolute inset-0 w-full h-full object-contain object-center p-4"
              />
              {selectionBadge && (
                <span className="absolute top-3 left-3 rounded-full bg-[#152238] px-3 py-1 font-inter text-[12px] font-semibold text-white tracking-wide">
                  {selectionBadge}
                </span>
              )}
              <img
                src={image}
                alt={imageAlt}
                className="absolute bottom-3 right-3 w-[42%] rounded-md shadow-[0_8px_24px_rgba(21,34,56,0.22)] rotate-[3deg]"
              />
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg mb-6">
              <img src={image} alt={imageAlt} className="w-full aspect-[1586/992] object-contain object-center" />
            </div>
          )}

          {title === null || price === null ? (
            <p className="font-inter text-[13px] text-[#5A6A7A] text-center py-6">{tStr('shop.selectPrompt')}</p>
          ) : (
            <>
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <div>
                  <p className="font-cormorant text-[22px] font-semibold text-[#152238] leading-[1.2]">{title}</p>
                  {subtitle && <p className="font-inter text-[13px] text-[#5A6A7A] mt-0.5">{subtitle}</p>}
                </div>
                <p className="font-cormorant text-[28px] font-semibold text-[#152238] whitespace-nowrap">{price} &euro;</p>
              </div>
              <div className="border-t border-[#E2E8F0]/70 pt-4 mb-5 flex flex-col gap-1">
                {meta.map((line, i) => (
                  <p key={i} className="font-inter text-[12px] text-[#5A6A7A]">{line}</p>
                ))}
              </div>
              <button
                type="button"
                onClick={onAdd}
                className="inline-flex w-full min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide whitespace-nowrap bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300 cursor-pointer"
              >
                {addLabel}
              </button>
              <p className="font-inter text-[11px] text-[#5A6A7A] text-center mt-3">{note}</p>
            </>
          )}
        </div>
      </div>

      {/* Mobile bottom purchase bar */}
      {title !== null && price !== null && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgba(21,34,56,0.12)] px-5 pt-2.5 pb-3">
          <p className="font-inter text-[12px] text-[#5A6A7A] text-center truncate mb-2">
            {title}{subtitle ? ` · ${subtitle}` : ''} · {price} &euro;
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex w-full min-h-[50px] items-center justify-center px-6 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide whitespace-nowrap bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300 cursor-pointer"
          >
            {addLabel}
          </button>
        </div>
      )}
    </>
  );
}
