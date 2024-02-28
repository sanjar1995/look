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
      d="M16 132h416c8.8 0 16-7.2 16-16V76c0-8.8-7.2-16-16-16H16C7.2 60 0 67.2 0 76v40c0 8.8 7.2 16 16 16zm0 160h416c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h416c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16z"
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
