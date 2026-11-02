<template>
  <div class="timer" :class="variant">
    <div class="timer-content">
      <span v-if="$slots.icon" class="timer-icon">
        <slot name="icon" />
      </span>

      <span v-if="label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  variant: "question-timer" | "quiz-timer";
}>();
</script>

<style lang="scss" scoped>
.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5.33px 0 var(--color-blue-dark);

  &-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10.67px;

    font-family: "Flanders Art Sans", sans-serif;
    font-weight: 700;
    text-align: center;
  }

  &.question-timer {
    width: 112px;
    height: 42.67px;
    border-radius: 48px;
    background: var(--color-white);
    color: var(--color-blue-dark);
    font-size: 21.33px;
    overflow: visible;

    .timer-content {
      font-size: 21.33px;
      line-height: 26px;

      .timer-icon {
        font-style: normal;
        font-weight: 900;

        display: flex;
        align-items: center;
        text-align: center;

        color: var(--color-blue-dark);

        width: 16px;
        height: 17.33px;
        font-size: 17.3333px;
        line-height: 17px;
      }
    }
  }

  &.quiz-timer {
    width: 84px;
    height: 32px;
    border-radius: 4px;
    background: var(--color-blue-medium);
    color: var(--color-white);
    font-size: 16px;

    padding: 6.5px 12px;

    .timer-icon {
      .button-content {
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        flex: none;

        flex-grow: 0;
      }
    }
  }
}
</style>
