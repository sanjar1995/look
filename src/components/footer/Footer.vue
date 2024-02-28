<template>
  <footer id="colophon" class="site-footer footer-v1">
    <div class="col-full">
      <div class="footer-social-icons">
        <ul class="social-icons list-unstyled">
          <li>
            <a href="https://www.instagram.com/loookuz/" target="_blank">
              <instagram-icon :fill="'#969696'" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/Loookuz">
              <facebook-icon :fill="'#969696'" />
            </a>
          </li>
          <li>
            <a href="https://t.me/LoookUzBot" target="_blank">
              <telegram-icon :fill="'#969696'" />
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-logo">
        <a href="index.html" class="custom-logo-link" rel="home">
          <img src="@/assets/images/logo_footer.svg" alt="" />
        </a>
      </div>
      <div class="site-address">
        <ul class="address">
          <li>LOOOK FAST FOOD</li>
          <li><a href="tel:+998712072070">+99871 207 20 70</a></li>
          <li><a href="mailto:info@loook.uz">info@loook.uz</a></li>
        </ul>
      </div>
      <div class="site-info ng-tns-c50-1">
        <p class="copyright ng-tns-c50-1">
          Copyright © 2023 LOOOK. All rights reserved.
        </p>
      </div>
      <router-link class="footer-action-btn" :to="`/${locale}/address`">
        <address-icon :fill="'#fff'" :width="'40'" :height="'40'" />
        <span
          style="
            margin-left: 15px;
            font-weight: 700;
            line-height: 1.5;
            font-size: 18px;
            font-family: Roboto, 'Helvetica Neue', sans-serif;
          "
          >{{ $t("footer.findUsMap") }}</span
        >
      </router-link>
      <div class="pizzaro-handheld-footer-bar">
        <ul class="footer-nav__list">
          <router-link :to="`/${locale}/vacancy`" class="footer-nav__item">
            <vacancy-icon :fill="'#fff'" :width="'40'" :height="'40'" />
            <span>{{ $t("footer.vacancy") }}</span>
          </router-link>
          <router-link :to="`/${locale}/address`" class="footer-nav__item">
            <address-icon :fill="'#fff'" :width="'40'" :height="'40'" />
            <span>{{ $t("footer.address") }}</span>
          </router-link>
          <li class="footer-nav__item">
            <menu-icon :fill="'#fff'" :width="'40'" :height="'40'" />
            <span>{{ $t("footer.menu") }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- .col-full -->
  </footer>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
</script>

<style lang="scss" scoped>
.footer-nav__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 !important;
  padding: 0 !important;
}

.footer-nav__item {
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
  transition: 0.2s linear;
  color: #fff;
  font-size: 16px;
}

.footer-v1.site-footer .footer-social-icons .social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
}

.address {
  margin: 0;
  padding: 0;
  font-size: 18px;
  color: #dddddd;

  a {
    color: #dddddd;
  }
}

@media (max-width: 765px) {
  .address {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 20px;
  }
}
</style>
