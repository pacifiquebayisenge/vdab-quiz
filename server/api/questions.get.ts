import type { QuizQuestion } from "~~/app/types/quiz";
import { mockQuestions } from "../data/mockQuestions";

// API endpoint to retrieve quiz questions for the client.
// each question includes only the information required to display it, excluding the correct answers.
// The correct answers remain on the server to prevent cheating.
// Returns an array of QuizQuestion objects, each containing the question text, time limit, and answer options.

export default defineEventHandler((): QuizQuestion[] => {
  return mockQuestions.map((question, questionIndex) => ({
    id: `q-${questionIndex + 1}`,
    question: question.question,
    time_limit_s: question.time_limit_s,

    answers: question.answers.map((answer, answerIndex) => ({
      id: `a-${answerIndex + 1}`,
      answer: answer.answer,
    })),
  }));
});
