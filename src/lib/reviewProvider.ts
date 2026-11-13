import { locationReviews, type LocationReview } from '@/data/reviews';
import type {
  NormalizedReview,
  ReviewLocationApiResponse,
  ReviewLocationSlug,
  ReviewSourceState,
} from '@/lib/reviewTypes';

export type ReviewFeedMode = 'latest' | 'all' | 'curated-with-live';

export interface ReviewLocationResult {
  locationSlug: ReviewLocationSlug;
  reviews: NormalizedReview[];
  aggregateRating: number;
  totalReviewCount?: number;
  sourceState: ReviewSourceState;
  therapistHighlights: LocationReview[];
  highlightedByTherapist: Partial<Record<'mathias' | 'janina', string[]>>;
}

function normalizeStaticRating(rating: string): number {
  const parsed = Number(rating.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeStaticReview(review: LocationReview, locationSlug: ReviewLocationSlug): NormalizedReview {
  return {
    id: review.id,
    author: review.author,
    text: review.text,
    rating: review.rating,
    source: 'Google',
    locationSlug,
  };
}

export function getFallbackReviewsForLocation(locationSlug: ReviewLocationSlug): ReviewLocationResult {
  const fallback = locationReviews[locationSlug];
  return {
    locationSlug,
    reviews: fallback.reviews.map((review) => normalizeStaticReview(review, locationSlug)),
    aggregateRating: normalizeStaticRating(fallback.rating),
    totalReviewCount: fallback.reviewCount,
    sourceState: 'fallback',
    therapistHighlights: fallback.highlights,
    highlightedByTherapist: fallback.highlightedByTherapist,
  };
}

function isNormalizedReview(value: unknown, locationSlug: ReviewLocationSlug): value is NormalizedReview {
  if (typeof value !== 'object' || value === null) return false;
  const review = value as Partial<NormalizedReview>;
  return (
    typeof review.id === 'string' &&
    review.id.length > 0 &&
    typeof review.author === 'string' &&
    review.author.length > 0 &&
    typeof review.text === 'string' &&
    typeof review.rating === 'number' &&
    Number.isInteger(review.rating) &&
    review.rating >= 1 &&
    review.rating <= 5 &&
    (review.createTime === undefined || (typeof review.createTime === 'string' && !Number.isNaN(Date.parse(review.createTime)))) &&
    (review.updateTime === undefined || (typeof review.updateTime === 'string' && !Number.isNaN(Date.parse(review.updateTime)))) &&
    review.source === 'Google' &&
    review.locationSlug === locationSlug
  );
}

function isReviewApiResponse(value: unknown, locationSlug: ReviewLocationSlug): value is ReviewLocationApiResponse {
  if (typeof value !== 'object' || value === null) return false;
  const response = value as Partial<ReviewLocationApiResponse>;
  return (
    response.locationSlug === locationSlug &&
    Array.isArray(response.reviews) &&
    response.reviews.length > 0 &&
    response.reviews.every((review) => isNormalizedReview(review, locationSlug)) &&
    typeof response.aggregateRating === 'number' &&
    Number.isFinite(response.aggregateRating) &&
    response.aggregateRating >= 1 &&
    response.aggregateRating <= 5 &&
    typeof response.totalReviewCount === 'number' &&
    Number.isInteger(response.totalReviewCount) &&
    response.totalReviewCount >= response.reviews.length
  );
}

export async function getReviewsForLocation(
  locationSlug: ReviewLocationSlug,
  signal?: AbortSignal,
): Promise<ReviewLocationResult> {
  const fallback = getFallbackReviewsForLocation(locationSlug);

  try {
    const response = await fetch(`/api/reviews?location=${encodeURIComponent(locationSlug)}`, {
      headers: { Accept: 'application/json' },
      signal,
    });
    if (!response.ok) return fallback;

    const payload: unknown = await response.json();
    if (!isReviewApiResponse(payload, locationSlug)) return fallback;

    return {
      ...payload,
      sourceState: 'live',
      therapistHighlights: fallback.therapistHighlights,
      highlightedByTherapist: fallback.highlightedByTherapist,
    };
  } catch {
    return fallback;
  }
}

