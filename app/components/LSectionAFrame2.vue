<script lang="ts" setup>
import str from '../locales/section-a.json';
import { SECTION_A_FRAME_TIMINGS, toCssTime } from '../utils/animationTimings';

defineProps<{
  active: boolean;
}>();

// Get timing constants for this frame and convert to CSS format
const timings = SECTION_A_FRAME_TIMINGS.FRAME_2;
const cssTimings = {
  imgDuration: toCssTime(timings.IMG_DURATION),
  textDuration: toCssTime(timings.TEXT_DURATION),
  textDelay: toCssTime(timings.TEXT_DELAY),
};
</script>

<template>
  <div
    class="l-seca-f2"
    :class="{
      active: active,
    }"
  >
    <div class="relative w-full max-w-7xl aspect-1280/720 mx-auto">
      <!-- img -->
      <div class="l-seca-f2__img-wrap">
        <LPic
          src="/img/intimate_relationships_p01_frame02_04"
          :srcset="['pad', 'mob']"
          ext="jpg"
          :use2x="false"
          :webp="true"
        />
      </div>

      <!-- text -->
      <div class="l-seca-f2__text-wrap l-p">
        <LChatBubble :shadow="true" pointer="bottom-left">
          {{ str.frame2_1 }}
        </LChatBubble>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-seca-f2 {
  /* Animation timing variables - synced from animationTimings.ts */
  --seca-f2-img-duration: v-bind('cssTimings.imgDuration');
  --seca-f2-text-duration: v-bind('cssTimings.textDuration');
  --seca-f2-text-delay: v-bind('cssTimings.textDelay');

  width: 100%;

  &__img-wrap {
    opacity: 0;
  }

  &__text-wrap {
    position: absolute;
    top: 50%;
    right: 0;
    opacity: 0;
    transform: translate(100%, -50%);
  }

  &.active {
    .l-seca-f2__img-wrap {
      opacity: 1;
      transition: opacity var(--seca-f2-img-duration) ease;
    }

    .l-seca-f2__text-wrap {
      opacity: 1;
      transform: translate(0, -50%);
      transition: transform var(--seca-f2-text-duration) var(--seca-f2-text-delay) ease;
    }
  }
}
</style>
