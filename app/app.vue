<script lang="ts" setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import LSectionA from './components/LSectionA.vue';
import LSectionB from './components/LSectionB.vue';
import LSectionC from './components/LSectionC.vue';
import LSectionD from './components/LSectionD.vue';
import LSectionE from './components/LSectionE.vue';
import LSectionF from './components/LSectionF.vue';

useSeoMeta({
  title: 'The Love Story - A Beautiful Landing Page',
  description:
    'Experience a beautiful landing page that tells a love story through various sections.',
});

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'The Love Story',
  description:
    'A beautiful landing page telling a love story through sections.',
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
  </NuxtLayout>
</template>
