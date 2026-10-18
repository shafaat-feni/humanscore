import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ASSESSMENTS } from '../data/assessments';
import { getCategory } from '../data/categories';
import { AssessmentCard } from '../components/common/AssessmentCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFound } from './NotFound';

export const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const category = getCategory(categoryName);

  useDocumentTitle(category?.title);

  // Unknown single-segment URLs (e.g. /foo) land here via /:categoryName, so show a real 404.
  if (!category) return <NotFound />;

  const Icon = category.icon;
  const categoryTests = ASSESSMENTS.filter(t => t.category === category.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="bg-navy-900 text-white p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-teal text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Icon className="w-4 h-4" aria-hidden="true" /> Category
          </div>
          <h1 className="text-3xl font-extrabold">{category.title}</h1>
          <p className="text-slate-300 text-sm max-w-2xl">{category.description}</p>
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
          <AssessmentCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
};
