import type { AssessmentMeta } from '../types/assessment';

export const ASSESSMENTS: AssessmentMeta[] = [
  // Physical
  {
    id: 'bmi',
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    category: 'physical',
    shortDescription: 'Calculate Body Mass Index with unit conversion and contextual health insights.',
    durationMinutes: 2,
    eligibleForComposite: false,
    status: 'coming-soon'
  },
  {
    id: 'wth',
    title: 'Waist-to-Height Ratio',
    slug: 'waist-to-height-ratio',
    category: 'physical',
    shortDescription: 'Evaluate central adiposity risk distribution relative to height.',
    durationMinutes: 2,
    eligibleForComposite: false,
    status: 'coming-soon'
  },
  {
    id: 'plank',
    title: 'Plank Endurance Test',
    slug: 'plank-endurance-test',
    category: 'physical',
    shortDescription: 'Measure isometric core muscular endurance with guided pacing.',
    durationMinutes: 3,
    eligibleForComposite: false,
    status: 'coming-soon'
  },
  // Cognitive
  {
    id: 'number-pattern',
    title: 'Number Pattern Challenge',
    slug: 'number-pattern-challenge',
    category: 'cognitive',
    shortDescription: 'Test numerical sequence recognition and logical deduction speed.',
    durationMinutes: 5,
    questionCount: 10,
    eligibleForComposite: true,
    status: 'coming-soon'
  },
  {
    id: 'numerical-reasoning',
    title: 'Numerical Reasoning',
    slug: 'numerical-reasoning',
    category: 'cognitive',
    shortDescription: 'Solve quantitative word problems and data interpretation items.',
    durationMinutes: 6,
    questionCount: 8,
    eligibleForComposite: true,
    status: 'coming-soon'
  },
  {
    id: 'memory-challenge',
    title: 'Short-Term Memory Challenge',
    slug: 'short-term-memory-challenge',
    category: 'cognitive',
    shortDescription: 'Assess working memory retention span with sequential visual/numeric recall.',
    durationMinutes: 4,
    eligibleForComposite: true,
    status: 'coming-soon'
  },
  // Psychological
  {
    id: 'personality-reflection',
    title: 'Personality Self-Reflection',
    slug: 'personality-self-reflection',
    category: 'psychological',
    shortDescription: 'Explore traits across the Big Five dimensions with self-reported reflection.',
    durationMinutes: 7,
    questionCount: 20,
    eligibleForComposite: false,
    status: 'coming-soon'
  },
  {
    id: 'stress-wellbeing',
    title: 'Stress & Well-Being Self-Assessment',
    slug: 'stress-and-wellbeing',
    category: 'psychological',
    shortDescription: 'Examine recent perceived stress levels and general well-being markers.',
    durationMinutes: 5,
    questionCount: 10,
    eligibleForComposite: false,
    status: 'coming-soon'
  },
  // Lifestyle
  {
    id: 'daily-habits',
    title: 'Daily Habits Assessment',
    slug: 'daily-habits-assessment',
    category: 'lifestyle',
    shortDescription: 'Review sleep, hydration, movement, and nutrition lifestyle habits.',
    durationMinutes: 4,
    questionCount: 12,
    eligibleForComposite: false,
    status: 'coming-soon'
  },
  // Skills
  {
    id: 'general-knowledge',
    title: 'General Knowledge Challenge',
    slug: 'general-knowledge-challenge',
    category: 'skills',
    shortDescription: 'Test broad trivia knowledge across science, history, geography, and culture.',
    durationMinutes: 5,
    questionCount: 15,
    eligibleForComposite: true,
    status: 'coming-soon'
  }
];