import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useBookingModal } from '@/contexts/BookingModalContext';
import { serviceOverviews } from '@/data/services';
import { ajasServiceDurations, type ServiceKey } from '@/data/ajas';
import { bookingPrimaryOnLightClasses } from '@/lib/bookingCta';

type AreaKey = 'niska' | 'selka' | 'leuka' | 'kasi' | 'jalka';

interface RecommendationOption {
  serviceKey: ServiceKey;
  duration: number;
}

interface Recommendation {
  primary: RecommendationOption;
  alternative?: RecommendationOption;
}

/**
 * Generic appointment-time guidance before service-specific clamping.
 * Strongest signal is the number of selected body areas; symptom duration
 * raises the recommendation for broader/longer situations.
 */
const genericDuration = (areaCount: number, durationKey?: string): number => {
  if (areaCount >= 3) {
    return durationKey === 'yli6kk' || durationKey === 'toistuu' ? 110 : 80;
  }
  if (areaCount === 2) {
    return durationKey === '6kk' || durationKey === 'yli6kk' || durationKey === 'toistuu' ? 80 : 50;
  }
  // One area: 20 min only for a clearly limited, short-lived situation.
  return durationKey === 'viikko' ? 20 : 50;
};

/** Clamp a generic duration to durations that actually exist for the service. */
const clampDuration = (serviceKey: ServiceKey, generic: number): number => {
  const allowed = ajasServiceDurations[serviceKey].map((o) => o.duration);
  // Prefer the smallest allowed duration that still covers the generic estimate;
  // if none covers it, take the longest available.
  return allowed.find((d) => d >= generic) ?? allowed[allowed.length - 1];
};

/**
 * Lightweight guidance rules — baseline preserved from the original
 * questionnaire, extended with explicit client rules. Not a diagnostic tool.
 *
 * Priority order (specific rules beat general ones):
 * 1. headache (niska + paansarky) → Jaw 50 / Classic 50
 * 2. jaw selected → Jaw 50 (baseline Classic alternative for jaw+niska)
 * 3. back-only long/recurring → IASTM 50 / Hot Stone 50 (order by relaxation)
 * 4. leg-only over 6 months → IASTM 50 / Hot Stone 50 (order by relaxation)
 * 5. relaxation goal → Hot Stone primary (real durations via clampDuration)
 * 6. baseline recommendation behavior
 */
const getRecommendation = (
  areas: AreaKey[],
  symptom?: string,
  durationKey?: string,
  wish?: string,
): Recommendation => {
  const relax = wish === 'rentoutuminen';

  // 1. Explicit headache rule — fixed durations, no generic conversion.
  if (areas.includes('niska') && symptom === 'paansarky') {
    return {
      primary: { serviceKey: 'jaw', duration: 50 },
      alternative: { serviceKey: 'classic', duration: 50 },
    };
  }

  // 2. Jaw selected → Jaw 50 (its only bookable duration in the funnel).
  if (areas.includes('leuka')) {
    const primary: RecommendationOption = { serviceKey: 'jaw', duration: 50 };
    // Baseline alternative for jaw combined with another (compatible) area.
    const generic = genericDuration(areas.length, durationKey);
    return {
      primary,
      alternative:
        areas.length >= 2 && areas.some((a) => a !== 'leuka')
          ? { serviceKey: 'classic', duration: clampDuration('classic', generic) }
          : undefined,
    };
  }

  // 3. Back-only, long-standing or recurring → IASTM 50 / Hot Stone 50.
  if (areas.length === 1 && areas[0] === 'selka' && (durationKey === 'yli6kk' || durationKey === 'toistuu')) {
    return relax
      ? { primary: { serviceKey: 'hotStone', duration: 50 }, alternative: { serviceKey: 'iastm', duration: 50 } }
      : { primary: { serviceKey: 'iastm', duration: 50 }, alternative: { serviceKey: 'hotStone', duration: 50 } };
  }

  // 4. Leg-only, over 6 months → IASTM 50 / Hot Stone 50.
  if (areas.length === 1 && areas[0] === 'jalka' && durationKey === 'yli6kk') {
    return relax
      ? { primary: { serviceKey: 'hotStone', duration: 50 }, alternative: { serviceKey: 'iastm', duration: 50 } }
      : { primary: { serviceKey: 'iastm', duration: 50 }, alternative: { serviceKey: 'hotStone', duration: 50 } };
  }

  let primaryKey: ServiceKey = 'classic';
  // 5. Relaxation goal → Hot Stone primary.
  if (relax) {
    primaryKey = 'hotStone';
  } else if (areas.includes('selka') && symptom === 'kireys') {
    // 6. Baseline tendency: back + muscle tension favors IASTM.
    primaryKey = 'iastm';
  }

  let generic = genericDuration(areas.length, durationKey);
  // Niska-hartia + lihaskireys may be 20 min for short-lived situations
  // (6kk / yli6kk / toistuu never produce 20 min via genericDuration).
  if (
    areas.length === 1 && areas[0] === 'niska' && symptom === 'kireys' &&
    (durationKey === 'viikko' || durationKey === '4vko')
  ) {
    generic = 20;
  }
  const primary: RecommendationOption = { serviceKey: primaryKey, duration: clampDuration(primaryKey, generic) };

  // Baseline alternative only where there is a genuine, defensible overlap.
  let altKey: ServiceKey | undefined;
  if (primaryKey === 'hotStone' || primaryKey === 'iastm') {
    altKey = 'classic';
  }

  return {
    primary,
    alternative: altKey ? { serviceKey: altKey, duration: clampDuration(altKey, generic) } : undefined,
  };
};

