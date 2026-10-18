import { describe, it, expect } from 'vitest';
import { calculatePercentage, normalizeScore, getInterpretation, getFeedbackMessage, type InterpretationBand } from '../scoring';

describe('Scoring Engine', () => {
  it('calculates percentages correctly', () => {
    expect(calculatePercentage(8, 10)).toBe(80);
    expect(calculatePercentage(3, 4)).toBe(75);
    expect(calculatePercentage(0, 10)).toBe(0);
    expect(calculatePercentage(5, 0)).toBe(0); // Division by zero protection
  });

  it('normalizes scores within defined range', () => {
    expect(normalizeScore(50, 0, 100)).toBe(50);
    expect(normalizeScore(15, 10, 20)).toBe(50);
    expect(normalizeScore(25, 0, 50)).toBe(50);
    expect(normalizeScore(-10, 0, 100)).toBe(0); // Clamping min
    expect(normalizeScore(120, 0, 100)).toBe(100); // Clamping max
    expect(normalizeScore(50, 10, 10)).toBe(0); // Invalid range protection
  });

  const sampleBands: InterpretationBand[] = [
    { minScore: 0, maxScore: 40, label: 'Needs Practice', feedback: 'Keep practicing to build your score.' },
    { minScore: 41, maxScore: 75, label: 'Good Effort', feedback: 'Good effort! Review missed items.' },
    { minScore: 76, maxScore: 100, label: 'Excellent', feedback: 'Outstanding performance!' },
  ];

  it('finds correct interpretation bands', () => {
    const band = getInterpretation(85, sampleBands);
    expect(band?.label).toBe('Excellent');
    expect(getInterpretation(30, sampleBands)?.label).toBe('Needs Practice');
    expect(getInterpretation(50, sampleBands)?.label).toBe('Good Effort');
  });

  it('handles decimal scores that fall between integer bands', () => {
    expect(getInterpretation(40.5, sampleBands)?.label).toBe('Needs Practice');
    expect(getInterpretation(75.5, sampleBands)?.label).toBe('Good Effort');
    expect(getInterpretation(100.5, sampleBands)).toBeNull();
    expect(getInterpretation(-1, sampleBands)).toBeNull();
    expect(getInterpretation(50, [])).toBeNull();
    expect(getInterpretation(NaN, sampleBands)).toBeNull();
  });

  it('returns correct feedback messages', () => {
    expect(getFeedbackMessage(90, sampleBands)).toBe('Outstanding performance!');
    expect(getFeedbackMessage(20, sampleBands)).toBe('Keep practicing to build your score.');
  });
});