// answer option exposed to the client.
// The correct answer is intentionally not included.
export interface QuizAnswer {
  id: string;
  answer: string;
}

// quiz question sent to the client.
// Contains only the information required to display the question.
export interface QuizQuestion {
  id: string;
  question: string;
  time_limit_s: number;
  answers: QuizAnswer[];
}

// answer option returned by the  API.
// Includes the correctness flag used for server-side validation.
export interface ApiQuizAnswer {
  answer: string;
  correct: boolean;
}

// original question structure returned by the API.
// This data should remain on the server to prevent exposing correct answers.
export interface ApiQuizQuestion {
  question: string;
  time_limit_s: number;
  answers: ApiQuizAnswer[];
}

// Answers sent by the client when submitting.
export interface SubmitAnswersRequest {
  questionId: string;
  selectedAnswerIds: string[];
}

// Validation result returned by the server.
// Only sent after the user submits their answers.
// isCorrect indicates whether the user's selected answers are all correct.
export interface SubmitAnswersResponse {
  questionId: string;
  isCorrect: boolean;
  correctAnswerIds: string[];
  incorrectSelectedIds: string[];
}
