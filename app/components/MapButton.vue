<template>
  <Button
    variant="action-button"
    classes="primary w-fit!"
    label="Naar de kaart"
    @click="openMap"
  >
    <template #icon> <MapIcon /> </template
  ></Button>
</template>

<script setup lang="ts">
import MapIcon from "./icons/MapIcon.vue";
const config = useRuntimeConfig();

function openMap() {
  window.open(config.public.mapUrl, "_blank", "noopener,noreferrer");
}
</script>
