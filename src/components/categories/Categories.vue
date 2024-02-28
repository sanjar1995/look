<template>
  <div class="categories" v-if="$route.fullPath == '/'">
    <div class="categories__list">
      <template v-for="category in categories" :key="category.id">
        <div
          class="categories__item"
          v-if="
            !category.name.toLowerCase().includes('ava') &&
            category.products.length != 0 &&
            category.name != 'Festive (tog’ora)_11_T'
          "
          @click="scrollToCategory(category.id)"
        >
          <img
            :src="`${imgUrl}/${category.photo.path}/${category.photo.name}.${category.photo.format}`"
            alt=""
            class="categories__item-img"
          />
          <span class="categories__item-span">
            {{ category.name.slice(0, category.name.indexOf("_")) }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useGeneralStore } from "../../stores/general";
import axios from "axios";

const generalStore = useGeneralStore();
const categories = computed(() => generalStore.categories);
const imgUrl = ref("https://sieveserp.ams3.cdn.digitaloceanspaces.com");

let scrollToCategory;

onMounted(() => {
  scrollToCategory = (id) => {
    const selectedCategory = document.querySelector(`#category-${id}`);
    selectedCategory.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth",
    });
  };
});
</script>

<style lang="scss"></style>
