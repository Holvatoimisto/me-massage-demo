import { Star } from 'lucide-react';

// Presentation-only review card. Review data lives in translations
// (reviews.items) today and can later be fed from the Google Reviews
// integration without touching this component.
export type ReviewCardData = {
  name: string;
  text: string;
  service: string;
};

export function ReviewCard({ review }: { review: ReviewCardData }) {
  return (
    <div className="bg-[#F7F5F2] rounded-xl p-7 border border-[#E2E8F0]/60 h-full flex flex-col">
      <div className="flex items-center gap-1 mb-4 text-[#152238]" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} size={13} fill="currentColor" strokeWidth={1.5} />
        ))}
      </div>
      <p className="font-inter text-[14px] text-[#1F2937] leading-[1.75] italic flex-1">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-5 pt-5 border-t border-[#152238]/[0.06]">
        <p className="font-inter text-[14px] font-semibold text-[#152238]">{review.name}</p>
        <p className="font-inter text-[11px] text-[#5A6A7A]">{review.service}</p>
      </div>
    </div>
  );
}
