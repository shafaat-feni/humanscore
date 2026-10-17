import { describe, it, expect } from 'vitest';
import { validateNumber, validateAnswerIndex, validateElapsedTime } from '../validation';

describe('Validation Utilities', () => {
  it('validates numbers correctly', () => {
    expect(validateNumber(10, { min: 0, max: 20 }).valid).toBe(true);
    expect(validateNumber(-5, { min: 0 }).valid).toBe(false);
    expect(validateNumber(25, { max: 20 }).valid).toBe(false);
    expect(validateNumber('abc').valid).toBe(false);
    expect(validateNumber(null).valid).toBe(false);
    expect(validateNumber(5.5, { integerOnly: true }).valid).toBe(false);
    expect(validateNumber(5, { integerOnly: true }).valid).toBe(true);
  });

  it('validates answer indexes correctly', () => {
    expect(validateAnswerIndex(2, 4).valid).toBe(true);
    expect(validateAnswerIndex(4, 4).valid).toBe(false); // Out of bounds (0 to 3)
    expect(validateAnswerIndex(-1, 4).valid).toBe(false);
  });

  it('validates elapsed time correctly', () => {
    expect(validateElapsedTime(1500).valid).toBe(true);
    expect(validateElapsedTime(0).valid).toBe(true);
    expect(validateElapsedTime(-100).valid).toBe(false);
  });
});