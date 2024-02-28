<template>
  <section class="contacts">
    <div class="contacts-left">
      <h2 class="contacts-left__title">{{ $t("contacts.title") }}</h2>
      <div class="contacts-left__contact">
        <p class="contacts-left__contact-text">
          {{ $t("contacts.callCenter") }}
        </p>
        <span class="contacts-left__contact-span">
          <a href="tel:+998712072070">71 207 207 0</a>
        </span>
      </div>
      <hr class="contacts-left__hr" />
      <div class="contacts-left__contact">
        <p class="contacts-left__contact-text">
          {{ $t("contacts.officeTitle") }}
        </p>
        <span class="contacts-left__contact-span">
          {{ $t("contacts.office") }}
        </span>
      </div>
      <div class="contacts-left__contact">
        <p class="contacts-left__contact-text">
          {{ $t("contacts.workTime") }}
        </p>
        <span class="contacts-left__contact-span">09:00 - 19:00</span>
      </div>
      <div class="contacts-left__contact">
        <p class="contacts-left__contact-text">
          {{ $t("contacts.email") }}
        </p>
        <span class="contacts-left__contact-span">
          <a href="mailto:info@loook.uz">info@loook.uz</a>
        </span>
      </div>
      <span class="contacts-left__bot">
        {{ $t("contacts.bot") }}
        <a href="https://t.me/loookuzbot" target="_blank">
          https://t.me/loookuzbot
        </a>
      </span>
    </div>
    <div class="contacts-right">
      <iframe
        src="https://yandex.com/map-widget/v1/?um=constructor%3Ac458cefa3cb26f837917f981acead41447c05a7285412f2ff19dc37b93bb05e9&amp;source=constructor"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
