<script lang="ts" setup>
interface Props {
  /**
   * 陰影：
   * - false: 無
   * - true: 使用元件預設陰影
   * - string: 視為 CSS box-shadow 值
   */
  shadow?: boolean | string;
  /** 指向的泡泡角落：四個選項 */
  pointer?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const props = withDefaults(defineProps<Props>(), {
  shadow: false,
  pointer: 'bottom-left',
});
</script>

<template>
  <div
    class="l-chat-bubble"
    :class="[`pointer--${props.pointer}`, { 'has-shadow': !!props.shadow }]"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.l-chat-bubble {
  --lcb-text-color: var(--color-text);
  --lcb-bg-color: #fff;
  --lcb-radius: 15px;

  display: inline-block;
  padding: 8px 20px;
  border-radius: var(--lcb-radius);
  color: var(--lcb-text-color);
  background-color: var(--lcb-bg-color);

  &.has-shadow {
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &.pointer--top-left {
    border-top-left-radius: 0;
  }

  &.pointer--top-right {
    border-top-right-radius: 0;
  }

  &.pointer--bottom-left {
    border-bottom-left-radius: 0;
  }

  &.pointer--bottom-right {
    border-bottom-right-radius: 0;
  }
}
</style>
