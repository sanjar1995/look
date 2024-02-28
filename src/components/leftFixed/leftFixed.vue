<template>
  <div class="leftFixed">
    <div
      class="leftFixed-item scroll"
      v-if="windowScroll > 150"
      @click="scrollTop()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30"
        width="30"
        viewBox="0 0 448 512"
      >
        <path
          opacity="1"
          fill="#fff"
          d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3 .4z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useGeneralStore } from "../../stores/general";
const generalStore = useGeneralStore();

const scrollTop = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
  document.querySelector("#categoriesDiv").classList.remove("sticky");
};

const windowScroll = ref(window.scrollY);
onMounted(() => {
  window.addEventListener("scroll", () => {
    windowScroll.value = window.scrollY;
  });
});
</script>

<style lang="scss" scoped>
.leftFixed {
  position: fixed;
  bottom: 11%;
  right: 3%;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  &-item {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #c00a27;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
