import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Eye, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { calculatePercentage, getFeedbackMessage } from '../../utils/scoring';
import { storageService } from '../../services/storage';

export const MemoryChallengeView: React.FC = () => {
  const [round, setRound] = useState(1);
  const [stage, setStage] = useState<'intro' | 'memorize' | 'recall' | 'completed'>('intro');
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(5);
  const [roundScores, setRoundScores] = useState<boolean[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const totalRounds = 5;

  const generateSequence = (currentRound: number) => {
    const length = currentRound + 2; // e.g. round 1 = 3 digits, round 5 = 7 digits
    const seq: number[] = [];
    for (let i = 0; i < length; i++) {
      seq.push(Math.floor(Math.random() * 10));
    }
    return seq;
  };

  const handleStartRound = () => {
    const newSeq = generateSequence(round);
    setSequence(newSeq);
    setUserSequence([]);
    setStage('memorize');
    setTimeLeft(5);
  };

  useEffect(() => {
    let timer: number;
    if (stage === 'memorize' && timeLeft > 0) {
      timer = window.setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (stage === 'memorize' && timeLeft === 0) {
      setStage('recall');
    }
    return () => clearTimeout(timer);
  }, [stage, timeLeft]);

  const handlePadClick = (digit: number) => {
    if (stage !== 'recall') return;
    const updated = [...userSequence, digit];
    setUserSequence(updated);

    if (updated.length === sequence.length) {
      // Evaluate round
      const isCorrect = updated.every((val, idx) => val === sequence[idx]);
      const newScores = [...roundScores, isCorrect];
      setRoundScores(newScores);

      if (round < totalRounds) {
        setRound(round + 1);
        setTimeout(() => handleStartRoundForNext(round + 1), 1200);
      } else {
        finishAssessment(newScores);
      }
    }
  };

  const handleStartRoundForNext = (nextRound: number) => {
    const newSeq = generateSequence(nextRound);
    setSequence(newSeq);
    setUserSequence([]);
    setStage('memorize');
    setTimeLeft(5);
  };

  const finishAssessment = (scores: boolean[]) => {
    setStage('completed');
    const correctCount = scores.filter(Boolean).length;
    const percentage = calculatePercentage(correctCount, totalRounds);

    storageService.saveResult({
      assessmentId: 'short-term-memory-challenge',
      assessmentTitle: 'Short-Term Memory Challenge',
      category: 'cognitive',
      rawResult: correctCount,
      normalizedScore: percentage,
      maxScore: totalRounds,
      unit: 'rounds passed',
    });
    setSavedSuccess(true);
  };

  const handleRetake = () => {
    setRound(1);
    setRoundScores([]);
    setStage('intro');
    setSavedSuccess(false);
  };

  const correctRoundsCount = roundScores.filter(Boolean).length;
  const finalPercentage = calculatePercentage(correctRoundsCount, totalRounds);
  const feedback = getFeedbackMessage(finalPercentage, [
    { minScore: 0, maxScore: 40, label: 'Developing', feedback: 'Good effort! Working memory span can be practiced regularly with visual and numeric recall exercises.' },
    { minScore: 41, maxScore: 80, label: 'Good', feedback: 'Strong short-term retention span across multi-digit sequences.' },
    { minScore: 81, maxScore: 100, label: 'Excellent', feedback: 'Exceptional working memory retention and sequential recall performance!' },
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
          <span className="text-xs text-slate-500">4 min est.</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Short-Term Memory Challenge</h1>
        <p className="text-slate-600 text-sm">
          Assess working memory retention span by memorizing and recalling increasingly long digit sequences.
        </p>
      </div>

      {stage === 'intro' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 bg-teal/10 text-teal rounded-2xl flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-navy-900">Ready to Test Your Working Memory?</h2>
            <p className="text-xs text-slate-600">
              You will be presented with a sequence of digits for 5 seconds. Memorize the sequence in order, then recall it using the keypad. Sequences start at 3 digits and grow up to 7 digits across 5 rounds.
            </p>
          </div>
          <button
            onClick={handleStartRound}
            className="bg-teal hover:bg-teal-accent text-navy-900 font-bold px-8 py-3.5 rounded-xl shadow transition text-sm"
          >
            Start Challenge
          </button>
        </div>
      )}

      {stage === 'memorize' && (
        <div className="bg-navy-900 text-white p-8 sm:p-12 rounded-2xl shadow-xl text-center space-y-6">
          <div className="text-xs uppercase tracking-wider text-teal font-semibold flex items-center justify-center gap-1">
            <Eye className="w-4 h-4 animate-pulse" /> Memorize Sequence (Round {round} of {totalRounds})
          </div>

          <div className="text-5xl sm:text-7xl font-mono font-black tracking-widest text-white py-6 bg-navy-800 border border-navy-700 rounded-2xl">
            {sequence.join(' ')}
          </div>

          <div className="text-sm font-bold text-teal">
            Disappearing in: {timeLeft}s
          </div>
        </div>
      )}

      {stage === 'recall' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal">Recall Stage (Round {round} of {totalRounds})</span>
            <h2 className="text-xl font-bold text-navy-900">Enter the sequence in order</h2>
            <p className="text-xs text-slate-500">Your input: <span className="font-mono font-bold text-navy-900 text-sm">{userSequence.join(' ')}</span></p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto pt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handlePadClick(digit)}
                className="bg-slate-100 hover:bg-teal hover:text-white text-navy-900 font-bold py-4 rounded-xl text-lg shadow-sm transition active:scale-95"
              >
                {digit}
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === 'completed' && (
        <div className="bg-navy-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-navy-800 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal font-semibold">Assessment Results</span>
              <div className="text-4xl sm:text-5xl font-extrabold mt-1 text-white">
                {finalPercentage}% <span className="text-lg font-normal text-slate-300">({correctRoundsCount}/{totalRounds} rounds passed)</span>
              </div>
            </div>
            <div className="bg-navy-800 border border-navy-700 px-4 py-2 rounded-xl text-right">
              <div className="text-xs text-slate-400">Status</div>
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