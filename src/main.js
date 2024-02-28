import "./assets/scss/style.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { createHead } from "@vueuse/head";
import i18n from "./i18n";

import MenuIcon from "@/components/icons/MenuIcon.vue";
import VacancyIcon from "@/components/icons/VacancyIcon.vue";
import AddressIcon from "@/components/icons/AddressIcon.vue";
import TelegramIcon from "@/components/icons/TelegramIcon.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import ShoppingBagIcon from "@/components/icons/ShoppingBagIcon.vue";
import ArrowIcon from "@/components/icons/ArrowIcon.vue";
import TimesIcon from "@/components/icons/TimesIcon.vue";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon.vue";
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
import CartEmptyIcon from "@/components/icons/CartEmptyIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MinusIcon from "@/components/icons/MinusIcon.vue";
import PaymentIcon from "@/components/icons/PaymentIcon.vue";
import CreditCardIcon from "@/components/icons/CreditCardIcon.vue";
import HumoIcon from "@/components/icons/HumoIcon.vue";
import UzcardIcon from "@/components/icons/UzcardIcon.vue";

import VueLazyload from "vue-lazyload";
import errorImage from "@ast/images/no-photo.png";

import HomeLayoutVue from "@/layouts/HomeLayout.vue";
import TelegramWebLayoutVue from "@/layouts/TelegramWebLayout.vue";

const head = createHead();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("menu-icon", MenuIcon);
app.component("vacancy-icon", VacancyIcon);
app.component("address-icon", AddressIcon);
app.component("telegram-icon", TelegramIcon);
app.component("facebook-icon", FacebookIcon);
app.component("instagram-icon", InstagramIcon);
app.component("shoppingbag-icon", ShoppingBagIcon);
app.component("arrow-icon", ArrowIcon);
app.component("times-icon", TimesIcon);
app.component("leftarrow-icon", LeftArrowIcon);
app.component("rightarrow-icon", RightArrowIcon);
app.component("cartempty-icon", CartEmptyIcon);
app.component("trash-icon", TrashIcon);
app.component("plus-icon", PlusIcon);
app.component("minus-icon", MinusIcon);
app.component("payment-icon", PaymentIcon);
app.component("creditcard-icon", CreditCardIcon);
app.component("humo-icon", HumoIcon);
app.component("uzcard-icon", UzcardIcon);
app.component("home-layout", HomeLayoutVue);
app.component("telegram-layout", TelegramWebLayoutVue);
app.use(VueLazyload, {
  error: errorImage,
});
app.use(head);
app.use(i18n);

app.mount("#app");
