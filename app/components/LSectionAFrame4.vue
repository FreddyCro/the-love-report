<script lang="ts" setup>
import str from '../locales/section-a.json';

defineProps<{
  active: boolean;
}>();
</script>

<template>
  <div
    class="l-seca-f4"
    :class="{
      active: active,
    }"
  >
    <div class="w-full max-w-7xl aspect-1280/720 mx-auto">
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
        <LChatBubble :shadow="true" pointer="bottom-right">
          {{ str.frame4_1 }}
        </LChatBubble>
      </div>

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
        <LChatBubble :shadow="true" pointer="bottom-left">
          {{ str.frame4_2 }}
        </LChatBubble>
      </div>

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
        <LChatBubble :shadow="true" pointer="bottom-right">
          {{ str.frame4_3 }}
        </LChatBubble>
      </div>

      <!-- text 4 -->
      <div class="l-seca-f4__text4-wrap l-p">
        <LChatBubble :shadow="true" pointer="bottom-left">
          {{ str.frame4_4 }}
        </LChatBubble>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-seca-f4 {
  position: relative;
  width: 100%;

  &__img1-wrap {
    // 圖片1樣式
  }

  &__text1-wrap {
    // 文字1樣式
  }

  &__img2-wrap {
    // 圖片2樣式
  }

  &__text2-wrap {
    // 文字2樣式
  }

  &__img3-wrap {
    // 圖片3樣式
  }

  &__text3-wrap {
    // 文字3樣式
  }

  &__text4-wrap {
    // 文字4樣式
  }

  &.active {
    .l-seca-f4__img1-wrap {
      // 激活狀態的圖片1樣式
    }

    .l-seca-f4__text1-wrap {
      // 激活狀態的文字1樣式
    }

    .l-seca-f4__img2-wrap {
      // 激活狀態的圖片2樣式
    }

    .l-seca-f4__text2-wrap {
      // 激活狀態的文字2樣式
    }

    .l-seca-f4__img3-wrap {
      // 激活狀態的圖片3樣式
    }

    .l-seca-f4__text3-wrap {
      // 激活狀態的文字3樣式
    }

    .l-seca-f4__text4-wrap {
      // 激活狀態的文字4樣式
    }
  }
}
</style>
