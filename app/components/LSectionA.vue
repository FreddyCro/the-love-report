<script lang="ts" setup>
import { ref, onMounted, watch, type Ref } from 'vue';
import str from '../locales/section-a.json';
import { useScroll, useIntersectionObserver } from '@vueuse/core';
import LSectionAFrame1 from './LSectionAFrame1.vue';
import LSectionAFrame2 from './LSectionAFrame2.vue';
import LSectionAFrame3 from './LSectionAFrame3.vue';
import LSectionAFrame4 from './LSectionAFrame4.vue';
import LSectionAFrame5 from './LSectionAFrame5.vue';
import LSectionAFrame6 from './LSectionAFrame6.vue';

// refs for frame 1~7 elements
const frame1 = ref<HTMLElement | null>(null);
const frame2 = ref<HTMLElement | null>(null);
const frame3 = ref<HTMLElement | null>(null);
const frame4 = ref<HTMLElement | null>(null);
const frame5 = ref<HTMLElement | null>(null);
const frame6 = ref<HTMLElement | null>(null);

// boolean flags indicating whether each frame is currently in "ENTER" state
const isFrame1Enter = ref(false);
const isFrame2Enter = ref(false);
const isFrame3Enter = ref(false);
const isFrame4Enter = ref(false);
const isFrame5Enter = ref(false);
const isFrame6Enter = ref(false);

// Group refs into arrays for iteration
const frameRefs = [frame1, frame2, frame3, frame4, frame5, frame6];
const enterFlags = [
  isFrame1Enter,
  isFrame2Enter,
  isFrame3Enter,
  isFrame4Enter,
  isFrame5Enter,
  isFrame6Enter,
];

// track scroll position and previous value
const { y } = useScroll(window);
const lastY = ref(y.value);

watch(y, (newY, oldY) => {
  // store previous scroll Y for direction comparison
  lastY.value = oldY ?? lastY.value;
});

// Structured frame state with uppercase underscore constants
type Action = 'ENTER' | 'LEAVE';
type Direction = 'UP' | 'DOWN';

type FrameState = {
  action: Action;
  direction: Direction;
  // Uppercase underscore representation, e.g. 'ENTER_UP', 'LEAVE_DOWN'
  STATE: `${Action}_${Direction}`;
};

onMounted(() => {
  // Wire up all 7 frames with their respective handlers
  frameRefs.forEach((frame, i) => {
    const flag = enterFlags[i];
    if (!flag) return;

    // Choose appropriate handler for frame 1 vs others
    const handler =
      i === 0 ? createStrictHandler(i + 1, flag) : createHandler(i + 1, flag);

    watchFrameIntersection(frame, handler);
  });
});

// Factory function to create handler for each frame
function createHandler(frameNum: number, flag: Ref<boolean>) {
  return (state: FrameState) => {
    // console.log(`Frame ${frameNum}:`, state.STATE, state);
    if (state.STATE === 'ENTER_DOWN') {
      flag.value = true;
    } else if (state.STATE === 'LEAVE_UP') {
      flag.value = false;
    }
  };
}

// Special handler for frame 1: always set flag true on any ENTER, false on any LEAVE
function createStrictHandler(frameNum: number, flag: Ref<boolean>) {
  return (state: FrameState) => {
    // Activate on any enter
    if (state.action === 'ENTER') {
      flag.value = true;
      return;
    }

    // Deactivate on any leave
    if (state.action === 'LEAVE') {
      flag.value = false;
    }
  };
}

// Reusable function to watch frame intersection and call callback with state
function watchFrameIntersection(
  element: Ref<HTMLElement | null>,
  callback: (state: FrameState) => void,
  enterFlag?: Ref<boolean>
) {
  useIntersectionObserver(
    element,
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (!entry) return;

      // determine user scroll direction: compare current y vs lastY
      const scrollDir = y.value > lastY.value ? 'DOWN' : 'UP';

      const action: Action = entry.isIntersecting ? 'ENTER' : 'LEAVE';
      const direction: Direction = scrollDir as Direction;
      const state: FrameState = {
        action,
        direction,
        STATE: `${action}_${direction}`,
      };

      // update optional enterFlag for the caller (true for ENTER, false for LEAVE)
      if (enterFlag) {
        enterFlag.value = action === 'ENTER';
      }

      callback(state);
    },
    {
      threshold: 0.1,
      root: null,
      rootMargin: '0px',
    }
  );
}
</script>

<template>
  <section class="sec-a l-article">
    <!-- visually hidden for seo -->
    <h1 class="visually-hidden">
      {{ str.title }}
    </h1>

    <!-- frame 1 -->
    <div ref="frame1" class="sec-a-part">
      <LSectionAFrame1 :active="isFrame1Enter" />
    </div>

    <!-- frame 2 -->
    <div
      ref="frame2"
      class="sec-a-part"
      :class="{
        active: isFrame2Enter,
      }"
    >
      <LSectionAFrame2 :active="isFrame2Enter" />
    </div>

    <!-- frame 3  -->
    <div
      ref="frame3"
      class="sec-a-part"
      :class="{
        active: isFrame3Enter,
      }"
    >
      <LSectionAFrame3 :active="isFrame3Enter" />
    </div>

    <!-- frame 4 -->
    <div
      ref="frame4"
      class="sec-a-part"
      :class="{
        active: isFrame4Enter,
      }"
    >
      <LSectionAFrame4 :active="isFrame4Enter" />
    </div>

    <!-- frame 5 -->
    <div
      ref="frame5"
      class="sec-a-part"
      :class="{
        active: isFrame5Enter,
      }"
    >
      <LSectionAFrame5 :active="isFrame5Enter" />
    </div>

    <!-- frame 6 -->
    <div
      ref="frame6"
      class="sec-a-part"
      :class="{
        active: isFrame6Enter,
      }"
    >
      <LSectionAFrame6 :active="isFrame6Enter" />
    </div>
  </section>
</template>

<style lang="scss">
.sec-a-part {
  min-height: 100vh;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
