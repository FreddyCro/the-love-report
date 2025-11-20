<script lang="ts" setup>
import LPic from './LPic.vue';
</script>

<template>
  <section class="section container">
    <h2 class="section__title">Section C</h2>
    <p>Content for section C.</p>
    <LPic
      src="img/intimate_relationships_p01_frame01_03"
      ext="png"
      alt="Section C Image"
      :width="800"
      :height="600"
      :webp="false"
      :use2x="false"
    />
  </section>
</template>

<style lang="scss">
.section {
  padding: 2rem 0;
}
.section__title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
</style>
