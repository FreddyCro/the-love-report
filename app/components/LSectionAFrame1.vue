<script lang="ts" setup>
import LChatBubble from './LChatBubble.vue';
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
    <div class="l-seca-f1__content">
      <!-- img back -->
      <div class="l-seca-f1__img1-wrap">
        <LPic
          src="/img/intimate_relationships_p01_frame01_00_pcpad"
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
  position: relative;

  &.active {
    .l-seca-f1__img1-wrap {
      animation: crop 1s ease forwards;
    }
  }

  &__content {
    width: 100%;
    aspect-ratio: 1280 / 720;
    margin: 0 auto;
  }

  &__img2-wrap {
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
  }

  &__text-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    color: #fff;
    font-size: 1.6rem;
  }
}

@keyframes crop {
  from {
    clip-path: inset(0 0 0 0);
  }

  to {
    clip-path: inset(0 20% 0 20%);
  }
}
</style>
