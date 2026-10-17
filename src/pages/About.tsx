import React, { useEffect } from 'react';
import { updatePageMeta } from '../utils/seo';
import { Activity, ShieldCheck, BookOpen } from 'lucide-react';

export const About: React.FC = () => {
  useEffect(() => {
    updatePageMeta({
      title: 'About HumanScore',
      description: 'Learn about HumanScore, our educational self-assessment platform, privacy commitments, and educational methodology.',
      canonicalPath: '/about',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-navy-900 text-white p-8 rounded-2xl space-y-3 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider bg-teal text-navy-900 px-3 py-1 rounded-full">Platform Overview</span>
        <h1 className="text-3xl font-extrabold">About HumanScore</h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Measure. Understand. Explore. Professional interactive self-assessments designed for educational insight and personal exploration.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-navy-900">Our Educational Mission</h2>
        <p>
          HumanScore provides a clean, responsive, and privacy-first web platform where visitors can complete interactive assessments across physical, cognitive, psychological, and lifestyle domains. Our goal is to make self-reflection and personal metric tracking accessible, transparent, and engaging without requiring user accounts or subscriptions.
        </p>

        <h2 className="text-xl font-bold text-navy-900">Client-Side Privacy</h2>
        <p>
          We believe personal reflection should remain private. All assessment calculations and history records are stored locally in your browser's <code className="bg-slate-100 px-1.5 py-0.5 rounded text-navy-900 font-mono text-xs">localStorage</code>. HumanScore does not transmit individual responses, health measurements, or psychological reflections to external databases or servers.
        </p>

        <h2 className="text-xl font-bold text-navy-900">Important Distinction</h2>
        <p>
          HumanScore is an educational and informational platform. It is not a medical diagnostic service, clinical psychological testing service, recruitment tool, or career recommendation service. Assessments should be used for personal exploration and learning.
        </p>
      </div>
    </div>
  );
};