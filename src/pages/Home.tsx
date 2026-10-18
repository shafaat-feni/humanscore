import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, ShieldCheck, BarChart2 } from 'lucide-react';
import { ASSESSMENTS } from '../data/assessments';
import { CATEGORIES } from '../data/categories';
import { AssessmentCard } from '../components/common/AssessmentCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Home: React.FC = () => {
  useDocumentTitle();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-20 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-navy-800/80 border border-navy-700 px-3 py-1 rounded-full text-xs font-semibold text-teal-accent">
            <Activity className="w-3.5 h-3.5" aria-hidden="true" /> Professional Self-Assessment Platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Measure. Understand. Explore.
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Interactive physical, cognitive, psychological, lifestyle, and skills assessments designed to run without registration. Results are saved only on your device.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/tests"
              className="bg-teal hover:bg-teal-accent text-navy-900 font-bold px-6 py-3 rounded-lg shadow-lg transition flex items-center gap-2"
            >
              Browse All Tests <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/overall-assessment"
              className="bg-navy-800 hover:bg-navy-700 text-white font-semibold px-6 py-3 rounded-lg border border-navy-700 transition flex items-center gap-2"
            >
              <BarChart2 className="w-4 h-4 text-teal" /> View Assessment Index
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">Assessment Categories</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Explore our suite of self-assessments designed to give you clear, educational personal metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const count = ASSESSMENTS.filter(t => t.category === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                to={`/${cat.slug}`}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal transition group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-slate-100 text-teal-dark rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal group-hover:text-navy-900 transition">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-1 group-hover:text-teal-dark transition">{cat.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{cat.teaser}</p>
                </div>
                <div className="text-xs font-semibold text-teal-dark flex items-center gap-1">
                  {count} {count === 1 ? 'Assessment' : 'Assessments'} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Tests */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-navy-900">Featured Assessments</h2>
            <p className="text-slate-600 text-sm">A preview of the assessments being built.</p>
          </div>
          <Link to="/tests" className="text-sm font-semibold text-teal-dark hover:underline flex items-center gap-1">
            View all {ASSESSMENTS.length} tests <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ASSESSMENTS.slice(0, 6).map(test => (
            <AssessmentCard key={test.id} test={test} />
          ))}
        </div>
      </section>

      {/* Trust & Privacy Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-white rounded-2xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-navy-800 text-teal px-3 py-1 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" /> Local-Only Storage
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Your data never leaves your browser.</h2>
            <p className="text-slate-300 text-sm">
              HumanScore stores all results locally in your browser's localStorage. We do not require registration, tracking, or transmission of your personal responses.
            </p>
          </div>
          <Link
            to="/privacy-policy"
            className="bg-teal hover:bg-teal-accent text-navy-900 font-bold px-6 py-3 rounded-lg shadow transition whitespace-nowrap"
          >
            Read Privacy Policy
          </Link>
        </div>
      </section>
    </div>
  );
};