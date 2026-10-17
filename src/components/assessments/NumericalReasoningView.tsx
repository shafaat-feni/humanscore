import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { NUMERICAL_REASONING_QUESTIONS } from '../../data/cognitiveQuestions';
import { calculatePercentage, getFeedbackMessage } from '../../utils/scoring';
import { storageService } from '../../services/storage';

export const NumericalReasoningView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const questions = NUMERICAL_REASONING_QUESTIONS;

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz(selectedAnswers);
    }
  };

  const finishQuiz = (answers: number[]) => {
    setIsCompleted(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = calculatePercentage(correctCount, questions.length);

    storageService.saveResult({
      assessmentId: 'numerical-reasoning',
      assessmentTitle: 'Numerical Reasoning',
      category: 'cognitive',
      rawResult: correctCount,
      normalizedScore: percentage,
      maxScore: questions.length,
      unit: 'correct',
    });
    setSavedSuccess(true);
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setSavedSuccess(false);
  };

  const correctCount = questions.filter((q, idx) => selectedAnswers[idx] === q.correctIndex).length;
  const percentage = calculatePercentage(correctCount, questions.length);
  const feedback = getFeedbackMessage(percentage, [
    { minScore: 0, maxScore: 49, label: 'Developing', feedback: 'Good effort! Review the step-by-step arithmetic explanations to strengthen your numerical skills.' },
    { minScore: 50, maxScore: 79, label: 'Good', feedback: 'Solid numerical competency demonstrated across practical math problems.' },
    { minScore: 80, maxScore: 100, label: 'Excellent', feedback: 'Outstanding analytical and quantitative reasoning ability!' },
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link to="/cognitive" className="inline-flex items-center gap-2 text-xs font-semibold text-teal hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Cognitive Hub
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-navy-800 px-3 py-1 rounded-full">
            Cognitive Challenge
          </span>
          <span className="text-xs text-slate-500">6 min est.</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Numerical Reasoning</h1>
        <p className="text-slate-600 text-sm">
          Solve practical quantitative word problems, percentages, ratios, and data interpretation items.
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 border-b border-slate-100 pb-3">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>Progress: {Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-navy-900">{questions[currentIndex].question}</h2>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {questions[currentIndex].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition flex items-center justify-between ${
                      isSelected
                        ? 'border-teal bg-teal/10 text-navy-900 font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
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
              {currentIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-navy-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-navy-800 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal font-semibold">Assessment Results</span>
              <div className="text-4xl sm:text-5xl font-extrabold mt-1 text-white">
                {percentage}% <span className="text-lg font-normal text-slate-300">({correctCount}/{questions.length} correct)</span>
              </div>
            </div>
            <div className="bg-navy-800 border border-navy-700 px-4 py-2 rounded-xl text-right">
              <div className="text-xs text-slate-400">Score Status</div>
              <div className="text-sm font-bold text-teal">Completed</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Feedback & Insights</div>
            <p className="text-sm text-slate-200">{feedback}</p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 text-xs text-teal">
              <CheckCircle className="w-4 h-4" /> Result successfully saved to browser local storage.
            </div>
          )}

          <div className="space-y-4 pt-4 border-t border-navy-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Question Review</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {questions.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div key={q.id} className="bg-navy-800 border border-navy-700 p-4 rounded-xl space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white">Q{idx + 1}: {q.question}</span>
                      {isCorrect ? <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                    </div>
                    <div className="text-slate-300">
                      Your answer: <span className={isCorrect ? 'text-teal font-semibold' : 'text-red-400 font-semibold'}>{q.options[userChoice] ?? 'Unanswered'}</span>
                      {!isCorrect && <span className="ml-2">| Correct: <span className="text-teal font-semibold">{q.options[q.correctIndex]}</span></span>}
                    </div>
                    <div className="text-slate-400 italic pt-1 border-t border-navy-700/50">Explanation: {q.explanation}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              onClick={handleRetake}
              className="flex-1 bg-navy-800 hover:bg-navy-700 text-white font-semibold py-3 rounded-xl border border-navy-700 transition flex items-center justify-center gap-2 text-xs"
            >
              <RotateCcw className="w-4 h-4" /> Retake Challenge
            </button>
            <Link
              to="/cognitive"
              className="flex-1 bg-teal hover:bg-teal-accent text-navy-900 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs text-center"
            >
              Back to Cognitive Hub
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};