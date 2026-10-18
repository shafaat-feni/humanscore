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

/**
 * Finds the band for a score. Exact matches (min <= score <= max) win, first band first.
 * Scores that fall in a gap between bands (e.g. 40.5 between 0-40 and 41-75) are assigned
 * to the highest band whose minScore does not exceed the score, as long as the score is
 * not above the top of the highest band.
 */
export function getInterpretation(score: number, bands: InterpretationBand[]): InterpretationBand | null {
  if (!Number.isFinite(score) || bands.length === 0) return null;

  const exact = bands.find(b => score >= b.minScore && score <= b.maxScore);
  if (exact) return exact;

  const overallMax = Math.max(...bands.map(b => b.maxScore));
  if (score > overallMax) return null;

  const candidates = bands.filter(b => b.minScore <= score);
  if (candidates.length === 0) return null;
  return candidates.reduce((best, b) => (b.minScore > best.minScore ? b : best));
}

export function getFeedbackMessage(score: number, bands: InterpretationBand[]): string {
  const band = getInterpretation(score, bands);
  if (band) {
    return band.feedback;
  }
  return 'Your result has been recorded successfully.';
}