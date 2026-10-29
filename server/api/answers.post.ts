import type { SubmitAnswersRequest } from "~~/app/types/quiz";

import {
  findQuestion,
  getAnswerIds,
  validateSubmission,
  getCorrectAnswerIds,
  checkAnswers,
} from "../utils/quizHelpers";

import { getQuizSession } from "../utils/quizSession";

// Validates submitted answers using the quiz session stored in Nitro.
// Returns the validation result and correct answer IDs.

export default defineEventHandler(async (event) => {
  const body = await readBody<SubmitAnswersRequest>(event);

  // Validate the request
  if (
    !body ||
    typeof body.sessionId !== "string" ||
    typeof body.questionId !== "string" ||
    !Array.isArray(body.selectedAnswerIds)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  // Retrieve the original questions from Nitro Storage.
  const apiQuestions = await getQuizSession(body.sessionId);

  if (!apiQuestions) {
    throw createError({
      statusCode: 404,
      statusMessage: "Quiz session not found",
    });
  }

  // Find the requested question in the original api questions.
  const apiQuestion = apiQuestions.find(
    (_, index) => `q-${index + 1}` === body.questionId,
  );

  if (!apiQuestion) {
    throw createError({
      statusCode: 404,
      statusMessage: "Question not found",
    });
  }

  // Validate the selected answer IDs.
  const validAnswerIds = getAnswerIds(apiQuestion);

  validateSubmission(body, validAnswerIds);

  // Check the answers against the original data.
  const correctAnswerIds = getCorrectAnswerIds(apiQuestion);

  return checkAnswers(
    body.questionId,
    body.selectedAnswerIds,
    correctAnswerIds,
  );
});
