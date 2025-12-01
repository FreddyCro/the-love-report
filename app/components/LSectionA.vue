<script lang="ts" setup>
import str from '../locales/section-a.json';
import LSectionAFrame1 from './LSectionAFrame1.vue';
import LSectionAFrame2 from './LSectionAFrame2.vue';
import LSectionAFrame3 from './LSectionAFrame3.vue';
import LSectionAFrame4 from './LSectionAFrame4.vue';
import LSectionAFrame5 from './LSectionAFrame5.vue';
import LSectionAFrame6 from './LSectionAFrame6.vue';
import { useSequentialFrames } from '../composables/useSequentialFrames';
import { SECTION_A_DURATIONS } from '../utils/animationTimings';

// Initialize sequential frames with animation durations
// Durations are automatically synced from animationTimings.ts
const { frames, setup } = useSequentialFrames([
  { id: 1, animationDuration: SECTION_A_DURATIONS.FRAME_1 },
  { id: 2, animationDuration: SECTION_A_DURATIONS.FRAME_2 },
  { id: 3, animationDuration: SECTION_A_DURATIONS.FRAME_3 },
  { id: 4, animationDuration: SECTION_A_DURATIONS.FRAME_4 },
  { id: 5, animationDuration: SECTION_A_DURATIONS.FRAME_5 },
  { id: 6, animationDuration: SECTION_A_DURATIONS.FRAME_6 },
]);

// Setup frame watchers and intersection observers
setup();
</script>

<template>
  <section
    class="sec-a l-article bg-black-6 pt-(--navbar-height) overflow-hidden"
  >
    <!-- visually hidden for seo -->
    <h1 class="visually-hidden">
      {{ str.title }}
    </h1>

    <!-- frame 1 -->
    <div class="max-w-[1920px] mx-auto">
      <div
        :ref="el => frames[0]!.ref = el as HTMLElement"
        class="sec-a-part"
        :class="{ active: frames[0]?.isEnter.value }"
      >
        <LSectionAFrame1 :active="frames[0]?.isEnter.value ?? false" />
      </div>
    </div>

    <div class="l-container l-container--full">
      <div class="max-w-7xl mx-auto">
        <!-- frame 2 -->
        <div
          :ref="el => frames[1]!.ref = el as HTMLElement"
          class="sec-a-part"
          :class="{ active: frames[1]?.isEnter.value }"
        >
          <LSectionAFrame2 :active="frames[1]?.isEnter.value ?? false" />
        </div>

        <!-- frame 3  -->
        <div
          :ref="el => frames[2]!.ref = el as HTMLElement"
          class="sec-a-part"
          :class="{ active: frames[2]?.isEnter.value }"
        >
          <LSectionAFrame3 :active="frames[2]?.isEnter.value ?? false" />
        </div>

        <!-- frame 4 -->
        <div
          :ref="el => frames[3]!.ref = el as HTMLElement"
          class="sec-a-part"
          :class="{ active: frames[3]?.isEnter.value }"
        >
          <LSectionAFrame4 :active="frames[3]?.isEnter.value ?? false" />
        </div>

        <!-- frame 5 -->
        <div
          :ref="el => frames[4]!.ref = el as HTMLElement"
          class="sec-a-part"
          :class="{ active: frames[4]?.isEnter.value }"
        >
          <LSectionAFrame5 :active="frames[4]?.isEnter.value ?? false" />
        </div>

        <!-- frame 6 -->
        <div
          :ref="el => frames[5]!.ref = el as HTMLElement"
          class="sec-a-part"
          :class="{ active: frames[5]?.isEnter.value }"
        >
          <LSectionAFrame6 :active="frames[5]?.isEnter.value ?? false" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.sec-a-part {
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
