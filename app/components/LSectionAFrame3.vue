<script lang="ts" setup>
import str from '../locales/section-a.json';
import { SECTION_A_FRAME_TIMINGS, toCssTime } from '../utils/animationTimings';

defineProps<{
  active: boolean;
}>();

// Get timing constants for this frame and convert to CSS format
const timings = SECTION_A_FRAME_TIMINGS.FRAME_3;
const cssTimings = {
  imgDuration: toCssTime(timings.IMG_DURATION),
  textDuration: toCssTime(timings.TEXT_DURATION),
  textDelay: toCssTime(timings.TEXT_DELAY),
};
</script>

<template>
  <div
    class="l-seca-f3"
    :class="{
      active: active,
    }"
  >
    <div class="relative w-full max-w-7xl aspect-1280/720 mx-auto">
      <!-- img -->
      <div class="l-seca-f3__img-wrap">
        <LPic
          src="/img/intimate_relationships_p01_frame03_05"
          :srcset="['pad', 'mob']"
          ext="jpg"
          :use2x="false"
          :webp="true"
        />
      </div>

      <!-- text -->
      <div class="l-seca-f3__text-wrap l-p">
        <LChatBubble :shadow="true" pointer="bottom-right">
          {{ str.frame3_1 }}
        </LChatBubble>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-seca-f3 {
  /* Animation timing variables - synced from animationTimings.ts */
  --seca-f3-img-duration: v-bind('cssTimings.imgDuration');
  --seca-f3-text-duration: v-bind('cssTimings.textDuration');
  --seca-f3-text-delay: v-bind('cssTimings.textDelay');

  position: relative;
  width: 100%;

  &__img-wrap {
    opacity: 0;
  }

  &__text-wrap {
    position: absolute;
    top: 50%;
    left: 0;
    opacity: 0;
    transform: translate(-100%, -50%);
  }

  &.active {
    .l-seca-f3__img-wrap {
      opacity: 1;
      transition: opacity var(--seca-f3-img-duration) ease;
    }

    .l-seca-f3__text-wrap {
      opacity: 1;
      transform: translate(0, -50%);
      transition: transform var(--seca-f3-text-duration) var(--seca-f3-text-delay) ease;
    }
  }
}
</style>
