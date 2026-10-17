export interface InterpretationBand {
  minScore: number;
  maxScore: number;
  label: string;
  feedback: string;
}

export function calculatePercentage(correct: number, total: number): number {
  if (!Number.isFinite(correct) || !Number.isFinite(total) || total <= 0) {
    return 0;
  }
  const pct = (correct / total) * 100;
  return Math.max(0, Math.min(100, Math.round(pct * 10) / 10));
}

export function normalizeScore(raw: number, minRaw: number, maxRaw: number): number {
  if (!Number.isFinite(raw) || !Number.isFinite(minRaw) || !Number.isFinite(maxRaw)) {
    return 0;
  }
  if (maxRaw <= minRaw) {
    return 0;
  }
  const clampedRaw = Math.max(minRaw, Math.min(maxRaw, raw));
  const normalized = ((clampedRaw - minRaw) / (maxRaw - minRaw)) * 100;
  return Math.round(normalized * 10) / 10;
}

export function getInterpretation(score: number, bands: InterpretationBand[]): InterpretationBand | null {
  if (!Number.isFinite(score)) return null;
  for (const band of bands) {
    if (score >= band.minScore && score <= band.maxScore) {
      return band;
    }
  }
  return null;
}

export function getFeedbackMessage(score: number, bands: InterpretationBand[]): string {
  const band = getInterpretation(score, bands);
  if (band) {
    return band.feedback;
  }
  return 'Your result has been recorded successfully.';
}