// Shared selection controls for the shop configurators.

export function StepHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-inter text-[13px] font-semibold uppercase tracking-[0.12em] text-[#152238] mb-3">
      {children}
    </h3>
  );
}

/** Selectable option card — navy border + faint navy tint when selected. */
export function Choice({
  selected,
  onClick,
  children,
  className = '',
  ariaLabel,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className={`text-left rounded-lg border px-4 py-3.5 transition-all duration-200 cursor-pointer ${
        selected
          ? 'border-[#152238] bg-[#152238]/[0.04] shadow-sm'
          : 'border-[#E2E8F0] bg-transparent hover:border-[#152238]/30 hover:bg-[#152238]/5'
      } ${className}`}
    >
      {children}
    </button>
  );
}

/** Segmented control (recipient type, card language). */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
}) {
  return (
    <div className="inline-flex rounded-lg border border-[#E2E8F0] p-1 gap-1" role="group" aria-label={ariaLabel}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`px-4 py-2 rounded-md font-inter text-[13px] font-medium transition-all duration-200 cursor-pointer border-none ${
            value === opt.value
              ? 'bg-[#152238] text-white shadow-sm'
              : 'bg-transparent text-[#152238] hover:bg-[#152238]/5'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
