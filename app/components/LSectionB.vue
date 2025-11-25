<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import LStateCard from './LStateCard.vue';
import str from '../locales/section-b.json';

type CartType = {
  title: string;
  description: string;
  note: string;
  // small marker to choose which chart/placeholder to render
  chart?: 'chartA' | 'chartB' | 'chartC';
};

const data: CartType[] = [
  {
    title: str.card1Title,
    description: str.card1Description,
    note: str.card1Note,
    chart: 'chartA',
  },
  {
    title: str.card2Title,
    description: str.card2Description,
    note: str.card2Note,
    chart: 'chartB',
  },
  {
    title: str.card3Title,
    description: str.card3Description,
    note: str.card3Note,
    chart: 'chartC',
  },
  {
    title: str.card4Title,
    description: str.card4Description,
    note: str.card4Note,
    chart: 'chartA',
  },
  {
    title: str.card5Title,
    description: str.card5Description,
    note: str.card5Note,
    chart: 'chartB',
  },
  {
    title: str.card6Title,
    description: str.card6Description,
    note: str.card6Note,
    chart: 'chartC',
  },
];

const isEntered = ref(false);
const isAnimationReady = ref(false);

// JS-prefixed selector class names (used by script to query DOM)
// Simplified keys + values for concise usage
const JS_CLASSES = {
  SECTION: 'js-sec-b', // section wrapper
  GROUP: 'js-scg', // state-card-group
  CARD: 'js-sc', // state-card
  WRAPPER: 'js-scw', // state-card-wrapper
};

const scrollTriggerInstances: any[] = [];

defineExpose({
  isEntered,
});

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
  handleIsEntered();
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
  const section =
    document.querySelector(`.${JS_CLASSES.SECTION}`) ||
    document.querySelector('.sec-b');
  if (!section) return;

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
      end: '+=300%',

      // Pin (freeze) the section
      pin: true,
      scrub: 1,

      // Smooth pin start
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: () => {
        // Reset cards position when scrolltrigger refreshes
        gsap.set(cards, {
          y: '100vh',
        });
      },
    },
  });

  // Set initial state at the beginning of timeline (position 0)
  tl.set(
    cards,
    {
      y: '100vh',
    },
    0
  );

  // Add each card to timeline with stacking effect
  cards.forEach((card, index) => {
    const yOffset = index * 0; // Each card slightly offset from previous
    const rotation = (index - 2.5) * 2; // Slight rotation for visual interest

    tl.to(
      card,
      {
        y: yOffset,
        opacity: 1,
        rotation: rotation,
        duration: 1,
        ease: 'power2.out',
      },
      index * 0.7 // Stagger each card animation
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

function handleIsEntered() {
  isEntered.value = true;
}
</script>

<template>
  <section class="sec-b">
    <div class="l-container">
      <!-- intro -->
      <div class="intro">
        <!-- title -->
        <h2 v-html="str.sectionTitle" />
        <p>{{ str.sectionTitleSub }}</p>
        <p>{{ str.introText1 }}</p>
        <p>{{ str.introText2 }}</p>
      </div>

      <!-- cards -->
      <div :class="JS_CLASSES.SECTION">
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
            <LStateCard
              :class="['state-card', JS_CLASSES.CARD]"
              :title="item.title"
              :description="item.description"
              :note="item.note"
            >
              <!-- Scheme A: simple conditional content per item.chart -->
              <div v-if="item.chart === 'chartA'" class="chart-placeholder">
                <span>Chart A — 圖表 {{ index + 1 }}</span>
              </div>

              <div
                v-else-if="item.chart === 'chartB'"
                class="chart-placeholder"
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                  "
                >
                  <strong>Chart B</strong>
                  <small>輔助描述 {{ index + 1 }}</small>
                </div>
              </div>

              <div v-else class="chart-placeholder">
                <span>Default chart {{ index + 1 }}</span>
              </div>
            </LStateCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.sec-b {
  min-height: 100vh;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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

.state-card {
  will-change: transform, opacity;
}

.chart-placeholder {
  width: 100%;
  height: 300px;
  aspect-ratio: 265 / 300;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  opacity: 0.8;
}
</style>
