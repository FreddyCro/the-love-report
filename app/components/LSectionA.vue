<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import LChatBubbleF from './LChatBubble.vue';
import type LSectionB from './LSectionB.vue';

const imgSrc = 'https://picsum.photos/1200/800?random=1';
const imgWrapA = ref<HTMLElement | null>(null);
const imgWrapB = ref<HTMLElement | null>(null);
const imgWrapC = ref<HTMLElement | null>(null);
const imgWrapD = ref<HTMLElement | null>(null);
const imgWrapE = ref<HTMLElement | null>(null);
const imgWrapF = ref<HTMLElement | null>(null);
const imgWrapG = ref<HTMLElement | null>(null);
const imgWrapH = ref<HTMLElement | null>(null);
const sectionBRef = ref<InstanceType<typeof LSectionB> | null>(null);
const scrollTriggerInstances: any[] = [];

// Watch for isEntered changes from LSectionB
watch(
  () => sectionBRef.value?.isEntered,
  (newValue) => {
    if (newValue) {
      console.log('LSectionB has been entered!');
      // You can add any logic here when LSectionB is entered
    }
  },
  { deep: true }
);

onMounted(async () => {
  // Use the composable to get GSAP, ScrollTrigger, and Lenis
  const { gsap } = await useScrollAnimation();

  // Wait for DOM and image to layout
  await nextTick();

  handleAnimationPartA(gsap);
  handleAnimationPartB(gsap);
  handleAnimationPartC(gsap);
  handleAnimationPartD(gsap);
});

// Register lifecycle hook BEFORE any async operations
onBeforeUnmount(() => {
  // Clean up all ScrollTriggers created by this component
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  scrollTriggerInstances.length = 0;
});

function handleAnimationPartA(gsap: any) {
  // Animation A: left to right
  const wrapA = imgWrapA.value;
  if (wrapA) {
    const innerImgA = wrapA.querySelector('img') as HTMLElement | null;
    const targetElA = innerImgA || wrapA;

    const computeMaxX = () =>
      Math.max(0, window.innerWidth - (targetElA.offsetWidth || 0) - 32);

    const animationA = gsap.to(targetElA, {
      x: () => computeMaxX(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapA,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    scrollTriggerInstances.push(animationA.scrollTrigger);
  }

  // Animation B: right to left
  const wrapB = imgWrapB.value;
  if (wrapB) {
    const innerImgB = wrapB.querySelector('img') as HTMLElement | null;
    const targetElB = innerImgB || wrapB;

    // Start from right side of viewport
    const computeMaxNegativeX = () =>
      -Math.max(0, window.innerWidth - (targetElB.offsetWidth || 0) - 32);

    const animationB = gsap.fromTo(
      targetElB,
      {
        x: () => -computeMaxNegativeX(), // Start from right
      },
      {
        x: 0, // Move to left (original position)
        ease: 'none',
        scrollTrigger: {
          trigger: wrapB,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    scrollTriggerInstances.push(animationB.scrollTrigger);
  }
}

function handleAnimationPartB(_gsap: any) {
  // Placeholder for potential future use
}

function handleAnimationPartC(_gsap: any) {
  // Placeholder for potential future use
}

function handleAnimationPartD(_gsap: any) {
  // Placeholder for potential future use
}
</script>

<template>
  <section class="section container">
    <!-- part a -->
    <div class="part">
      <div ref="imgWrapA" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>
      <div ref="imgWrapB" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="top-right"
        radius="16px"
      >
        這是一個聊天泡泡範例
      </LChatBubbleF>
    </div>

    <!-- part b -->
    <div class="part">
      <div ref="imgWrapC" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>
      <div ref="imgWrapD" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="bottom-left"
        radius="16px"
      >
        聊天泡泡 B1
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="bottom-right"
        radius="16px"
      >
        聊天泡泡 B2
      </LChatBubbleF>
    </div>

    <!-- part c -->
    <div class="part">
      <div ref="imgWrapE" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>
      <div ref="imgWrapF" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>
      <div ref="imgWrapG" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>
      <div ref="imgWrapH" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="top-left"
        radius="16px"
      >
        聊天泡泡 C1
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="top-right"
        radius="16px"
      >
        聊天泡泡 C2
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="bottom-left"
        radius="16px"
      >
        聊天泡泡 C3
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="bottom-right"
        radius="16px"
      >
        聊天泡泡 C4
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="top-left"
        radius="16px"
      >
        聊天泡泡 C5
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="top-right"
        radius="16px"
      >
        聊天泡泡 C6
      </LChatBubbleF>
    </div>

    <!-- part d -->
    <div class="part">
      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="bottom-left"
        radius="16px"
      >
        最後一個聊天泡泡
      </LChatBubbleF>
    </div>

    <!-- LSectionB with ref -->
    <LSectionB ref="sectionBRef" />
  </section>
</template>

<style scoped lang="scss">
.section {
  padding: 2rem 0;
}
.section__title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
</style>
