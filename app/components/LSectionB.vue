<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import LSectionBCard from './LSectionBCard.vue';
import LSectionBIntro from './LSectionBIntro.vue';
import LPic from './LPic.vue';
import str from '../locales/section-b.json';

type CartType = {
  title: string;
  description: string;
  note: string;

  // small marker to choose which chart/placeholder to render
  chart?: 'chartA' | 'chartB' | 'chartC' | 'chartD' | 'chartE' | 'chartF';
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
    chart: 'chartD',
  },
  {
    title: str.card5Title,
    description: str.card5Description,
    note: str.card5Note,
    chart: 'chartE',
  },
  {
    title: str.card6Title,
    description: str.card6Description,
    note: str.card6Note,
    chart: 'chartF',
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
  <section class="sec-b l-article">
    <div class="l-container">
      <!-- intro -->
      <div class="intro">
        <!-- title -->
        <div class="intro-title flex justify-center mb-[38px] lg:mb-10">
          <LSectionBIntro />

          <h2 class="visually-hidden">
            {{ str.sectionTitle1 }} {{ str.sectionTitle2 }}
            {{ str.sectionTitle3 }}
          </h2>

          <!-- 先用圖片試試 -->
          <!-- <h2 class="intro-title__h2 flex items-center gap-2">
            <span>{{ str.sectionTitle1 }}</span>
            <LRedLove />
            <span>{{ str.sectionTitle2 }}</span>
            <span>{{ str.sectionTitle3 }}</span>
          </h2>
          <div>
            <p>{{ str.sectionTitleSub }}</p>
          </div> -->
        </div>
        <p class="l-p">{{ str.introText1 }}</p>
        <p class="l-p">{{ str.introText2 }}</p>
      </div>
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
          <LSectionBCard
            :class="['state-card', JS_CLASSES.CARD]"
            :title="item.title"
            :description="item.description"
            :note="item.note"
          >
            <!-- Render different placeholder content based on item.chart (A..F) -->
            <div v-if="item.chart === 'chartA'" class="contents">
              <div class="chart-a-placeholder" />
            </div>

            <div v-else-if="item.chart === 'chartB'" class="contents">
              <div class="chart-a-placeholder" />
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
                :srcset="['pad', 'mob']"
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

// LSectionBCard.vue
.state-card {
  will-change: transform, opacity;
}

.chart-a-placeholder {
  width: 100%;
  height: 100%;
  aspect-ratio: 308 / 269;
  background-color: gray;

  @include rwd-min(sm) {
    aspect-ratio: 492 / 197;
  }

  @include rwd-min(lg) {
    aspect-ratio: 640 / 206;
  }
}
</style>
