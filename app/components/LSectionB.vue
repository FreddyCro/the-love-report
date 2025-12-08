<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import LSectionBCard from './LSectionBCard.vue';
import LSectionBIntro from './LSectionBIntro.vue';
import LSectionBCardLoveChart from './LSectionBCardLoveChart.vue';
import LPic from './LPic.vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useActiveOnViewport } from '../composables/useActiveOnViewport';
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
const scrollTriggerInstances: any[] = [];

// Track active chart content elements in viewport
const { setup: setupActiveTracking, activeIndex } = useActiveOnViewport(
  sectionRef,
  '.js-chart-content',
  { threshold: 0.5 }
);

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

  // Initialize animation and wait for it to be ready
  await handleAnimation(gsap, ScrollTrigger, lenis);

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

async function handleAnimation(
  gsap: any,
  ScrollTrigger: any,
  _lenis: any
): Promise<void> {
  const section = document.querySelector(`.${JS_CLASSES.SECTION}`);
  // const intro = document.querySelector(`.${JS_CLASSES.INTRO}`);

  if (!section) {
    console.warn('Section not found');
    return;
  }

  // Prefer JS-prefixed selector for script queries; fall back to regular class if missing
  let cards = section.querySelectorAll(`.${JS_CLASSES.CARD}`);
  if (!cards || cards.length === 0) {
    cards = section.querySelectorAll('.state-card');
  }
  if (cards.length === 0) return;

  // Create timeline for the stacking animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',

      // Extend the scroll distance for smoother animation
      end: '+=400%',

      // Pin (freeze) the section
      pin: true,
      scrub: 0.5, // Reduced from 1 to 0.5 for faster response during quick scrolling

      // Smooth pin start
      anticipatePin: 1,
      invalidateOnRefresh: true,

      // Control refresh behavior to prevent scroll jumps on resize
      refreshPriority: 0, // Lower priority for refresh calculations
      fastScrollEnd: true, // Only update after fast scroll ends
      onRefresh: () => {
        // Reset cards position when scrolltrigger refreshes
        // gsap.set(cards, { y: '100vh', opacity: 0 });
        // gsap.set(cards, { y: '100vh', opacity: 1 });
      },
    },
  });

  // Intro is already visible (no animation needed for intro)
  // It will be pinned naturally when section is pinned

  // Set initial state: cards are below viewport
  // tl.set(cards, { y: '100vh', opacity: 0 }, 0);
  tl.set(cards, { y: '100vh', opacity: 1, rotation: 0 }, 0);

  // Cards stack on top of intro after a delay (to give time for sticky effect)
  cards.forEach((card, index) => {
    const yOffset = index * 0; // Each card slightly offset from previous
    const targetRotation = data[index]?.rotation || 0; // Use rotation from data

    tl.to(
      card,
      {
        y: yOffset,
        opacity: 1,
        rotation: targetRotation,
        duration: 1,
        ease: 'power2.out',
      },
      0.5 + index * CARD_STAGGER_DELAY // Use constant for card spacing
    );
  });

  // Store the ScrollTrigger instance for cleanup
  if (tl.scrollTrigger) {
    scrollTriggerInstances.push(tl.scrollTrigger);
  }

  // Refresh ScrollTrigger after setup to ensure correct calculations
  // Use requestAnimationFrame to wait for next paint cycle (more reliable than setTimeout)
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      // Wait one more frame to ensure refresh is complete
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}

function handleIsEntered(shouldEnter: boolean) {
  // Set isEntered based on scroll direction and intersection
  isEntered.value = shouldEnter;
}
</script>

<template>
  <section
    id="insight"
    ref="sectionRef"
    class="sec-b l-article bg-black-6 sec-b-transition"
    :class="{
      'is-entered': isEntered,
      'bg-love-dark': isEntered,
      'text-white': isEntered,
    }"
  >
    <!-- Pin container: intro + cards -->
    <div :class="JS_CLASSES.SECTION" class="sec-b__pin-container">
      <!-- intro -->
      <div :class="JS_CLASSES.INTRO_CONTAINER" class="sec-b__intro-container">
        <div :class="JS_CLASSES.INTRO" class="intro l-container">
          <!-- title -->
          <div class="intro-title flex justify-center mb-[38px] lg:mb-10">
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

      <!-- cards -->
      <div class="sec-b__cards-container">
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
    </div>
  </section>
</template>

<style lang="scss">
@use '@/assets/styles/mixins' as *;

.sec-b {
  min-height: 100vh;
  padding: 4rem 0;
  padding-bottom: calc(4rem + 70px);
  overflow: hidden;

  @include rwd-min(sm) {
    padding-bottom: calc(4rem + 100px);
  }

  @include rwd-min(lg) {
    padding-bottom: calc(4rem + 120px);
  }

  &__pin-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
  }

  &__intro-container {
    position: relative; // Changed from absolute to allow normal document flow
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1; // Below cards
    min-height: 100vh; // Ensure it takes full height
  }

  &__cards-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    z-index: 2; // Above intro
    pointer-events: none; // Allow interaction with intro before cards appear

    // Re-enable pointer events for cards themselves
    .state-card {
      pointer-events: auto;
    }
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
