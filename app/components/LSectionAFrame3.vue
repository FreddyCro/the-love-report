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
    <!-- img -->
    <LPic
      src="/img/intimate_relationships_p01_frame03_05"
      :srcset="['pad', 'mob']"
      ext="jpg"
      :use2x="false"
      :webp="true"
    />

    <!-- text -->
    <div class="l-p">
      <LChatBubble :shadow="true" pointer="bottom-right">
        {{ str.frame3_1 }}
      </LChatBubble>
    </div>
  </div>
</template>

<style></style>
