<script lang="ts" setup>
import str from '../locales/section-a.json';
import { SECTION_A_FRAME_TIMINGS, toCssTime } from '../utils/animationTimings';

defineProps<{
  active: boolean; // 原本的 active 狀態（保留）
  activePhase1: boolean; // 第一階段：進入 viewport 觸發
  activePhase2: boolean; // 第二階段：首次滾動觸發
}>();

// Get timing constants for this frame and convert to CSS format
const timings = SECTION_A_FRAME_TIMINGS.FRAME_1;
const cssTimings = {
  cropDuration: toCssTime(timings.CROP_DURATION),
  cropDelay: toCssTime(timings.CROP_DELAY),
  crossfadeDuration: toCssTime(timings.CROSSFADE_DURATION),
  crossfadeDelay: toCssTime(timings.CROSSFADE_DELAY),
  img3Duration: toCssTime(timings.IMG3_DURATION),
  img3Delay: toCssTime(timings.IMG3_DELAY),
  textDuration: toCssTime(timings.TEXT_DURATION),
  textDelay: toCssTime(timings.TEXT_DELAY),
};

// Image paths for picture element
const imgBack1Paths = {
  webp_1920: '/img/intimate_relationships_p01_frame01_00_1920plus_pc.webp',
  jpg_1920: '/img/intimate_relationships_p01_frame01_00_1920plus_pc.jpg',
  webp_1280: '/img/intimate_relationships_p01_frame01_00_pc.webp',
  jpg_1280: '/img/intimate_relationships_p01_frame01_00_pc.jpg',
  webp_768: '/img/intimate_relationships_p01_frame01_01_pad.webp',
  png_768: '/img/intimate_relationships_p01_frame01_01_pad.png',
  webp_default: '/img/intimate_relationships_p01_frame01_01_mob.webp',
  png_default: '/img/intimate_relationships_p01_frame01_01_mob.png',
  fallback: '/img/intimate_relationships_p01_frame01_00_1920plus_pc.jpg',
};

const imgBack2Paths = {
  webp_1920: '/img/intimate_relationships_p01_frame01_02_1920plus_pcpad.webp',
  jpg_1920: '/img/intimate_relationships_p01_frame01_02_1920plus_pcpad.jpg',
  webp_1280: '/img/intimate_relationships_p01_frame01_02_1280plus_pcpad.webp',
  jpg_1280: '/img/intimate_relationships_p01_frame01_02_1280plus_pcpad.jpg',
  webp_768: '/img/intimate_relationships_p01_frame01_02_pad.webp',
  png_768: '/img/intimate_relationships_p01_frame01_02_pad.png',
  webp_default: '/img/intimate_relationships_p01_frame01_02_mob.webp',
  png_default: '/img/intimate_relationships_p01_frame01_02_mob.png',
  fallback: '/img/intimate_relationships_p01_frame01_00_1920plus_pc.jpg',
};
</script>

