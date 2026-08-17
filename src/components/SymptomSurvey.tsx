import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';
import { useBookingModal } from '@/contexts/BookingModalContext';

const getRecommendation = (answers: string[], tStr: (p: string) => string) => {
  const [, symptom] = answers;
  if (answers[0] === 'leuka' || (answers[0] === 'niska' && symptom === 'paansarky')) {
    return {
      title: tStr('survey.results.jaw.title'),
      description: tStr('survey.results.jaw.description'),
      serviceLink: '/palvelut/purentalihashieronta',
    };
  }
  if (symptom === 'kireys' && answers[3] === 'rentoutuminen') {
    return {
      title: tStr('survey.results.hotStone.title'),
      description: tStr('survey.results.hotStone.description'),
      serviceLink: '/palvelut/kuumakivihieronta',
    };
  }
  if (answers[0] === 'selka' && symptom === 'kireys') {
    return {
      title: tStr('survey.results.iastm.title'),
      description: tStr('survey.results.iastm.description'),
      serviceLink: '/palvelut/faskiarautakasittely',
    };
  }
  return {
    title: tStr('survey.results.classic.title'),
    description: tStr('survey.results.classic.description'),
    serviceLink: '/palvelut/hieronta',
  };
};

const getSurveyQuestions = (tStr: (p: string) => string) => [
  {
    question: tStr('survey.questions.0.question'),
    options: [
      { label: tStr('survey.questions.0.options.0.label'), value: 'niska' },
      { label: tStr('survey.questions.0.options.1.label'), value: 'selka' },
      { label: tStr('survey.questions.0.options.2.label'), value: 'leuka' },
      { label: tStr('survey.questions.0.options.3.label'), value: 'kasi' },
      { label: tStr('survey.questions.0.options.4.label'), value: 'jalka' },
      { label: tStr('survey.questions.0.options.5.label'), value: 'useampi' },
    ],
  },
  {
    question: tStr('survey.questions.1.question'),
    options: [
      { label: tStr('survey.questions.1.options.0.label'), value: 'kireys' },
      { label: tStr('survey.questions.1.options.1.label'), value: 'kipu' },
      { label: tStr('survey.questions.1.options.2.label'), value: 'paansarky' },
      { label: tStr('survey.questions.1.options.3.label'), value: 'puutuminen' },
      { label: tStr('survey.questions.1.options.4.label'), value: 'urheiluvamma' },
      { label: tStr('survey.questions.1.options.5.label'), value: 'palautuminen' },
    ],
  },
  {
    question: tStr('survey.questions.2.question'),
    options: [
      { label: tStr('survey.questions.2.options.0.label'), value: 'viikko' },
      { label: tStr('survey.questions.2.options.1.label'), value: '4vko' },
      { label: tStr('survey.questions.2.options.2.label'), value: '6kk' },
      { label: tStr('survey.questions.2.options.3.label'), value: 'yli6kk' },
      { label: tStr('survey.questions.2.options.4.label'), value: 'toistuu' },
    ],
  },
  {
    question: tStr('survey.questions.3.question'),
    options: [
      { label: tStr('survey.questions.3.options.0.label'), value: 'kivunlievitys' },
      { label: tStr('survey.questions.3.options.1.label'), value: 'liikkuvuus' },
      { label: tStr('survey.questions.3.options.2.label'), value: 'kireydenhelpotus' },
      { label: tStr('survey.questions.3.options.3.label'), value: 'palautuminen' },
      { label: tStr('survey.questions.3.options.4.label'), value: 'selvyys' },
    ],
  },
];

export function SymptomSurvey() {
  const { tStr } = useLang();
  const { openBookingModal } = useBookingModal();
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);

  return (
    <div className="max-w-[520px] mx-auto">
      {surveyStep === 0 ? (
        /* Intro view */
        <div className="text-center">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-4">{tStr('survey.eyebrow')}</p>
          <h2 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-4">{tStr('survey.headline')}</h2>
          <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.7] mb-6">{tStr('survey.description')}</p>
          <button
            onClick={() => { setSurveyStep(1); setSurveyAnswers([]); }}
            className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300 cursor-pointer"
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
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A]">{tStr('survey.step')} {surveyStep} {tStr('survey.of')} 4</span>
            <div className="flex-1 h-[2px] bg-[#152238]/[0.08] rounded-full overflow-hidden">
              <div className="h-full bg-[#152238] rounded-full transition-all duration-500" style={{ width: `${(surveyStep / 4) * 100}%` }} />
            </div>
          </div>
          {/* Question */}
          <h3 className="font-cormorant text-[22px] md:text-[24px] text-[#152238] leading-[1.35] mb-6">{getSurveyQuestions(tStr)[surveyStep - 1].question}</h3>
          {/* Options grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {getSurveyQuestions(tStr)[surveyStep - 1].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  const newAnswers = [...surveyAnswers];
                  newAnswers[surveyStep - 1] = opt.value;
                  setSurveyAnswers(newAnswers);
                  if (surveyStep < 4) {
                    setSurveyStep(surveyStep + 1);
                  } else {
                    setSurveyStep(5);
                  }
                }}
                className="text-left px-5 py-4 rounded-xl bg-white/[0.5] border border-[#94A3B8]/60 hover:bg-white hover:border-[#152238]/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer"
              >
                <span className="font-inter text-[14px] text-[#152238]">{opt.label}</span>
              </button>
            ))}
          </div>
          {/* Back button */}
          {surveyStep > 1 && (
            <button
              onClick={() => { setSurveyStep(surveyStep - 1); }}
              className="font-inter text-[13px] text-[#5A6A7A] hover:text-[#152238] transition-colors cursor-pointer"
            >
              {tStr('survey.back')}
            </button>
          )}
        </div>
      ) : (
        /* Result view */
        (() => {
          const rec = getRecommendation(surveyAnswers, tStr);
          return (
            <div className="text-center">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5A6A7A] mb-4">{tStr('survey.resultEyebrow')}</p>
              <h3 className="font-cormorant text-[24px] md:text-[28px] text-[#152238] leading-[1.3] mb-4">{rec.title}</h3>
              <p className="font-inter text-[14px] text-[#5A6A7A] leading-[1.75] mb-8">{rec.description}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={openBookingModal}
                  className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide bg-[#152238] text-white hover:bg-[#1E3A5F] transition-colors duration-300 cursor-pointer border-none"
                >
                  Varaa aika
                </button>
                <Link
                  to={rec.serviceLink}
                  className="inline-flex min-h-[52px] items-center justify-center px-8 py-3 rounded-lg font-inter text-[14px] font-semibold tracking-wide text-[#152238] border border-[#152238]/30 hover:bg-[#152238]/5 transition-colors duration-300"
                >
                  {tStr('survey.exploreService')}
                </Link>
              </div>
              <button
                onClick={() => { setSurveyStep(0); setSurveyAnswers([]); }}
                className="font-inter text-[13px] text-[#5A6A7A] hover:text-[#152238] transition-colors mt-6 cursor-pointer"
              >
                {tStr('survey.restart')}
              </button>
            </div>
          );
        })()
      )}
    </div>
  );
}
