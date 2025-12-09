<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import LSectionBCard from './LSectionBCard.vue';
import LSectionBIntro from './LSectionBIntro.vue';
import LSectionBCardLoveChart from './LSectionBCardLoveChart.vue';
import LPic from './LPic.vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useActiveOnViewport } from '../composables/useActiveOnViewport';
import { useIntroPin } from '../composables/useIntroPin';
import { useCardsAnimation } from '../composables/useCardsAnimation';
import str from '../locales/section-b.json';

type CartType = {
  title: string;
  description: string;
  note: string;
  rotation: number; // Target rotation angle in degrees

  // small marker to choose which chart/placeholder to render
  chart?: 'chartA' | 'chartB' | 'chartC' | 'chartD' | 'chartE' | 'chartF';
};

const data: CartType[] = [
  {
    title: str.card1Title,
    description: str.card1Description,
    note: str.card1Note,
    rotation: 0,
    chart: 'chartA',
  },
  {
    title: str.card2Title,
    description: str.card2Description,
    note: str.card2Note,
    rotation: -5,
    chart: 'chartB',
  },
  {
    title: str.card3Title,
    description: str.card3Description,
    note: str.card3Note,
    rotation: 5,
    chart: 'chartC',
  },
  {
    title: str.card4Title,
    description: str.card4Description,
    note: str.card4Note,
    rotation: -5,
    chart: 'chartD',
  },
  {
    title: str.card5Title,
    description: str.card5Description,
    note: str.card5Note,
    rotation: 5,
    chart: 'chartE',
  },
  {
    title: str.card6Title,
    description: str.card6Description,
    note: str.card6Note,
    rotation: 0,
    chart: 'chartF',
  },
];

// Animation constants
const CARD_STAGGER_DELAY = 1.0; // Delay between each card animation (in seconds)

// JS-prefixed selector class names (used by script to query DOM)
// Simplified keys + values for concise usage
const JS_CLASSES = {
  SECTION: 'js-sec-b', // section wrapper (pin target)
  INTRO_CONTAINER: 'js-intro-container', // intro container
  INTRO: 'js-intro', // intro content
  GROUP: 'js-scg', // state-card-group
  CARD: 'js-sc', // state-card
  WRAPPER: 'js-scw', // state-card-wrapper
};

const isEntered = ref(false);
const isAnimationReady = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const indicator1Ref = ref<HTMLElement | null>(null);
const indicator2Ref = ref<HTMLElement | null>(null);
const indicator3Ref = ref<HTMLElement | null>(null);
const scrollTriggerInstances: any[] = [];

// Track active chart content elements in viewport
const { setup: setupActiveTracking, activeIndex } = useActiveOnViewport(
  sectionRef,
  '.js-chart-content',
  { threshold: 0.5 }
);

// Pin intro when it reaches viewport center
const {
  // isPinned,
  introActive,
  showIndicatorsFlag,
  introHeight,
} = useIntroPin({
  sectionRef,
  introContainerClass: JS_CLASSES.INTRO_CONTAINER,
  introClassName: JS_CLASSES.INTRO,
  indicator1Ref,
  indicator2Ref,
  indicator3Ref,
  showIndicators: false,
});

// Setup intersection observer for viewport tracking
onMounted(() => {
  // Wait for next tick to ensure DOM is ready
  nextTick(() => {
    if (!sectionRef.value) {
      return;
    }

    useIntersectionObserver(
      sectionRef,
      ([entry]: IntersectionObserverEntry[]) => {
        if (!entry) return;

        // Simple behavior: true when entering viewport, false when leaving
        handleIsEntered(entry.isIntersecting);
      },
      {
        threshold: [0, 0.3, 1],
        root: null,
        rootMargin: '0px',
      }
    );
  });
});

