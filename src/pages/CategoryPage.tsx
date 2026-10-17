import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ASSESSMENTS } from '../data/assessments';
import type { AssessmentCategory } from '../types/assessment';
import { ArrowRight, Clock, Activity, Brain, Heart, Zap, Award } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const categoryMap: Record<string, { title: string; desc: string; icon: any }> = {
    physical: { title: 'Physical Assessments', desc: 'Measure body composition, proportion risk, and core muscular endurance.', icon: Activity },
    cognitive: { title: 'Cognitive Challenges', desc: 'Evaluate numerical sequence pattern recognition, reasoning, and working memory.', icon: Brain },
    psychological: { title: 'Psychological Reflection', desc: 'Explore self-reported personality dimensions and perceived stress well-being.', icon: Heart },
    lifestyle: { title: 'Lifestyle & Habits', desc: 'Audit daily habits across sleep, hydration, and daily routine patterns.', icon: Zap },
    skills: { title: 'Skills & Knowledge', desc: 'Test general knowledge across academic, historical, and scientific domains.', icon: Award },
  };

  const currentCategoryInfo = categoryMap[categoryName || ''] || {
    title: 'Assessments',
    desc: 'Browse category assessments.',
    icon: Activity
  };

  const Icon = currentCategoryInfo.icon;
  const categoryTests = ASSESSMENTS.filter(t => t.category === categoryName);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="bg-navy-900 text-white p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-teal text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Icon className="w-4 h-4" /> Category
          </div>
          <h1 className="text-3xl font-extrabold">{currentCategoryInfo.title}</h1>
          <p className="text-slate-300 text-sm max-w-2xl">{currentCategoryInfo.desc}</p>
        </div>
        <Link
          to="/tests"
          className="bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg border border-navy-700 transition"
        >
          View All Tests
        </Link>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryTests.map(test => (
          <Link
            key={test.id}
            to={`/tests/${test.slug}`}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal transition flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-navy-800 px-2.5 py-1 rounded">
                  {test.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {test.durationMinutes} min
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">{test.title}</h3>
              <p className="text-xs text-slate-600 mb-4">{test.shortDescription}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal">
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};