<script lang="ts" setup>
import LChatBubble from './LChatBubble.vue';
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
    <!-- img -->
    <LPic
      src="/img/intimate_relationships_p01_frame02_04"
      ext="jpg"
      :use2x="false"
      :webp="true"
    />

    <!-- text -->
    <div class="l-p">
      <LChatBubble :shadow="true" pointer="bottom-left">
        {{ str.frame2_1 }}
      </LChatBubble>
    </div>
  </div>
</template>

<style></style>
