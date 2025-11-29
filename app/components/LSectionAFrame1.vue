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
    <div class="relative w-full max-w-7xl aspect-1280/720 mx-auto">
      <!-- img back -->
      <div class="l-seca-f1__img1-wrap">
        <LPic
          src="/img/intimate_relationships_p01_frame01_00_1920plus_pc"
          ext="jpg"
          :use-prefix="false"
          :use2x="false"
          :webp="true"
        />
      </div>
      <!-- <LPic
        src="/img/intimate_relationships_p01_frame01_01"
        :srcset="['pad', 'mob']"
        ext="jpg"
        :use2x="false"
        :webp="true"
      /> -->
      <!-- <LPic
        src="/img/intimate_relationships_p01_frame01_02"
        :srcset="['pad', 'mob']"
        ext="jpg"
        :use2x="false"
        :webp="true"
      /> -->

      <!-- img front -->
      <div class="l-seca-f1__img2-wrap">
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
  </div>
</template>

<style lang="scss">
.l-seca-f1 {
  width: 100%;

  &__img1-wrap {
    clip-path: inset(0 0 0 0);
    transition: clip-path 1s ease;
  }

  &__img2-wrap {
    position: absolute;
    right: 0;
    top: 0;
    max-width: 300px;
    display: inline-block;
    transform: translateX(100%);
    transition: transform 1s 0.5s ease;
  }

  &__text-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    color: #fff;
    font-size: 1.6rem;
    transform: translateX(-100%);
    transition: transform 1s 1s ease;
  }

  &.active {
    .l-seca-f1__img1-wrap {
      clip-path: inset(0 20% 0 20%);
    }

    .l-seca-f1__img2-wrap {
      transform: translateX(0);
    }

    .l-seca-f1__text-wrap {
      transform: translateX(0);
    }
  }
}
</style>
