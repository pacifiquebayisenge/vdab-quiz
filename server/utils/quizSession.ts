import type { ApiQuizQuestion } from "~~/app/types/quiz";

// Saves the original quiz questions on the server.

export async function saveQuizSession(
  sessionId: string,
  questions: ApiQuizQuestion[],
): Promise<void> {
  await useStorage().setItem(`quiz:${sessionId}`, questions);
}

// Retrieves the original questions for a quiz session.
export async function getQuizSession(
  sessionId: string,
): Promise<ApiQuizQuestion[] | null> {
  return useStorage().getItem<ApiQuizQuestion[]>(`quiz:${sessionId}`);
}
