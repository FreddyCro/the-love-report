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
    <div class="relative w-full max-w-7xl aspect-1280/720 mx-auto">
      <div class="l-seca-f4__box">
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
      </div>

      <div class="l-seca-f4__box">
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
      </div>

      <div class="l-seca-f4__box">
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
  </div>
</template>

<style lang="scss">
.l-seca-f4 {
  width: 100%;

  &__box {
    position: relative;
  }

  &__img1-wrap,
  &__img2-wrap,
  &__img3-wrap {
    max-width: 540px;
  }

  &__img1-wrap {
    opacity: 0;
  }

  &__text1-wrap {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  &__img2-wrap {
    opacity: 0;
  }

  &__text2-wrap {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  &__img3-wrap {
    opacity: 0;
  }

  &__text3-wrap {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  &__text4-wrap {
    opacity: 0;
  }

  &.active {
    .l-seca-f4__img1-wrap {
      opacity: 1;
      transition: opacity 1s ease;
    }

    .l-seca-f4__text1-wrap {
      opacity: 1;
      transition: opacity 1s ease;
    }

    .l-seca-f4__img2-wrap {
      opacity: 1;
      transition: opacity 1s 0.75s ease;
    }

    .l-seca-f4__text2-wrap {
      opacity: 1;
      transition: opacity 1s 0.75s ease;
    }

    .l-seca-f4__img3-wrap {
      opacity: 1;
      transition: opacity 1s 1.5s ease;
    }

    .l-seca-f4__text3-wrap {
      opacity: 1;
      transition: opacity 1s 1.5s ease;
    }

    .l-seca-f4__text4-wrap {
      opacity: 1;
      transition: opacity 1s 1.5s ease;
    }
  }
}
</style>
