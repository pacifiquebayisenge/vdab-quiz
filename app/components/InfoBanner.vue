<template>
  <div class="info-banner">
    <div class="background-image opacity-50">
      <img src="/banner-background.png" alt="" class="banner-image" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.info-banner {
  background: var(--color-blue-darkest);

  .banner-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }
}
</style>
