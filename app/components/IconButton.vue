<template>
  <Button variant="icon-button" classes="w-[52px]! h-[48.75px]!">
    <template #icon> <component :is="icons[iconType]" /> </template
  ></Button>
</template>

<script lang="ts" setup>
import HelpIcon from "./icons/HelpIcon.vue";
import RefreshIcon from "./icons/RefreshIcon.vue";
import MuteIcon from "./icons/MuteIcon.vue";

const prop = defineProps<{
  iconType: "help" | "refresh" | "mute";
}>();

const icons = {
  help: HelpIcon,
  refresh: RefreshIcon,
  mute: MuteIcon,
};
</script>
