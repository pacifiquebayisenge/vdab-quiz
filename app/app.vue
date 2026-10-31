<template>
  <div class="quiz-layout">
    <InfoContainer />
    <QuizContainer />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.quiz-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;

  width: 100%;
  height: 100dvh;
  padding: 24px;

  box-sizing: border-box;
  overflow: hidden;

  > * {
    min-width: 0;
    min-height: 0;
    height: 100%;
  }
}
</style>
