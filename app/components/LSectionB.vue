<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import LStateCard from './LStateCard.vue';
import LStateCardGroup from './LStateCardGroup.vue';

const isEntered = ref(false);
const scrollTriggerInstances: any[] = [];

defineExpose({
  isEntered,
});

onMounted(async () => {
  // Use the composable to get GSAP, ScrollTrigger, and Lenis
  const { gsap } = await useScrollAnimation();

  // Wait for DOM and image to layout
  await nextTick();

  handleIsEntered();
  handleAnimation(gsap);
});

// Register lifecycle hook BEFORE any async operations
onBeforeUnmount(() => {
  // Clean up all ScrollTriggers created by this component
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  scrollTriggerInstances.length = 0;
});

function handleAnimation(_gsap: any) {
  // Placeholder for potential future use
}

function handleIsEntered() {
  // TODO
}
</script>

<template>
  <section>
    <div class="l-container">
      <LStateCardGroup>
        <LStateCard
          title="成長"
          description="在這段關係中，我們彼此成長，學會了如何更好地理解和支持對方。"
        />
        <LStateCard
          title="信任"
          description="我們建立了深厚的信任，知道無論發生什麼事情，我們都能依靠彼此。"
        />
      </LStateCardGroup>
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
