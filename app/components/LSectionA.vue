<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const imgSrc = 'https://picsum.photos/1200/800?random=1';
const imgWrapA = ref<HTMLElement | null>(null);
const imgWrapB = ref<HTMLElement | null>(null);
const scrollTriggerInstances: any[] = [];

onMounted(async () => {
  // Use the composable to get GSAP, ScrollTrigger, and Lenis
  const { gsap } = await useScrollAnimation();

  // Wait for DOM and image to layout
  await nextTick();

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
});

// Register lifecycle hook BEFORE any async operations
onBeforeUnmount(() => {
  // Clean up all ScrollTriggers created by this component
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });
  scrollTriggerInstances.length = 0;
});
</script>

<template>
  <section class="section container">
    <h2 class="section__title">Section A — Mock Image</h2>
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
