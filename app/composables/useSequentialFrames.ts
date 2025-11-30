import { ref, watch, watchEffect, onMounted, type Ref } from 'vue';
import { useScroll, useIntersectionObserver } from '@vueuse/core';

// Type definitions
type Action = 'ENTER' | 'LEAVE';
type Direction = 'UP' | 'DOWN';

export type FrameState = {
  action: Action;
  direction: Direction;
  STATE: `${Action}_${Direction}`;
};

export type FrameData = {
  id: number;
  ref: HTMLElement | null;
  isEnter: Ref<boolean>;
  isAnimationComplete: Ref<boolean>;
  animationDuration: number;
};

export type FrameConfig = {
  id: number;
  animationDuration: number;
};

/**
 * Composable for managing sequential frame animations with viewport detection
 *
 * Features:
 * - Sequential activation: Frame N waits for Frame N-1 to complete
 * - Direction-aware: Only activates on ENTER_DOWN (scrolling down into viewport)
 * - Initial viewport detection: Handles frames already visible on page load
 * - Auto-cleanup: Properly manages watchEffect cleanup on frame leave
 *
 * @param frameConfigs - Array of frame configurations with id and animationDuration
 * @returns Object with frames array and setup function
 */
export function useSequentialFrames(frameConfigs: FrameConfig[]) {
  // Initialize frame data
  const frames: FrameData[] = frameConfigs.map((config) => ({
    id: config.id,
    ref: null,
    isEnter: ref(false),
    isAnimationComplete: ref(false),
    animationDuration: config.animationDuration,
  }));

  // Track scroll position for direction detection
  const { y } = useScroll(window);
  const lastY = ref(y.value);

  watch(y, (newY, oldY) => {
    lastY.value = oldY ?? lastY.value;
  });

  // Store active watchers for cleanup
  const frameWatchers = new Map<number, () => void>();

  // Track frames currently in viewport
  const framesInViewport = new Map<number, boolean>();

  // Watch each frame's isEnter state and manage animation completion
  frames.forEach((frame) => {
    watch(frame.isEnter, (newValue, oldValue) => {
      if (newValue && !oldValue) {
        // Activation: start animation timer
        frame.isAnimationComplete.value = false;
        setTimeout(() => {
          frame.isAnimationComplete.value = true;
        }, frame.animationDuration);
      } else if (!newValue && oldValue) {
        // Deactivation: reset animation state
        frame.isAnimationComplete.value = false;
      }
    });
  });

  /**
   * Create handler for Frame 1 (strict mode)
   * Activates immediately on any ENTER, deactivates on any LEAVE
   */
  function createStrictHandler(frameIndex: number) {
    return (state: FrameState) => {
      const frame = frames[frameIndex];
      if (!frame) return;

      if (state.action === 'ENTER') {
        framesInViewport.set(frameIndex, true);
        frame.isEnter.value = true;
        return;
      }

      if (state.action === 'LEAVE') {
        framesInViewport.set(frameIndex, false);
        frame.isEnter.value = false;
      }
    };
  }

  /**
   * Create handler for Frame 2-6 (sequential mode)
   * Only activates on ENTER_DOWN, waits for previous frame to complete
   */
  function createSequentialHandler(frameIndex: number) {
    return (state: FrameState) => {
      const frame = frames[frameIndex];
      if (!frame) return;

      // LEAVE: Reset immediately and cleanup any active watcher
      if (state.action === 'LEAVE') {
        framesInViewport.set(frameIndex, false);

        const existingWatcher = frameWatchers.get(frameIndex);
        if (existingWatcher) {
          existingWatcher();
          frameWatchers.delete(frameIndex);
        }

        frame.isEnter.value = false;
        return;
      }

      // ENTER_DOWN: Activate with previous frame logic
      if (state.STATE === 'ENTER_DOWN') {
        framesInViewport.set(frameIndex, true);

        // Frame 1 has no previous frame, activate immediately
        if (frameIndex === 0) {
          frame.isEnter.value = true;
          return;
        }

        const prevFrame = frames[frameIndex - 1];
        if (!prevFrame) return;

        // Previous frame left viewport: activate immediately
        if (!prevFrame.isEnter.value) {
          frame.isEnter.value = true;
          return;
        }

        // Previous frame animation complete: activate immediately
        if (prevFrame.isEnter.value && prevFrame.isAnimationComplete.value) {
          frame.isEnter.value = true;
          return;
        }

        // Previous frame animation not complete: wait using watchEffect
        if (prevFrame.isEnter.value && !prevFrame.isAnimationComplete.value) {
          // Cleanup any existing watcher first
          const existingWatcher = frameWatchers.get(frameIndex);
          if (existingWatcher) {
            existingWatcher();
          }

          const stopWatch = watchEffect(() => {
            // Condition 1: Previous frame left viewport
            if (!prevFrame.isEnter.value) {
              frame.isEnter.value = true;
              stopWatch();
              frameWatchers.delete(frameIndex);
              return;
            }

            // Condition 2: Previous frame animation complete
            if (
              prevFrame.isEnter.value &&
              prevFrame.isAnimationComplete.value
            ) {
              frame.isEnter.value = true;
              stopWatch();
              frameWatchers.delete(frameIndex);
            }
          });

          frameWatchers.set(frameIndex, stopWatch);
        }
      }
    };
  }

  /**
   * Check and activate frames that are initially in viewport on page load
   */
  function checkInitialFramesInViewport() {
    frames.forEach((frame, index) => {
      const isInViewport = framesInViewport.get(index);

      // Skip if not in viewport or already activated
      if (!isInViewport || frame.isEnter.value) {
        return;
      }

      // Frame 1: activate immediately if in viewport
      if (index === 0) {
        frame.isEnter.value = true;
        return;
      }

      // Frame 2-6: check previous frame condition
      const prevFrame = frames[index - 1];
      if (!prevFrame) return;

      // Previous frame not active: activate immediately
      if (!prevFrame.isEnter.value) {
        frame.isEnter.value = true;
        return;
      }

      // Previous frame animation complete: activate immediately
      if (prevFrame.isEnter.value && prevFrame.isAnimationComplete.value) {
        frame.isEnter.value = true;
        return;
      }

      // Previous frame animation not complete: wait
      if (prevFrame.isEnter.value && !prevFrame.isAnimationComplete.value) {
        const stopWatch = watchEffect(() => {
          if (!prevFrame.isEnter.value) {
            frame.isEnter.value = true;
            stopWatch();
            frameWatchers.delete(index);
            return;
          }

          if (prevFrame.isEnter.value && prevFrame.isAnimationComplete.value) {
            frame.isEnter.value = true;
            stopWatch();
            frameWatchers.delete(index);
          }
        });

        frameWatchers.set(index, stopWatch);
      }
    });
  }

  /**
   * Watch frame intersection and call callback with state
   */
  function watchFrameIntersection(
    element: Ref<HTMLElement | null>,
    callback: (state: FrameState) => void
  ) {
    useIntersectionObserver(
      element,
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (!entry) return;

        const scrollDir = y.value > lastY.value ? 'DOWN' : 'UP';
        const action: Action = entry.isIntersecting ? 'ENTER' : 'LEAVE';
        const direction: Direction = scrollDir as Direction;

        callback({
          action,
          direction,
          STATE: `${action}_${direction}`,
        });
      },
      {
        threshold: 0.3,
        root: null,
        rootMargin: '0px',
      }
    );
  }

  /**
   * Setup function to be called in onMounted
   * Wires up all frames with their respective handlers
   */
  function setup() {
    onMounted(() => {
      frames.forEach((frame, i) => {
        const handler =
          i === 0 ? createStrictHandler(i) : createSequentialHandler(i);

        const frameRef = ref(frame.ref);
        watchFrameIntersection(frameRef, handler);
      });

      // Check for frames initially in viewport after IntersectionObserver setup
      setTimeout(() => {
        checkInitialFramesInViewport();
      }, 100);
    });
  }

  return {
    frames,
    setup,
  };
}
