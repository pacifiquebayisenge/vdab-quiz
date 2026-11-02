<template>
  <Button
    variant="icon-button"
    classes="w-[52px]! h-[48.75px]!"
    @click="openDynamicUrl"
  >
    <template #icon> <component :is="icons[iconType]" /> </template
  ></Button>
</template>

<script lang="ts" setup>
import HelpIcon from "./icons/HelpIcon.vue";
import RefreshIcon from "./icons/RefreshIcon.vue";
import MuteIcon from "./icons/MuteIcon.vue";

const config = useRuntimeConfig();

const prop = defineProps<{
  iconType: "help" | "refresh" | "mute";
}>();

const icons = {
  help: HelpIcon,
  refresh: RefreshIcon,
  mute: MuteIcon,
};

const dynamicUrl = computed(() => {
  switch (prop.iconType) {
    case "help":
      return config.public.helpUrl;
    case "refresh":
      return "";
    case "mute":
      return config.public.muteUrl;
  }
});

function openDynamicUrl() {
  if (dynamicUrl.value === "") window.location.reload();

  window.open(dynamicUrl.value, "_blank", "noopener,noreferrer");
}
</script>
