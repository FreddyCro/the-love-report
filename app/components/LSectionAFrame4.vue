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
    <!-- img 1 -->
    <LPic
      src="/img/intimate_relationships_p01_frame04_06"
      ext="jpg"
      :use2x="false"
      :webp="true"
    />

    <!-- text 1 -->
    <div class="l-p">
      <LChatBubble :shadow="true" pointer="bottom-right">
        {{ str.frame4_1 }}
      </LChatBubble>
    </div>

    <!-- img 2 -->
    <LPic
      src="/img/intimate_relationships_p01_frame04_07"
      ext="jpg"
      :use2x="false"
      :webp="true"
    />

    <!-- text 2 -->
    <div class="l-p">
      <LChatBubble :shadow="true" pointer="bottom-left">
        {{ str.frame4_2 }}
      </LChatBubble>
    </div>

    <!-- img 3 -->
    <LPic
      src="/img/intimate_relationships_p01_frame04_08"
      ext="jpg"
      :use2x="false"
      :webp="true"
    />

    <!-- text 3 -->
    <div class="l-p">
      <LChatBubble :shadow="true" pointer="bottom-right">
        {{ str.frame4_3 }}
      </LChatBubble>
    </div>

    <!-- text 4 -->
    <div class="l-p">
      <LChatBubble :shadow="true" pointer="bottom-left">
        {{ str.frame4_4 }}
      </LChatBubble>
    </div>
  </div>
</template>

<style></style>
