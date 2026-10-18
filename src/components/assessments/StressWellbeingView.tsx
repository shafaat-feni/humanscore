import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, CheckCircle, RotateCcw } from 'lucide-react';
import { STRESS_WELLBEING_QUESTIONS } from '../../data/psychologicalLifestyleQuestions';
import { storageService } from '../../services/storage';

export const StressWellbeingView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const questions = STRESS_WELLBEING_QUESTIONS;

  const handleSelectOption = (score: number) => {
    const updated = [...selectedAnswers];
    updated[currentIndex] = score;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishAssessment(selectedAnswers);
    }
  };

  const finishAssessment = (answers: number[]) => {
    setIsCompleted(true);
    const totalScore = answers.reduce((acc, curr) => acc + (curr ?? 2), 0);

    storageService.saveResult({
      assessmentId: 'stress-and-wellbeing-self-assessment',
      assessmentTitle: 'Stress & Well-Being Self-Assessment',
      category: 'psychological',
      rawResult: totalScore,
      maxScore: questions.length * 4,
      unit: 'points',
    });
    setSavedSuccess(true);
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setSavedSuccess(false);
  };

  const totalScore = selectedAnswers.reduce((acc, curr) => acc + (curr ?? 0), 0);
  const maxPossible = questions.length * 4;
  const stressRatio = Math.round((totalScore / maxPossible) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link to="/psychological" className="inline-flex items-center gap-2 text-xs font-semibold text-teal hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Psychological Hub
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-navy-800 px-3 py-1 rounded-full">
            Self-Reflection Questionnaire
          </span>
          <span className="text-xs text-slate-500">5 min est.</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Stress & Well-Being Self-Assessment</h1>
        <p className="text-slate-600 text-sm">
          Examine recent perceived stress levels and daily well-being markers over the past month.
        </p>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <div className="font-bold">Educational & Non-Diagnostic Notice</div>
            <p>
              This is an original self-reflection tool, not a clinical diagnosis or medical evaluation. If you are experiencing persistent distress, anxiety, or overwhelming stress, please consider consulting a qualified healthcare professional or counselor.
            </p>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 border-b border-slate-100 pb-3">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="bg-slate-100 px-2 py-1 rounded text-navy-800 font-bold">{questions[currentIndex].dimension}</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-navy-900">{questions[currentIndex].question}</h2>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {questions[currentIndex].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === opt.score;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(opt.score)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition flex items-center justify-between ${
                      isSelected
                        ? 'border-teal bg-teal/10 text-navy-900 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${isSelected ? 'border-teal bg-teal text-white' : 'border-slate-300'}`}>
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={selectedAnswers[currentIndex] === undefined}
              onClick={handleNext}
              className="bg-teal hover:bg-teal-accent text-navy-900 font-bold px-6 py-2.5 rounded-lg text-xs transition disabled:opacity-50 shadow"
            >
              {currentIndex === questions.length - 1 ? 'View Assessment Summary' : 'Next Question'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-navy-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-navy-800 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal font-semibold">Self-Assessment Summary</span>
              <div className="text-3xl font-extrabold mt-1 text-white">
                Score: {totalScore} / {maxPossible}
              </div>
            </div>
            <div className="bg-navy-800 border border-navy-700 px-4 py-2 rounded-xl text-right">
              <div className="text-xs text-slate-400">Status</div>
              <div className="text-sm font-bold text-teal">Completed</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Reflection & Insights</div>
            <p className="text-sm text-slate-200 leading-relaxed">
              Your responses reflect your recent experiences with stress and daily coping mechanisms. High-stress periods can be managed through regular physical activity, mindfulness routines, adequate rest, and establishing supportive boundaries.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 text-xs text-teal">
              <CheckCircle className="w-4 h-4" /> Result successfully saved to local browser storage.
            </div>
          )}

          <div className="pt-4 flex gap-4">
            <button
              onClick={handleRetake}
              className="flex-1 bg-navy-800 hover:bg-navy-700 text-white font-semibold py-3 rounded-xl border border-navy-700 transition flex items-center justify-center gap-2 text-xs"
            >
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </button>
            <Link
              to="/psychological"
              className="flex-1 bg-teal hover:bg-teal-accent text-navy-900 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs text-center"
            >
              Back to Psychological Hub
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};