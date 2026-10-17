export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function validateNumber(
  value: unknown,
  options?: { min?: number; max?: number; integerOnly?: boolean; fieldName?: string }
): ValidationResult {
  const name = options?.fieldName || 'Value';

  if (value === undefined || value === null || value === '') {
    return { valid: false, error: `${name} is required.` };
  }

  const num = typeof value === 'number' ? value : Number(value);

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

  return { valid: true };
}

export function validateAnswerIndex(index: unknown, totalOptions: number): ValidationResult {
  const valCheck = validateNumber(index, { min: 0, max: totalOptions - 1, integerOnly: true, fieldName: 'Answer index' });
  if (!valCheck.valid) return valCheck;
  return { valid: true };
}

export function validateElapsedTime(ms: unknown): ValidationResult {
  return validateNumber(ms, { min: 0, fieldName: 'Elapsed time' });
}