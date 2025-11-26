<script lang="ts" setup>
import str from '../locales/section-a.json';

defineProps<{
  active: boolean;
}>();
</script>

<template>
  <div
    :class="{
      active: active,
    }"
  >
    <div>frame 6</div>

    <!-- img 1 -->
    <!-- /img/intimate_relationships_p01_frame06_10 -->

    <!-- text 1 -->
    <div>{{ str.frame6_1 }}</div>
  </div>
</template>

<style></style>
