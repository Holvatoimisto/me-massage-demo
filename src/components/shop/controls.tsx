// Shared selection controls for the shop configurators.

import { Check } from 'lucide-react';

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

/** Visual service selection card — treatment image + name, Choice semantics. */
export function ServiceChoice({
  selected,
  onClick,
  image,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  /** Treatment image asset path. */
  image: string;
  /** Translated service name. */
  label: string;
}) {
  return (
    <Choice selected={selected} onClick={onClick} ariaLabel={label} className="p-0 overflow-hidden">
      <span className="relative block bg-[#F7F5F2] aspect-[4/3]">
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-contain p-3" />
        {selected && (
          <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#152238] flex items-center justify-center">
            <Check size={13} strokeWidth={2.5} className="text-white" />
          </span>
        )}
      </span>
      <span className="block px-4 py-3 font-inter text-[14px] font-medium text-[#152238] leading-[1.4]">{label}</span>
    </Choice>
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
