<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import LSectionA from './components/LSectionA.vue';
import LSectionB from './components/LSectionB.vue';
import LSectionC from './components/LSectionC.vue';
// import LSectionD from "./components/LSectionD.vue";
// import LSectionE from "./components/LSectionE.vue";
// import LSectionF from "./components/LSectionF.vue";
import TestAllImg from './components/TestAllImg.vue';
import meta from './locales/meta.json';

useSeoMeta({
  title: meta.metaTitle,
  description: meta.metaDesc,
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
      <div class="yumi">
        <LSectionC />
        <!-- <LSectionD />
        <LSectionE />
        <LSectionF /> -->
      </div>
    </main>
    <AppFooter />
    <TestAllImg />
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
