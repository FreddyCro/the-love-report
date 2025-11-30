<script lang="ts" setup>
import str from '../locales/section-a.json';

defineProps<{
  active: boolean;
}>();
</script>

<template>
  <div
    class="l-seca-f2"
    :class="{
      active: active,
    }"
  >
    <div class="relative w-full max-w-7xl aspect-1280/720 mx-auto">
      <!-- img -->
      <div class="l-seca-f2__img-wrap">
        <LPic
          src="/img/intimate_relationships_p01_frame02_04"
          :srcset="['pad', 'mob']"
          ext="jpg"
          :use2x="false"
          :webp="true"
        />
      </div>

      <!-- text -->
      <div class="l-seca-f2__text-wrap l-p">
        <LChatBubble :shadow="true" pointer="bottom-left">
          {{ str.frame2_1 }}
        </LChatBubble>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-seca-f2 {
  width: 100%;

  &__img-wrap {
    opacity: 0;
  }

  &__text-wrap {
    position: absolute;
    top: 50%;
    right: 0;
    opacity: 0;
    transform: translate(100%, -50%);
  }

  &.active {
    .l-seca-f2__img-wrap {
      opacity: 1;
      transition: opacity 1s ease;
    }

    .l-seca-f2__text-wrap {
      opacity: 1;
      transform: translate(0, -50%);
      transition: transform 1s 1s ease;
    }
  }
}
</style>
