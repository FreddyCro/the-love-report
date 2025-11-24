<script lang="ts" setup>
// import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import LSectionA from './components/LSectionA.vue';
import LSectionB from './components/LSectionB.vue';
import LSectionC from './components/LSectionC.vue';
import LSectionD from './components/LSectionD.vue';
import LSectionE from './components/LSectionE.vue';
import LSectionF from './components/LSectionF.vue';
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
</script>

<template>
  <NuxtLayout>
    <AppHeader />
    <LSectionA />
    <LSectionB />
    <LSectionC />
    <LSectionD />
    <LSectionE />
    <LSectionF />
    <AppFooter />
    <TestAllImg />
  </NuxtLayout>
</template>
