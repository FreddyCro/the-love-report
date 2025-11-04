<script lang="ts" setup>
const imgSrc = 'https://picsum.photos/1200/800?random=1';
</script>

<template>
  <section class="section container">
    <h2 class="section__title">Section A — Mock Image</h2>

    <NuxtImg
      :src="imgSrc"
      width="800"
      height="450"
      alt="Mock image from picsum"
      format="webp"
      class="mock-image"
    />
  </section>
</template>

<style scoped lang="scss">
.section {
  padding: 2rem 0;
}
.section__title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
</style>
