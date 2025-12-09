<script lang="ts" setup>
import { ref, watch } from 'vue';
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

// Calculate which love icons should be active (total 50 icons: 5 rows × 10 columns)
const totalLoves = 50;
const activeCount = ref(0);

const loves = Array.from({ length: totalLoves }, (_, index) => ({
  id: index,
  isActive: ref(false),
}));

// Store timeout ID for cleanup
let animationTimeout: ReturnType<typeof setTimeout> | null = null;

// Watch for active prop change to trigger sequential animation
watch(
  () => props.active,
  (newActive, oldActive) => {
    // Clear any existing animation timeout
    if (animationTimeout) {
      clearTimeout(animationTimeout);
      animationTimeout = null;
    }

    if (newActive) {
      // Reset all loves to inactive first when becoming active
      loves.forEach((love) => {
        love.isActive.value = false;
      });
      activeCount.value = 0;

      // Sequentially activate loves
      const animateLoves = () => {
        // Ensure we don't attempt to access an out-of-range index
        const target = Math.min(props.activeLoveNumber, loves.length);
        if (activeCount.value < target) {
          const current = loves[activeCount.value];
          if (current) {
            current.isActive.value = true;
          }
          activeCount.value++;
          animationTimeout = setTimeout(animateLoves, 50); // 50ms delay between each activation
        }
      };
      animateLoves();
    }
    // When becoming inactive, keep the current state (don't reset)
  },
  { immediate: true }
);
</script>

<template>
  <div class="secb-love-chart">
    <!-- Love icons grid -->
    <div class="secb-love-chart__loves">
      <LSectionBCardLove
        v-for="love in loves"
        :key="love.id"
        class="secb-love-chart__love-icon"
        :active="love.isActive.value"
        :style="{
          '--secb-love-chart-color': love.isActive.value
            ? activeColor
            : inactiveColor,
        }"
      />
    </div>

    <!-- Percentage display -->
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
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

.secb-love-chart {
  width: 100%;

  @include rwd-min(sm) {
    display: flex;
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
    gap: 0.5rem;
    margin-bottom: 1.5rem;

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
    margin-bottom: 1.5rem;

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
