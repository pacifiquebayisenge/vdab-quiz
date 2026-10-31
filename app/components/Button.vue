<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[variant, classes, { disabled }]"
  >
    <div class="button-content">
      <span
        v-if="$slots.icon && variant !== 'answer-option'"
        class="button-icon"
        aria-hidden="true"
      >
        <slot name="icon" />
      </span>

      <span>{{ label }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  disabled?: boolean;
  variant: "answer-option" | "action-button" | "question-timer";
  classes?: string;
  icon?: string;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<style lang="scss" scoped>
.answer-option,
.action-button,
.question-timer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  flex: none;
  order: 4;
  flex-grow: 0;

  .button-content {
    font-family: "Flanders Art Sans", sans-serif;
    font-style: normal;
    font-weight: 700;
    text-align: center;
    color: var(--color-blue-dark);
    flex: none;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 10.67px;

    .button-icon {
      font-style: normal;
      font-weight: 900;

      display: flex;
      align-items: center;
      text-align: center;

      color: var(--color-blue-dark);

      flex: none;
      order: 0;
      flex-grow: 0;
    }
  }
}

.answer-option {
  padding: 16px 32px;
  gap: 26px;

  width: 300px;
  height: 56px;

  flex: none;
  order: 0;
  flex-grow: 0;

  background: var(--color-blue-light);

  cursor: pointer;

  .button-content {
    font-size: 20px;
    line-height: 24px;

    order: 0;
    flex-grow: 1;
  }

  &:hover,
  &.selected {
    background: var(--color-blue-medium);

    .button-content {
      color: var(--color-white);
    }
  }

  &.selected {
    border: 2px solid var(--color-yellow);
    order: 1;
  }

  &.correct {
    background: var(--color-white);
    border: 3px solid var(--color-success);
    order: 0;
  }

  &.wrong {
    background: var(--color-white);
    border: 3px solid var(--color-error);
    order: 1;
  }
}

.action-button {
  font-family: "Flanders Art Sans Bold", sans-serif;

  cursor: pointer;
  width: 400px;
  height: 48px;
  padding: 12px 64px;
  gap: 12px;
  background: var(--color-white);
  position: relative;

  .button-content {
    font-size: 16px;
    line-height: 24px;

    order: 1;
    flex-grow: 0;
  }

  box-shadow: 0 4px 0 var(--color-grey);

  &.primary {
    background: var(--color-yellow);

    box-shadow: 0 4px 0 var(--color-yellow-dark);
  }

  &.secondary {
    width: 52px;
    height: 52px;
    padding: 22px 64px 20px;
    background: var(--color-blue-dark);

    box-shadow: 0 4px 0 var(--color-blue-darkest);
  }

  &.disabled {
    background: var(--color-grey);

    box-shadow: 0 4px 0 var(--color-grey-dark);
    cursor: not-allowed;
  }
}

.question-timer {
  width: 112px;
  height: 42.67px;
  border-radius: 48px;
  background: var(--color-white);
  box-shadow: 0 5.33px 0 var(--color-blue-dark);
  overflow: visible;

  .button-content {
    font-size: 21.33px;
    line-height: 26px;

    .button-icon {
      width: 16px;
      height: 17.33px;
      font-size: 17.3333px;
      line-height: 17px;
    }
  }
}
</style>
