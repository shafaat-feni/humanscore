import type { SavedResult } from '../services/storage';

export const ELIGIBLE_INDEX_ASSESSMENTS = [
  { id: 'number-pattern-challenge', title: 'Number Pattern Challenge' },
  { id: 'numerical-reasoning', title: 'Numerical Reasoning' },
  { id: 'short-term-memory-challenge', title: 'Short-Term Memory Challenge' },
  { id: 'general-knowledge-challenge', title: 'General Knowledge Challenge' },
];

export interface IndexCalculationResult {
  index: number | null;
  eligibleCount: number;
  totalEligible: number;
  scores: { assessmentId: string; title: string; score: number; timestamp: number }[];
  missingAssessments: { id: string; title: string }[];
}

export function calculateOverallIndex(results: SavedResult[]): IndexCalculationResult {
  const eligibleIds = ELIGIBLE_INDEX_ASSESSMENTS.map(e => e.id);
  const latestEligibleMap = new Map<string, SavedResult>();

  // Because getResults() is ordered newest-first, the first time we see an assessmentId is its latest attempt
  for (const res of results) {
    if (eligibleIds.includes(res.assessmentId) && res.normalizedScore !== undefined && Number.isFinite(res.normalizedScore)) {
      if (!latestEligibleMap.has(res.assessmentId)) {
        latestEligibleMap.set(res.assessmentId, res);
      }
    }
  }

  const scores: { assessmentId: string; title: string; score: number; timestamp: number }[] = [];
  let sum = 0;

  for (const item of ELIGIBLE_INDEX_ASSESSMENTS) {
    const match = latestEligibleMap.get(item.id);
    if (match && match.normalizedScore !== undefined) {
      scores.push({
        assessmentId: item.id,
        title: item.title,
        score: match.normalizedScore,
        timestamp: match.timestamp,
      });
      sum += match.normalizedScore;
    }
  }

  const eligibleCount = scores.length;
  const missingAssessments = ELIGIBLE_INDEX_ASSESSMENTS.filter(e => !latestEligibleMap.has(e.id));

  let index: number | null = null;
  if (eligibleCount > 0) {
    index = Math.round((sum / eligibleCount) * 10) / 10;
  }

  return {
    index,
    eligibleCount,
    totalEligible: ELIGIBLE_INDEX_ASSESSMENTS.length,
    scores,
    missingAssessments,
  };
}

export function exportToJson(results: SavedResult[]): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(results, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `humanscore_results_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportToCsv(results: SavedResult[]): void {
  if (results.length === 0) return;
  const headers = ['ID', 'Assessment ID', 'Assessment Title', 'Category', 'Timestamp', 'Raw Result', 'Normalized Score', 'Unit'];
  const rows = results.map(r => [
    r.id,
    r.assessmentId,
    `"${r.assessmentTitle.replace(/"/g, '""')}"`,
    r.category,
    new Date(r.timestamp).toISOString(),
    r.rawResult,
    r.normalizedScore ?? '',
    r.unit ?? '',
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', encodedUri);
  downloadAnchor.setAttribute('download', `humanscore_results_${Date.now()}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}