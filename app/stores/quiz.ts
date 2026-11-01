import { defineStore } from "pinia";
import type { ApiQuizData, PublicQuizQuestion } from "#imports";

export const useQuizStore = defineStore("quiz", () => {
  // State
  const sessionId = ref<string | null>(null);
  const questions = ref<PublicQuizQuestion[]>([]);
  const currentQuestionIndex = ref(0);

  const selectedAnswerIds = ref<string[]>([]);

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const currentQuestion = computed(
    () => questions.value[currentQuestionIndex.value] ?? null,
  );

  const totalQuestions = computed(() => questions.value.length);

  // Actions
  async function fetchQuestions() {
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
  };
});
