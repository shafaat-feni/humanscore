import React, { useEffect } from 'react';
import { updatePageMeta } from '../utils/seo';

export const Disclaimer: React.FC = () => {
  useEffect(() => {
    updatePageMeta({
      title: 'Medical & Professional Disclaimer',
      description: 'Important legal and medical disclaimers regarding HumanScore self-assessments.',
      canonicalPath: '/disclaimer',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-navy-900 text-white p-8 rounded-2xl space-y-3 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider bg-teal text-navy-900 px-3 py-1 rounded-full">Legal</span>
        <h1 className="text-3xl font-extrabold">Medical & Professional Disclaimer</h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Important limitations of our educational self-assessment platform.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-navy-900">Educational Use Only</h2>
        <p>
          HumanScore is an educational and informational website. None of the assessments provided on this platform constitute medical diagnoses, clinical psychological evaluations, professional career counseling, or accredited certifications.
        </p>
        <p>
          Measurements such as BMI and Waist-to-Height Ratio are general screening tools. Psychological reflections and stress self-assessments are for personal awareness only and do not replace professional care. Always consult qualified healthcare professionals or advisors regarding health or personal concerns.
        </p>
      </div>
    </div>
  );
};