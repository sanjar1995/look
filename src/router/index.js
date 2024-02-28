import { createRouter, createWebHistory, RouterView } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import Tr from "@/i18n/translation";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: "vacancy",
    //   name: "vacancy",
    //   component: () => import("../views/Vacancy/VacancyView.vue"),
    // },
    {
      path: "/address",
      name: "address",
      component: () => import("../views/Address/AddressView.vue"),
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("../views/Contacts/ContactsView.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/Checkout/CheckoutView.vue"),
    },
    {
      path: "/tgwbm",
      name: "tg-web-bot-menu",
      component: () => import("../views/TgWebBotMenu/TgWebBotMenu.vue"),
      meta: {
        layout: "telegram",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFound/NotFound.vue"),
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
