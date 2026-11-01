<template>
  <div class="quiz-level p-1 pr-4.5">
    <div class="content flex gap-1.5 justify-center items-center h-full w-full">
      <div class="loader w-full h-full">
        <div class="fill h-full" :style="{ width: `${progress}%` }"></div>
      </div>
      <span>Level {{ level }} / {{ totalLevels }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    level?: number;
    totalLevels?: number;
  }>(),
  {
    level: 2,
    totalLevels: 8,
  },
);

const progress = computed(() =>
  Math.min(100, Math.max(0, (props.level / props.totalLevels) * 100)),
);
</script>

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
        background: var(--color-yellow);
        border-radius: inherit;

        background: repeating-linear-gradient(
          115deg,
          var(--color-yellow) 0px,
          var(--color-yellow) 22px,
          #dfc600 22px,
          #dfc600 44px
        );

        background-size: 100px 100%;

        transition: width 600ms ease-in-out;
        animation: progress-stripes 6s linear infinite;
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

@keyframes progress-stripes {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .quiz-level .loader .fill {
    animation: none;
    transition: none;
  }
}
</style>
