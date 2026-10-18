import type { AssessmentMeta } from '../types/assessment';

/** Case-insensitive match against title and description. An empty query matches everything. */
export function searchAssessments(list: AssessmentMeta[], query: string): AssessmentMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    a => a.title.toLowerCase().includes(q) || a.shortDescription.toLowerCase().includes(q)
  );
}
