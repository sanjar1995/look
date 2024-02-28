<template>
  <Loader v-if="loaderStatus" />
  <component :is="layout">
    <router-view :key="$route.fullPath" />
  </component>
</template>

<script setup>
import Loader from "./components/loader/Loader.vue";
import { useGeneralStore } from "./stores/general";
import { computed, onBeforeMount, reactive, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const generalStore = useGeneralStore();
const loaderStatus = computed(() => generalStore.loader);
const home = "home";

onBeforeMount(() => {
  generalStore.getCategory();
});

const layout = computed(() => {
  return (route.meta.layout || home) + "-layout";
});
</script>

<style lang="scss" scoped></style>
