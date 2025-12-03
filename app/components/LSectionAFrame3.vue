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
    <div class="relative w-full mx-auto">
      <!-- text -->
      <div class="l-seca-f3__text-wrap l-p">
        <LChatBubble :shadow="true" pointer="bottom-right">
          {{ str.frame3_1 }}
        </LChatBubble>
      </div>

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
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

.l-seca-f3 {
  /* Animation timing variables - synced from animationTimings.ts */
  --seca-f3-img-duration: v-bind('cssTimings.imgDuration');
  --seca-f3-text-duration: v-bind('cssTimings.textDuration');
  --seca-f3-text-delay: v-bind('cssTimings.textDelay');

  position: relative;
  width: 100%;

  &__img-wrap {
    width: calc(100% - var(--seca-px) * 2);
    max-width: var(--seca-img-max-w);
    margin: 0 auto;
    opacity: var(--seca-animation-opacity-start);
  }

  &__text-wrap {
    position: relative;
    z-index: 5;
    width: calc(100% - var(--seca-px) * 2);
    margin: 0 auto 20px auto;
    opacity: var(--seca-animation-opacity-start);
    transform: translateX(-100%);

    @include rwd-min(sm) {
      position: absolute;
      top: calc(40 / 316 * 100%);
      left: calc((100vw - 720px) / 2);
      width: 100%;
      max-width: 276px;
    }

    @include rwd-min(2xl) {
      left: calc((1920px - 720px) / 2);
    }
  }

  &.active {
    .l-seca-f3__img-wrap {
      opacity: 1;
      transition: opacity var(--seca-f3-img-duration) ease;
    }

    .l-seca-f3__text-wrap {
      opacity: 1;
      transform: translateX(0);
      transition: transform var(--seca-f3-text-duration)
        var(--seca-f3-text-delay) ease;
    }
  }
}
</style>
