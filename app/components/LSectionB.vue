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
import { useSectionBState } from '../composables/useSectionBState';
import { useBreakpoint } from '../composables/useBreakpoint';
import str from '../locales/section-b.json';

// Get current breakpoint
const { currentBreakpoint } = useBreakpoint();

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

// Use shared state composable for Section B's isEntered status
const { sectionBEntered } = useSectionBState();
const isEntered = sectionBEntered;
const isAnimationReady = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const indicator1Ref = ref<HTMLElement | null>(null);
const indicator2Ref = ref<HTMLElement | null>(null);
const indicator3Ref = ref<HTMLElement | null>(null);
const scrollTriggerInstances: any[] = [];
let cleanupCardsAnimation: (() => void) | null = null;

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
  cleanupCardsAnimation =
    (await useCardsAnimation(gsap, ScrollTrigger, {
      cardsContainerClass: '.sec-b__cards-container',
      cardClass: `.${JS_CLASSES.CARD}`,
      cardsFallbackClass: '.state-card',
      cardData: data,
      cardStaggerDelay: CARD_STAGGER_DELAY,
      scrollPerCard: 135,
      scrollTriggerInstances,
    })) ?? null;

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

  // Clean up resize listener
  if (cleanupCardsAnimation) {
    cleanupCardsAnimation();
  }
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
    class="sec-b l-article relative sec-b-transition"
    :style="{ '--intro-height': `${introHeight}px` }"
    :class="{
      'is-entered': isEntered,
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
        <p class="sec-b-transition font-[13px] leading-[22px]">
          {{ str.introText3 }}
        </p>
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
          :class="{
            [JS_CLASSES.WRAPPER]: true,
            'state-card-wrapper': true,
            [`state-card-wrapper--${index + 1}`]: true,
          }"
        >
          <LSectionBCard
            :class="['state-card', JS_CLASSES.CARD]"
            :title="item.title"
            :description="item.description"
            :note="item.note"
            :index="index + 1"
          >
            <!-- Render different placeholder content based on item.chart (A..F) -->
            <div
              v-if="item.chart === 'chartA'"
              class="js-chart-content w-full h-full"
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
              class="js-chart-content w-full h-full"
            >
              <LSectionBCardLoveChart
                :active-love-number="20"
                :percentage="40"
                active-color="var(--color-love-red-03)"
                inactive-color="var(--color-love-red-01)"
                :active="activeIndex === 1"
              />
            </div>

            <div v-else-if="item.chart === 'chartC'" class="js-chart-content">
              <LPic
                src="/img/intimate_relationships_p0202_card03_info"
                ext="svg"
                :use2x="false"
                :webp="false"
              />
            </div>

            <div
              v-else-if="item.chart === 'chartD'"
              class="js-chart-content w-full h-full"
            >
              <div
                class="w-full h-full flex flex-col gap-2 lg:mx-auto mt-4 mb-5"
              >
                <!-- 1. 我很享受自己已現在的生活 -->
                <div
                  class="chat-bubble-wrapper w-fit mb-5 sm:mb-1 lg:-mb-4 lg:translate-x-2"
                  :class="{
                    'rotate-[-5deg]': ['sm', 'md', 'lg', 'xl', '2xl'].includes(
                      currentBreakpoint
                    ),
                    'rotate-0': ['xxs', 'xs'].includes(currentBreakpoint),
                    active: activeIndex === 3,
                  }"
                  style="--delay: 0.05s"
                >
                  <LChatBubble
                    :shadow="true"
                    pointer="bottom-right"
                    bg-color="#FFE5E5"
                  >
                    <p>
                      {{ str.card4ChartText1 }}
                    </p>
                  </LChatBubble>
                </div>

                <!-- 2. 我目前想專心拚事業或學業 -->
                <div
                  class="chat-bubble-wrapper w-fit mb-5 sm:mb-1 lg:-mb-4 ml-auto"
                  :class="{
                    'rotate-[5deg]': ['sm', 'md', 'lg', 'xl', '2xl'].includes(
                      currentBreakpoint
                    ),
                    'rotate-[-5deg]': ['xxs', 'xs'].includes(currentBreakpoint),
                    active: activeIndex === 3,
                  }"
                  style="--delay: 0.15s"
                >
                  <LChatBubble
                    :shadow="true"
                    pointer="bottom-left"
                    bg-color="#FFE5E5"
                  >
                    <p>
                      {{ str.card4ChartText2 }}
                    </p>
                  </LChatBubble>
                </div>

                <!-- 3. 我遭沒遇到想結婚的對象 -->
                <div
                  class="chat-bubble-wrapper w-fit mb-5 sm:mb-1 lg:-mb-4 lg:translate-x-20"
                  :class="{
                    'rotate-[5deg]': ['sm', 'md', 'lg', 'xl', '2xl'].includes(
                      currentBreakpoint
                    ),
                    'rotate-[-5deg]': ['xxs', 'xs'].includes(currentBreakpoint),
                    active: activeIndex === 3,
                  }"
                  style="--delay: 0.25s"
                >
                  <LChatBubble
                    :shadow="true"
                    pointer="bottom-right"
                    bg-color="#FFE5E5"
                  >
                    <p>
                      {{ str.card4ChartText3 }}
                    </p>
                  </LChatBubble>
                </div>

                <!-- 4. 我擔心婚後的經濟狀況 -->
                <div
                  class="chat-bubble-wrapper w-fit mb-5 sm:mb-1 lg:-mb-4 ml-auto"
                  :class="{
                    'rotate-[-5deg]': ['sm', 'md', 'lg', 'xl', '2xl'].includes(
                      currentBreakpoint
                    ),
                    'rotate-[5deg]': ['xxs', 'xs'].includes(currentBreakpoint),
                    active: activeIndex === 3,
                  }"
                  style="--delay: 0.35s"
                >
                  <LChatBubble
                    :shadow="true"
                    pointer="bottom-left"
                    bg-color="#FFE5E5"
                  >
                    <p>
                      {{ str.card4ChartText4 }}
                    </p>
                  </LChatBubble>
                </div>

                <!-- 5. 我還不覺得有結婚的必要 -->
                <div
                  class="chat-bubble-wrapper w-fit mb-5 sm:mb-1 lg:-mb-4 lg:translate-x-2"
                  :class="{
                    'rotate-[5deg]': ['sm', 'md', 'lg', 'xl', '2xl'].includes(
                      currentBreakpoint
                    ),
                    'rotate-[-5deg]': ['xxs', 'xs'].includes(currentBreakpoint),
                    active: activeIndex === 3,
                  }"
                  style="--delay: 0.45s"
                >
                  <LChatBubble
                    :shadow="true"
                    pointer="bottom-right"
                    bg-color="#FFE5E5"
                  >
                    <p>
                      {{ str.card4ChartText5 }}
                    </p>
                  </LChatBubble>
                </div>
              </div>

              <!-- <LPic
                src="/img/intimate_relationships_p0202_card04_info01"
                ext="svg"
                :use2x="false"
                :webp="false"
              /> -->
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

  .l-chat-bubble {
    box-shadow: 0 3px 3px rgba(115, 115, 115, 1);
    padding: 8px 20px;
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;

    @include rwd-min(sm) {
      padding: 12px 22px;
      font-size: 20px;
      line-height: 32px;
    }
  }

  // Chat bubble fade up animation
  .chat-bubble-wrapper {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    transition-delay: var(--delay, 0s);

    &.active {
      opacity: 1;
      transform: translateY(0);
    }
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
    bottom: calc(var(--intro-height) + var(--section-padding-bottom));
    background-color: blue;
  }

  &__intro-placeholder {
    width: 100%;
    /* height: 100vh; */
    height: 75vh;
    position: relative;
  }

  &__intro-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    /* padding: var(--section-padding-top) 0
      calc(var(--section-padding-bottom) + calc(var(--intro-height)) + 4rem) 0; */
    padding-bottom: 150vh;
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
  transition: background-color 2s cubic-bezier(0.25, 0.1, 0.25, 1),
    color 2s cubic-bezier(0.25, 0.1, 0.25, 1);

  /* LSectionBIntro.vue */
  path:not(.secb-card-love path),
  rect {
    transition: fill 2s, stroke 2s;
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

  &--1,
  &--3,
  &--5 {
    .mark {
      background-color: var(--color-love-blue-01);
    }
  }

  &--2,
  &--6 {
    .mark {
      background-color: var(--color-love-red-01);
    }
  }
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
