<script lang="ts" setup>
import str from '../locales/section-a.json';

defineProps<{
  active: boolean;
}>();
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
      Step 2 (1s-1.5s): img1 fade out + img2 fade in (crossfade)
      Step 3 (1.5s-2.5s): img3 fly in from right to left
      Step 3 (2s-3s): text fly in from left to right
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
    </div>

    <!-- ruler -->
    <div class="h-2.5 w-(--seca-f1-img-max-w) mx-auto bg-black" />
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

.l-seca-f1 {
  --seca-f1-img-max-w: 672px;
  --seca-f1-img-h: 700px;

  width: 100%;

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
    top: 0;
    max-width: 300px;
    display: inline-block;
    transform: translateX(100%);
  }

  &__text-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    color: #fff;
    font-size: 1.6rem;
    transform: translateX(-100%);
  }

  &.active {
    .l-seca-f1__img-back-wrap {
      /* width: var(--seca-f1-img-max-w); */
      clip-path: inset(
        0 calc((100% - var(--seca-f1-img-max-w)) / 2) 0
          calc((100% - var(--seca-f1-img-max-w)) / 2)
      );
      transition: clip-path 1s ease, width 1s ease;

      @include rwd-min(2xl) {
        clip-path: inset(
          0 calc((1920px - var(--seca-f1-img-max-w)) / 2) 0
            calc((1920px - var(--seca-f1-img-max-w)) / 2)
        );
      }
    }

    .l-seca-f1__img1-wrap {
      opacity: 0;
      transition: opacity 0.5s 1s ease;
    }

    .l-seca-f1__img2-wrap {
      opacity: 1;
      transition: opacity 0.5s 1s ease;
    }

    .l-seca-f1__img3-wrap {
      transform: translateX(0);
      transition: transform 1s 1.5s ease;
    }

    .l-seca-f1__text-wrap {
      transform: translateX(0);
      transition: transform 1s 2s ease;
    }
  }
}
</style>
