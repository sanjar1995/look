<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 23C21.6569 23 23 21.6569 23 20C23 18.3431 21.6569 17 20 17C18.3431 17 17 18.3431 17 20C17 21.6569 18.3431 23 20 23Z"
      :stroke="fill"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M27 14H13C11.8954 14 11 14.8954 11 16V24C11 25.1046 11.8954 26 13 26H27C28.1046 26 29 25.1046 29 24V16C29 14.8954 28.1046 14 27 14Z"
      :stroke="fill"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M26 20H26.01"
      :stroke="fill"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M14 20H14.01"
      :stroke="fill"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
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
    default: "#c00a27",
  },
});
</script>

<style lang="scss" scoped></style>
