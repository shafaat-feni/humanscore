export type AssessmentCategory = 'physical' | 'cognitive' | 'psychological' | 'lifestyle' | 'skills';

export interface AssessmentMeta {
  id: string;
  title: string;
  slug: string;
  category: AssessmentCategory;
  shortDescription: string;
  durationMinutes: number;
  questionCount?: number;
  eligibleForComposite: boolean;
  status: 'available' | 'coming-soon';
}