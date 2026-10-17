import React, { useEffect } from 'react';
import { updatePageMeta } from '../utils/seo';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    updatePageMeta({
      title: 'Privacy Policy',
      description: 'Read the HumanScore privacy policy regarding local browser storage and data privacy.',
      canonicalPath: '/privacy-policy',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-navy-900 text-white p-8 rounded-2xl space-y-3 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider bg-teal text-navy-900 px-3 py-1 rounded-full">Legal</span>
        <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Our commitment to protecting your privacy through client-side data handling.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-navy-900">Local Storage Persistence</h2>
        <p>
          HumanScore stores all completed assessment results locally in your browser using <code className="bg-slate-100 px-1.5 py-0.5 rounded text-navy-900 font-mono text-xs">localStorage</code> under the key <code className="bg-slate-100 px-1.5 py-0.5 rounded text-navy-900 font-mono text-xs">humanscore_assessments_v1</code>. No personal identification data, names, or emails are collected.
        </p>

        <h2 className="text-xl font-bold text-navy-900">Data Control & Deletion</h2>
        <p>
          You have full control over your stored history. You can export your data as JSON or CSV at any time from the Overall Assessment Index dashboard, or clear your history instantly using the clear-history control. Clearing browser site data will remove all stored results.
        </p>
      </div>
    </div>
  );
};