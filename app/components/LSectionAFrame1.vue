<script lang="ts" setup>
import str from '../locales/section-a.json';
import { SECTION_A_FRAME_TIMINGS, toCssTime } from '../utils/animationTimings';

defineProps<{
  active: boolean;
}>();

// Get timing constants for this frame and convert to CSS format
const timings = SECTION_A_FRAME_TIMINGS.FRAME_1;
const cssTimings = {
  cropDuration: toCssTime(timings.CROP_DURATION),
  crossfadeDuration: toCssTime(timings.CROSSFADE_DURATION),
  crossfadeDelay: toCssTime(timings.CROSSFADE_DELAY),
  img3Duration: toCssTime(timings.IMG3_DURATION),
  img3Delay: toCssTime(timings.IMG3_DELAY),
  textDuration: toCssTime(timings.TEXT_DURATION),
  textDelay: toCssTime(timings.TEXT_DELAY),
};
</script>

<template>
  <div
    class="l-seca-f1"
    :class="{
      active: active,
    }"
  >
    <!-- <LPic
      src="/img/intimate_relationships_p01_frame01_00_pc"
      ext="jpg"
      :use-prefix="false"
      :use2x="false"
      :webp="true"
    />
    <LPic
      src="/img/intimate_relationships_p01_frame01_00_1920plus_pc"
      ext="jpg"
      :use-prefix="false"
      :use2x="false"
      :webp="true"
    />
    <LPic
      src="/img/intimate_relationships_p01_frame01_02_pad"
      ext="jpg"
      :use-prefix="false"
      :use2x="false"
      :webp="true"
    />
    <LPic
      src="/img/intimate_relationships_p01_frame01_01"
      :srcset="['pad', 'mob']"
      ext="jpg"
      :use2x="false"
      :webp="true"
    />
    <LPic
      src="/img/intimate_relationships_p01_frame01_02"
      :srcset="['pad', 'mob']"
      ext="jpg"
      :use2x="false"
      :webp="true"
    /> -->

    <!--
      Animation Script:
      Step 1 (0s-1s): img1 crop - clip-path from full to center (20% each side)
      Step 2 (1s-2s): img1 fade out + img2 fade in (crossfade)
      Step 2 (1s-2s): img3 fly in from right to left
      Step 2 (1s-2s): text fly in from left to right
    -->
    <div class="relative w-full flex justify-center">
      <!-- img back wrapper (for crop effect) -->
      <div class="l-seca-f1__img-back-wrap">
        <!-- img back 1 -->
        <div class="l-seca-f1__img1-wrap">
          <LPic
            src="/img/intimate_relationships_p01_frame01_00_pc"
            ext="jpg"
            :use-prefix="false"
            :use2x="false"
            :webp="true"
          />
        </div>

        <!-- img back 2 -->
        <div class="l-seca-f1__img2-wrap">
          <LPic
            src="/img/intimate_relationships_p01_frame01_02_pad"
            ext="jpg"
            :use-prefix="false"
            :use2x="false"
            :webp="true"
          />
        </div>
      </div>

      <!-- img front -->
      <div class="l-seca-f1__img3-wrap">
        <LPic
          src="/img/intimate_relationships_p01_frame01_03"
          :srcset="['pad', 'mob']"
          ext="jpg"
          :use2x="false"
          :webp="true"
        />
      </div>

      <!-- text -->
      <div class="l-seca-f1__text-wrap l-p">
        <LChatBubble :shadow="true" pointer="bottom-right">
          {{ str.frame1_1 }}
        </LChatBubble>
      </div>

      <!-- Read more -->
      <div
        class="absolute bottom-0 left-1/2 flex flex-col items-center transform -translate-x-1/2 text-white"
      >
        {{ str.readMore }}
        <div class="h-[60px] w-0.5 mt-0.5 bg-white" role="presentation" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

.l-seca-f1 {
  --seca-f1-img-h: 700px;

  /* Animation timing variables - synced from animationTimings.ts */
  --seca-f1-crop-duration: v-bind('cssTimings.cropDuration');
  --seca-f1-crossfade-duration: v-bind('cssTimings.crossfadeDuration');
  --seca-f1-crossfade-delay: v-bind('cssTimings.crossfadeDelay');
  --seca-f1-img3-duration: v-bind('cssTimings.img3Duration');
  --seca-f1-img3-delay: v-bind('cssTimings.img3Delay');
  --seca-f1-text-duration: v-bind('cssTimings.textDuration');
  --seca-f1-text-delay: v-bind('cssTimings.textDelay');

  width: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-out;

  &__img-back-wrap {
    position: relative;
    width: 100%;
    height: var(--seca-f1-img-h);
    clip-path: inset(0 0 0 0);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__img1-wrap {
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  &__img2-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  &__img3-wrap {
    position: absolute;
    right: 0;
    top: calc(52 / 716 * 100%);
    max-width: 165px;
    display: inline-block;
    border-radius: 10px;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
    transform: translateX(100%);
    opacity: 0;

    @include rwd-min(sm) {
      right: calc((100vw - 720px) / 2);
      top: calc(118 / 700 * 100%);
      max-width: 340px;
    }

    @include rwd-min(2xl) {
      right: calc((1920px - 720px) / 2);
    }
  }

  &__text-wrap {
    position: absolute;
    bottom: calc(211 / 716 * 100%);
    left: 0;
    display: inline-block;
    color: #fff;
    font-size: 1.6rem;
    transform: translateX(-100%);
    opacity: 0;

    @include rwd-min(sm) {
      left: calc((100vw - 720px) / 2);
      bottom: calc(38 / 700 * 100%);
    }

    @include rwd-min(2xl) {
      left: calc((1920px - 720px) / 2);
    }
  }

  &.active {
    opacity: 1;

    .l-seca-f1__img-back-wrap {
      width: calc(100% - var(--seca-px) * 2);
      clip-path: inset(
        0 calc((100% - var(--seca-img-max-w)) / 2) 0
          calc((100% - var(--seca-img-max-w)) / 2)
      );
      transition: clip-path var(--seca-f1-crop-duration) ease,
        width var(--seca-f1-crop-duration) ease;

      @include rwd-min(2xl) {
        width: 100%;
        clip-path: inset(
          0 calc((1920px - var(--seca-img-max-w)) / 2) 0
            calc((1920px - var(--seca-img-max-w)) / 2)
        );
      }
    }

    .l-seca-f1__img1-wrap {
      opacity: 0;
      transition: opacity var(--seca-f1-crossfade-duration)
        var(--seca-f1-crossfade-delay) ease;
    }

    .l-seca-f1__img2-wrap {
      opacity: 1;
      transition: opacity var(--seca-f1-crossfade-duration)
        var(--seca-f1-crossfade-delay) ease;
    }

    .l-seca-f1__img3-wrap {
      transform: translateX(0);
      opacity: 1;
      transition: transform var(--seca-f1-img3-duration)
          var(--seca-f1-img3-delay) ease,
        opacity var(--seca-f1-img3-duration) var(--seca-f1-img3-delay) ease;
    }

    .l-seca-f1__text-wrap {
      transform: translateX(0);
      opacity: 1;
      transition: transform var(--seca-f1-text-duration)
          var(--seca-f1-text-delay) ease,
        opacity var(--seca-f1-text-duration) var(--seca-f1-text-delay) ease;
    }
  }
}
</style>
