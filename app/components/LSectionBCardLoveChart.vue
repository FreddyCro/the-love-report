<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import LSectionBCardLove from './LSectionBCardLove.vue';

interface Props {
  activeLoveNumber: number; // Number of active love icons (out of 50)
  percentage: number; // Percentage to display
  activeColor: string; // Color for active love icons
  inactiveColor: string; // Color for inactive love icons
  active?: boolean; // Control animation activation
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
});

// Track if animation has been activated at least once
const hasBeenActivated = ref(false);

// Watch for active prop to become true, then lock it
watch(
  () => props.active,
  (newActive) => {
    if (newActive) {
      hasBeenActivated.value = true;
    }
  },
  { immediate: true }
);

// Calculate which love icons should be active (total 50 icons: 5 rows × 10 columns)
const totalLoves = 50;

// Create loves array with delay calculation
const loves = computed(() =>
  Array.from({ length: totalLoves }, (_, index) => ({
    id: index,
    isActive: index < props.activeLoveNumber,
    delay: index * 0.05, // 50ms = 0.05s delay between each icon
  }))
);
</script>

<template>
  <div class="secb-love-chart">
    <!-- Love icons grid -->
    <div class="secb-love-chart__loves" :class="{ 'is-active': hasBeenActivated }">
      <LSectionBCardLove
        v-for="love in loves"
        :key="love.id"
        class="secb-love-chart__love-icon"
        :active="hasBeenActivated"
        :style="{
          '--secb-love-chart-color':
            hasBeenActivated && love.isActive ? activeColor : inactiveColor,
          '--delay': `${love.delay}s`,
        }"
      />
    </div>

    <!-- Percentage display -->
    <div
      class="relative sm:static flex sm:h-auto sm:flex-col justify-center items-end"
    >
      <div class="secb-love-chart__percentage">
        {{ percentage }}<span class="secb-love-chart__percentage-sign">%</span>
      </div>

      <!-- Legend -->
      <div class="secb-love-chart__legend">
        <LSectionBCardLove
          :active="true"
          :style="{ '--secb-love-chart-color': activeColor }"
          class="secb-love-chart__legend-icon"
        />
        <span>=2%</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

.secb-love-chart {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;

  @include rwd-min(sm) {
    flex-direction: row;
    justify-content: space-between;
  }

  &__title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.4;

    @include rwd-min(sm) {
      font-size: 2rem;
    }
  }

  &__description {
    margin-bottom: 2rem;
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgba(0, 0, 0, 0.7);

    @include rwd-min(sm) {
      font-size: 1rem;
    }
  }

  &__loves {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 18px 12px;
    margin-bottom: 1.5rem;

    svg {
      width: 20px;
    }

    @include rwd-min(sm) {
      gap: 28px 12px;
      margin-bottom: 0;
    }

    @include rwd-min(lg) {
      /* gap: 24px 16px; */
      gap: 20px 16px;

      svg {
        width: 25px;
      }
    }
  }

  &__love-icon {
    width: 100%;
    height: auto;
  }

  &__percentage {
    font-size: 90px;
    line-height: 100px;
    white-space: nowrap;

    @include rwd-min(sm) {
      font-size: 100px;
      line-height: 110px;
    }

    @include rwd-min(lg) {
      font-size: 120px;
      line-height: 130px;
    }
  }

  &__percentage-sign {
    font-size: 0.6em;
  }

  &__legend {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
    font-size: 15px;
    line-height: 22px;

    svg {
      width: 16px;
    }

    @include rwd-min(sm) {
      margin-bottom: 0;
    }
  }

  &__legend-icon {
    width: 1.25rem;
    height: auto;
  }

  &__source {
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.5);

    @include rwd-min(sm) {
      font-size: 0.875rem;
    }
  }
}
</style>
