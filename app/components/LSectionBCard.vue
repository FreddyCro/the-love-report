<script lang="ts" setup>
const props = defineProps<{
  title: string;
  description: string;
  note?: string;
  index?: number;
}>();

// Determine if this card is odd or even (1-based index)
const isOdd = computed(() => {
  if (props.index === undefined) return true;
  return (props.index + 1) % 2 === 1;
});

const borderColor = computed(() => {
  return isOdd.value ? 'var(--color-love-red-03)' : 'var(--color-love-blue-03)';
});
</script>

<template>
  <div
    class="state-card px-6 py-7 md:px-8 lg:py-8 lg:px-[39px] rounded-[20px] border bg-white text-text"
    :style="{ borderColor }"
  >
    <h3 class="l-h3 font-bold mb-2 sm:mb-1">{{ title }}</h3>
    <p class="l-p" v-html="description" />
    <div
      v-if="$slots.default"
      class="sm:flex items-center justify-center my-4 sm:my-2 lg:mt-[22px] lg:mb-5"
    >
      <slot />
    </div>
    <p v-if="note" class="l-quote" v-html="note" />
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

.state-card {
  position: relative;
  z-index: 10;
  width: 100%;

  @include rwd-min(sm) {
    width: 564px;
    height: 566px;
  }

  @include rwd-min(lg) {
    width: 736px;
    height: 508px;
  }
}
</style>
