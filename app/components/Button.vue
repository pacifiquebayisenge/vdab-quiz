<template>
  <button
    type="button"
    :disabled="disabled"
    :aria-pressed="variant === 'answer-option' ? !!selected : undefined"
    :class="[variant, classes, status, { disabled, selected }]"
    @click="emit('click')"
  >
    <div class="button-content">
      <span
        v-if="$slots.icon && variant !== 'answer-option'"
        class="button-icon"
        aria-hidden="true"
      >
        <slot name="icon" />
      </span>

      <span v-if="label">{{ label }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  disabled?: boolean;
  variant: "answer-option" | "action-button" | "icon-button";
  selected?: boolean;
  status?: "correct" | "wrong";
  classes?: string;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<style lang="scss" scoped>
.answer-option,
.action-button,
.icon-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  flex: none;

  flex-grow: 0;
  cursor: pointer;

  .button-content {
    font-family: "Flanders Art Sans", sans-serif;
    font-style: normal;
    font-weight: 700;
    text-align: center;
    color: var(--color-blue-dark);
    flex: none;

    min-width: 0;
    max-width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 10.67px;

    > span {
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .button-icon {
      font-style: normal;
      font-weight: 900;

      display: flex;
      align-items: center;
      text-align: center;

      color: var(--color-blue-dark);

      flex: none;

      flex-grow: 0;
    }
  }
}

.answer-option {
  padding: 16px 32px;
  gap: 26px;

  width: 100%;
  max-width: 300px;
  min-width: 0;
  box-sizing: border-box;

  height: 56px;

  flex: none;

  flex-grow: 0;

  background: var(--color-blue-light);

  .button-content {
    font-size: 20px;
    line-height: 24px;

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
  }

  &.correct,
  &.wrong {
    background: var(--color-white);
    border: 3px solid;

    .button-content {
      color: var(--color-blue-dark);
    }
  }
  &.correct {
    border-color: var(--color-success);
  }

  &.wrong {
    border-color: var(--color-error);
  }
}

.action-button {
  font-family: "Flanders Art Sans Bold", sans-serif;

  width: 100%;
  max-width: 400px;
  min-width: 0;
  box-sizing: border-box;
  height: 48px;
  padding: 12px;
  gap: 12px;
  background: var(--color-white);
  position: relative;

  .button-content {
    font-size: 16px;
    line-height: 24px;

    flex-grow: 0;
  }

  box-shadow: 0 4px 0 var(--color-grey);

  &.primary {
    background: var(--color-yellow);

    box-shadow: 0 4px 0 var(--color-yellow-dark);
  }

  &.secondary {
    background: var(--color-blue-medium);
    box-shadow: 0 4px 0 var(--color-blue-dark);

    .button-content {
      color: var(--color-white);
    }
  }

  &.disabled {
    background: var(--color-grey);

    box-shadow: 0 4px 0 var(--color-grey-dark);
    cursor: not-allowed;
  }
}

.icon-button {
  background: var(--color-blue-dark);

  box-shadow: 0 4px 0 var(--color-blue-darkest);

  padding: 10px;
  height: fit-content;
  .button-content {
    color: var(--color-blue-darkest);

    .button-icon {
      color: var(--color-white);
    }
  }
}

@media (max-width: 767px) {
  .answer-option {
    width: 100%;
    max-width: none;
    min-width: 0;

    height: auto;
    min-height: 56px;
    padding: 12px 16px;

    .button-content {
      font-size: 18px;
      line-height: 24px;
    }
  }

  .action-button {
    width: 100%;
    max-width: 100%;
    min-width: 0;

    height: auto;
    min-height: 48px;
    padding: 12px 16px;
  }

  .icon-button {
    width: auto;
    flex-shrink: 0;
  }
}
</style>
