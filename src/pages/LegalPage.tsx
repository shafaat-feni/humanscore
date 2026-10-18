import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, lastUpdated, intro, sections }) => {
  useDocumentTitle(title);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-teal-dark hover:underline">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Home
      </Link>

      <article className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-extrabold text-navy-900">{title}</h1>
          <p className="text-xs text-slate-500">Last updated: {lastUpdated}</p>
          <p className="text-sm text-slate-600">{intro}</p>
        </header>

        {sections.map(section => (
          <section key={section.heading} className="space-y-2">
            <h2 className="text-lg font-bold text-navy-900">{section.heading}</h2>
            {section.paragraphs.map(text => (
              <p key={text} className="text-sm text-slate-600 leading-relaxed">{text}</p>
            ))}
          </section>
        ))}
      </article>
    </div>
  );
};
