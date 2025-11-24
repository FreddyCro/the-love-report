<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
  note?: string;
}>();
</script>

<template>
  <div class="state-card">
    <h3 class="state-card__title">{{ title }}</h3>
    <p class="state-card__description">{{ description }}</p>
    <div v-if="$slots.default" class="state-card__chart">
      <slot />
    </div>
    <p v-if="note" class="state-card__note">{{ note }}</p>
  </div>
</template>

<style lang="scss">
.state-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  &__chart {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
    color: #333;
  }

  &__description {
    font-size: 1rem;
    line-height: 1.6;
    color: #666;
    margin-bottom: 0.5rem;
  }

  &__note {
    font-size: 0.875rem;
    line-height: 1.4;
    color: #999;
    font-style: italic;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid #eee;
  }
}
</style>
