<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="state-card">
    <h3 class="state-card__title">{{ title }}</h3>
    <p class="state-card__description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.state-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

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
  }
}
</style>
