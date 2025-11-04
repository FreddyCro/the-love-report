<script lang="ts" setup>
const imgSrc = 'https://picsum.photos/1200/800?random=1';
</script>

<template>
  <section class="section container">
    <NuxtImg
      :src="imgSrc"
      width="800"
      height="450"
      alt="Mock image from picsum"
      format="webp"
      class="mock-image"
    />
    <p>Section 1</p>
  </section>
</template>

<style scoped lang="scss"></style>
