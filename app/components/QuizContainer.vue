<template>
  <div
    class="quiz-container justify-center grid rounded-2xl gap-6 pt-2 pb-15.5"
  >
    <div class="question-timer flex justify-center">
      <QuestionTime />
    </div>

    <div class="question text-center font-bold">
      <h3>{{ mockQuestions[0]?.question }}</h3>
    </div>

    <div class="answer-option-grid min-h-0 overflow-y-auto gap-8">
      <Button
        v-for="answerOption in mockQuestions[0]?.answers"
        variant="answer-option"
        :label="answerOption.answer"
      />
    </div>

    <div class="action-button flex justify-center">
      <Button label="Klaar!" :disabled="true" variant="action-button" />
    </div>

    <div class="help-button flex justify-center">
      <Button label="Geef me een tip..." variant="action-button" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mockQuestions } from "~~/server/data/mockQuestions";
</script>

<style lang="scss" scoped>
.quiz-container {
  background: var(--color-blue-darkest);
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