<template>
  <div
    class="l-seca-f1"
    :class="{
      'active-phase-1': activePhase1,
      'active-phase-2': activePhase2,
    }"
  >
    <!--
      Animation Script:
      Step 1 (0s-1s): img1 crop - clip-path from full to center (20% each side)
      Step 2 (1s-2s): img1 fade out + img2 fade in (crossfade)
      Step 2 (1s-2s): img3 fly in from right to left
      Step 2 (1s-2s): text fly in from left to right
      -->
    <div class="relative w-full flex justify-center">
      <!-- img back wrapper (for crop effect) -->

      <!-- <div
        class="w-full aspect-280/556 xxs:aspect-366/716 mx-5 xxs:mx-6 flex justify-center border-2 border-love-red-03 rounded-lg overflow-hidden transition"
      ></div> -->
      <div class="l-seca-f1__img-back-wrap">
        <!-- img back 1 -->
        <div class="l-seca-f1__img1-wrap">
          <picture>
            <!-- 1920+ -->
            <source
              type="image/webp"
              media="(min-width:1920px)"
              :srcset="imgBack1Paths.webp_1920"
            />
            <source
              type="image/jpeg"
              media="(min-width:1920px)"
              :srcset="imgBack1Paths.jpg_1920"
            />

            <!-- 1280+ -->
            <source
              type="image/webp"
              media="(min-width:1280px)"
              :srcset="imgBack1Paths.webp_1280"
            />
            <source
              type="image/jpeg"
              media="(min-width:1280px)"
              :srcset="imgBack1Paths.jpg_1280"
            />

            <!-- 768+ (tablet) -->
            <source
              type="image/webp"
              media="(min-width:768px)"
              :srcset="imgBack1Paths.webp_768"
            />
            <source
              type="image/png"
              media="(min-width:768px)"
              :srcset="imgBack1Paths.png_768"
            />

            <!-- default (mobile) -->
            <source type="image/webp" :srcset="imgBack1Paths.webp_default" />
            <source type="image/png" :srcset="imgBack1Paths.png_default" />

            <img
              :src="imgBack1Paths.fallback"
              loading="lazy"
              :alt="str.frame1_1"
            />
          </picture>

          <!-- <LPic
            src="/img/intimate_relationships_p01_frame01_00_pc"
            ext="jpg"
            :use-prefix="false"
            :use2x="false"
            :webp="true"
          /> -->
        </div>

        <!-- img back 2 -->
        <div class="l-seca-f1__img2-wrap">
          <picture>
            <!-- 1920+ -->
            <source
              type="image/webp"
              media="(min-width:1920px)"
              :srcset="imgBack2Paths.webp_1920"
            />
            <source
              type="image/jpeg"
              media="(min-width:1920px)"
              :srcset="imgBack2Paths.jpg_1920"
            />

            <!-- 1280+ -->
            <source
              type="image/webp"
              media="(min-width:1280px)"
              :srcset="imgBack2Paths.webp_1280"
            />
            <source
              type="image/jpeg"
              media="(min-width:1280px)"
              :srcset="imgBack2Paths.jpg_1280"
            />

            <!-- 768+ (tablet) -->
            <source
              type="image/webp"
              media="(min-width:768px)"
              :srcset="imgBack2Paths.webp_768"
            />
            <source
              type="image/png"
              media="(min-width:768px)"
              :srcset="imgBack2Paths.png_768"
            />

            <!-- default (mobile) -->
            <source type="image/webp" :srcset="imgBack2Paths.webp_default" />
            <source type="image/png" :srcset="imgBack2Paths.png_default" />

            <img
              :src="imgBack2Paths.fallback"
              loading="lazy"
              :alt="str.frame1_1"
            />
          </picture>

          <!-- <LPic
            src="/img/intimate_relationships_p01_frame01_02_pad"
            ext="jpg"
            :use-prefix="false"
            :use2x="false"
            :webp="true"
          /> -->
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
        class="absolute bottom-0.5 left-1/2 flex flex-col items-center transform -translate-x-1/2 text-white"
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
  /* Animation timing variables - synced from animationTimings.ts */
  --seca-f1-crop-duration: v-bind('cssTimings.cropDuration');
  --seca-f1-crop-delay: v-bind('cssTimings.cropDelay');
  --seca-f1-crossfade-duration: v-bind('cssTimings.crossfadeDuration');
  --seca-f1-crossfade-delay: v-bind('cssTimings.crossfadeDelay');
  --seca-f1-img3-duration: v-bind('cssTimings.img3Duration');
  --seca-f1-img3-delay: v-bind('cssTimings.img3Delay');
  --seca-f1-text-duration: v-bind('cssTimings.textDuration');
  --seca-f1-text-delay: v-bind('cssTimings.textDelay');

  /* CSS variables for responsive clip-path */
  --clip-path: 20px;

  width: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-out;

  @include rwd-min(xxs) {
    --clip-path: 24px;
  }

  @include rwd-min(sm) {
    --clip-path: calc((100% - var(--seca-img-max-w)) / 2);
  }

  @include rwd-min(2xl) {
    --clip-path: calc((1920px - var(--seca-img-max-w)) / 2);
  }

  &__img-back-wrap {
    position: relative;
    width: 100%;
    height: 556px;
    clip-path: inset(0 0 0 0);

    @include rwd-min(xxs) {
      height: 716px;
    }

    @include rwd-min(sm) {
      height: 700px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__img1-wrap {
    width: 100%;
    height: 100%;
    opacity: 1;

    img {
      object-fit: cover;
    }
  }

  &__img2-wrap {
    position: absolute;
    top: 0;
    left: 50%;
    width: calc(100% - var(--seca-px) * 2);
    aspect-ratio: 280/556;
    transform: translateX(-50%);
    opacity: 0;

    @include rwd-min(xxs) {
      aspect-ratio: 366/716;
    }

    @include rwd-min(sm) {
      width: 672px;
      aspect-ratio: 672/700;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__img3-wrap {
    position: absolute;
    right: 0;
    top: calc(52 / 716 * 100%);
    max-width: 213px;
    display: inline-block;
    border-radius: 10px;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
    transform: translateX(100%);
    opacity: 0;

    @include rwd-min(xs) {
      max-width: 241px;
    }

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

  &.active-phase-1 {
    opacity: 1;

    .l-seca-f1__img-back-wrap {
      animation: cropImage var(--seca-f1-crop-duration) ease var(--seca-f1-crop-delay) forwards;
    }
  }

  &.active-phase-2 {
    .l-seca-f1__img1-wrap {
      opacity: 0;
      transition: opacity var(--seca-f1-crossfade-duration)
        var(--seca-f1-crossfade-delay) ease;
    }

    .l-seca-f1__img2-wrap {
      opacity: 1;
      border: solid 2px var(--color-love-red-02);
      border-radius: 10px;
      overflow: hidden;
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

@keyframes cropImage {
  from {
    clip-path: inset(0 0 0 0);
  }

  to {
    clip-path: inset(0 var(--clip-path) 0 var(--clip-path));
  }
}
</style>
