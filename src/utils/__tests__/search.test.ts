import { describe, it, expect } from 'vitest';
import { searchAssessments } from '../search';
import { ASSESSMENTS } from '../../data/assessments';

describe('searchAssessments', () => {
  it('returns everything for an empty or whitespace query', () => {
    expect(searchAssessments(ASSESSMENTS, '')).toHaveLength(ASSESSMENTS.length);
    expect(searchAssessments(ASSESSMENTS, '   ')).toHaveLength(ASSESSMENTS.length);
  });

  it('matches case-insensitively and ignores surrounding whitespace', () => {
    const results = searchAssessments(ASSESSMENTS, '  BMI ');
    expect(results.some(r => r.id === 'bmi')).toBe(true);
  });

  it('returns an empty list when nothing matches', () => {
    expect(searchAssessments(ASSESSMENTS, 'zzzzzz')).toEqual([]);
  });
});
