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
  position: relative;
  background: var(--color-blue-darkest);
  height: 220px;

  .background-image {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .banner-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }

  .top-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    min-width: 0;
    align-items: center;
  }

  .avatar-container {
    position: absolute;
    z-index: 2;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
  }

  // Tablet
  @media (max-width: 1024px) {
    height: 180px;

    .top-container {
      gap: 8px;
    }
  }

  // Mobile
  @media (max-width: 767px) {
    height: 140px;

    .top-container {
      padding: 8px;
      gap: 8px;
    }

    .avatar-container {
      bottom: -30px;
    }
  }

  // Small mobile
  @media (max-width: 375px) {
    height: 120px;

    .top-container {
      gap: 4px;
      padding: 6px;
    }

    .avatar-container {
      bottom: -25px;
    }
  }
}

@media (max-width: 767px) {
  .content {
    padding-top: 40px;
  }
}
</style>
