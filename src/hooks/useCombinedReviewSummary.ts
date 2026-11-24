import { useEffect, useState } from 'react';
import { businessInfo } from '@/data/site';
import { getReviewsForLocation, type ReviewLocationResult } from '@/lib/reviewProvider';

export interface CombinedReviewSummary {
  aggregateRating: string;
  totalReviewCount: string;
  totalReviewCountValue?: number;
  sourceState: 'live' | 'fallback';
  loading: boolean;
}

type ReviewSummaryInput = Pick<
  ReviewLocationResult,
  'aggregateRating' | 'totalReviewCount' | 'sourceState'
>;

const fallbackSummary: Omit<CombinedReviewSummary, 'loading'> = {
  aggregateRating: businessInfo.googleRating,
  totalReviewCount: businessInfo.googleReviewCount,
  sourceState: 'fallback',
};

function hasValidLiveSummary(result: ReviewSummaryInput): result is ReviewSummaryInput & { totalReviewCount: number } {
  return (
    result.sourceState === 'live' &&
    Number.isFinite(result.aggregateRating) &&
    result.aggregateRating >= 1 &&
    result.aggregateRating <= 5 &&
    Number.isInteger(result.totalReviewCount) &&
    (result.totalReviewCount ?? 0) > 0
  );
}

export function combineReviewSummaries(
  klaukkala: ReviewSummaryInput,
  vaasa: ReviewSummaryInput,
): Omit<CombinedReviewSummary, 'loading'> {
  if (!hasValidLiveSummary(klaukkala) || !hasValidLiveSummary(vaasa)) return fallbackSummary;

  const totalReviewCount = klaukkala.totalReviewCount + vaasa.totalReviewCount;
  const weightedRating = (
    klaukkala.aggregateRating * klaukkala.totalReviewCount +
    vaasa.aggregateRating * vaasa.totalReviewCount
  ) / totalReviewCount;

  if (!Number.isFinite(weightedRating) || totalReviewCount <= 0) return fallbackSummary;

  return {
    aggregateRating: weightedRating.toFixed(1),
    totalReviewCount: String(totalReviewCount),
    totalReviewCountValue: totalReviewCount,
    sourceState: 'live',
  };
}

export function formatReviewCountByDecade(totalReviewCount: number): string {
  return `${Math.floor(totalReviewCount / 10) * 10}+`;
}

export function useCombinedReviewSummary(): CombinedReviewSummary {
  const [summary, setSummary] = useState<CombinedReviewSummary>({
    ...fallbackSummary,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    void Promise.all([
      getReviewsForLocation('klaukkala', controller.signal),
      getReviewsForLocation('vaasa', controller.signal),
    ]).then(([klaukkala, vaasa]) => {
      if (controller.signal.aborted) return;
      setSummary({ ...combineReviewSummaries(klaukkala, vaasa), loading: false });
    });

    return () => controller.abort();
  }, []);

  return summary;
}
