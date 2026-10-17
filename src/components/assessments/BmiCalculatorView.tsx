import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, Save, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { calculateBmi, type UnitSystem } from '../../utils/physicalCalculators';
import { storageService } from '../../services/storage';

export const BmiCalculatorView: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [weightKg, setWeightKg] = useState<string>('70');
  const [heightCm, setHeightCm] = useState<string>('175');
  const [weightLbs, setWeightLbs] = useState<string>('154');
  const [heightFeet, setHeightFeet] = useState<string>('5');
  const [heightInches, setHeightInches] = useState<string>('9');

  const [result, setResult] = useState<{ value: number; unit: string; category: string; feedback: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSavedSuccess(false);

    const calcInput = unitSystem === 'metric'
      ? { unitSystem, weightKg: parseFloat(weightKg), heightCm: parseFloat(heightCm) }
      : { unitSystem, weightLbs: parseFloat(weightLbs), heightFeet: parseInt(heightFeet || '0', 10), heightInches: parseInt(heightInches || '0', 10) };

    const res = calculateBmi(calcInput);
    if ('error' in res) {
      setError(res.error);
      setResult(null);
    } else {
      setResult(res);
      // Auto save to storage
      storageService.saveResult({
        assessmentId: 'bmi-calculator',
        assessmentTitle: 'BMI Calculator',
        category: 'physical',
        rawResult: res.value,
        unit: res.unit,
      });
      setSavedSuccess(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back Link */}
      <Link to="/physical" className="inline-flex items-center gap-2 text-xs font-semibold text-teal hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Physical Assessments
      </Link>

      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-navy-800 px-3 py-1 rounded-full">
            Physical Assessment
          </span>
          <span className="text-xs text-slate-500">2 min est.</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">BMI Calculator</h1>
        <p className="text-slate-600 text-sm">
          Body Mass Index (BMI) is a standardized screening tool used to estimate healthy body weight relative to height.
        </p>

        {/* Unit Toggle */}
        <div className="flex items-center space-x-2 pt-2">
          <span className="text-xs font-semibold text-slate-700">Unit System:</span>
          <button
            type="button"
            onClick={() => setUnitSystem('metric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${unitSystem === 'metric' ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Metric (kg / cm)
          </button>
          <button
            type="button"
            onClick={() => setUnitSystem('imperial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${unitSystem === 'imperial' ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Imperial (lbs / ft-in)
          </button>
        </div>
      </div>

      {/* Calculator Form */}
      <form onSubmit={handleCalculate} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {unitSystem === 'metric' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-navy-900">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="500"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-navy-900">Height (cm)</label>
              <input
                type="number"
                step="0.1"
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-navy-900">Weight (lbs)</label>
              <input
                type="number"
                step="0.1"
                min="20"
                max="1000"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-navy-900">Height (feet)</label>
              <input
                type="number"
                step="1"
                min="1"
                max="8"
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-navy-900">Height (inches)</label>
              <input
                type="number"
                step="1"
                min="0"
                max="11"
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
          <Activity className="w-4 h-4" /> Calculate BMI
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="bg-navy-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-navy-800 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal font-semibold">Your BMI Result</span>
              <div className="text-4xl sm:text-5xl font-extrabold mt-1 text-white">
                {result.value} <span className="text-lg font-normal text-slate-300">{result.unit}</span>
              </div>
            </div>
            <div className="bg-navy-800 border border-navy-700 px-4 py-2 rounded-xl">
              <div className="text-xs text-slate-400">Category</div>
              <div className="text-sm font-bold text-teal">{result.category}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Interpretation & Insights</div>
            <p className="text-sm text-slate-200 leading-relaxed">{result.feedback}</p>
          </div>

          <div className="bg-navy-800/60 border border-navy-700/60 p-4 rounded-xl text-xs text-slate-400 space-y-2">
            <div className="font-semibold text-slate-300">Important Limitations</div>
            <p>
              BMI is a statistical screening tool and does not directly measure body fat percentage, muscle mass, bone density, or metabolic health. It is not intended for pediatric populations, pregnant individuals, or elite athletes without clinical correlation.
            </p>
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