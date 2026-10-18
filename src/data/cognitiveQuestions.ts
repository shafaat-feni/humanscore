export interface QuestionItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const NUMBER_PATTERN_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    question: "What is the next number in the sequence: 2, 4, 6, 8, ...?",
    options: ["9", "10", "12", "16"],
    correctIndex: 1,
    explanation: "Add 2 to the previous number (Arithmetic progression with common difference +2)."
  },
  {
    id: 2,
    question: "What is the next number in the sequence: 3, 6, 12, 24, ...?",
    options: ["30", "36", "48", "60"],
    correctIndex: 2,
    explanation: "Multiply the previous number by 2 (Geometric progression with common ratio x2)."
  },
  {
    id: 3,
    question: "What is the next number in the sequence: 1, 4, 9, 16, 25, ...?",
    options: ["30", "35", "36", "49"],
    correctIndex: 2,
    explanation: "These are square numbers (1^2, 2^2, 3^2, 4^2, 5^2, so next is 6^2 = 36)."
  },
  {
    id: 4,
    question: "What is the next number in the sequence: 2, 3, 5, 7, 11, ...?",
    options: ["12", "13", "15", "17"],
    correctIndex: 1,
    explanation: "This sequence consists of consecutive prime numbers. The next prime after 11 is 13."
  },
  {
    id: 5,
    question: "What is the next number in the sequence: 5, 10, 15, 20, ...?",
    options: ["25", "30", "35", "40"],
    correctIndex: 0,
    explanation: "Add 5 to the previous number (Arithmetic progression with difference +5)."
  },
  {
    id: 6,
    question: "What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...?",
    options: ["11", "12", "13", "15"],
    correctIndex: 2,
    explanation: "Fibonacci sequence: each number is the sum of the two preceding ones (5 + 8 = 13)."
  },
  {
    id: 7,
    question: "What is the next number in the sequence: 80, 40, 20, 10, ...?",
    options: ["0", "2", "5", "8"],
    correctIndex: 2,
    explanation: "Divide the previous number by 2 (Geometric sequence with ratio 0.5)."
  },
  {
    id: 8,
    question: "What is the next number in the sequence: 2, 6, 12, 20, 30, ...?",
    options: ["38", "40", "42", "45"],
    correctIndex: 2,
    explanation: "Differences increase by 2 each time (+4, +6, +8, +10), so the next difference is +12 (30 + 12 = 42)."
  },
  {
    id: 9,
    question: "What is the next number in the sequence: 1, 3, 9, 27, ...?",
    options: ["54", "81", "108", "243"],
    correctIndex: 1,
    explanation: "Powers of 3 (or multiply by 3 each step: 27 x 3 = 81)."
  },
  {
    id: 10,
    question: "What is the next number in the sequence: 100, 95, 85, 70, 50, ...?",
    options: ["20", "25", "30", "35"],
    correctIndex: 1,
    explanation: "Subtracting decreasing multiples of 5 (-5, -10, -15, -20), so the next subtraction is -25 (50 - 25 = 25)."
  }
];

export const NUMERICAL_REASONING_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    question: "If an item costs $40 and is on sale for 20% off, what is the final sale price?",
    options: ["$28", "$30", "$32", "$35"],
    correctIndex: 2,
    explanation: "20% of $40 is $8. Subtracting $8 from $40 gives $32."
  },
  {
    id: 2,
    question: "A train travels at a constant speed of 60 km/h. How far does it travel in 3.5 hours?",
    options: ["180 km", "195 km", "210 km", "240 km"],
    correctIndex: 2,
    explanation: "Distance = Speed x Time = 60 x 3.5 = 210 km."
  },
  {
    id: 3,
    question: "If 4 workers can complete a task in 6 days, how many days would 8 workers take assuming equal productivity?",
    options: ["2 days", "3 days", "4 days", "12 days"],
    correctIndex: 1,
    explanation: "Total worker-days = 4 x 6 = 24. With 8 workers, 24 / 8 = 3 days."
  },
  {
    id: 4,
    question: "What is 3/4 expressed as a percentage?",
    options: ["60%", "70%", "75%", "80%"],
    correctIndex: 2,
    explanation: "3 divided by 4 is 0.75, which equals 75%."
  },
  {
    id: 5,
    question: "An office has 120 employees. If 40% of them work remotely, how many employees work in the office?",
    options: ["48", "60", "72", "80"],
    correctIndex: 2,
    explanation: "Remote employees = 40% of 120 = 48. Office employees = 120 - 48 = 72."
  },
  {
    id: 6,
    question: "If the ratio of apples to oranges in a basket is 3:2 and there are 30 apples, how many oranges are there?",
    options: ["15", "20", "25", "45"],
    correctIndex: 1,
    explanation: "Each ratio unit represents 30 / 3 = 10 items. Oranges = 2 units x 10 = 20."
  },
  {
    id: 7,
    question: "What is the average (mean) of the following set of numbers: 12, 15, 18, 22, 33?",
    options: ["18", "20", "22", "25"],
    correctIndex: 1,
    explanation: "Sum = 100. Divided by count (5) = 20."
  },
  {
    id: 8,
    question: "A jacket's price increased from $50 to $65. What is the percentage increase?",
    options: ["15%", "20%", "25%", "30%"],
    correctIndex: 3,
    explanation: "Increase is $15. ($15 / $50) x 100 = 30%."
  }
];