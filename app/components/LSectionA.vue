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

/*
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Frame Activation & Deactivation Conditions                                      │
├──────────┬──────────────────────────────────┬────────────────────────────────────┤
│ Frame    │ ACTIVE Conditions                │ INACTIVE Conditions                │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 1  │ • ENTER (any direction)          │ • LEAVE (any direction)            │
│          │   → Always activate immediately  │   → Always deactivate immediately  │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 2  │ • ENTER_DOWN + Previous frame    │ • LEAVE_UP                         │
│          │   conditions:                    │   → Deactivate immediately         │
│          │   1. Frame 1 left viewport       │                                    │
│          │      → Activate immediately      │                                    │
│          │   2. Frame 1 in viewport +       │                                    │
│          │      animation complete          │                                    │
│          │      → Activate immediately      │                                    │
│          │   3. Frame 1 in viewport +       │                                    │
│          │      animation NOT complete      │                                    │
│          │      → Wait with watchEffect     │                                    │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 3  │ • Same logic as Frame 2          │ • LEAVE_UP                         │
│          │   (depends on Frame 2)           │   → Deactivate immediately         │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 4  │ • Same logic as Frame 2          │ • LEAVE_UP                         │
│          │   (depends on Frame 3)           │   → Deactivate immediately         │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 5  │ • Same logic as Frame 2          │ • LEAVE_UP                         │
│          │   (depends on Frame 4)           │   → Deactivate immediately         │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 6  │ • Same logic as Frame 2          │ • LEAVE_UP                         │
│          │   (depends on Frame 5)           │   → Deactivate immediately         │
└──────────┴──────────────────────────────────┴────────────────────────────────────┘

Key Notes:
- Frame 1: Uses createStrictHandler() - immediate response to any ENTER/LEAVE
- Frame 2-6: Use createHandler() - sequential activation with animation waiting
- ENTER_DOWN: User scrolling down, frame entering viewport
- LEAVE_UP: User scrolling up, frame leaving viewport
- watchEffect: Auto-cleanup watcher that activates frame when previous frame completes
*/

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

// Animation tracking: watch each frame's isEnter state and manage animation completion
frames.forEach((frame) => {
  watch(frame.isEnter, (newValue, oldValue) => {
    // From inactive to active: start animation timer
    if (newValue && !oldValue) {
      frame.isAnimationComplete.value = false;
      setTimeout(() => {
        frame.isAnimationComplete.value = true;
      }, frame.animationDuration);
    }
    // From active to inactive: reset animation state
    else if (!newValue && oldValue) {
      frame.isAnimationComplete.value = false;
    }
  });
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

    console.log(`Frame ${frameIndex + 1} - ${state.STATE}`, {
      currentEnter: frame.isEnter.value,
      prevFrameEnter:
        frameIndex > 0 ? frames[frameIndex - 1].isEnter.value : 'N/A',
      prevFrameAnimComplete:
        frameIndex > 0
          ? frames[frameIndex - 1].isAnimationComplete.value
          : 'N/A',
    });

    if (state.STATE === 'ENTER_DOWN') {
      // Frame 1 (index 0) has no previous frame, activate immediately
      if (frameIndex === 0) {
        frame.isEnter.value = true;
        return;
      }

      const prevFrame = frames[frameIndex - 1];
      if (!prevFrame) return; // Safety check

      // Check if previous frame has left (not entered) - activate immediately
      if (!prevFrame.isEnter.value) {
        console.log(`Frame ${frameIndex + 1} - Activating (prev frame left)`);
        frame.isEnter.value = true;
        return;
      }

      // Check if previous frame is entered AND animation complete - activate immediately
      if (prevFrame.isEnter.value && prevFrame.isAnimationComplete.value) {
        console.log(
          `Frame ${frameIndex + 1} - Activating (prev frame complete)`
        );
        frame.isEnter.value = true;
        return;
      }

      // Previous frame is entered but animation not complete - wait using watchEffect
      if (prevFrame.isEnter.value && !prevFrame.isAnimationComplete.value) {
        console.log(
          `Frame ${frameIndex + 1} - Waiting for prev frame animation`
        );
        const stopWatch = watchEffect(() => {
          // Condition 1: Previous frame has left, activate immediately
          if (!prevFrame.isEnter.value) {
            console.log(
              `Frame ${
                frameIndex + 1
              } - Activating (prev frame left while waiting)`
            );
            frame.isEnter.value = true;
            stopWatch();
            return;
          }

          // Condition 2: Previous frame animation complete, activate
          if (prevFrame.isEnter.value && prevFrame.isAnimationComplete.value) {
            console.log(
              `Frame ${
                frameIndex + 1
              } - Activating (prev frame animation completed)`
            );
            frame.isEnter.value = true;
            stopWatch();
          }
        });
      }
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
      threshold: 0.3, // 30% 可見時觸發（降低門檻）
      root: null,
      rootMargin: '0px', // 移除 margin 限制
    }
  );
}
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
