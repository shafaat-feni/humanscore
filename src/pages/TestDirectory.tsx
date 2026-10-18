import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ASSESSMENTS } from '../data/assessments';
import { CATEGORIES } from '../data/categories';
import { AssessmentCard } from '../components/common/AssessmentCard';
import { searchAssessments } from '../utils/search';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const TestDirectory: React.FC = () => {
  useDocumentTitle('Assessment Directory');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTests = useMemo(
    () =>
      searchAssessments(ASSESSMENTS, searchQuery).filter(
        test => selectedCategory === 'all' || test.category === selectedCategory
      ),
    [searchQuery, selectedCategory]
  );

  const tabs = [{ slug: 'all', name: 'All' }, ...CATEGORIES.map(c => ({ slug: c.slug as string, name: c.name }))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-navy-900">Assessment Directory</h1>
        <p className="text-slate-600 text-sm mt-1">
          Browse all interactive tests across physical, cognitive, psychological, lifestyle, and skills domains.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {tabs.map(tab => (
            <button
              type="button"
              key={tab.slug}
              onClick={() => setSelectedCategory(tab.slug)}
              aria-pressed={selectedCategory === tab.slug}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                selectedCategory === tab.slug
                  ? 'bg-navy-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            aria-label="Search tests"
            placeholder="Search tests..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-teal"
          />
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map(test => (
          <AssessmentCard key={test.id} test={test} />
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="bg-white p-12 rounded-xl text-center border border-slate-200">
          <p className="text-slate-500 text-sm">No assessments found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};
