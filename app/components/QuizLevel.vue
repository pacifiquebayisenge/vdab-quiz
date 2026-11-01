<template>
  <div class="quiz-level p-1 pr-[18px]">
    <div class="content flex gap-1.5 justify-center items-center h-full w-full">
      <div class="loader w-full h-full">
        <div class="fill h-full"></div>
      </div>
      <span>Level 2 / 8 </span>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.quiz-level {
  width: 100%;
  height: 32px;
  border-radius: 4px;
  background: var(--color-blue-medium);
  box-shadow: 0 4px 0 var(--color-blue-darkest);

  .content {
    .loader {
      background: var(--color-blue-dark);
      border-radius: 4px;
      .fill {
        width: 10%;
        background: var(--color-yellow);
        border-radius: 4px;
      }
    }

    span {
      min-width: fit-content;
      color: var(--color-white);

      font-family: "Flanders Art Sans";
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
    }
  }
}
</style>
