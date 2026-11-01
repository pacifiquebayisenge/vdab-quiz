import { defineStore } from "pinia";
import type {
  ApiQuizData,
  PublicQuizQuestion,
  SubmitAnswersResponse,
} from "#imports";

export const useQuizStore = defineStore("quiz", () => {
  // State
  const sessionId = ref<string | null>(null);
  const questions = ref<PublicQuizQuestion[]>([]);
  const currentQuestionIndex = ref(0);

  const selectedAnswerIds = ref<string[]>([]);

  const validationResult = ref<SubmitAnswersResponse | null>(null);
  const isSubmitting = ref(false);

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const currentQuestion = computed(
    () => questions.value[currentQuestionIndex.value] ?? null,
  );

  const totalQuestions = computed(() => questions.value.length);

  // Actions
  async function fetchQuestions() {
    validationResult.value = null;

    selectedAnswerIds.value = [];

    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<ApiQuizData>("/api/questions");

      sessionId.value = response.sessionId;
      questions.value = response.questions;
      currentQuestionIndex.value = 0;
    } catch {
      error.value = "Failed to load quiz questions.";
    } finally {
      isLoading.value = false;
    }
  }

  function toggleAnswer(answerId: string) {
    const index = selectedAnswerIds.value.indexOf(answerId);

    if (index === -1) {
      selectedAnswerIds.value.push(answerId);
    } else {
      selectedAnswerIds.value.splice(index, 1);
    }
  }

  async function submitAnswers() {
    if (!sessionId.value || !currentQuestion.value || isSubmitting.value) {
      return;
    }

    isSubmitting.value = true;
    error.value = null;

    try {
      const response = await $fetch<SubmitAnswersResponse>("/api/answers", {
        method: "POST",
        body: {
          sessionId: sessionId.value,
          questionId: currentQuestion.value.id,
          selectedAnswerIds: selectedAnswerIds.value,
        },
      });

      validationResult.value = response;
    } catch {
      error.value = "Failed to submit answers.";
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    sessionId,
    questions,
    currentQuestionIndex,
    currentQuestion,
    totalQuestions,

    isLoading,
    error,

    fetchQuestions,

    selectedAnswerIds,
    toggleAnswer,

    validationResult,
    isSubmitting,
    submitAnswers,
  };
});
