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
  imgDelay: toCssTime(timings.IMG_DELAY),
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
    <div class="relative w-full mx-auto">
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
@use '@/assets/styles/mixins' as *;

.l-seca-f2 {
  /* Animation timing variables - synced from animationTimings.ts */
  --seca-f2-img-duration: v-bind('cssTimings.imgDuration');
  --seca-f2-img-delay: v-bind('cssTimings.imgDelay');
  --seca-f2-text-duration: v-bind('cssTimings.textDuration');
  --seca-f2-text-delay: v-bind('cssTimings.textDelay');

  width: 100%;

  &__img-wrap {
    width: calc(100% - var(--seca-px) * 2);
    max-width: var(--seca-img-max-w);
    margin: 0 auto;
    opacity: var(--seca-animation-opacity-start);
  }

  &__text-wrap {
    position: absolute;
    top: calc(173 / 317 * 100%);
    right: 0;
    max-width: 292px;
    opacity: var(--seca-animation-opacity-start);
    transform: translateX(100%);

    @include rwd-min(sm) {
      top: calc(70 / 316 * 100%);
      right: calc((100vw - 720px) / 2);
      max-width: 365px;
    }

    @include rwd-min(2xl) {
      right: calc((1920px - 720px) / 2);
    }
  }

  &.active {
    .l-seca-f2__img-wrap {
      opacity: 1;
      transition: opacity var(--seca-f2-img-duration) var(--seca-f2-img-delay)
        ease;
    }

    .l-seca-f2__text-wrap {
      opacity: 1;
      transform: translateX(0);
      transition: all var(--seca-f2-text-duration) var(--seca-f2-text-delay)
        ease;
    }
  }
}
</style>
