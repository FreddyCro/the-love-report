<script lang="ts" setup>
import str from '../locales/section-a.json';
import { SECTION_A_FRAME_TIMINGS, toCssTime } from '../utils/animationTimings';

defineProps<{
  active: boolean;
}>();

// Get timing constants for this frame and convert to CSS format
const timings = SECTION_A_FRAME_TIMINGS.FRAME_4;
const cssTimings = {
  img1Duration: toCssTime(timings.IMG1_DURATION),
  text1Duration: toCssTime(timings.TEXT1_DURATION),
  img2Duration: toCssTime(timings.IMG2_DURATION),
  img2Delay: toCssTime(timings.IMG2_DELAY),
  text2Duration: toCssTime(timings.TEXT2_DURATION),
  text2Delay: toCssTime(timings.TEXT2_DELAY),
  img3Duration: toCssTime(timings.IMG3_DURATION),
  img3Delay: toCssTime(timings.IMG3_DELAY),
  text3Duration: toCssTime(timings.TEXT3_DURATION),
  text3Delay: toCssTime(timings.TEXT3_DELAY),
  text4Duration: toCssTime(timings.TEXT4_DURATION),
  text4Delay: toCssTime(timings.TEXT4_DELAY),
};
</script>

<template>
  <div
    class="l-seca-f4"
    :class="{
      active: active,
    }"
  >
    <div class="relative w-full mx-auto">
      <div class="l-seca-f4__box">
        <!-- img 1 -->
        <div class="l-seca-f4__img1-wrap">
          <LPic
            src="/img/intimate_relationships_p01_frame04_06"
            :srcset="['pad', 'mob']"
            ext="jpg"
            :use2x="false"
            :webp="true"
          />
        </div>

        <!-- text 1 -->
        <div class="l-seca-f4__text1-wrap l-p">
          <LChatBubble :shadow="true" pointer="bottom-right">
            {{ str.frame4_1 }}
          </LChatBubble>
        </div>
      </div>

      <div class="l-seca-f4__box">
        <!-- img 2 -->
        <div class="l-seca-f4__img2-wrap">
          <LPic
            src="/img/intimate_relationships_p01_frame04_07"
            :srcset="['pad', 'mob']"
            ext="jpg"
            :use2x="false"
            :webp="true"
          />
        </div>

        <!-- text 2 -->
        <div class="l-seca-f4__text2-wrap l-p">
          <LChatBubble :shadow="true" pointer="bottom-left">
            {{ str.frame4_2 }}
          </LChatBubble>
        </div>
      </div>

      <div class="l-seca-f4__box">
        <!-- img 3 -->
        <div class="l-seca-f4__img3-wrap">
          <LPic
            src="/img/intimate_relationships_p01_frame04_08"
            :srcset="['pad', 'mob']"
            ext="jpg"
            :use2x="false"
            :webp="true"
          />
        </div>

        <!-- text 3 -->
        <div class="l-seca-f4__text3-wrap l-p">
          <LChatBubble :shadow="true" pointer="bottom-right">
            {{ str.frame4_3 }}
          </LChatBubble>
        </div>

        <!-- text 4 -->
        <div class="l-seca-f4__text4-wrap l-p">
          <LChatBubble :shadow="true" pointer="bottom-left">
            {{ str.frame4_4 }}
          </LChatBubble>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-seca-f4 {
  /* Animation timing variables - synced from animationTimings.ts */
  --seca-f4-img1-duration: v-bind('cssTimings.img1Duration');
  --seca-f4-text1-duration: v-bind('cssTimings.text1Duration');
  --seca-f4-img2-duration: v-bind('cssTimings.img2Duration');
  --seca-f4-img2-delay: v-bind('cssTimings.img2Delay');
  --seca-f4-text2-duration: v-bind('cssTimings.text2Duration');
  --seca-f4-text2-delay: v-bind('cssTimings.text2Delay');
  --seca-f4-img3-duration: v-bind('cssTimings.img3Duration');
  --seca-f4-img3-delay: v-bind('cssTimings.img3Delay');
  --seca-f4-text3-duration: v-bind('cssTimings.text3Duration');
  --seca-f4-text3-delay: v-bind('cssTimings.text3Delay');
  --seca-f4-text4-duration: v-bind('cssTimings.text4Duration');
  --seca-f4-text4-delay: v-bind('cssTimings.text4Delay');

  width: 100%;

  &__box {
    position: relative;
  }

  &__img1-wrap,
  &__img2-wrap,
  &__img3-wrap {
    max-width: 540px;
  }

  &__img1-wrap {
    opacity: var(--seca-animation-opacity-start);
  }

  &__text1-wrap {
    position: absolute;
    top: 0;
    left: 0;
    opacity: var(--seca-animation-opacity-start);
  }

  &__img2-wrap {
    opacity: var(--seca-animation-opacity-start);
  }

  &__text2-wrap {
    position: absolute;
    top: 0;
    left: 0;
    opacity: var(--seca-animation-opacity-start);
  }

  &__img3-wrap {
    opacity: var(--seca-animation-opacity-start);
  }

  &__text3-wrap {
    position: absolute;
    top: 0;
    left: 0;
    opacity: var(--seca-animation-opacity-start);
  }

  &__text4-wrap {
    opacity: var(--seca-animation-opacity-start);
  }

  &.active {
    .l-seca-f4__img1-wrap {
      opacity: 1;
      transition: opacity var(--seca-f4-img1-duration) ease;
    }

    .l-seca-f4__text1-wrap {
      opacity: 1;
      transition: opacity var(--seca-f4-text1-duration) ease;
    }

    .l-seca-f4__img2-wrap {
      opacity: 1;
      transition: opacity var(--seca-f4-img2-duration) var(--seca-f4-img2-delay) ease;
    }

    .l-seca-f4__text2-wrap {
      opacity: 1;
      transition: opacity var(--seca-f4-text2-duration) var(--seca-f4-text2-delay) ease;
    }

    .l-seca-f4__img3-wrap {
      opacity: 1;
      transition: opacity var(--seca-f4-img3-duration) var(--seca-f4-img3-delay) ease;
    }

    .l-seca-f4__text3-wrap {
      opacity: 1;
      transition: opacity var(--seca-f4-text3-duration) var(--seca-f4-text3-delay) ease;
    }

    .l-seca-f4__text4-wrap {
      opacity: 1;
      transition: opacity var(--seca-f4-text4-duration) var(--seca-f4-text4-delay) ease;
    }
  }
}
</style>
