<template>
  <Timer variant="quiz-timer" :label="label ?? '42:32'">
    <template #icon><StopWatchIcon /></template
  ></Timer>
</template>

<script lang="ts" setup>
import StopWatchIcon from "./icons/StopWatchIcon.vue";

defineProps<{
  label?: string;
}>();
</script>

<style lang="scss" scoped></style>
