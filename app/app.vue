<script lang="ts" setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import LSection1 from './components/LSection1.vue';
import LSection2 from './components/LSection2.vue';
import LSection3 from './components/LSection3.vue';
import LSection4 from './components/LSection4.vue';
import LSection5 from './components/LSection5.vue';
import LSection6 from './components/LSection6.vue';

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
    <LSection1 />
    <LSection2 />
    <LSection3 />
    <LSection4 />
    <LSection5 />
    <LSection6 />
    <AppFooter />
  </NuxtLayout>
</template>
