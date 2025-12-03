<script lang="ts" setup>
import LSectionBCardLove from './LSectionBCardLove.vue';

interface Props {
  activeLoveNumber?: number; // Number of active love icons (out of 50)
  percentage?: number; // Percentage to display
  activeColor?: string; // Color for active love icons
  inactiveColor?: string; // Color for inactive love icons
}

const props = withDefaults(defineProps<Props>(), {
  activeLoveNumber: 35,
  percentage: 70,
  activeColor: '#00A0E9',
  inactiveColor: '#E0E0E0',
});

// Calculate which love icons should be active (total 50 icons: 5 rows × 10 columns)
const totalLoves = 50;
const loves = Array.from({ length: totalLoves }, (_, index) => ({
  id: index,
  isActive: index < props.activeLoveNumber,
}));
</script>

<template>
  <div class="secb-love-chart">
    <!-- Love icons grid + percentage display -->
    <div class="secb-love-chart__chart">
      <!-- Love icons grid (5 rows × 10 columns) -->
      <div class="secb-love-chart__loves">
        <LSectionBCardLove
          v-for="love in loves"
          :key="love.id"
          :color="love.isActive ? activeColor : inactiveColor"
          class="secb-love-chart__love-icon"
        />
      </div>

      <!-- Percentage display -->
      <div class="secb-love-chart__percentage">
        {{ percentage }}<span class="secb-love-chart__percentage-sign">%</span>
      </div>
    </div>

    <!-- Legend -->
    <div class="secb-love-chart__legend">
      <LSectionBCardLove
        :color="activeColor"
        class="secb-love-chart__legend-icon"
      />
      <span>=2%</span>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

.secb-love-chart {
  width: 100%;

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

  &__chart {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  &__loves {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 0.5rem;
    flex: 1;

    @include rwd-min(sm) {
      gap: 0.75rem;
    }
  }

  &__love-icon {
    width: 100%;
    height: auto;
  }

  &__percentage {
    font-size: 4rem;
    font-weight: bold;
    line-height: 1;
    white-space: nowrap;

    @include rwd-min(sm) {
      font-size: 5rem;
    }

    @include rwd-min(lg) {
      font-size: 6rem;
    }
  }

  &__percentage-sign {
    font-size: 0.6em;
  }

  &__legend {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
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
