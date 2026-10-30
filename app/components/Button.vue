<template>
  <button type="button" :disabled="disabled" class="answer-option">
    {{ label }}
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
.answer-option {
  /* Button selection */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 26px;

  width: 300px;
  height: 56px;

  border-radius: 8px;

  flex: none;
  order: 0;
  flex-grow: 0;

  background: #c2e2fe;
  color: #004475;

  font-family: "Flanders Art Sans Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */
  text-align: center;

  cursor: pointer;

  &:hover,
  &-selected {
    background: #2d89cc;
    color: #ffffff;
  }

  &-selected {
    border: 2px solid #ffe200;
    order: 1;
  }

  &-correct {
    background: #ffffff;
    border: 3px solid #17a500;
    order: 0;
  }

  &-wrong {
    background: #ffffff;
    border: 3px solid #f05535;
    order: 1;

    color: #004475;
  }
}
</style>