const areaOptions: { value: AreaKey; labelKey: string }[] = [
  { value: 'niska', labelKey: 'survey.questions.0.options.0.label' },
  { value: 'selka', labelKey: 'survey.questions.0.options.1.label' },
  { value: 'leuka', labelKey: 'survey.questions.0.options.2.label' },
  { value: 'kasi', labelKey: 'survey.questions.0.options.3.label' },
  { value: 'jalka', labelKey: 'survey.questions.0.options.4.label' },
];

// Symptom options with stable translation keys — never index-based, so
// filtering options cannot shift labels onto the wrong symptom.
const symptomOptions: { value: string; labelKey: string }[] = [
  { value: 'kireys', labelKey: 'survey.questions.1.options.0.label' },
  { value: 'kipu', labelKey: 'survey.questions.1.options.1.label' },
  { value: 'paansarky', labelKey: 'survey.questions.1.options.2.label' },
  { value: 'puutuminen', labelKey: 'survey.questions.1.options.3.label' },
  { value: 'urheiluvamma', labelKey: 'survey.questions.1.options.4.label' },
  { value: 'palautuminen', labelKey: 'survey.questions.1.options.5.label' },
];

/** Symptoms that remain valid per body area (client-specified restrictions). */
const areaSymptomAllowlist: Record<AreaKey, string[]> = {
  niska: ['kireys', 'kipu', 'paansarky', 'urheiluvamma', 'palautuminen'],
  selka: ['kireys', 'kipu', 'urheiluvamma', 'palautuminen'],
  leuka: ['kireys', 'kipu', 'paansarky', 'puutuminen'],
  kasi: ['kireys', 'kipu', 'paansarky', 'puutuminen', 'urheiluvamma', 'palautuminen'],
  jalka: ['kireys', 'kipu', 'puutuminen', 'urheiluvamma', 'palautuminen'],
};

/**
 * Conservative multi-area filtering: a symptom is shown if it remains valid
 * for at least one selected area — except the explicit jaw restrictions,
 * which apply whenever leuka is selected.
 */
const visibleSymptoms = (areas: AreaKey[]) =>
  symptomOptions.filter(({ value }) => {
    if (areas.includes('leuka') && (value === 'urheiluvamma' || value === 'palautuminen')) return false;
    return areas.some((area) => areaSymptomAllowlist[area].includes(value));
  });

// Single-select questions 3–4, values paired with translation labels by index.
const singleQuestions: { questionKey: string; values: string[] }[] = [
  {
    questionKey: 'survey.questions.2',
    values: ['viikko', '4vko', '6kk', 'yli6kk', 'toistuu'],
  },
  {
    questionKey: 'survey.questions.3',
    values: ['kivunlievitys', 'liikkuvuus', 'kireydenhelpotus', 'palautuminen', 'selvyys', 'rentoutuminen'],
  },
];

