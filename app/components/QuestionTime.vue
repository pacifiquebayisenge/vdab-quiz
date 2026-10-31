<template>
  <Button variant="question-timer" :label="label ?? '0:20'">
    <template #icon>
      <StopWacthIcon />
    </template>
  </Button>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string;
}>();
</script>
