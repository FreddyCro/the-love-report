<script lang="ts" setup>
import str from '../locales/section-a.json';
import { SECTION_A_FRAME_TIMINGS, toCssTime } from '../utils/animationTimings';

defineProps<{
  active: boolean;
}>();

// Get timing constants for this frame and convert to CSS format
const timings = SECTION_A_FRAME_TIMINGS.FRAME_5;
const cssTimings = {
  imgDuration: toCssTime(timings.IMG_DURATION),
  text1Duration: toCssTime(timings.TEXT1_DURATION),
  text2Duration: toCssTime(timings.TEXT2_DURATION),
};
</script>

<template>
  <div
    class="l-seca-f5"
    :class="{
      active: active,
    }"
  >
    <div class="relative w-full mx-auto">
      <!-- img 1 -->
      <div class="l-seca-f5__img-wrap">
        <LPic
          src="/img/intimate_relationships_p01_frame05_09"
          :srcset="['pad', 'mob']"
          ext="jpg"
          :use2x="false"
          :webp="true"
        />
      </div>

      <!-- text 1 -->
      <div class="l-seca-f5__text1-wrap l-p">
        <LChatBubble :shadow="true" pointer="bottom-left">
          {{ str.frame5_1 }}
        </LChatBubble>
      </div>

      <!-- text 2 -->
      <div class="l-seca-f5__text2-wrap l-p">
        <LChatBubble :shadow="true" pointer="bottom-left">
          {{ str.frame5_2 }}
        </LChatBubble>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-seca-f5 {
  /* Animation timing variables - synced from animationTimings.ts */
  --seca-f5-img-duration: v-bind('cssTimings.imgDuration');
  --seca-f5-text1-duration: v-bind('cssTimings.text1Duration');
  --seca-f5-text2-duration: v-bind('cssTimings.text2Duration');

  position: relative;
  width: 100%;

  &__img-wrap {
    width: calc(100% - var(--seca-px) * 2);
    max-width: var(--seca-img-max-w);
    margin: 0 auto;
    opacity: var(--seca-animation-opacity-start);
  }

  &__text1-wrap {
    position: absolute;
    top: 0;
    right: 0;
    opacity: var(--seca-animation-opacity-start);
  }

  &__text2-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: var(--seca-animation-opacity-start);
  }

  &.active {
    .l-seca-f5__img-wrap {
      opacity: 1;
      transition: opacity var(--seca-f5-img-duration) ease;
    }

    .l-seca-f5__text1-wrap {
      opacity: 1;
      transition: opacity var(--seca-f5-text1-duration) ease;
    }

    .l-seca-f5__text2-wrap {
      opacity: 1;
      transition: opacity var(--seca-f5-text2-duration) ease;
    }
  }
}
</style>
