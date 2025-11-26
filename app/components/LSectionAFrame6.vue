<script lang="ts" setup>
import str from '../locales/section-a.json';

defineProps<{
  active: boolean;
}>();
</script>

<template>
  <div
    class="l-seca-f6"
    :class="{
      active: active,
    }"
  >
    <div class="w-full max-w-7xl aspect-1280/720 mx-auto">
      <!-- img 1 -->
      <div class="l-seca-f6__img-wrap">
        <LPic
          src="/img/intimate_relationships_p01_frame06_10"
          :srcset="['pad', 'mob']"
          ext="jpg"
          :use2x="false"
          :webp="true"
        />
      </div>

      <!-- text 1 -->
      <div class="l-seca-f6__text-wrap">
        <LChatBubble :shadow="true" pointer="bottom-left">
          {{ str.frame6_1 }}
        </LChatBubble>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-seca-f6 {
  position: relative;
  width: 100%;

  &__img-wrap {
    // 圖片樣式
  }

  &__text-wrap {
    // 文字樣式
  }

  &.active {
    .l-seca-f6__img-wrap {
      // 激活狀態的圖片樣式
    }

    .l-seca-f6__text-wrap {
      // 激活狀態的文字樣式
    }
  }
}
</style>
