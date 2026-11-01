<template>
  <div class="info-banner">
    <div class="top-container flex justify-center flex-row-reverse p-2 gap-2.5">
      <QuizTimer />
      <QuizLevel />
    </div>

    <Avatar class="avatar-container" />

    <div class="background-image opacity-50">
      <img src="/banner-background.png" alt="" class="banner-image" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

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
