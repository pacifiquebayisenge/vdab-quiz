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

<style lang="scss" scoped>
.info-container {
  width: 100%;
  height: 100%;

  min-width: 0;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;

  background: var(--color-quiz-container-border);
  border: 16px solid var(--color-quiz-container-border);

  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) auto;

  .quiz-info {
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .action-buttons {
    flex-wrap: wrap;
    min-width: 0;
  }

  // Tablet
  @media (max-width: 1024px) {
    border-width: 10px;
    gap: 16px;
  }

  // Mobile
  @media (max-width: 767px) {
    height: auto;
    border-width: 6px;
    border-radius: 16px;

    padding: 12px;
    gap: 12px;

    grid-template-rows: auto auto;

    .quiz-info {
      overflow: visible;
    }

    .action-buttons {
      justify-content: center;
      gap: 8px;
    }
  }
}
</style>
