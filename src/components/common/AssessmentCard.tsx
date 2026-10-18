import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import type { AssessmentMeta } from '../../types/assessment';

interface AssessmentCardProps {
  test: AssessmentMeta;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({ test }) => {
  const comingSoon = test.status === 'coming-soon';

  return (
    <Link
      to={`/tests/${test.slug}`}
      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal transition flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-navy-800 px-2.5 py-1 rounded">
            {test.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {test.durationMinutes} min
          </span>
        </div>
        <h3 className="text-lg font-bold text-navy-900 mb-2">{test.title}</h3>
        <p className="text-xs text-slate-600 mb-4">{test.shortDescription}</p>
      </div>
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-dark">
        <span>{comingSoon ? 'Coming soon — view details' : 'Start Assessment'}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </div>
    </Link>
  );
};
