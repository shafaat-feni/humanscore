export type UnitSystem = 'metric' | 'imperial';

export interface BmiInput {
  unitSystem: UnitSystem;
  weightKg?: number;
  heightCm?: number;
  weightLbs?: number;
  heightFeet?: number;
  heightInches?: number;
}

export interface BmiResult {
  bmi: number;
  category: string;
  feedback: string;
}

export function calculateBmi(input: BmiInput): { value: number; unit: string; category: string; feedback: string } | { error: string } {
  let weightKg = 0;
  let heightM = 0;

  if (input.unitSystem === 'metric') {
    if (!input.weightKg || !input.heightCm || input.weightKg <= 0 || input.heightCm <= 0) {
      return { error: 'Please enter valid positive values for weight and height.' };
    }
    weightKg = input.weightKg;
    heightM = input.heightCm / 100;
  } else {
    if (!input.weightLbs || input.heightFeet === undefined || input.heightInches === undefined) {
      return { error: 'Please enter valid values for weight and height.' };
    }
    const totalInches = (input.heightFeet * 12) + input.heightInches;
    if (input.weightLbs <= 0 || totalInches <= 0) {
      return { error: 'Weight and height must be greater than zero.' };
    }
    weightKg = input.weightLbs * 0.45359237;
    heightM = totalInches * 0.0254;
  }

  const bmi = weightKg / (heightM * heightM);
  if (!Number.isFinite(bmi) || bmi <= 0 || bmi > 100) {
    return { error: 'Calculated BMI is outside valid physiological bounds. Please check your inputs.' };
  }

  const roundedBmi = Math.round(bmi * 10) / 10;
  let category = '';
  let feedback = '';

  if (roundedBmi < 18.5) {
    category = 'Underweight';
    feedback = 'Your BMI is below 18.5, which falls into the underweight range. Consider consulting a healthcare professional for personalized guidance.';
  } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
    category = 'Normal Weight';
    feedback = 'Your BMI falls within the normal healthy weight range (18.5 – 24.9). Maintain your balanced lifestyle habits.';
  } else if (roundedBmi >= 25 && roundedBmi < 30) {
    category = 'Overweight';
    feedback = 'Your BMI falls into the overweight range (25.0 – 29.9). BMI is a general screening tool and does not account for muscle mass or body composition.';
  } else {
    category = 'Obesity Range';
    feedback = 'Your BMI falls into the obesity range (30.0 or higher). Note that BMI is an imperfect screening measure and does not constitute a clinical diagnosis.';
  }

  return {
    value: roundedBmi,
    unit: 'kg/m²',
    category,
    feedback,
  };
}

export interface WthInput {
  unitSystem: UnitSystem;
  waistCm?: number;
  heightCm?: number;
  waistInches?: number;
  heightInches?: number;
}

export function calculateWth(input: WthInput): { value: number; unit: string; category: string; feedback: string } | { error: string } {
  let waistCm = 0;
  let heightCm = 0;

  if (input.unitSystem === 'metric') {
    if (!input.waistCm || !input.heightCm || input.waistCm <= 0 || input.heightCm <= 0) {
      return { error: 'Please enter valid positive values for waist and height.' };
    }
    waistCm = input.waistCm;
    heightCm = input.heightCm;
  } else {
    if (!input.waistInches || !input.heightInches || input.waistInches <= 0 || input.heightInches <= 0) {
      return { error: 'Please enter valid positive values for waist and height.' };
    }
    waistCm = input.waistInches * 2.54;
    heightCm = input.heightInches * 2.54;
  }

  const ratio = waistCm / heightCm;
  if (!Number.isFinite(ratio) || ratio <= 0 || ratio > 2) {
    return { error: 'Calculated Waist-to-Height Ratio is invalid. Please verify your measurements.' };
  }

  const roundedRatio = Math.round(ratio * 100) / 100;
  let category = '';
  let feedback = '';

  if (roundedRatio < 0.4) {
    category = 'Low Ratio';
    feedback = 'Your waist-to-height ratio is below 0.4. Consider reviewing whether your caloric intake aligns with your energy needs.';
  } else if (roundedRatio >= 0.4 && roundedRatio <= 0.52) {
    category = 'Healthy / Desirable';
    feedback = 'Your waist-to-height ratio falls within the widely recommended healthy range (0.40 – 0.52). Keep up your healthy lifestyle.';
  } else if (roundedRatio > 0.52 && roundedRatio <= 0.58) {
    category = 'Increased Central Risk';
    feedback = 'Your ratio is between 0.53 and 0.58, indicating increased central adiposity and potential health considerations.';
  } else {
    category = 'High Central Risk';
    feedback = 'Your ratio is above 0.58, indicating a higher degree of central fat distribution relative to your height.';
  }

  return {
    value: roundedRatio,
    unit: 'ratio',
    category,
    feedback,
  };
}