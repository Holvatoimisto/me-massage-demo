export type ReviewLocationSlug = 'klaukkala' | 'vaasa';

export interface NormalizedReview {
  id: string;
  author: string;
  text: string;
  rawText: string;
  rating: number;
  createTime?: string;
  updateTime?: string;
  source: 'Google';
  locationSlug: ReviewLocationSlug;
}

export interface ReviewLocationApiResponse {
  locationSlug: ReviewLocationSlug;
  reviews: NormalizedReview[];
  aggregateRating: number;
  totalReviewCount: number;
}

export type ReviewSourceState = 'live' | 'fallback';