export function SymptomSurvey() {
  const { tStr } = useLang();
  const { openBookingModal } = useBookingModal();

  // step: 0 intro, 1–4 questions, 5 result
  const [surveyStep, setSurveyStep] = useState(0);
  const [areas, setAreas] = useState<AreaKey[]>([]);
  // Single-select answers indexed by question step (2–4). Changing an earlier
  // answer clears later steps so stale state cannot leak into the result.
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedKey, setSelectedKey] = useState<ServiceKey | null>(null);

  const resetAll = () => {
    setSurveyStep(0);
    setAreas([]);
    setAnswers({});
    setSelectedKey(null);
  };

  const toggleArea = (area: AreaKey) => {
    setAreas((prev) => {
      if (prev.includes(area)) return prev.filter((a) => a !== area);
      const next = [...prev, area];
      // Jaw is only compatible with niska: selecting selka/kasi/jalka drops leuka.
      if (area !== 'leuka' && area !== 'niska' && next.includes('leuka')) {
        return next.filter((a) => a !== 'leuka');
      }
      return next;
    });
    // Area choice drives everything downstream — drop later answers.
    setAnswers({});
    setSelectedKey(null);
  };

  const answerSingle = (step: number, value: string) => {
    setAnswers((prev) => {
      const next: Record<number, string> = {};
      Object.keys(prev).forEach((k) => {
        const n = Number(k);
        if (n < step) next[n] = prev[n];
      });
      next[step] = value;
      return next;
    });
    setSelectedKey(null);
    // Sports injury skips the duration question — no stale duration survives
    // because answers after step 2 were just cleared above.
    if (step === 2 && value === 'urheiluvamma') {
      setSurveyStep(4);
      return;
    }
    setSurveyStep(step < 4 ? step + 1 : 5);
  };

  const optionCardClass = (selected: boolean) =>
    `text-left px-5 py-4 rounded-xl border transition-all duration-200 cursor-pointer ${
      selected
        ? 'bg-white border-[#152238] shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
        : 'bg-white/[0.5] border-[#94A3B8]/60 hover:bg-white hover:border-[#152238]/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
    }`;

  const rec = getRecommendation(areas, answers[2], answers[3], answers[4]);
  const current: RecommendationOption =
    selectedKey && rec.alternative?.serviceKey === selectedKey ? rec.alternative : rec.primary;
  const currentHref = serviceOverviews.find((s) => s.key === current.serviceKey)?.href ?? '/palvelut';

  // Sports injury branch skips duration: 3 truthful steps instead of 4.
  const skipDuration = answers[2] === 'urheiluvamma';
  const totalSteps = skipDuration ? 3 : 4;
  const displayStep = skipDuration && surveyStep === 4 ? 3 : surveyStep;
  // Jaw stays visible but disabled when an incompatible area is selected.
  const jawDisabled = !areas.includes('leuka') && areas.some((a) => a === 'selka' || a === 'kasi' || a === 'jalka');

  const handleBack = () => {
    if (surveyStep === 4 && skipDuration) {
      setSurveyStep(2);
      return;
    }
    setSurveyStep(surveyStep - 1);
  };

  return (
    <div className="max-w-[520px] mx-auto">
      {surveyStep === 0 ? (
        /* Intro view */
        <div className="text-center">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-4">{tStr('survey.eyebrow')}</p>
          <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-4">{tStr('survey.headline')}</h2>
          <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.7] mb-6">{tStr('survey.description')}</p>
          <button
            onClick={() => { setSurveyStep(1); }}
            className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide whitespace-nowrap bg-[#152238] text-white border border-transparent shadow-[0_8px_28px_rgba(0,0,0,0.22)] hover:bg-[#1E3A5F] transition-colors duration-300 cursor-pointer"
          >
            {tStr('survey.startButton')}
          </button>
          <p className="font-inter text-[12px] text-[#5A6A7A]/50 mt-3">{tStr('survey.duration')}</p>
        </div>
      ) : surveyStep <= 4 ? (
        /* Question views */
        <div>
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-8">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A]">{tStr('survey.step')} {displayStep} {tStr('survey.of')} {totalSteps}</span>
            <div className="flex-1 h-[2px] bg-[#152238]/[0.08] rounded-full overflow-hidden">
              <div className="h-full bg-[#152238] rounded-full transition-all duration-500" style={{ width: `${(displayStep / totalSteps) * 100}%` }} />
            </div>
          </div>

          {surveyStep === 1 ? (
            /* Step 1: multi-select body areas */
            <div>
              <h3 className="font-cormorant text-[22px] md:text-[24px] text-[#152238] leading-[1.35] mb-6">{tStr('survey.questions.0.question')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {areaOptions.map((opt) => {
                  const selected = areas.includes(opt.value);
                  const disabled = opt.value === 'leuka' && jawDisabled;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleArea(opt.value)}
                      aria-pressed={selected}
                      disabled={disabled}
                      className={`${optionCardClass(selected)} disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-inter text-[14px] text-[#152238]">{tStr(opt.labelKey)}</span>
                        <span
                          aria-hidden="true"
                          className={`flex items-center justify-center w-5 h-5 rounded-full border transition-colors duration-200 ${
                            selected ? 'bg-[#152238] border-[#152238] text-white' : 'border-[#94A3B8]/70 text-transparent'
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setSurveyStep(2)}
                disabled={areas.length === 0}
                className="inline-flex min-h-[48px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {tStr('survey.continue')}
              </button>
            </div>
          ) : surveyStep === 2 ? (
            /* Step 2: symptom — options filtered by selected areas */
            <div>
              <h3 className="font-cormorant text-[22px] md:text-[24px] text-[#152238] leading-[1.35] mb-6">{tStr('survey.questions.1.question')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {visibleSymptoms(areas).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => answerSingle(2, opt.value)}
                    className={optionCardClass(answers[2] === opt.value)}
                  >
                    <span className="font-inter text-[14px] text-[#152238]">{tStr(opt.labelKey)}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Steps 3–4: duration and goal questions */
            (() => {
              const q = singleQuestions[surveyStep - 3];
              return (
                <div>
                  <h3 className="font-cormorant text-[22px] md:text-[24px] text-[#152238] leading-[1.35] mb-6">{tStr(`${q.questionKey}.question`)}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {q.values.map((value, i) => (
                      <button
                        key={value}
                        onClick={() => answerSingle(surveyStep, value)}
                        className={optionCardClass(answers[surveyStep] === value)}
                      >
                        <span className="font-inter text-[14px] text-[#152238]">{tStr(`${q.questionKey}.options.${i}.label`)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()
          )}

          {/* Back button */}
          {surveyStep > 1 && (
            <button
              onClick={handleBack}
              className="font-inter text-[13px] text-[#5A6A7A] hover:text-[#152238] transition-colors cursor-pointer"
            >
              {tStr('survey.back')}
            </button>
          )}
        </div>
      ) : (
        /* Result view */
        <div className="text-center">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-4">{tStr('survey.resultEyebrow')}</p>

          {/* Primary / currently selected recommendation */}
          <div className="bg-white rounded-xl border border-[#152238]/15 shadow-[0_2px_16px_rgba(0,0,0,0.05)] px-6 py-7 md:px-8 mb-5 text-left">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h3 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3]">
                {tStr(`shop.serviceNames.${current.serviceKey}`)}
              </h3>
              <span className="shrink-0 inline-flex items-center gap-1.5 font-inter text-[10px] font-semibold uppercase tracking-[0.1em] text-[#152238] bg-[#152238]/[0.06] rounded-full px-2.5 py-1 mt-1.5">
                <Check size={11} strokeWidth={3} />
                {tStr('survey.selectedBadge')}
              </span>
            </div>
            <p className="font-inter text-[15px] font-semibold text-[#152238] mb-3">
              {tStr('survey.durationLabel')}: {current.duration} min
            </p>
            <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.75] mb-2.5">
              {tStr(`survey.results.${current.serviceKey}.description`)}
            </p>
            <p className="font-inter text-[13px] text-[#5A6A7A] leading-[1.7]">
              {tStr(`survey.durationExplanations.${current.duration}`)}
            </p>
          </div>

          {/* Optional secondary recommendation */}
          {rec.alternative && (
            <div className="bg-white/[0.5] rounded-xl border border-[#94A3B8]/40 px-6 py-5 mb-7 text-left">
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-2">{tStr('survey.altHeading')}</p>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-inter text-[14px] font-semibold text-[#152238]">
                    {tStr(`shop.serviceNames.${rec.alternative.serviceKey}`)} · {rec.alternative.duration} min
                  </p>
                  <p className="font-inter text-[12px] text-[#5A6A7A] leading-[1.6] mt-1">
                    {rec.alternative.serviceKey === 'classic'
                      ? tStr('survey.altClassicText')
                      : tStr(`survey.results.${rec.alternative.serviceKey}.description`)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedKey(rec.alternative!.serviceKey)}
                  className="shrink-0 font-inter text-[13px] font-semibold text-[#152238] underline underline-offset-4 hover:text-[#1E3A5F] transition-colors cursor-pointer bg-transparent border-none"
                >
                  {tStr('survey.altSelect')}
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openBookingModal({ serviceKey: current.serviceKey, recommendedDuration: current.duration })}
              className={`inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide cursor-pointer ${bookingPrimaryOnLightClasses}`}
            >
              {tStr('survey.bookNow')}
            </button>
            <Link
              to={currentHref}
              className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-[#152238] border border-[#152238]/30 hover:bg-[#152238]/5 transition-colors duration-300"
            >
              {tStr('survey.exploreService')}
            </Link>
          </div>
          <button
            onClick={resetAll}
            className="font-inter text-[13px] text-[#5A6A7A] hover:text-[#152238] transition-colors mt-6 cursor-pointer"
          >
            {tStr('survey.restart')}
          </button>
          <p className="font-inter text-[11px] text-[#5A6A7A]/60 leading-[1.6] mt-4 max-w-[420px] mx-auto">
            {tStr('survey.disclaimer')}
          </p>
        </div>
      )}
    </div>
  );
}
