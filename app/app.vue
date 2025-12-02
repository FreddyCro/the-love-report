<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import LSectionA from './components/LSectionA.vue';
import LSectionB from './components/LSectionB.vue';
import LSectionGA from './components/LSectionGA.vue';
import LSectionC from './components/LSectionC.vue';
import LSectionD from './components/LSectionD.vue';
import LSectionE from './components/LSectionE.vue';
import LSectionF from './components/LSectionF.vue';
// import TestAllImg from './components/TestAllImg.vue';
import meta from './locales/meta.json';

const config = useRuntimeConfig();
const APP_MODE = config.public.APP_MODE;

useSeoMeta({
  title: meta.metaTitle,
  description: meta.metaDesc,
  'og:title': meta.metaTitle,
  'og:description': meta.metaXDesc,
  'og:image': meta.metaImage,
  'twitter:title': meta.metaTitle,
  'twitter:description': meta.metaXDesc,
  twitterCard: 'summary_large_image',
  keywords: meta.metaKeywords,
  robots: APP_MODE === 'production' ? 'index, follow' : 'noindex, nofollow',
});

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://newmedia.udn.com.tw/cms_assets/icons_v4/icons.css',
      tagPosition: 'bodyOpen',
    },
    {
      rel: 'stylesheet',
      href: './nmd-loading.css',
      tagPosition: 'bodyOpen',
    },
  ],
  script: [
    {
      type: 'text/javascript',
      src: './nmd-loading.min.js',
      tagPosition: 'bodyOpen',
    },
  ],
});

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: meta.metaTitle,
  description: meta.metaDesc,
});

const isReady = ref(false);

onMounted(() => {
  // Wait for next tick to ensure DOM is fully ready
  nextTick(() => {
    isReady.value = true;
  });

  // Fallback: force ready after 1 second if nextTick fails
  setTimeout(() => {
    if (!isReady.value) {
      isReady.value = true;
    }
  }, 5000);
});
</script>

<template>
  <NuxtLayout>
    <AppHeader />
    <main class="main-content" :class="{ 'is-ready': isReady }">
      <LSectionA />
      <LSectionB />

      <!-- GA test -->
      <LSectionGA />

      <LSectionC />
      <LSectionD />
      <LSectionE />
      <LSectionF />
    </main>
    <AppFooter />
    <!-- <TestAllImg /> -->
  </NuxtLayout>
</template>

<style lang="scss">
.main-content {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.is-ready {
    opacity: 1;
  }
}
</style>
