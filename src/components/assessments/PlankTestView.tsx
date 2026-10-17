import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Square, RotateCcw, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import { createTimer, formatElapsedTime } from '../../utils/timer';
import { storageService } from '../../services/storage';

export const PlankTestView: React.FC = () => {
  const [testState, setTestState] = useState<'intro' | 'running' | 'completed'>('intro');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const timerRef = useRef(createTimer());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStart = () => {
    setTestState('running');
    timerRef.current.start();
    intervalRef.current = window.setInterval(() => {
      setElapsedMs(timerRef.current.getElapsedMs());
    }, 100);
  };

  const handleStop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const finalMs = timerRef.current.stop();
    setElapsedMs(finalMs);
    setTestState('completed');

    const totalSeconds = Math.round(finalMs / 1000);
    storageService.saveResult({
      assessmentId: 'plank-endurance-test',
      assessmentTitle: 'Plank Endurance Test',
      category: 'physical',
      rawResult: totalSeconds,
      unit: 'seconds',
      durationMs: finalMs,
    });
    setSavedSuccess(true);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timerRef.current = createTimer();
    setElapsedMs(0);
    setTestState('intro');
    setSavedSuccess(false);
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
          <span className="text-xs text-slate-500">3 min est.</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Plank Endurance Test</h1>
        <p className="text-slate-600 text-sm">
          Measure isometric core muscular endurance in a forearm plank position. Stop immediately if you feel pain, discomfort, or strain.
        </p>
      </div>

      {testState === 'intro' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <div className="font-bold">Safety Guidelines</div>
              <p>
                Maintain a straight line from your head to your heels. Engage your core and glutes. Stop immediately if you experience lower back discomfort, dizziness, or fatigue.
              </p>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-teal hover:bg-teal-accent text-navy-900 font-bold py-4 rounded-xl shadow transition flex items-center justify-center gap-2 text-base"
          >
            <Play className="w-5 h-5" /> Start Plank Timer
          </button>
        </div>
      )}

      {testState === 'running' && (
        <div className="bg-navy-900 text-white p-8 sm:p-12 rounded-2xl shadow-xl text-center space-y-8">
          <div className="text-xs uppercase tracking-wider text-teal font-semibold flex items-center justify-center gap-1">
            <Clock className="w-4 h-4 animate-pulse" /> Test in Progress
          </div>

          <div className="text-6xl sm:text-8xl font-black font-mono tracking-wider text-white">
            {formatElapsedTime(elapsedMs)}
          </div>

          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Focus on steady breathing and form. Tap stop as soon as you break form or complete your test.
          </p>

          <div>
            <button
              onClick={handleStop}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 mx-auto text-base"
            >
              <Square className="w-5 h-5" /> Stop & Save Time
            </button>
          </div>
        </div>
      )}

      {testState === 'completed' && (
        <div className="bg-navy-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-navy-800 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal font-semibold">Completed Duration</span>
              <div className="text-4xl sm:text-5xl font-extrabold mt-1 font-mono">
                {formatElapsedTime(elapsedMs)}
              </div>
            </div>
            <div className="bg-navy-800 border border-navy-700 px-4 py-2 rounded-xl text-right">
              <div className="text-xs text-slate-400">Total Seconds</div>
              <div className="text-lg font-bold text-teal">{Math.round(elapsedMs / 1000)}s</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Assessment Feedback</div>
            <p className="text-sm text-slate-200">
              Great effort completing the isometric core endurance test! Core stability contributes to overall posture and physical resilience.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 text-xs text-teal pt-2">
              <CheckCircle className="w-4 h-4" /> Result successfully saved to local browser storage.
            </div>
          )}

          <div className="pt-4 flex gap-4">
            <button
              onClick={handleReset}
              className="flex-1 bg-navy-800 hover:bg-navy-700 text-white font-semibold py-3 rounded-xl border border-navy-700 transition flex items-center justify-center gap-2 text-xs"
            >
              <RotateCcw className="w-4 h-4" /> Retake Test
            </button>
            <Link
              to="/physical"
              className="flex-1 bg-teal hover:bg-teal-accent text-navy-900 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs text-center"
            >
              Back to Physical Hub
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};