<script lang="ts" setup>
import str from '../locales/section-a.json';
import { SECTION_A_FRAME_TIMINGS, toCssTime } from '../utils/animationTimings';

defineProps<{
  active: boolean;
}>();

// Get timing constants for this frame and convert to CSS format
const timings = SECTION_A_FRAME_TIMINGS.FRAME_6;
const cssTimings = {
  imgDuration: toCssTime(timings.IMG_DURATION),
  textDuration: toCssTime(timings.TEXT_DURATION),
};
</script>

<template>
  <div
    class="l-seca-f6"
    :class="{
      active: active,
    }"
  >
    <div class="w-full max-w-7xl aspect-1280/720 mx-auto">
      <!-- img 1 -->
      <div class="l-seca-f6__img-wrap">
        <LPic
          src="/img/intimate_relationships_p01_frame06_10"
          :srcset="['pad', 'mob']"
          ext="jpg"
          :use2x="false"
          :webp="true"
        />
      </div>

      <!-- text 1 -->
      <div class="l-seca-f6__text-wrap">
        <LChatBubble :shadow="true">
          {{ str.frame6_1 }}
        </LChatBubble>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

.l-seca-f6 {
  /* Animation timing variables - synced from animationTimings.ts */
  --seca-f6-img-duration: v-bind('cssTimings.imgDuration');
  --seca-f6-text-duration: v-bind('cssTimings.textDuration');

  position: relative;
  width: 100%;

  &__img-wrap {
    opacity: var(--seca-animation-opacity-start);
  }

  &__text-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    padding: 0 var(--seca-px);
    transform: translate(-50%, -50%);
    opacity: var(--seca-animation-opacity-start);

    @include rwd-min(sm) {
      max-width: 359px;
    }
  }

  &.active {
    .l-seca-f6__img-wrap {
      opacity: 1;
      transition: opacity var(--seca-f6-img-duration) ease;
    }

    .l-seca-f6__text-wrap {
      opacity: 1;
      transition: opacity var(--seca-f6-text-duration) ease;
    }
  }
}
</style>
