<template>
  <div class="products__item">
    <div class="products__item-top">
      <div class="products__item-img">
        <img v-lazy="photo" alt="" />
      </div>
      <h4 class="products__item-title">{{ product.name }}</h4>
      <p class="products__item-price">
        {{ product.priceList.price.toLocaleString() }}
        <span>{{ $t("product.currency") }}</span>
      </p>
    </div>
    <button class="products__item-btn" @click="addCart(product)">
      <span>{{ $t("product.addToCart") }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useGeneralStore } from "@/stores/general";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const generalStore = useGeneralStore();

const props = defineProps({
  product: Object,
});
const photo = props.product.photo
  ? `https://sieveserp.ams3.cdn.digitaloceanspaces.com/${props.product.photo.path}/${props.product.photo.name}.${props.product.photo.format}`
  : null;

const addCart = (product) =>
  generalStore.addCart(product, `${t("product.added")}`);
</script>

<style lang="scss" scoped></style>
