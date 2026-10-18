import { describe, it, expect } from 'vitest';
import { calculateOverallIndex, ELIGIBLE_INDEX_ASSESSMENTS } from '../dashboardUtils';
import type { SavedResult } from '../../services/storage';

describe('Dashboard & Index Utilities', () => {
  it('returns null index when no eligible assessments are completed', () => {
    const res = calculateOverallIndex([]);
    expect(res.index).toBeNull();
    expect(res.eligibleCount).toBe(0);
    expect(res.missingAssessments.length).toBe(4);
  });

  it('calculates arithmetic mean correctly for eligible assessments', () => {
    const mockResults: SavedResult[] = [
      {
        id: '1',
        assessmentId: 'number-pattern-challenge',
        assessmentTitle: 'Number Pattern',
        category: 'cognitive',
        timestamp: 1000,
        rawResult: 8,
        normalizedScore: 80,
        version: 1,
      },
      {
        id: '2',
        assessmentId: 'numerical-reasoning',
        assessmentTitle: 'Numerical Reasoning',
        category: 'cognitive',
        timestamp: 2000,
        rawResult: 9,
        normalizedScore: 90,
        version: 1,
      },
    ];

    const res = calculateOverallIndex(mockResults);
    expect(res.index).toBe(85); // (80 + 90) / 2
    expect(res.eligibleCount).toBe(2);
    expect(res.missingAssessments.length).toBe(2);
  });

  it('uses the latest attempt when multiple attempts exist for the same assessment', () => {
    const mockResults: SavedResult[] = [
      {
        id: '2',
        assessmentId: 'number-pattern-challenge',
        assessmentTitle: 'Number Pattern',
        category: 'cognitive',
        timestamp: 2000,
        rawResult: 10,
        normalizedScore: 100, // Latest attempt
        version: 1,
      },
      {
        id: '1',
        assessmentId: 'number-pattern-challenge',
        assessmentTitle: 'Number Pattern',
        category: 'cognitive',
        timestamp: 1000,
        rawResult: 5,
        normalizedScore: 50, // Older attempt
        version: 1,
      },
    ];

    const res = calculateOverallIndex(mockResults);
    expect(res.index).toBe(100);
    expect(res.eligibleCount).toBe(1);
    expect(res.scores[0].score).toBe(100);
  });
});