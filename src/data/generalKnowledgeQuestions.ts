import type { QuestionItem } from './cognitiveQuestions';

export const GENERAL_KNOWLEDGE_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctIndex: 1,
    explanation: "Mars is often called the Red Planet because of iron oxide prevalent on its surface."
  },
  {
    id: 2,
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctIndex: 2,
    explanation: "Canberra is the capital city of Australia, chosen as a compromise between Sydney and Melbourne."
  },
  {
    id: 3,
    question: "Who wrote the novel 'Pride and Prejudice'?",
    options: ["Charlotte Brontë", "Jane Austen", "Charles Dickens", "Mary Shelley"],
    correctIndex: 1,
    explanation: "Jane Austen published 'Pride and Prejudice' anonymously in 1813."
  },
  {
    id: 4,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Fe", "Au", "Pb"],
    correctIndex: 2,
    explanation: "Au comes from the Latin word 'aurum', meaning shining dawn."
  },
  {
    id: 5,
    question: "In which year did the Apollo 11 moon landing take place?",
    options: ["1967", "1969", "1971", "1973"],
    correctIndex: 1,
    explanation: "Neil Armstrong and Buzz Aldrin landed on the moon on July 20, 1969."
  },
  {
    id: 6,
    question: "Which of the following elements is most abundant in Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctIndex: 2,
    explanation: "Nitrogen makes up about 78% of Earth's atmosphere by volume."
  },
  {
    id: 7,
    question: "Which artist painted the ceiling of the Sistine Chapel in Rome?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
    correctIndex: 2,
    explanation: "Michelangelo painted the Sistine Chapel ceiling between 1508 and 1512."
  },
  {
    id: 8,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctIndex: 3,
    explanation: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions."
  },
  {
    id: 9,
    question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Methane"],
    correctIndex: 1,
    explanation: "Plants absorb carbon dioxide and release oxygen during photosynthesis."
  },
  {
    id: 10,
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    correctIndex: 2,
    explanation: "12 multiplied by 12 equals 144."
  }
];