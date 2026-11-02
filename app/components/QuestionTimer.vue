<template>
  <Timer variant="question-timer" :label="time.toString() ?? '0:00'">
    <template #icon>
      <StopWatchIcon />
    </template>
  </Timer>
</template>

<script lang="ts" setup>
import StopWatchIcon from "./icons/StopWatchIcon.vue";

defineProps<{
  time: number;
}>();
</script>
