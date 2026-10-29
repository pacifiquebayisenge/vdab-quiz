import type {
  ApiQuizQuestion,
  SubmitAnswersRequest,
  SubmitAnswersResponse,
} from "~~/app/types/quiz";

import { mockQuestions } from "../data/mockQuestions";

// Finds a question using its generated ID.
export function findQuestion(questionId: string): ApiQuizQuestion {
  const index = Number(questionId.split("-")[1]) - 1;
  const question = mockQuestions[index];

  if (!question) {
    throw createError({
      statusCode: 404,
      statusMessage: "Question not found",
    });
  }

  return question;
}

// Generates answer IDs using the same format as the GET endpoint.
export function getAnswerIds(question: ApiQuizQuestion): string[] {
  return question.answers.map((_, index) => `a-${index + 1}`);
}

// Validates the submitted request and answer IDs.
export function validateSubmission(
  body: SubmitAnswersRequest,
  validAnswerIds: string[],
): void {
  if (
    !body ||
    typeof body.questionId !== "string" ||
    !Array.isArray(body.selectedAnswerIds) ||
    !body.selectedAnswerIds.every((id) => typeof id === "string")
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  const selectedIds = body.selectedAnswerIds;

  const hasDuplicates = new Set(selectedIds).size !== selectedIds.length;

  const hasInvalidIds = selectedIds.some((id) => !validAnswerIds.includes(id));

  if (hasDuplicates || hasInvalidIds) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid answer selection",
    });
  }
}

// Returns the IDs of all correct answers.
export function getCorrectAnswerIds(question: ApiQuizQuestion): string[] {
  return question.answers
    .map((answer, index) => (answer.correct ? `a-${index + 1}` : null))
    .filter((id) => id !== null);
}

// Compares the selected answers with the correct answers.
export function checkAnswers(
  questionId: string,
  selectedAnswerIds: string[],
  correctAnswerIds: string[],
): SubmitAnswersResponse {
  const incorrectSelectedIds = selectedAnswerIds.filter(
    (id) => !correctAnswerIds.includes(id),
  );

  const isCorrect =
    selectedAnswerIds.length === correctAnswerIds.length &&
    incorrectSelectedIds.length === 0;

  return {
    questionId,
    isCorrect,
    correctAnswerIds,
    incorrectSelectedIds,
  };
}
