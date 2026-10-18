import { describe, it, expect } from 'vitest';
import { calculateBmi, calculateWth } from '../physicalCalculators';

describe('Physical Calculation Utilities', () => {
  it('calculates metric BMI correctly', () => {
    const res = calculateBmi({ unitSystem: 'metric', weightKg: 70, heightCm: 175 });
    if ('error' in res) throw new Error(res.error);
    expect(res.value).toBe(22.9);
    expect(res.category).toBe('Normal Weight');
  });

  it('rejects invalid metric BMI inputs', () => {
    const res = calculateBmi({ unitSystem: 'metric', weightKg: -10, heightCm: 175 });
    expect('error' in res).toBe(true);
  });

  it('calculates imperial BMI correctly', () => {
    const res = calculateBmi({ unitSystem: 'imperial', weightLbs: 154, heightFeet: 5, heightInches: 9 });
    if ('error' in res) throw new Error(res.error);
    expect(res.value).toBe(22.7);
  });

  it('calculates metric Waist-to-Height Ratio correctly', () => {
    const res = calculateWth({ unitSystem: 'metric', waistCm: 80, heightCm: 170 });
    if ('error' in res) throw new Error(res.error);
    expect(res.value).toBe(0.47);
    expect(res.category).toBe('Healthy / Desirable');
  });

  it('rejects invalid WTH inputs', () => {
    const res = calculateWth({ unitSystem: 'metric', waistCm: 0, heightCm: 170 });
    expect('error' in res).toBe(true);
  });
});