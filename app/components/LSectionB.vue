<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import LStateCard from './LStateCard.vue';
import LStateCardGroup from './LStateCardGroup.vue';

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
      end: '+=300%', // Extend the scroll distance for smoother animation
      pin: true, // Pin (freeze) the section
      scrub: 1,
      anticipatePin: 1, // Smooth pin start
      invalidateOnRefresh: true,
      onRefresh: () => {
        // Reset cards position when scrolltrigger refreshes
        gsap.set(cards, {
          y: '100vh',
          opacity: 0,
        });
      },
    },
  });

  // Set initial state at the beginning of timeline (position 0)
  tl.set(cards, {
    y: '100vh',
    opacity: 0,
  }, 0);

  // Add each card to timeline with stacking effect
  cards.forEach((card, index) => {
    const yOffset = index * 20; // Each card slightly offset from previous
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
      index * 0.4 // Stagger each card animation
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
      <LStateCardGroup>
        <LStateCard
          class="state-card"
          title="成長"
          description="在這段關係中，我們彼此成長，學會了如何更好地理解和支持對方。"
        />
        <LStateCard
          class="state-card"
          title="信任"
          description="我們建立了深厚的信任，知道無論發生什麼事情，我們都能依靠彼此。"
        />
        <LStateCard
          class="state-card"
          title="溝通"
          description="我們學會了開放和誠實的溝通，讓彼此的心聲都能被聽見。"
        />
        <LStateCard
          class="state-card"
          title="包容"
          description="我們接納彼此的不完美，理解每個人都有自己的獨特之處。"
        />
        <LStateCard
          class="state-card"
          title="支持"
          description="無論順境或逆境，我們始終站在彼此身邊，給予最堅定的支持。"
        />
        <LStateCard
          class="state-card"
          title="愛"
          description="最重要的是，我們深深地愛著彼此，這份愛是我們一切的基礎。"
        />
      </LStateCardGroup>
    </div>
  </section>
</template>

<style scoped lang="scss">
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

.state-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  will-change: transform, opacity;
}
</style>
