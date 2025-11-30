<script lang="ts" setup>
import str from '../locales/section-a.json';

defineProps<{
  active: boolean;
}>();
</script>

<template>
  <div
    class="l-seca-f5"
    :class="{
      active: active,
    }"
  >
    <div class="w-full max-w-7xl aspect-1280/720 mx-auto">
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
  position: relative;
  width: 100%;

  &__img-wrap {
    opacity: 0;
  }

  &__text1-wrap {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
  }

  &__text2-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
  }

  &.active {
    .l-seca-f5__img-wrap {
      opacity: 1;
      transition: opacity 1s ease;
    }

    .l-seca-f5__text1-wrap {
      opacity: 1;
      transition: opacity 1s ease;
    }

    .l-seca-f5__text2-wrap {
      opacity: 1;
      transition: opacity 1s ease;
    }
  }
}
</style>
