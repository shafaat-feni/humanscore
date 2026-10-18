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

  it('rejects whitespace, booleans, and non-decimal strings', () => {
    expect(validateNumber('   ').valid).toBe(false);
    expect(validateNumber(true).valid).toBe(false);
    expect(validateNumber('0x10').valid).toBe(false);
    expect(validateNumber({}).valid).toBe(false);
    expect(validateNumber(NaN).valid).toBe(false);
  });

  it('returns the parsed value for valid input', () => {
    expect(validateNumber(' 12.5 ').value).toBe(12.5);
    expect(validateNumber('-3').value).toBe(-3);
    expect(validateNumber('1e3').value).toBe(1000);
  });

  it('validates answer indexes correctly', () => {
    expect(validateAnswerIndex(2, 4).valid).toBe(true);
    expect(validateAnswerIndex(4, 4).valid).toBe(false); // Out of bounds (0 to 3)
    expect(validateAnswerIndex(-1, 4).valid).toBe(false);
    expect(validateAnswerIndex(0, 0).valid).toBe(false); // No options
  });

  it('validates elapsed time correctly', () => {
    expect(validateElapsedTime(1500).valid).toBe(true);
    expect(validateElapsedTime(0).valid).toBe(true);
    expect(validateElapsedTime(-100).valid).toBe(false);
  });
});