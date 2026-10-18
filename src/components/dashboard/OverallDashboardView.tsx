import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Download, Trash2, Award, ArrowRight, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { storageService, type SavedResult } from '../../services/storage';
import { calculateOverallIndex, exportToJson, exportToCsv } from '../../utils/dashboardUtils';
import { ASSESSMENTS } from '../../data/assessments';

export const OverallDashboardView: React.FC = () => {
  const [results, setResults] = useState<SavedResult[]>([]);
  const [clearConfirm, setClearConfirm] = useState(false);

  useEffect(() => {
    setResults(storageService.getResults());
  }, []);

  const indexData = calculateOverallIndex(results);

  const handleClearHistory = () => {
    storageService.clearResults();
    setResults([]);
    setClearConfirm(false);
  };

  const handleDeleteItem = (id: string) => {
    storageService.removeResult(id);
    setResults(storageService.getResults());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="bg-navy-900 text-white p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-teal text-navy-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <BarChart2 className="w-4 h-4" /> Index Dashboard
          </div>
          <h1 className="text-3xl font-extrabold">Overall Assessment Index</h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Unified platform summary reflecting your latest completed core cognitive and skill assessments.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => exportToJson(results)}
            disabled={results.length === 0}
            className="bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg border border-navy-700 transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className="w-4 h-4" /> Export JSON
          </button>
          <button
            onClick={() => exportToCsv(results)}
            disabled={results.length === 0}
            className="bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg border border-navy-700 transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Index Card & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Composite Index Score</span>
            {indexData.index !== null ? (
              <div className="text-5xl font-extrabold text-navy-900">
                {indexData.index} <span className="text-lg font-normal text-slate-500">/ 100</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-slate-400">No Eligible Tests</div>
            )}
            <p className="text-xs text-slate-600">
              {indexData.eligibleCount} of {indexData.totalEligible} eligible core assessments completed.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="font-bold text-navy-900">Index Formula</div>
            <p>
              Calculated as the arithmetic mean of normalized scores from eligible cognitive and skill challenges. Missing tests do not count as zero.
            </p>
          </div>
        </div>

        {/* Chart Breakdown */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-navy-900">Eligible Score Breakdown</h2>
          {indexData.scores.length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={indexData.scores} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="title" angle={-15} textAnchor="end" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#00B4D8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <p className="text-xs text-slate-500">Complete eligible core assessments to visualize your score breakdown.</p>
              <Link to="/tests" className="bg-teal text-navy-900 font-bold px-4 py-2 rounded-lg text-xs shadow">
                Explore Assessments
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Missing Eligible Tests / Next Steps */}
      {indexData.missingAssessments.length > 0 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-navy-900">Complete Missing Eligible Assessments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {indexData.missingAssessments.map(missing => {
              const meta = ASSESSMENTS.find(a => a.id === missing.id);
              return (
                <div key={missing.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">Eligible for Index</span>
                    <h3 className="text-sm font-bold text-navy-900 mt-2">{missing.title}</h3>
                  </div>
                  {meta && (
                    <Link to={`/tests/${meta.slug}`} className="text-xs font-semibold text-teal hover:underline flex items-center gap-1">
                      Take Assessment <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Complete Result History */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-navy-900">Complete Result History</h2>
            <p className="text-xs text-slate-500">All saved assessment attempts stored locally in your browser.</p>
          </div>
          {results.length > 0 && (
            <div>
              {!clearConfirm ? (
                <button
                  onClick={() => setClearConfirm(true)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs px-3 py-2 rounded-lg border border-red-200 transition flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Clear All History
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-red-50 p-2 rounded-lg border border-red-200">
                  <span className="text-xs text-red-700 font-semibold">Are you sure?</span>
                  <button onClick={handleClearHistory} className="bg-red-600 text-white text-xs px-3 py-1 rounded font-bold hover:bg-red-700">Yes</button>
                  <button onClick={() => setClearConfirm(false)} className="bg-slate-200 text-slate-700 text-xs px-3 py-1 rounded font-semibold hover:bg-slate-300">No</button>
                </div>
              )}
            </div>
          )}
        </div>

        {results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-navy-900 uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-4 py-3">Assessment</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Raw Result</th>
                  <th className="px-4 py-3">Normalized Score</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {results.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-navy-900">{r.assessmentTitle}</td>
                    <td className="px-4 py-3 capitalize text-slate-600">{r.category}</td>
                    <td className="px-4 py-3">{r.rawResult} {r.unit || ''}</td>
                    <td className="px-4 py-3 font-semibold text-teal">{r.normalizedScore !== undefined ? `${r.normalizedScore}/100` : 'N/A'}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(r.timestamp).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteItem(r.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <p className="text-xs text-slate-500">No assessment results recorded yet.</p>
            <Link to="/tests" className="inline-block bg-teal text-navy-900 font-bold px-4 py-2 rounded-lg text-xs shadow">
              Take Your First Assessment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};