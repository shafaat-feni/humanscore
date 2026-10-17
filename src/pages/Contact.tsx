import React, { useEffect } from 'react';
import { updatePageMeta } from '../utils/seo';
import { Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  useEffect(() => {
    updatePageMeta({
      title: 'Contact HumanScore',
      description: 'Get in touch with the HumanScore team for inquiries, feedback, or support.',
      canonicalPath: '/contact',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-navy-900 text-white p-8 rounded-2xl space-y-3 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider bg-teal text-navy-900 px-3 py-1 rounded-full">Support</span>
        <h1 className="text-3xl font-extrabold">Contact & Feedback</h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          We welcome your feedback and inquiries regarding the HumanScore platform.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-navy-900">Get in Touch</h2>
        <p>
          For platform inquiries, suggestions, or technical feedback, you can reach out to our team.
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
          <Mail className="w-5 h-5 text-teal" />
          <span>Support Email: <strong className="text-navy-900">support@humanscore.netlify.app</strong> (Configuration placeholder)</span>
        </div>
      </div>
    </div>
  );
};