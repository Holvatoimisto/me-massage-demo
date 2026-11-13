import type {
  NormalizedReview,
  ReviewLocationApiResponse,
  ReviewLocationSlug,
} from '../../src/lib/reviewTypes';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_REVIEWS_BASE_URL = 'https://mybusiness.googleapis.com/v4';
const MAX_PAGE_SIZE = 50;

const starRatings: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

interface GoogleReview {
  reviewId?: unknown;
  name?: unknown;
  reviewer?: { displayName?: unknown };
  comment?: unknown;
  starRating?: unknown;
  createTime?: unknown;
  updateTime?: unknown;
}

interface GoogleReviewPage {
  reviews?: unknown;
  averageRating?: unknown;
  totalReviewCount?: unknown;
  nextPageToken?: unknown;
}

interface GoogleBusinessProfileConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountId: string;
  locationIds: Record<ReviewLocationSlug, string>;
}

function requireEnvironmentValue(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error('Google Business Profile configuration is unavailable.');
  return value;
}

function getConfig(): GoogleBusinessProfileConfig {
  return {
    clientId: requireEnvironmentValue('GOOGLE_GBP_CLIENT_ID'),
    clientSecret: requireEnvironmentValue('GOOGLE_GBP_CLIENT_SECRET'),
    refreshToken: requireEnvironmentValue('GOOGLE_GBP_REFRESH_TOKEN'),
    accountId: requireEnvironmentValue('GOOGLE_GBP_ACCOUNT_ID'),
    locationIds: {
      klaukkala: requireEnvironmentValue('GOOGLE_GBP_KLAUKKALA_LOCATION_ID'),
      vaasa: requireEnvironmentValue('GOOGLE_GBP_VAASA_LOCATION_ID'),
    },
  };
}

async function getAccessToken(config: GoogleBusinessProfileConfig): Promise<string> {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) throw new Error('Google OAuth token refresh failed.');
  const payload: unknown = await response.json();
  if (typeof payload !== 'object' || payload === null) throw new Error('Google OAuth response was malformed.');
  const accessToken = (payload as { access_token?: unknown }).access_token;
  if (typeof accessToken !== 'string' || !accessToken) throw new Error('Google OAuth response was malformed.');
  return accessToken;
}

function normalizeTimestamp(value: unknown): string | undefined {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value)) ? value : undefined;
}

function normalizeGoogleReview(review: GoogleReview, locationSlug: ReviewLocationSlug): NormalizedReview {
  const resourceName = typeof review.name === 'string' ? review.name : undefined;
  const reviewId = typeof review.reviewId === 'string' ? review.reviewId : resourceName?.split('/').at(-1);
  const author = review.reviewer && typeof review.reviewer.displayName === 'string'
    ? review.reviewer.displayName
    : undefined;
  const rating = typeof review.starRating === 'string' ? starRatings[review.starRating] : undefined;

  if (!reviewId || !author || !rating) throw new Error('Google review response was malformed.');

  return {
    id: reviewId,
    author,
    text: typeof review.comment === 'string' ? review.comment : '',
    rating,
    ...(normalizeTimestamp(review.createTime) ? { createTime: normalizeTimestamp(review.createTime) } : {}),
    ...(normalizeTimestamp(review.updateTime) ? { updateTime: normalizeTimestamp(review.updateTime) } : {}),
    source: 'Google',
    locationSlug,
  };
}

export async function fetchGoogleBusinessProfileReviews(
  locationSlug: ReviewLocationSlug,
): Promise<ReviewLocationApiResponse> {
  const config = getConfig();
  const accessToken = await getAccessToken(config);
  const parent = `accounts/${encodeURIComponent(config.accountId)}/locations/${encodeURIComponent(config.locationIds[locationSlug])}`;
  const reviews: NormalizedReview[] = [];
  const seenPageTokens = new Set<string>();
  let pageToken: string | undefined;
  let aggregateRating: number | undefined;
  let totalReviewCount: number | undefined;

  do {
    const url = new URL(`${GOOGLE_REVIEWS_BASE_URL}/${parent}/reviews`);
    url.searchParams.set('pageSize', String(MAX_PAGE_SIZE));
    url.searchParams.set('orderBy', 'updateTime desc');
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Google reviews request failed with status ${response.status}.`);

    const rawPage: unknown = await response.json();
    if (typeof rawPage !== 'object' || rawPage === null) {
      throw new Error('Google reviews response was malformed.');
    }
    const page = rawPage as GoogleReviewPage;
    if (!Array.isArray(page.reviews)) throw new Error('Google reviews response was malformed.');
    reviews.push(...page.reviews.map((review) => normalizeGoogleReview(review as GoogleReview, locationSlug)));

    if (aggregateRating === undefined && typeof page.averageRating === 'number') {
      aggregateRating = page.averageRating;
    }
    if (totalReviewCount === undefined && typeof page.totalReviewCount === 'number') {
      totalReviewCount = page.totalReviewCount;
    }

    pageToken = typeof page.nextPageToken === 'string' && page.nextPageToken ? page.nextPageToken : undefined;
    if (pageToken) {
      if (seenPageTokens.has(pageToken)) throw new Error('Google reviews pagination repeated a page token.');
      seenPageTokens.add(pageToken);
    }
  } while (pageToken);

  if (
    reviews.length === 0 ||
    aggregateRating === undefined ||
    !Number.isFinite(aggregateRating) ||
    totalReviewCount === undefined ||
    !Number.isInteger(totalReviewCount)
  ) {
    throw new Error('Google reviews response was malformed.');
  }

  return { locationSlug, reviews, aggregateRating, totalReviewCount };
}

