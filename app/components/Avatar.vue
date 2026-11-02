<template>
  <div class="avatar">
    <img src="/avatar.png" alt="Quizavatar" />
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  width: 140px;
  height: 140px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 1024px) {
    width: 110px;
    height: 110px;
  }

  @media (max-width: 767px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 375px) {
    width: 65px;
    height: 65px;
  }
}
</style>
