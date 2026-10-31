<template>
  <Button variant="question-timer" :label="label ?? '0:20'">
    <template #icon>
      <StopWatchIcon />
    </template>
  </Button>
</template>

<script lang="ts" setup>
import StopWatchIcon from "./icons/StopWatchIcon.vue";

defineProps<{
  label?: string;
}>();
</script>
