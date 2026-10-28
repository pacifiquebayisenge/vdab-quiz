import type { ApiQuizQuestion } from "~~/app/types/quiz";

// Mock quiz questions used during development and testing.
// Includes both single-answer and multiple-answer scenarios.

export const mockQuestions: ApiQuizQuestion[] = [
  {
    question: "Which of these are JavaScript frameworks?",
    time_limit_s: 20,
    answers: [
      { answer: "Vue.js", correct: true },
      { answer: "Laravel", correct: false },
      { answer: "Angular", correct: true },
      { answer: "Django", correct: false },
    ],
  },
  {
    question: "Which HTTP method is typically used to retrieve data?",
    time_limit_s: 15,
    answers: [
      { answer: "POST", correct: false },
      { answer: "GET", correct: true },
      { answer: "DELETE", correct: false },
    ],
  },
  {
    question: "Which of these are relational databases?",
    time_limit_s: 30,
    answers: [
      { answer: "PostgreSQL", correct: true },
      { answer: "MongoDB", correct: false },
      { answer: "MySQL", correct: true },
      { answer: "Redis", correct: false },
    ],
  },
];
