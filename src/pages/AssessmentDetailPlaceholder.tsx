import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ASSESSMENTS } from '../data/assessments';
import { Clock, ArrowLeft, Construction, Activity } from 'lucide-react';

export const AssessmentDetailPlaceholder: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const assessment = ASSESSMENTS.find(t => t.slug === slug);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <Link to="/tests" className="inline-flex items-center gap-2 text-xs font-semibold text-teal hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Directory
      </Link>

      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Construction className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-navy-800 px-3 py-1 rounded-full">
            {assessment?.category || 'Assessment'}
          </span>
          <h1 className="text-3xl font-extrabold text-navy-900">
            {assessment?.title || 'Assessment'}
          </h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            {assessment?.shortDescription || 'This assessment is currently scheduled for implementation in upcoming development phases.'}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left max-w-md mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-navy-900">Development Status</div>
          <p className="text-xs text-slate-600">
            This interactive test is part of the HumanScore master implementation plan and will become fully operational in subsequent phases.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-200">
            <Clock className="w-4 h-4 text-teal" /> Estimated Duration: {assessment?.durationMinutes || 5} minutes
          </div>
        </div>

        <div className="pt-4">
          <Link
            to="/tests"
            className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold px-6 py-3 rounded-lg text-sm shadow transition"
          >
            Explore Other Available Tests
          </Link>
        </div>
      </div>
    </div>
  );
};