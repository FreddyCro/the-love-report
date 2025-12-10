<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import LSectionA from './components/LSectionA.vue';
import LSectionB from './components/LSectionB.vue';
import LSectionC from './components/LSectionC.vue';
import LSectionD from './components/LSectionD.vue';
import LSectionE from './components/LSectionE.vue';
import LSectionF from './components/LSectionF.vue';
// import TestGA from './components/TestGA.vue';
// import TestAllImg from './components/TestAllImg.vue';
import { useTracking } from '~/assets/js/tracking.js';
import { useSectionBState } from './composables/useSectionBState';
import meta from './locales/meta.json';

const config = useRuntimeConfig();
const APP_MODE = config.public.APP_MODE;
const ASSETS_PATH = config.public.APP_ASSETS_PATH;

// Use shared state composable for Section B's isEntered status
const { sectionBEntered } = useSectionBState();

useSeoMeta({
  title: meta.metaTitle,
  description: meta.metaDesc,
  'og:title': meta.metaTitle,
  'og:description': meta.metaXDesc,
  'og:image': `${ASSETS_PATH}/img/${meta.metaImage}`,
  'twitter:title': meta.metaTitle,
  'twitter:description': meta.metaXDesc,
  twitterCard: 'summary_large_image',
  keywords: meta.metaKeywords,
  robots: APP_MODE === 'production' ? 'index, follow' : 'noindex, nofollow',
});

useHead(useTracking());
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
    {
      src: 'https://main.protico.io/api/v1/vip.udn.com/protico-frame.js',
      tagPosition: 'bodyClose',
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
  <!-- <NuxtLayout style="opacity: 0.5"> -->
  <NuxtLayout>
    <AppHeader />
    <main class="main-content" :class="{ 'is-ready': isReady }">
      <div
        class="sections-ab-wrapper"
        :class="{
          'bg-black-6': !sectionBEntered,
          'bg-love-dark': sectionBEntered,
          'text-white': sectionBEntered,
        }"
      >
        <LSectionA />
        <LSectionB />
      </div>

      <LSectionC />
      <LSectionD />
      <LSectionE />
      <LSectionF />
    </main>
    <AppFooter />

    <!-- <TestGA /> -->
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

.sections-ab-wrapper {
  transition: background-color 1s, color 1s;
}
</style>
