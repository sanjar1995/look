<template>
  <div
    class="aside"
    :class="{ close: !showCart }"
    @click="generalStore.openOrCloseCart()"
  >
    <div class="aside-cart" @click.stop>
      <div class="aside-cart__close">
        <button @click="generalStore.openOrCloseCart()">
          <times-icon width="50" height="50" fill="#c00a27" />
        </button>
      </div>
      <div
        class="aside-cart__empty"
        v-if="!Object.keys(generalStore.cart).length"
      >
        <div class="aside-cart__empty-info">
          <cartempty-icon />
          <h3 class="aside-cart__empty-info-title">
            {{ $t("cart.emptyTitle") }}
          </h3>
          <p class="aside-cart__empty-info-sub">
            {{ $t("cart.emptySub") }}
          </p>
        </div>
        <div class="aside-cart__footer">
          <button
            class="aside-cart__footer-btn"
            @click="generalStore.openOrCloseCart()"
          >
            {{ $t("cart.emptyBtn") }}
          </button>
        </div>
      </div>
      <div class="aside-cart__main" v-else>
        <div class="aside-cart__main-top">
          <p class="aside-cart__main-top-title">
            {{ $t("cart.mainTopTitle") }}
          </p>
          <p class="aside-cart__main-top-clear" @click="clearCart()">
            {{ $t("cart.mainTopClear") }}
          </p>
        </div>
        <div class="aside-cart__main-products">
          <template v-for="product in cartItems" :key="product.id">
            <div class="aside-cart__main-products-item">
              <div class="aside-cart__main-products-item-left">
                <button
                  class="aside-cart__main-products-item-delete"
                  @click="delCart(product)"
                >
                  <trash-icon width="20" height="20" fill="#323232" />
                </button>
                <img
                  v-lazy="
                    `https://sieveserp.ams3.cdn.digitaloceanspaces.com/${product.photo.path}/${product.photo.name}.${product.photo.format}`
                  "
                  alt=""
                  class="aside-cart__main-products-item-img"
                />
                <p class="aside-cart__main-products-item-name">
                  {{ product.name }}
                </p>
              </div>
              <div class="aside-cart__main-products-item-right">
                <span class="aside-cart__main-products-item-price">
                  {{
                    (
                      product.priceList.price * product.quantity
                    ).toLocaleString()
                  }}
                  <span>{{ $t("cart.mainCurrency") }}</span>
                </span>
                <div class="aside-cart__main-products-item-plusOrMinus">
                  <button
                    class="aside-cart__main-products-item-minus"
                    @click="minusCart(product)"
                  >
                    <minus-icon width="15" height="15" fill="#000" />
                  </button>
                  <span class="aside-cart__main-products-item-count">
                    {{ product.quantity }}
                  </span>
                  <button
                    class="aside-cart__main-products-item-plus"
                    @click="plusCart(product)"
                  >
                    <plus-icon width="15" height="15" fill="#000" />
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="aside-cart__footer">
          <p class="aside-cart__footer-price">
            {{ $t("cart.mainTotal") }}
            <span>
              {{ totalPrice.toLocaleString() }} {{ $t("cart.mainCurrency") }}
            </span>
          </p>
          <router-link
            :to="`/checkout`"
            class="aside-cart__footer-btn"
            @click="generalStore.openOrCloseCart()"
          >
            {{ $t("cart.mainCheckout") }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useGeneralStore } from "@/stores/general";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const generalStore = useGeneralStore();
let showCart = computed({
  get() {
    return generalStore.showCart;
  },
  set(newValue) {
    body.style.overflow = "unset";
    return (generalStore.showCart = newValue);
  },
});
let empty = ref(false);
let cartItems = computed(() => generalStore.cart);
const plusCart = (product) => generalStore.plusCart(product);
const minusCart = (product) => generalStore.minusCart(product);
const delCart = (product) => generalStore.delCart(product);
const clearCart = () => generalStore.clearCart();
const totalPrice = computed(() => {
  let totalPrice = 0;
  for (const key in generalStore.cart) {
    totalPrice +=
      generalStore.cart[key].priceList.price * generalStore.cart[key].quantity;
  }
  return totalPrice;
});

onMounted(() => {
  generalStore.cart = JSON.parse(localStorage.getItem("cart")) || {};
});
</script>

<style lang="scss" scoped></style>
