<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.59 8.58984L12 13.1698L7.41 8.58984L6 9.99984L12 15.9998L18 9.99984L16.59 8.58984Z"
      :fill="fill"
    ></path>
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
