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
    <!-- 672px -->
    <div class="relative w-full max-w-2xl mx-auto">
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
          <LChatBubble :shadow="true" pointer="bottom-left">
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
          <LChatBubble :shadow="true" pointer="bottom-right">
            {{ str.frame4_2 }}
          </LChatBubble>
        </div>
      </div>

      <div class="l-seca-f4__box">
        <div class="relative sm:translate-x-[161px]">
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
            <LChatBubble :shadow="true" pointer="bottom-left">
              {{ str.frame4_3 }}
            </LChatBubble>
          </div>
        </div>

        <!-- text 4 -->
        <div class="l-seca-f4__text4-wrap l-p">
          <LChatBubble :shadow="true" pointer="top-right">
            {{ str.frame4_4 }}
          </LChatBubble>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

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
    max-width: calc(248px + 24px);
    margin-bottom: 20px;

    /* 2nd */
    &:nth-child(2) {
      margin-left: auto;
    }

    @include rwd-min(sm) {
      max-width: 380px;
      margin-bottom: 0;

      &:nth-child(2) {
        margin-top: -80px;
      }

      &:nth-child(3) {
        margin-top: -28px;
      }
    }
  }

  &__img1-wrap,
  &__img2-wrap,
  &__img3-wrap {
    max-width: 540px;
  }

  /* box 1 */
  &__img1-wrap {
    margin-left: 20px;
    opacity: var(--seca-animation-opacity-start);

    @include rwd-min(xs) {
      margin-left: 24px;
    }

    @include rwd-min(sm) {
      margin-left: 0;
    }
  }

  &__text1-wrap {
    position: absolute;
    top: 0;
    right: 0;
    max-width: 169px;
    opacity: var(--seca-animation-opacity-start);
    transform: translateX(100%);

    @include rwd-min(sm) {
      max-width: none;
    }
  }

  /* box 2 */
  &__img2-wrap {
    margin-right: 20px;
    opacity: var(--seca-animation-opacity-start);

    @include rwd-min(xs) {
      margin-right: 24px;
    }

    @include rwd-min(sm) {
      margin-right: 0;
    }
  }

  &__text2-wrap {
    position: absolute;
    top: calc(20 / 168 * 100%);
    left: 0;
    max-width: 169px;
    opacity: var(--seca-animation-opacity-start);
    transform: translateX(-100%);

    @include rwd-min(sm) {
      max-width: none;
    }
  }

  /* box 3 */
  &__img3-wrap {
    margin-left: 20px;
    opacity: var(--seca-animation-opacity-start);

    @include rwd-min(xs) {
      margin-left: 24px;
    }

    @include rwd-min(sm) {
      margin-left: 0;
    }
  }

  &__text3-wrap {
    position: absolute;
    top: calc(88 / 168 * 100%);
    right: 0;
    max-width: 169px;
    opacity: var(--seca-animation-opacity-start);
    transform: translateX(100%);

    @include rwd-min(sm) {
      top: calc(108 / 258 * 100%);
      max-width: 239px;
    }
  }

  &__text4-wrap {
    opacity: var(--seca-animation-opacity-start);
    max-width: 292px;
    margin-top: 64px;
    transform: translateX(-100%);

    @include rwd-min(sm) {
      position: absolute;
      bottom: -20px;
      margin-top: 0;
    }
  }

  &.active {
    .l-seca-f4__img1-wrap {
      opacity: 1;
      transition: opacity var(--seca-f4-img1-duration) ease;
    }

    .l-seca-f4__text1-wrap {
      transform: translateX(calc(100vw - 252px - 27px));
      opacity: 1;
      transition: transform var(--seca-f4-text1-duration) ease,
        opacity var(--seca-f4-text1-duration) ease;

      @include rwd-min(sm) {
        transform: translateX(calc(100% + 51px));
      }
    }

    .l-seca-f4__img2-wrap {
      opacity: 1;
      transition: opacity var(--seca-f4-img2-duration) var(--seca-f4-img2-delay)
        ease;
    }

    .l-seca-f4__text2-wrap {
      transform: translateX(calc((100vw - 252px - 27px) * -1));
      opacity: 1;
      transition: transform var(--seca-f4-text2-duration)
          var(--seca-f4-text2-delay) ease,
        opacity var(--seca-f4-text2-duration) var(--seca-f4-text2-delay) ease;

      @include rwd-min(sm) {
        transform: translateX(calc((100% + 20px) * -1));
      }
    }

    .l-seca-f4__img3-wrap {
      opacity: 1;
      transition: opacity var(--seca-f4-img3-duration) var(--seca-f4-img3-delay)
        ease;
    }

    .l-seca-f4__text3-wrap {
      transform: translateX(calc(100vw - 252px - 27px));
      opacity: 1;
      transition: transform var(--seca-f4-text3-duration)
          var(--seca-f4-text3-delay) ease,
        opacity var(--seca-f4-text3-duration) var(--seca-f4-text3-delay) ease;

      @include rwd-min(sm) {
        transform: translateX(151px);
      }
    }

    .l-seca-f4__text4-wrap {
      transform: translateX(0);
      opacity: 1;
      transition: transform var(--seca-f4-text4-duration)
          var(--seca-f4-text4-delay) ease,
        opacity var(--seca-f4-text4-duration) var(--seca-f4-text4-delay) ease;
    }
  }
}
</style>