// Setup GSAP animation
onMounted(async () => {
  // Use the composable to get GSAP, ScrollTrigger, and Lenis
  const { gsap, ScrollTrigger, lenis } = await useScrollAnimation();

  // Guard: ensure GSAP and ScrollTrigger are loaded
  if (!gsap || !ScrollTrigger) {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  // Wait for DOM and image to layout
  await nextTick();

  // Initialize animation using composable
  await useCardsAnimation(gsap, ScrollTrigger, {
    cardsContainerClass: '.sec-b__cards-container',
    cardClass: `.${JS_CLASSES.CARD}`,
    cardsFallbackClass: '.state-card',
    cardData: data,
    cardStaggerDelay: CARD_STAGGER_DELAY,
    scrollPerCard: 135,
    scrollTriggerInstances,
  });

  // Mark as ready - triggers fade-in via CSS transition
  isAnimationReady.value = true;

  // Setup active class tracking for chart content elements
  setupActiveTracking();
});

// Register lifecycle hook BEFORE any async operations
onBeforeUnmount(() => {
  // Clean up all ScrollTriggers created by this component
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  scrollTriggerInstances.length = 0;
});

function handleIsEntered(shouldEnter: boolean) {
  // Set isEntered based on scroll direction and intersection
  isEntered.value = shouldEnter;
}
</script>

<template>
  <section
    id="insight"
    ref="sectionRef"
    class="sec-b l-article relative bg-black-6 sec-b-transition"
    :style="{ '--intro-height': `${introHeight}px` }"
    :class="{
      'is-entered': isEntered,
      'bg-love-dark': isEntered,
      'text-white': isEntered,
    }"
  >
    <!-- Indicators for debugging (styled in CSS) -->
    <div
      ref="indicator1Ref"
      class="indicator-1"
      :style="{ opacity: showIndicatorsFlag ? 1 : 0 }"
    />
    <div
      ref="indicator2Ref"
      class="indicator-2"
      :style="{ opacity: showIndicatorsFlag ? 1 : 0 }"
    />
    <div
      ref="indicator3Ref"
      class="indicator-3"
      :style="{ opacity: showIndicatorsFlag ? 1 : 0 }"
    />

    <!-- intro (pinned by custom composable) -->
    <!-- Fixed placeholder with 100vh height -->
    <div class="sec-b__intro-placeholder" />

    <!-- Intro container with absolute positioning -->
    <div
      class="sec-b__intro-container"
      :class="{
        [JS_CLASSES.INTRO_CONTAINER]: true,
        'sec-b__intro-container--unpinned-top': introActive === 'unpinned-top',
        'sec-b__intro-container--unpinned-bottom':
          introActive === 'unpinned-bottom',
      }"
    >
      <div
        class="l-container sec-b__intro"
        :class="{
          [JS_CLASSES.INTRO]: true,
          'sec-b__intro--pinned': introActive === 'pinned',
        }"
      >
        <div class="intro-title flex justify-center mb-[38px] lg:mb-10">
          <!-- title -->
          <LSectionBIntro :is-entered="isEntered" />

          <h2 class="visually-hidden">
            {{ str.sectionTitle1 }} {{ str.sectionTitle2 }}
            {{ str.sectionTitle3 }}
          </h2>
        </div>
        <p class="l-p sec-b-transition">{{ str.introText1 }}</p>
        <p class="l-p sec-b-transition">{{ str.introText2 }}</p>
      </div>
    </div>

    <!-- cards (controlled by GSAP pin) -->
    <div :class="JS_CLASSES.SECTION" class="sec-b__cards-container">
      <div
        :class="[
          'state-card-group',
          JS_CLASSES.GROUP,
          { 'is-ready': isAnimationReady },
        ]"
      >
        <div
          v-for="(item, index) in data"
          :key="index"
          :class="['state-card-wrapper', JS_CLASSES.WRAPPER]"
        >
          <LSectionBCard
            :class="['state-card', JS_CLASSES.CARD]"
            :title="item.title"
            :description="item.description"
            :note="item.note"
          >
            <!-- Render different placeholder content based on item.chart (A..F) -->
            <div
              v-if="item.chart === 'chartA'"
              class="js-chart-content chart-a-placeholder"
            >
              <LSectionBCardLoveChart
                :active-love-number="35"
                :percentage="70"
                active-color="var(--color-love-blue-03)"
                inactive-color="var(--color-love-blue-01)"
                :active="activeIndex === 0"
              />
            </div>

            <div
              v-else-if="item.chart === 'chartB'"
              class="js-chart-content chart-a-placeholder"
            >
              <LSectionBCardLoveChart
                :active-love-number="20"
                :percentage="40"
                active-color="var(--color-love-red-03)"
                inactive-color="var(--color-love-red-01)"
                :active="activeIndex === 1"
              />
            </div>

            <div v-else-if="item.chart === 'chartC'">
              <LPic
                src="/img/intimate_relationships_p0202_card03_info"
                ext="svg"
                :use2x="false"
                :webp="false"
              />
            </div>

            <div v-else-if="item.chart === 'chartD'">
              <LPic
                src="/img/intimate_relationships_p0202_card04_info01"
                ext="svg"
                :use2x="false"
                :webp="false"
              />
            </div>

            <div v-else-if="item.chart === 'chartE'">
              <LPic
                src="/img/intimate_relationships_p0202_card05_info"
                ext="svg"
                :use2x="false"
                :webp="false"
              />
            </div>

            <div v-else-if="item.chart === 'chartF'">
              <LPic
                src="/img/intimate_relationships_p0202_card06_info"
                ext="svg"
                :use2x="false"
                :webp="false"
              />
            </div>
          </LSectionBCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

