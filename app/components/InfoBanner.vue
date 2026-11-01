<template>
  <div class="info-banner">
    <div class="top-container flex justify-center p-2 gap-2.5">
      <QuizTimer />
      <QuizLevel
        :level="quizStore.currentQuestionIndex + 1"
        :total-levels="quizStore.totalQuestions"
      />
    </div>

    <Avatar class="avatar-container" />

    <div class="background-image opacity-50">
      <img src="/banner-background.png" alt="" class="banner-image" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const quizStore = useQuizStore();
</script>

<style lang="scss" scoped>
.info-banner {
  background: var(--color-blue-darkest);
  position: relative;

  .banner-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }

  .top-container {
    position: absolute;
    z-index: 1;
    width: 100%;
  }

  .avatar-container {
    position: absolute;
    z-index: 1;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
