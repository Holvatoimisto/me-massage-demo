import { useLang } from '@/contexts/LanguageContext';

/**
 * Sticky purchase summary shown next to the shop configurators on desktop.
 * On mobile it collapses to a compact bottom purchase bar once the required
 * selections are made (price != null).
 */
export function PurchaseSummary({
  image,
  imageAlt,
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
          <div className="overflow-hidden rounded-lg mb-6">
            <img src={image} alt={imageAlt} className="w-full aspect-[1586/992] object-cover object-center" />
          </div>

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
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgba(21,34,56,0.12)] px-5 py-3">
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
