<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  /** 背景色，可傳任何 CSS color 值 */
  bgColor?: string;
  /**
   * 陰影：
   * - false: 無
   * - true: 使用元件預設陰影
   * - string: 視為 CSS box-shadow 值
   */
  shadow?: boolean | string;
  /** 指向的泡泡角落：四個選項 */
  pointer?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** 可選的 aria-label */
  ariaLabel?: string;
  /** 圓角（可覆寫） */
  radius?: string;
}

const props = withDefaults(defineProps<Props>(), {
  bgColor: '#ffffff',
  shadow: false,
  pointer: 'bottom-left',
  ariaLabel: '',
  radius: '9999px',
});

const boxStyle = computed(() => {
  const s: Record<string, string> = {
    backgroundColor: props.bgColor || 'transparent',
    borderRadius: props.radius as string,
  };

  if (props.shadow) {
    s.boxShadow =
      typeof props.shadow === 'string'
        ? props.shadow
        : '0 10px 20px rgba(0,0,0,0.06)';
  }

  return s;
});
</script>

<template>
  <div
    class="l-chat-bubble"
    :class="[`pointer--${props.pointer}`, { 'has-shadow': !!props.shadow }]"
    :style="boxStyle"
    :aria-label="props.ariaLabel || undefined"
    role="note"
  >
    <slot />
  </div>
</template>

<style scoped>
/*
  Minimal CSS hooks only (per request "不考慮 css").
  - Use the classes `pointer--top-left|top-right|bottom-left|bottom-right` to style the small arrow.
  - The inline `box-shadow` and `background-color` are applied from JS via `:style`.
  - Add your own detailed styling in the project styles if needed.
*/

.l-chat-bubble {
  display: inline-block;
  padding: 0.8rem 1.4rem;
  line-height: 1;
  /* background and box-shadow are set via inline style from props */
}

/* Pointer hooks (visuals left to consumer) */
.pointer--top-left,
.pointer--top-right,
.pointer--bottom-left,
.pointer--bottom-right {
  /* minimal layout hook so ruleset is not empty; keeps selector available for consumers */
  position: relative;
}

.has-shadow {
  /* no visual change by default; present so linter rules pass and consumers can target it */
  will-change: box-shadow;
}
.pointer--top-left,
.pointer--top-right,
.pointer--bottom-left,
.pointer--bottom-right {
  /* minimal layout hook so ruleset is not empty; keeps selector available for consumers */
  position: relative;
}

.has-shadow {
  /* no visual change by default; present so linter rules pass and consumers can target it */
  will-change: box-shadow;
}
</style>