.sec-b {
  --section-padding-top: 94px;
  --section-padding-bottom: 60px;

  // 4rem 是 sectionC offset
  padding-bottom: calc(4rem + var(--section-padding-bottom));
  overflow: hidden;

  @include rwd-min(sm) {
    --section-padding-top: 100px;
    --section-padding-bottom: 80px;
  }

  @include rwd-min(lg) {
    --section-padding-top: 144px;
    --section-padding-bottom: 100px;
  }

  // Indicators for debugging
  // indicator-1: viewport center (fixed, yellow)
  // indicator-2: intro top boundary (absolute, green)
  // indicator-3: intro bottom boundary (absolute, blue)
  .indicator-1 {
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: yellow;
    pointer-events: none;
  }

  .indicator-2,
  .indicator-3 {
    position: absolute;
    z-index: 9999;
    left: 0;
    width: 100%;
    height: 2px;
    pointer-events: none;
  }

  .indicator-2 {
    top: calc(var(--intro-height) * 0.5 + var(--section-padding-top));
    background-color: green;
  }

  .indicator-3 {
    bottom: calc(var(--intro-height) * 0.5 + var(--section-padding-bottom));
    background-color: blue;
  }

  &__intro-placeholder {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  &__intro-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    padding: var(--section-padding-top) 0
      calc(var(--section-padding-bottom) + 4rem) 0;
    z-index: 1;

    &--unpinned-top {
      align-items: flex-start;
    }

    &--unpinned-bottom {
      align-items: flex-end;
    }
  }

  &__intro {
    position: relative;

    // Pinned state: fixed at viewport center
    &--pinned {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
  }

  &__cards-container {
    position: relative; // Changed from absolute to allow GSAP pin to work
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    z-index: 2; // Above intro
  }
}

.sec-b-transition {
  // Only transition visual properties, not layout/transform properties
  // This prevents conflicts with GSAP animations during fast scrolling
  transition: background-color 1s, color 1s;

  /* LSectionBIntro.vue */
  path,
  rect {
    transition: fill 1s, stroke 1s;
  }
}

.state-card-group {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;

  &.is-ready {
    opacity: 1;
  }
}

.state-card-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

// LSectionBCard.vue
.state-card {
  will-change: transform, opacity;
}

.chart-a-placeholder {
  width: 100%;
  height: 100%;
  aspect-ratio: 308 / 269;

  @include rwd-min(sm) {
    aspect-ratio: 492 / 197;
  }

  @include rwd-min(lg) {
    aspect-ratio: 640 / 206;
  }
}
</style>
