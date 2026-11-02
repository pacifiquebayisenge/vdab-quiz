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
  max-width: 1250px;
  height: 100dvh;
  padding: 24px;
  margin-inline: auto;
  box-sizing: border-box;
  overflow: hidden;

  > * {
    min-width: 0;
    min-height: 0;
    height: 100%;
  }

  // Tablet
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1.5fr;
    padding: 16px;
    gap: 12px;
  }

  // Mobile
  @media (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto;
    align-content: start;

    height: auto;
    min-height: 100dvh;
    padding: 12px;
    gap: 12px;
    overflow: visible;

    > * {
      height: auto;
      min-height: 0;
    }
  }
}

@media (min-width: 768px) and (max-height: 650px) {
  .quiz-layout {
    height: auto;
    min-height: 100dvh;
    overflow: visible;

    > * {
      height: auto;
    }
  }
}
</style>
