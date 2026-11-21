import { fetchGoogleBusinessProfileReviews } from './_lib/googleBusinessProfile.js';
import type { ReviewLocationSlug } from '../src/lib/reviewTypes';

const CACHE_CONTROL = 'public, s-maxage=21600, stale-while-revalidate=86400';

function isLocationSlug(value: string | null): value is ReviewLocationSlug {
  return value === 'klaukkala' || value === 'vaasa';
}

export async function GET(request: Request): Promise<Response> {
  const locationSlug = new URL(request.url).searchParams.get('location');
  if (!isLocationSlug(locationSlug)) {
    return Response.json({ error: 'invalid_location' }, { status: 400 });
  }

  try {
    const reviews = await fetchGoogleBusinessProfileReviews(locationSlug);
    return Response.json(reviews, {
      headers: { 'Cache-Control': CACHE_CONTROL },
    });
  } catch (error) {
    console.error(
      'Google Business Profile reviews are unavailable.',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return Response.json(
      { error: 'reviews_unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

