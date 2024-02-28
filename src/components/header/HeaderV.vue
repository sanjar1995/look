<template>
  <header class="header">
    <nav class="lnav container">
      <router-link :to="{ name: 'home' }" class="lnav__logo">
        <img src="@ast/images/loook-logo.svg" alt="" />
      </router-link>
      <button class="lnav__left-menu" @click="onOpen">
        <menu-icon :width="'30'" :height="'30'" :fill="'#fff'" />
      </button>
      <div class="lnav__content" :class="{ active: menuOpen }" @click="onOpen">
        <div class="lnav__content-block" @click.stop>
          <div class="lnav__left">
            <ul class="lnav__left-list">
              <button class="lnav__left-close" @click="onOpen">
                <times-icon :width="'30'" :height="'30'" :fill="'#fff'" />
              </button>
              <li v-for="link in navLinks" :key="link.id" @click="onOpen">
                <router-link class="lnav__left-link" :to="`${link.path}`">
                  <i :class="link.icon"></i>
                  {{ $t(`${link.title}`) }}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="lnav__right">
            <button
              class="lnav__right-cart"
              @click="generalStore.openOrCloseCart(), onOpen()"
            >
              <shoppingbag-icon :width="'30'" :height="'30'" :fill="'#fff'" />
              <span>{{ $t("header.cart") }}</span>
              <span class="lnav__right-cart-count">
                {{ Object.keys(cart).length }}
              </span>
            </button>
            <div
              class="lnav__right-lang"
              @mouseleave="selectLang = false"
              :class="{ active: selectLang }"
            >
              <div
                class="lnav__right-lang-selected"
                @click="selectLang = !selectLang"
              >
                <img
                  :src="locale == 'ru' ? ruImg : locale == 'en' ? enImg : uzImg"
                  alt=""
                />
                <span>{{ $t("header.lang") }}</span>
                <arrow-icon
                  :width="'30px'"
                  :height="'30px'"
                  :fill="'#ffae00'"
                />
              </div>
              <div class="lnav__right-lang-selects">
                <div
                  class="lnav__right-lang-selects-item"
                  v-for="lang in selectLangArray"
                  :key="lang.id"
                  @click="
                    switchLanguage(lang.value, lang.img), (selectLang = false)
                  "
                >
                  <img :src="lang.img" alt="" />
                  <span>{{ lang.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Tr from "@/i18n/translation";
import { useGeneralStore } from "../../stores/general";
import uzImg from "@/assets/images/langs/uz.svg";
import ruImg from "@/assets/images/langs/ru.svg";
import enImg from "@/assets/images/langs/en.svg";

// ****

const router = useRouter();
const { locale } = useI18n();
const supportedLocales = ref(Tr.supportedLocales);
const generalStore = useGeneralStore();

const navLinks = reactive([
  {
    id: 1,
    title: "header.home",
    path: "/",
    icon: "fal fa-home-lg-alt",
  },
  {
    id: 2,
    title: "header.ourAddresses",
    path: "/address",
    icon: "fal fa-map-marked-alt",
  },
  // { id: 2, title: "header.vacancy", path: "/vacancy" },
  {
    id: 3,
    title: "header.contacts",
    path: "/contacts",
    icon: "fal fa-id-card-alt",
  },
]);
const selectLangArray = reactive([
  {
    id: 1,
    title: "O'zbekcha",
    img: uzImg,
    value: "uz",
  },
  {
    id: 2,
    title: "Русский",
    img: ruImg,
    value: "ru",
  },
  {
    id: 3,
    title: "English",
    img: enImg,
    value: "en",
  },
]);
let selectLang = ref(false);
let menuOpen = ref(false);
let onOpen = () => {
  if (menuOpen.value) {
    menuOpen.value = false;
    document.documentElement.style.overflow = "auto";
  } else {
    menuOpen.value = true;
    document.documentElement.style.overflow = "hidden";
  }
};
let cart = computed(() => generalStore.cart);

const switchLanguage = ref(async (lang, img) => {
  const newLocale = lang;
  await Tr.switchLanguage(newLocale);
  try {
  } catch (e) {
    console.log(e);
    router.push("/");
  }
});
</script>

<style lang="scss"></style>
