<script lang="ts" setup>
import str from '../locales/section-a.json';

defineProps<{
  active: boolean;
}>();
</script>

<template>
  <div
    class="l-seca-f3"
    :class="{
      active: active,
    }"
  >
    <div class="w-full max-w-7xl aspect-1280/720 mx-auto">
      <!-- img -->
      <div class="l-seca-f3__img-wrap">
        <LPic
          src="/img/intimate_relationships_p01_frame03_05"
          :srcset="['pad', 'mob']"
          ext="jpg"
          :use2x="false"
          :webp="true"
        />
      </div>

      <!-- text -->
      <div class="l-seca-f3__text-wrap l-p">
        <LChatBubble :shadow="true" pointer="bottom-right">
          {{ str.frame3_1 }}
        </LChatBubble>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-seca-f3 {
  position: relative;
  width: 100%;

  &__img-wrap {
    // 圖片樣式
  }

  &__text-wrap {
    // 文字樣式
  }

  &.active {
    .l-seca-f3__img-wrap {
      // 激活狀態的圖片樣式
    }

    .l-seca-f3__text-wrap {
      // 激活狀態的文字樣式
    }
  }
}
</style>
