<template>
  <!-- Quiz questions game page  -->
  <div
    v-if="!quizStore.isFinished"
    class="quiz-container justify-center grid rounded-2xl gap-6 pt-2 pb-15.5"
  >
    <div class="question-timer flex justify-center">
      <QuestionTimer :time="timeLimit" />
    </div>

    <div class="question text-center font-bold">
      <h3>{{ quizStore.currentQuestion?.question }}</h3>
    </div>

    <div class="answer-option-grid min-h-0 overflow-y-auto gap-8">
      <Button
        v-for="answer in quizStore.currentQuestion?.answers ?? []"
        :key="answer.id"
        variant="answer-option"
        :label="answer.answer"
        :selected="quizStore.selectedAnswerIds.includes(answer.id)"
        :status="getAnswerStatus(answer.id)"
        :disabled="!!quizStore.validationResult || quizStore.isSubmitting"
        @click="quizStore.toggleAnswer(answer.id)"
      />
    </div>

    <div v-if="quizStore.error" class="flex justify-center">
      <Button
        label="Opnieuw proberen"
        variant="action-button"
        class="secondary"
        @click="reloadPage()"
      />
    </div>

    <div v-else class="action-button flex justify-center">
      <Button
        v-if="!quizStore.validationResult"
        label="Klaar!"
        variant="action-button"
        class="primary"
        :disabled="
          quizStore.selectedAnswerIds.length === 0 || quizStore.isSubmitting
        "
        @click="quizStore.submitAnswers()"
      />

      <Button
        v-else
        :label="
          quizStore.currentQuestionIndex === quizStore.totalQuestions - 1
            ? 'Bekijk resultaat'
            : 'Doorgaan'
        "
        variant="action-button"
        class="primary"
        @click="quizStore.nextQuestion()"
      />
    </div>

    <div class="help-button flex justify-center">
      <Button
        v-if="!quizStore.validationResult && quizStore.currentQuestion"
        label="Geef me een tip..."
        variant="action-button"
        @click="getTip(quizStore.currentQuestion.question)"
      />
    </div>

    <p v-if="quizStore.error" role="alert" class="quiz-error text-center">
      {{ quizStore.error }}
    </p>
  </div>

  <!-- Quiz result page  -->
  <div v-else class="quiz-results rounded-2xl pt-2 pb-15.5">
    <div
      class="result-title flex flex-col justify-between items-center h-full text-center font-bold"
    >
      <h3 class="pt-10">
        VDAB QUIZ <br />
        Resultaat
      </h3>

      <p class="">
        Je behaalde een {{ quizStore.score }} / {{ quizStore.questions.length }}
      </p>

      <div><img src="/trophy.gif" alt="Trofee" /></div>

      <div>
        <Button
          variant="action-button"
          class="primary"
          label="Opnieuw"
          @click="reloadPage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import QuestionTimer from "./QuestionTimer.vue";
import confetti from "canvas-confetti";

const quizStore = useQuizStore();
const config = useRuntimeConfig();

onMounted(() => {
  quizStore.fetchQuestions();
});

const { timeLimit, start, stop } = useQuestionTimer(() => {
  quizStore.submitAnswers();
});

function getAnswerStatus(answerId: string): "correct" | "wrong" | undefined {
  const result = quizStore.validationResult;

  if (!result) return undefined;

  if (result.correctAnswerIds.includes(answerId)) {
    return "correct";
  }

  if (result.incorrectSelectedIds.includes(answerId)) {
    return "wrong";
  }

  return undefined;
}

// Reload  page to start  new quiz.
function reloadPage() {
  window.location.reload();
}

// Get tip
function getTip(query: string) {
  const url = `${config.public.tipUrl}${encodeURIComponent(query)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

// Start a new countdown whenever  current question changes.
watch(
  () => quizStore.currentQuestion?.id,
  () => {
    if (quizStore.currentQuestion && !quizStore.isFinished) {
      start(quizStore.currentQuestion.time_limit_s);
    } else {
      stop();
    }
  },
  { immediate: true },
);

// Stop  timer while submitting answers.
watch(
  () => quizStore.isSubmitting,
  (submitting) => {
    if (submitting) stop();
  },
);

// Stop countdown once  answers have been validated.
watch(
  () => quizStore.validationResult,
  (result) => {
    if (result) stop();
  },
);

function launchConfetti() {
  const defaults = {
    particleCount: 4000,
    spread: 1000,
    startVelocity: 55,
    gravity: 0.6,
    ticks: 400,
  };

  confetti({
    ...defaults,
    origin: { x: 0, y: 0.4 },
    angle: 60,
    shapes: ["circle", "circle", "square"],
  });

  confetti({
    ...defaults,
    origin: { x: 1, y: 0.4 },
    angle: 120,
    shapes: ["circle", "circle", "square"],
  });
}

// Launch confetti when the quiz is finished.
watch(
  () => quizStore.isFinished,
  (finished) => {
    if (!finished) return;

    launchConfetti();
  },
);
</script>

<style lang="scss" scoped>
.quiz-container,
.quiz-results {
  background: var(--color-blue-darkest);
  grid-template-rows: auto auto minmax(0, 1fr) auto auto;
  border: 16px solid var(--color-quiz-container-border);
  padding: 8px 48px 68px;
  border-radius: 24px;

  .question,
  .result-title,
  .quiz-error {
    font-family: "Flanders Art Sans Bold", sans-serif;
    font-style: normal;
    font-weight: 700;
    color: var(--color-white);
    font-size: 24px;
    line-height: 29px;
  }

  .quiz-error {
    color: var(--color-error);
  }

  .answer-option-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    grid-auto-rows: max-content;
    align-content: start;

    gap: 24px 32px;

    min-width: 0;
    min-height: 0;
    overflow-y: auto;
  }
}
</style>
