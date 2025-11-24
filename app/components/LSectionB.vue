<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import LStateCard from './LStateCard.vue';
import str from '../locales/section-b.json';

type CartType = {
  title: string;
  description: string;
  note: string;
};

const data: CartType[] = [
  {
    title: str.card1Title,
    description: str.card1Description,
    note: str.card1Note,
  },
  {
    title: str.card2Title,
    description: str.card2Description,
    note: str.card2Note,
  },
  {
    title: str.card3Title,
    description: str.card3Description,
    note: str.card3Note,
  },
  {
    title: str.card4Title,
    description: str.card4Description,
    note: str.card4Note,
  },
  {
    title: str.card5Title,
    description: str.card5Description,
    note: str.card5Note,
  },
  {
    title: str.card6Title,
    description: str.card6Description,
    note: str.card6Note,
  },
];

const isEntered = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scrollTriggerInstances: any[] = [];

defineExpose({
  isEntered,
});

onMounted(async () => {
  // Use the composable to get GSAP, ScrollTrigger, and Lenis
  const { gsap, ScrollTrigger, lenis } = await useScrollAnimation();

  // Wait for DOM and image to layout
  await nextTick();

  // Add a small delay to ensure everything is rendered
  setTimeout(() => {
    handleIsEntered();
    handleAnimation(gsap, ScrollTrigger, lenis);
  }, 100);
});

// Register lifecycle hook BEFORE any async operations
onBeforeUnmount(() => {
  // Clean up all ScrollTriggers created by this component
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  scrollTriggerInstances.length = 0;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleAnimation(gsap: any, ScrollTrigger: any, _lenis: any) {
  const section = document.querySelector('.section-b');
  if (!section) return;

  const cards = section.querySelectorAll('.state-card');
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
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

function handleIsEntered() {
  isEntered.value = true;
}
</script>

<template>
  <section class="section-b">
    <div class="l-container">
      <div class="state-card-group">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="state-card-wrapper"
        >
          <LStateCard
            class="state-card"
            :title="item.title"
            :description="item.description"
            :note="item.note"
          >
            <div class="chart-placeholder">
              <span>圖表 {{ index + 1 }}</span>
            </div>
          </LStateCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.section-b {
  min-height: 100vh;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.l-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.state-card-group {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.state-card-wrapper {
  position: absolute;
  top: 0;
  left: 0;
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
