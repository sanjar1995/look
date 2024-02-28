<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :height="height"
    :width="width"
    viewBox="0 0 448 512"
  >
    <path
      opacity="1"
      :fill="fill"
      d="M352 160v-32C352 57.4 294.6 0 224 0 153.4 0 96 57.4 96 128v32H0v272c0 44.2 35.8 80 80 80h288c44.2 0 80-35.8 80-80V160h-96zm-192-32c0-35.3 28.7-64 64-64s64 28.7 64 64v32H160v-32zm160 120c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm-192 0c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  height: {
    default: "30",
  },
  width: {
    default: "30",
  },
  fill: {
    default: "#1E3050",
  },
});
</script>

<style lang="scss" scoped></style>
