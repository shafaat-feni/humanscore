import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { calculateWth, type UnitSystem } from '../../utils/physicalCalculators';
import { storageService } from '../../services/storage';

export const WthCalculatorView: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [waistCm, setWaistCm] = useState<string>('82');
  const [heightCm, setHeightCm] = useState<string>('175');
  const [waistInches, setWaistInches] = useState<string>('32');
  const [heightInches, setHeightInches] = useState<string>('69');

  const [result, setResult] = useState<{ value: number; unit: string; category: string; feedback: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSavedSuccess(false);

    const calcInput = unitSystem === 'metric'
      ? { unitSystem, waistCm: parseFloat(waistCm), heightCm: parseFloat(heightCm) }
      : { unitSystem, waistInches: parseFloat(waistInches), heightInches: parseFloat(heightInches) };

    const res = calculateWth(calcInput);
    if ('error' in res) {
      setError(res.error);
      setResult(null);
    } else {
      setResult(res);
      storageService.saveResult({
        assessmentId: 'waist-to-height-ratio',
        assessmentTitle: 'Waist-to-Height Ratio',
        category: 'physical',
        rawResult: res.value,
        unit: res.unit,
      });
      setSavedSuccess(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link to="/physical" className="inline-flex items-center gap-2 text-xs font-semibold text-teal hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Physical Assessments
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-navy-800 px-3 py-1 rounded-full">
            Physical Assessment
          </span>
          <span className="text-xs text-slate-500">2 min est.</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Waist-to-Height Ratio</h1>
        <p className="text-slate-600 text-sm">
          Evaluate central adiposity risk distribution relative to height. A general rule of thumb is to keep your waist circumference to less than half your height.
        </p>

        <div className="flex items-center space-x-2 pt-2">
          <span className="text-xs font-semibold text-slate-700">Unit System:</span>
          <button
            type="button"
            onClick={() => setUnitSystem('metric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${unitSystem === 'metric' ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Metric (cm)
          </button>
          <button
            type="button"
            onClick={() => setUnitSystem('imperial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${unitSystem === 'imperial' ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Imperial (inches)
          </button>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {unitSystem === 'metric' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-navy-900">Waist Circumference (cm)</label>
              <input
                type="number"
                step="0.5"
                min="20"
                max="300"
                value={waistCm}
                onChange={(e) => setWaistCm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-navy-900">Height (cm)</label>
              <input
                type="number"
                step="0.5"
                min="50"
                max="300"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal"
                required
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-navy-900">Waist Circumference (inches)</label>
              <input
                type="number"
                step="0.5"
                min="10"
                max="120"
                value={waistInches}
                onChange={(e) => setWaistInches(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-navy-900">Height (inches)</label>
              <input
                type="number"
                step="0.5"
                min="20"
                max="120"
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal"
                required
              />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-teal hover:bg-teal-accent text-navy-900 font-bold py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2 text-sm"
        >
          <Activity className="w-4 h-4" /> Calculate Ratio
        </button>
      </form>

      {result && (
        <div className="bg-navy-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-navy-800 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal font-semibold">Waist-to-Height Ratio</span>
              <div className="text-4xl sm:text-5xl font-extrabold mt-1 text-white">
                {result.value}
              </div>
            </div>
            <div className="bg-navy-800 border border-navy-700 px-4 py-2 rounded-xl">
              <div className="text-xs text-slate-400">Interpretation</div>
              <div className="text-sm font-bold text-teal">{result.category}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Insights & Guidance</div>
            <p className="text-sm text-slate-200 leading-relaxed">{result.feedback}</p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 text-xs text-teal pt-2">
              <CheckCircle className="w-4 h-4" /> Result automatically saved to your local browser storage.
            </div>
          )}
        </div>
      )}
    </div>
  );
};