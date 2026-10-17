import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ASSESSMENTS } from '../data/assessments';
import type { AssessmentCategory } from '../types/assessment';
import { Search, ArrowRight, Clock, Award } from 'lucide-react';

export const TestDirectory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTests = ASSESSMENTS.filter(test => {
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-navy-900">Assessment Directory</h1>
        <p className="text-slate-600 text-sm mt-1">
          Browse all available interactive tests across physical, cognitive, psychological, and lifestyle domains.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'physical', 'cognitive', 'psychological', 'lifestyle', 'skills'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-teal"
          />
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map(test => (
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

      {filteredTests.length === 0 && (
        <div className="bg-white p-12 rounded-xl text-center border border-slate-200">
          <p className="text-slate-500 text-sm">No assessments found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};