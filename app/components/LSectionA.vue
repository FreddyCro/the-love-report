<script lang="ts" setup>
import { ref, onMounted, watch, watchEffect, type Ref } from 'vue';
import str from '../locales/section-a.json';
import { useScroll, useIntersectionObserver } from '@vueuse/core';
import LSectionAFrame1 from './LSectionAFrame1.vue';
import LSectionAFrame2 from './LSectionAFrame2.vue';
import LSectionAFrame3 from './LSectionAFrame3.vue';
import LSectionAFrame4 from './LSectionAFrame4.vue';
import LSectionAFrame5 from './LSectionAFrame5.vue';
import LSectionAFrame6 from './LSectionAFrame6.vue';

// Type definition for frame data
type FrameData = {
  id: number;
  ref: HTMLElement | null;
  isEnter: Ref<boolean>;
  isAnimationComplete: Ref<boolean>;
  animationDuration: number; // 動畫完成時間 (毫秒)
};

// Integrated frame data structure - use reactive refs for each state
const frames: FrameData[] = [
  {
    id: 1,
    ref: null,
    isEnter: ref(false),
    isAnimationComplete: ref(false),
    animationDuration: 2500, // frame 1 動畫時長 (ms)
  },
  {
    id: 2,
    ref: null,
    isEnter: ref(false),
    isAnimationComplete: ref(false),
    animationDuration: 1500,
  },
  {
    id: 3,
    ref: null,
    isEnter: ref(false),
    isAnimationComplete: ref(false),
    animationDuration: 1500,
  },
  {
    id: 4,
    ref: null,
    isEnter: ref(false),
    isAnimationComplete: ref(false),
    animationDuration: 2500,
  },
  {
    id: 5,
    ref: null,
    isEnter: ref(false),
    isAnimationComplete: ref(false),
    animationDuration: 2000,
  },
  {
    id: 6,
    ref: null,
    isEnter: ref(false),
    isAnimationComplete: ref(false),
    animationDuration: 1500,
  },
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
  // Wire up all frames with their respective handlers
  frames.forEach((frame, i) => {
    // Choose appropriate handler for frame 1 vs others
    const handler = i === 0 ? createStrictHandler(i) : createHandler(i);

    const frameRef = ref(frame.ref);
    watchFrameIntersection(frameRef, handler);
  });
});

// Factory function to create handler for each frame
function createHandler(frameIndex: number) {
  return (state: FrameState) => {
    const frame = frames[frameIndex];
    if (!frame) return;

    // console.log(`Frame ${frameIndex + 1}:`, state.STATE, state);
    if (state.STATE === 'ENTER_DOWN') {
      frame.isEnter.value = true;
    } else if (state.STATE === 'LEAVE_UP') {
      frame.isEnter.value = false;
    }
  };
}

// Special handler for frame 1: always set flag true on any ENTER, false on any LEAVE
function createStrictHandler(frameIndex: number) {
  return (state: FrameState) => {
    const frame = frames[frameIndex];
    if (!frame) return;

    // Activate on any enter
    if (state.action === 'ENTER') {
      frame.isEnter.value = true;
      return;
    }

    // Deactivate on any leave
    if (state.action === 'LEAVE') {
      frame.isEnter.value = false;
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
    <div
      :ref="el => frames[0]!.ref = el as HTMLElement"
      class="sec-a-part"
      :class="{ active: frames[0]?.isEnter.value }"
    >
      <LSectionAFrame1 :active="frames[0]?.isEnter.value ?? false" />
    </div>

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
