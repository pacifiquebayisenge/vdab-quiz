<template>
  <div class="info-container grid rounded-2xl gap-6 pb-4">
    <div class="quiz-info">
      <QuizInfo />
    </div>

    <div class="action-buttons flex justify-center gap-2 h-fit">
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
  height: 100%;

  overflow: hidden;
  box-sizing: border-box;
  background: var(--color-quiz-container-border);
  border: 16px solid var(--color-quiz-container-border);

  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) auto;
}
</style>
