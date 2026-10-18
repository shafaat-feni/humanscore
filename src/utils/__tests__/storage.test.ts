import { describe, it, expect, beforeEach } from 'vitest';
import { storageService } from '../storage';

describe('Storage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and retrieves results successfully', () => {
    const saved = storageService.saveResult({
      assessmentId: 'number-pattern',
      assessmentTitle: 'Number Pattern Challenge',
      category: 'cognitive',
      rawResult: 9,
      normalizedScore: 90,
      maxScore: 10,
      unit: 'correct',
    });

    expect(saved).not.toBeNull();
    const results = storageService.getResults();
    expect(results.length).toBe(1);
    expect(results[0].assessmentId).toBe('number-pattern');
    expect(results[0].normalizedScore).toBe(90);
  });

  it('removes individual results', () => {
    const saved = storageService.saveResult({
      assessmentId: 'bmi',
      assessmentTitle: 'BMI Calculator',
      category: 'physical',
      rawResult: 22.5,
      unit: 'kg/m2',
    });

    expect(saved).not.toBeNull();
    expect(storageService.getResults().length).toBe(1);

    storageService.removeResult(saved!.id);
    expect(storageService.getResults().length).toBe(0);
  });

  it('clears all results', () => {
    storageService.saveResult({
      assessmentId: 'test-1',
      assessmentTitle: 'Test 1',
      category: 'cognitive',
      rawResult: 5,
    });
    storageService.saveResult({
      assessmentId: 'test-2',
      assessmentTitle: 'Test 2',
      category: 'physical',
      rawResult: 10,
    });

    expect(storageService.getResults().length).toBe(2);
    storageService.clearResults();
    expect(storageService.getResults().length).toBe(0);
  });

  it('handles malformed JSON gracefully', () => {
    localStorage.setItem('humanscore_assessments_v1', 'not-valid-json');
    const results = storageService.getResults();
    expect(results).toEqual([]);
  });
});