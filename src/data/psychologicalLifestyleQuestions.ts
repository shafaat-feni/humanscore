export interface LikertQuestion {
  id: number;
  question: string;
  dimension: string;
  options: { label: string; score: number }[];
}

export const PERSONALITY_QUESTIONS: LikertQuestion[] = [
  // Social Engagement / Extraversion
  {
    id: 1,
    question: "I feel energized after spending time engaging in group activities or social gatherings.",
    dimension: "Social Engagement",
    options: [
      { label: "Strongly Disagree", score: 1 },
      { label: "Disagree", score: 2 },
      { label: "Neutral", score: 3 },
      { label: "Agree", score: 4 },
      { label: "Strongly Agree", score: 5 }
    ]
  },
  {
    id: 2,
    question: "I naturally take the lead or initiate plans when organizing activities with others.",
    dimension: "Social Engagement",
    options: [
      { label: "Strongly Disagree", score: 1 },
      { label: "Disagree", score: 2 },
      { label: "Neutral", score: 3 },
      { label: "Agree", score: 4 },
      { label: "Strongly Agree", score: 5 }
    ]
  },
  // Curiosity & Openness
  {
    id: 3,
    question: "I actively seek out new hobbies, creative outlets, or unfamiliar subjects to explore.",
    dimension: "Curiosity & Openness",
    options: [
      { label: "Strongly Disagree", score: 1 },
      { label: "Disagree", score: 2 },
      { label: "Neutral", score: 3 },
      { label: "Agree", score: 4 },
      { label: "Strongly Agree", score: 5 }
    ]
  },
  {
    id: 4,
    question: "I enjoy pondering abstract philosophical questions or theoretical concepts.",
    dimension: "Curiosity & Openness",
    options: [
      { label: "Strongly Disagree", score: 1 },
      { label: "Disagree", score: 2 },
      { label: "Neutral", score: 3 },
      { label: "Agree", score: 4 },
      { label: "Strongly Agree", score: 5 }
    ]
  },
  // Structured Planning / Conscientiousness
  {
    id: 5,
    question: "I prefer to maintain a structured daily schedule, to-do lists, and organized plans.",
    dimension: "Structured Planning",
    options: [
      { label: "Strongly Disagree", score: 1 },
      { label: "Disagree", score: 2 },
      { label: "Neutral", score: 3 },
      { label: "Agree", score: 4 },
      { label: "Strongly Agree", score: 5 }
    ]
  },
  {
    id: 6,
    question: "I pay close attention to details and double-check my work to ensure accuracy.",
    dimension: "Structured Planning",
    options: [
      { label: "Strongly Disagree", score: 1 },
      { label: "Disagree", score: 2 },
      { label: "Neutral", score: 3 },
      { label: "Agree", score: 4 },
      { label: "Strongly Agree", score: 5 }
    ]
  },
  // Reflective Calm / Emotional Resilience
  {
    id: 7,
    question: "I generally remain calm and composed when faced with unexpected disruptions.",
    dimension: "Reflective Calm",
    options: [
      { label: "Strongly Disagree", score: 1 },
      { label: "Disagree", score: 2 },
      { label: "Neutral", score: 3 },
      { label: "Agree", score: 4 },
      { label: "Strongly Agree", score: 5 }
    ]
  },
  {
    id: 8,
    question: "I recover quickly from setbacks or temporary emotional stress.",
    dimension: "Reflective Calm",
    options: [
      { label: "Strongly Disagree", score: 1 },
      { label: "Disagree", score: 2 },
      { label: "Neutral", score: 3 },
      { label: "Agree", score: 4 },
      { label: "Strongly Agree", score: 5 }
    ]
  }
];

export const STRESS_WELLBEING_QUESTIONS: LikertQuestion[] = [
  {
    id: 1,
    question: "In the past month, how often have you felt overwhelmed by unexpected demands or responsibilities?",
    dimension: "Perceived Stress",
    options: [
      { label: "Never", score: 0 },
      { label: "Almost Never", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Fairly Often", score: 3 },
      { label: "Very Often", score: 4 }
    ]
  },
  {
    id: 2,
    question: "In the past month, how often have you felt confident in your ability to handle personal problems?",
    dimension: "Coping Confidence",
    options: [
      { label: "Very Often", score: 4 },
      { label: "Fairly Often", score: 3 },
      { label: "Sometimes", score: 2 },
      { label: "Almost Never", score: 1 },
      { label: "Never", score: 0 }
    ]
  },
  {
    id: 3,
    question: "How often have you felt that things were going your way recently?",
    dimension: "Well-Being",
    options: [
      { label: "Very Often", score: 4 },
      { label: "Fairly Often", score: 3 },
      { label: "Sometimes", score: 2 },
      { label: "Almost Never", score: 1 },
      { label: "Never", score: 0 }
    ]
  },
  {
    id: 4,
    question: "How often have you found yourself unable to control important things in your daily life?",
    dimension: "Perceived Stress",
    options: [
      { label: "Never", score: 0 },
      { label: "Almost Never", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Fairly Often", score: 3 },
      { label: "Very Often", score: 4 }
    ]
  },
  {
    id: 5,
    question: "How often have you felt rested and refreshed upon waking up in the morning?",
    dimension: "Rest & Recovery",
    options: [
      { label: "Very Often", score: 4 },
      { label: "Fairly Often", score: 3 },
      { label: "Sometimes", score: 2 },
      { label: "Almost Never", score: 1 },
      { label: "Never", score: 0 }
    ]
  },
  {
    id: 6,
    question: "How often have you felt nervous, anxious, or on edge during your normal routine?",
    dimension: "Perceived Stress",
    options: [
      { label: "Never", score: 0 },
      { label: "Almost Never", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Fairly Often", score: 3 },
      { label: "Very Often", score: 4 }
    ]
  }
];

export const DAILY_HABITS_QUESTIONS: LikertQuestion[] = [
  {
    id: 1,
    question: "I maintain a consistent sleep and wake schedule across both weekdays and weekends.",
    dimension: "Sleep & Routine",
    options: [
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Usually", score: 3 },
      { label: "Always", score: 4 }
    ]
  },
  {
    id: 2,
    question: "I incorporate regular physical activity or intentional daily movement into my routine.",
    dimension: "Movement",
    options: [
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Usually", score: 3 },
      { label: "Always", score: 4 }
    ]
  },
  {
    id: 3,
    question: "I drink adequate water and fluids throughout the day to stay hydrated.",
    dimension: "Hydration",
    options: [
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Usually", score: 3 },
      { label: "Always", score: 4 }
    ]
  },
  {
    id: 4,
    question: "I take intentional breaks to rest my eyes and clear my mind during periods of prolonged work.",
    dimension: "Recovery",
    options: [
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Usually", score: 3 },
      { label: "Always", score: 4 }
    ]
  },
  {
    id: 5,
    question: "I dedicate time to personal interests, hobbies, or relaxation away from work obligations.",
    dimension: "Leisure & Balance",
    options: [
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Usually", score: 3 },
      { label: "Always", score: 4 }
    ]
  },
  {
    id: 6,
    question: "I plan nutritious meals and maintain balanced eating habits.",
    dimension: "Nutrition",
    options: [
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Usually", score: 3 },
      { label: "Always", score: 4 }
    ]
  }
];