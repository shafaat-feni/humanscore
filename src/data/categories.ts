import { Activity, Brain, Heart, Zap, Award, type LucideIcon } from 'lucide-react';
import type { AssessmentCategory } from '../types/assessment';

export interface CategoryInfo {
  slug: AssessmentCategory;
  /** Short label used in navigation. */
  name: string;
  /** Longer label used in page headings. */
  title: string;
  /** Footer link label. */
  footerLabel: string;
  description: string;
  /** One-line teaser for the home page cards. */
  teaser: string;
  icon: LucideIcon;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'physical',
    name: 'Physical',
    title: 'Physical Assessments',
    footerLabel: 'Physical Tests',
    description: 'Measure body composition, proportion risk, and core muscular endurance.',
    teaser: 'BMI, waist ratio, and core endurance.',
    icon: Activity,
  },
  {
    slug: 'cognitive',
    name: 'Cognitive',
    title: 'Cognitive Challenges',
    footerLabel: 'Cognitive Challenges',
    description: 'Evaluate numerical sequence pattern recognition, reasoning, and working memory.',
    teaser: 'Pattern recognition, reasoning, and memory.',
    icon: Brain,
  },
  {
    slug: 'psychological',
    name: 'Psychological',
    title: 'Psychological Reflection',
    footerLabel: 'Psychological Reflection',
    description: 'Explore self-reported personality dimensions and perceived stress well-being.',
    teaser: 'Personality reflection and stress well-being.',
    icon: Heart,
  },
  {
    slug: 'lifestyle',
    name: 'Lifestyle',
    title: 'Lifestyle & Habits',
    footerLabel: 'Lifestyle & Habits',
    description: 'Audit daily habits across sleep, hydration, and daily routine patterns.',
    teaser: 'Daily habits, sleep, and routine audit.',
    icon: Zap,
  },
  {
    slug: 'skills',
    name: 'Skills',
    title: 'Skills & Knowledge',
    footerLabel: 'Skills & Knowledge',
    description: 'Test general knowledge across academic, historical, and scientific domains.',
    teaser: 'General knowledge and trivia challenge.',
    icon: Award,
  },
];

export function getCategory(slug: string | undefined): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}
