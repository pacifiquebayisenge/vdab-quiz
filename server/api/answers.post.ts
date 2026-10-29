import type { SubmitAnswersRequest } from "~~/app/types/quiz";

import {
  findQuestion,
  getAnswerIds,
  validateSubmission,
  getCorrectAnswerIds,
  checkAnswers,
} from "../utils/quizHelpers";

// API endpoint to submit quiz answers for evaluation.
// Validates the request body, checks the submitted answers against the correct answers,
// and returns a response indicating whether the submission is correct or not.
// The response includes the question ID, correctness status, correct answer IDs, and any incorrect selections.
// The correct answers are not exposed to the client to prevent cheating.
// The endpoint expects a POST request with a JSON body containing the question ID and selected answer IDs.
// The request body is validated to ensure it has the correct structure and that the selected answer IDs are valid for the given question.
// If the request is invalid or the question is not found, an error response is returned with the appropriate status code and message.
// The endpoint uses helper functions to find the question, validate the submission, retrieve correct answers, and check the answers against the correct ones.

export default defineEventHandler(async (event) => {
  const body = await readBody<SubmitAnswersRequest>(event);

  // Validate the request structure before accessing its properties.
  if (
    !body ||
    typeof body.questionId !== "string" ||
    !Array.isArray(body.selectedAnswerIds)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  // Find the requested question.
  const question = findQuestion(body.questionId);

  // Validate the submitted answers.
  const validAnswerIds = getAnswerIds(question);

  validateSubmission(body, validAnswerIds);

  // Retrieve correct answers and calculate the result.
  const correctAnswerIds = getCorrectAnswerIds(question);

  return checkAnswers(
    body.questionId,
    body.selectedAnswerIds,
    correctAnswerIds,
  );
});
