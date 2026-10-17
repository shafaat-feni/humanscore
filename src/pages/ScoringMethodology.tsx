import React, { useEffect } from 'react';
import { updatePageMeta } from '../utils/seo';

export const ScoringMethodology: React.FC = () => {
  useEffect(() => {
    updatePageMeta({
      title: 'Scoring Methodology',
      description: 'Understand how HumanScore calculates quiz percentages, normalized scores, and the Overall Assessment Index.',
      canonicalPath: '/scoring-methodology',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-navy-900 text-white p-8 rounded-2xl space-y-3 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider bg-teal text-navy-900 px-3 py-1 rounded-full">Methodology</span>
        <h1 className="text-3xl font-extrabold">Scoring & Calculation Methodology</h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Transparent explanations of how raw measurements and quiz results are processed.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-navy-900">1. Quiz Percentages & Normalized Scores</h2>
        <p>
          For cognitive challenges and skill quizzes (such as the Number Pattern Challenge and General Knowledge Challenge), raw scores represent correct answers out of total questions. Percentages are calculated as:
        </p>
        <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-navy-900 border border-slate-200">
          Normalized Score = (Correct Answers / Total Questions) × 100 (rounded to one decimal place)
        </div>

        <h2 className="text-xl font-bold text-navy-900">2. The Overall Assessment Index</h2>
        <p>
          The Overall Assessment Index is calculated as the arithmetic mean of normalized scores from eligible core assessments:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Number Pattern Challenge</li>
          <li>Numerical Reasoning</li>
          <li>Short-Term Memory Challenge</li>
          <li>General Knowledge Challenge</li>
        </ul>
        <p>
          Missing assessments are excluded from both the numerator and denominator; they are never treated as zero. Physical measurements, personality reflections, stress assessments, and daily habits are maintained separately and do not contribute to the initial composite index.
        </p>
      </div>
    </div>
  );
};