<template>
  <div
    class="info-container justify-center grid rounded-2xl gap-6 pt-2 pb-15.5"
  >
    <div class="quiz-info">
      <QuizInfo />
    </div>

    <div class="action-buttons flex gap-2 h-fit">
      <IconButton icon-type="help" />
      <IconButton icon-type="refresh" />
      <IconButton icon-type="mute" />
      <MapButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mockQuestions } from "~~/server/data/mockQuestions";
</script>

<style lang="scss" scoped>
.info-container {
  width: 100%;
  height: 100dvh;

  overflow: hidden;
  box-sizing: border-box;
  background: var(--color-quiz-container-border);
  border: 10px solid var(--color-quiz-container-border);

  grid-template-rows: 3fr 1fr;
}

.quiz-container {
  background: var(--color-blue-dark);
  grid-template-rows: auto auto minmax(0, 1fr) auto auto;
  border: 10px solid var(--color-quiz-container-border);
  padding: 8px 48px 68px;

  .question {
    font-family: "Flanders Art Sans Bold", sans-serif;
    font-style: normal;
    font-weight: 700;
    color: var(--color-white);
    font-size: 24px;
    line-height: 29px;
  }

  .answer-option-grid {
    display: grid;
    grid-template-columns: auto auto;

    grid-auto-rows: max-content;
    align-content: start;
    justify-content: center;

    gap: 32px;

    min-height: 0;
    overflow-y: auto;
  }
}
</style>
