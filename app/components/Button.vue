<template>
  <button type="button" :disabled="disabled" class="answer-option">
    <div class="button-content">
      {{ label }}
    </div>
  </button>

  <button type="button" :disabled="disabled" class="action-button">
    <div class="button-content">
      {{ label }}
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  disabled?: boolean;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<style lang="scss" scoped>
.answer-option,
.action-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  flex: none;
  order: 4;
  flex-grow: 0;

  .button-content {
    font-family: "Flanders Art Sans Bold", sans-serif;
    font-style: normal;
    font-weight: 700;
    text-align: center;
    color: var(--color-blue-dark);
    flex: none;
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

  &::after {
    width: 400px;
    height: 48px;
    position: absolute;
    top: 4px;
    content: "";
    z-index: -1;
    border-radius: 8px;
    background: var(--color-grey);
  }

  &.primary {
    background: var(--color-yellow);

    &::after {
      background: var(--color-yellow-dark);
    }
  }

  &.secondary {
    width: 52px;
    height: 52px;
    padding: 22px 64px 20px;
    background: var(--color-blue-dark);

    &::after {
      width: 52px;
      height: 52px;
      padding: 22px 64px 20px;
      background: var(--color-blue-darkest);
    }
  }

  &.disabled {
    background: var(--color-grey);

    &::after {
      background: var(--color-grey-dark);
    }
  }
}
</style>
