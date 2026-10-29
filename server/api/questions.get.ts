import type { ApiQuizQuestion, PublicQuizQuestion } from "~~/app/types/quiz";
import { saveQuizSession } from "../utils/quizSession";
import { v4 as uuid } from "uuid";

// API endpoint to retrieve quiz questions for the client.
// each question includes only the information required to display it, excluding the correct answers.
// The correct answers remain on the server to prevent cheating.
// Returns an array of QuizQuestion objects, each containing the question text, time limit, and answer options.

export default defineEventHandler(
  async (): Promise<{ sessionId: string; questions: PublicQuizQuestion[] }> => {
    const config = useRuntimeConfig();

    // Fetch questions from the external API.
    const questions = await $fetch<ApiQuizQuestion[]>(config.quizApiUrl);

    // Create a unique session for this quiz.
    const sessionId = uuid().split("-")[0]!;

    // Store the original questions, including correct answers.
    await saveQuizSession(sessionId, questions);

    // Transform the questions before sending them to the client.
    const publicQuestions: PublicQuizQuestion[] = questions.map(
      (question, questionIndex) => ({
        id: `q-${questionIndex + 1}`,
        question: question.question,
        time_limit_s: question.time_limit_s,

        // Answer options
        answers: question.answers.map((answer, answerIndex) => ({
          id: `a-${answerIndex + 1}`,
          answer: answer.answer,
        })),
      }),
    );

    return {
      sessionId,
      questions: publicQuestions,
    };
  },
);
