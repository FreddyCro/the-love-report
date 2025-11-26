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
    // 圖片樣式
  }

  &__text1-wrap {
    // 文字1樣式
  }

  &__text2-wrap {
    // 文字2樣式
  }

  &.active {
    .l-seca-f5__img-wrap {
      // 激活狀態的圖片樣式
    }

    .l-seca-f5__text1-wrap {
      // 激活狀態的文字1樣式
    }

    .l-seca-f5__text2-wrap {
      // 激活狀態的文字2樣式
    }
  }
}
</style>
