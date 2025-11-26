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
    <div>frame 5</div>

    <!-- img 1 -->
    <!-- /img/intimate_relationships_p01_frame05_09 -->

    <!-- text 1 -->
    <div>{{ str.frame5_1 }}</div>

    <!-- text 2 -->
    <div>{{ str.frame5_2 }}</div>
  </div>
</template>

<style></style>
