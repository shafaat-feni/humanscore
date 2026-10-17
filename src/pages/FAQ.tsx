import React, { useEffect } from 'react';
import { updatePageMeta } from '../utils/seo';

export const FAQ: React.FC = () => {
  useEffect(() => {
    updatePageMeta({
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about HumanScore assessments, scoring, privacy, and local storage.',
      canonicalPath: '/faq',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-navy-900 text-white p-8 rounded-2xl space-y-3 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider bg-teal text-navy-900 px-3 py-1 rounded-full">Help Center</span>
        <h1 className="text-3xl font-extrabold">Frequently Asked Questions</h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Clear answers regarding platform features, scoring, and data privacy.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        <div className="space-y-2">
          <h3 className="font-bold text-navy-900 text-base">Where are my assessment results saved?</h3>
          <p>All results are stored locally in your browser's <code className="bg-slate-100 px-1 rounded text-xs font-mono">localStorage</code>. They never leave your device.</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-navy-900 text-base">Is the Overall Assessment Index an IQ score?</h3>
          <p>No. The index is an arithmetic mean of selected cognitive and skill challenges on HumanScore and is not a standardized intelligence test.</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-navy-900 text-base">Can I export or delete my data?</h3>
          <p>Yes. You can export your history as JSON or CSV, or clear your history at any time from the Overall Assessment Index dashboard.</p>
        </div>
      </div>
    </div>
  );
};