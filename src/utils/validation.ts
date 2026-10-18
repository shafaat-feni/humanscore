export interface ValidationResult {
  valid: boolean;
  error?: string;
  /** The parsed numeric value, present when valid. */
  value?: number;
}

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

const NUMERIC_STRING = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/;

export function validateNumber(
  value: unknown,
  options?: { min?: number; max?: number; integerOnly?: boolean; fieldName?: string }
): ValidationResult {
  const name = options?.fieldName || 'Value';

  if (value === undefined || value === null) {
    return { valid: false, error: `${name} is required.` };
  }

  let num: number;
  if (typeof value === 'number') {
    num = value;
  } else if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') {
      return { valid: false, error: `${name} is required.` };
    }
    if (!NUMERIC_STRING.test(trimmed)) {
      return { valid: false, error: `${name} must be a valid finite number.` };
    }
    num = Number(trimmed);
  } else {
    return { valid: false, error: `${name} must be a valid finite number.` };
  }

  if (!isFiniteNumber(num)) {
    return { valid: false, error: `${name} must be a valid finite number.` };
  }

  if (options?.integerOnly && !Number.isInteger(num)) {
    return { valid: false, error: `${name} must be an integer.` };
  }

  if (options?.min !== undefined && num < options.min) {
    return { valid: false, error: `${name} cannot be less than ${options.min}.` };
  }

  if (options?.max !== undefined && num > options.max) {
    return { valid: false, error: `${name} cannot exceed ${options.max}.` };
  }

  return { valid: true, value: num };
}

export function validateAnswerIndex(index: unknown, totalOptions: number): ValidationResult {
  if (!Number.isInteger(totalOptions) || totalOptions < 1) {
    return { valid: false, error: 'There are no answer options to choose from.' };
  }
  return validateNumber(index, { min: 0, max: totalOptions - 1, integerOnly: true, fieldName: 'Answer index' });
}

export function validateElapsedTime(ms: unknown): ValidationResult {
  return validateNumber(ms, { min: 0, fieldName: 'Elapsed time' });
}
