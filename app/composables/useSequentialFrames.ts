import { ref, watch, watchEffect, onMounted, type Ref } from 'vue';
import { useScroll, useIntersectionObserver } from '@vueuse/core';

/*
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Frame Activation & Deactivation Conditions                                      │
├──────────┬──────────────────────────────────┬────────────────────────────────────┤
│ Frame    │ ACTIVE Conditions                │ INACTIVE Conditions                │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 1  │ • ENTER (any direction)          │ • No automatic deactivation        │
│          │   → Activate immediately         │ • Only resets on scroll to top     │
│          │                                  │                                    │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 2  │ • ENTER (any direction)          │ • LEAVE_UP only                    │
│          │   + Previous frame conditions:   │   → Deactivate immediately         │
│          │                                  │   → Cleanup any waiting watcher    │
│          │   Path 1: Frame 1 NOT active     │                                    │
│          │   → Activate immediately         │                                    │
│          │                                  │                                    │
│          │   Path 2: Frame 1 active +       │                                    │
│          │            animation complete    │                                    │
│          │   → Activate immediately         │                                    │
│          │                                  │                                    │
│          │   Path 3: Frame 1 active +       │                                    │
│          │            animation NOT complete│                                    │
│          │   → Wait with watchEffect        │                                    │
│          │   → Auto-activate when:          │                                    │
│          │      - Frame 1 leaves viewport   │                                    │
│          │      - Frame 1 animation done    │                                    │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 3-6│ • Same logic as Frame 2          │ • LEAVE_UP only                    │
│          │   (depends on previous frame)    │   → Deactivate immediately         │
│          │                                  │   → Cleanup any waiting watcher    │
└──────────┴──────────────────────────────────┴────────────────────────────────────┘

⚠️ Global Reset Condition:
- When scroll position < 10px (page top): Reset ALL frames (1-6) and re-check viewport

Key Implementation Notes:
- Frame 1: Uses createStrictHandler() - only responds to ENTER (no LEAVE)
- Frame 2-6: Use createSequentialHandler() - sequential activation with waiting
- ENTER_DOWN: User scrolling down, frame entering viewport (threshold: 0)
- IntersectionObserver threshold: 0 (triggers as soon as any part is visible)
- Initial viewport check: Runs 100ms after mount to handle pre-loaded frames
- Watcher cleanup: Always cleanup before creating new watcher or on LEAVE
*/

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
   * Activates immediately on any ENTER, never deactivates (except on scroll-to-top reset)
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

      // Track viewport state but don't deactivate on LEAVE
      if (state.action === 'LEAVE') {
        framesInViewport.set(frameIndex, false);
      }
    };
  }

  /**
   * Cleanup watcher for a specific frame
   */
  function cleanupWatcher(frameIndex: number) {
    const watcher = frameWatchers.get(frameIndex);
    if (watcher) {
      watcher();
      frameWatchers.delete(frameIndex);
    }
  }

  /**
   * Activate frame immediately
   */
  function activateFrame(frameIndex: number) {
    const frame = frames[frameIndex];
    if (frame) {
      frame.isEnter.value = true;
      cleanupWatcher(frameIndex);
    }
  }

  /**
   * Deactivate frame immediately
   */
  function deactivateFrame(frameIndex: number) {
    const frame = frames[frameIndex];
    if (frame) {
      frame.isEnter.value = false;
      cleanupWatcher(frameIndex);
    }
  }

  /**
   * Check if previous frame allows current frame to activate
   */
  function canActivateByPreviousFrame(frameIndex: number): boolean {
    if (frameIndex === 0) return true;

    const prevFrame = frames[frameIndex - 1];
    if (!prevFrame) return false;

    // Previous frame left viewport
    if (!prevFrame.isEnter.value) return true;

    // Previous frame animation complete
    return prevFrame.isEnter.value && prevFrame.isAnimationComplete.value;
  }

  /**
   * Wait for previous frame to complete using watchEffect
   */
  function waitForPreviousFrame(frameIndex: number) {
    cleanupWatcher(frameIndex);

    const prevFrame = frames[frameIndex - 1];
    if (!prevFrame) return;

    const stopWatch = watchEffect(() => {
      if (!prevFrame.isEnter.value || prevFrame.isAnimationComplete.value) {
        activateFrame(frameIndex);
        stopWatch();
      }
    });

    frameWatchers.set(frameIndex, stopWatch);
  }
  /**
   * Create handler for Frame 2-6 (sequential mode)
   * Activates on ENTER (any direction), only deactivates on LEAVE_UP
   */
  function createSequentialHandler(frameIndex: number) {
    return (state: FrameState) => {
      const frame = frames[frameIndex];
      if (!frame) return;

      // LEAVE_UP: Reset and cleanup (only when scrolling up and leaving)
      if (state.STATE === 'LEAVE_UP') {
        framesInViewport.set(frameIndex, false);
        deactivateFrame(frameIndex);
        return;
      }

      // Ignore LEAVE_DOWN (scrolling down and leaving viewport)
      if (state.STATE === 'LEAVE_DOWN') {
        framesInViewport.set(frameIndex, false);
        return;
      }

      // Handle ENTER (any direction)
      if (state.action === 'ENTER') {
        framesInViewport.set(frameIndex, true);

        if (canActivateByPreviousFrame(frameIndex)) {
          activateFrame(frameIndex);
        } else {
          waitForPreviousFrame(frameIndex);
        }
      }
    };
  }

  /**
   * Check and activate frames that are initially in viewport on page load
   */
  function checkInitialFramesInViewport() {
    console.log('=== Checking initial frames in viewport ===');

    frames.forEach((frame, index) => {
      const isInViewport = framesInViewport.get(index);
      console.log(
        `Frame ${index + 1}: inViewport=${isInViewport}, active=${
          frame.isEnter.value
        }`
      );

      // Skip if not in viewport or already activated
      if (!isInViewport || frame.isEnter.value) return;

      console.log(`Frame ${index + 1}: Processing initial activation`);

      // Check if can activate based on previous frame
      if (canActivateByPreviousFrame(index)) {
        console.log(`Frame ${index + 1}: Activating (initial - can activate)`);
        activateFrame(index);
      } else {
        console.log(`Frame ${index + 1}: Waiting for previous (initial)`);
        waitForPreviousFrame(index);
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
        // threshold: 0.3,
        threshold: 0,
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

      // Watch scroll position: reset all frames when scrolled to top
      watch(y, (scrollY) => {
        if (scrollY < 10) {
          // Reset all frames (including Frame 1)
          frames.forEach((frame, index) => {
            if (frame.isEnter.value) {
              deactivateFrame(index);
            }
          });

          // Re-check frames in viewport after reset
          setTimeout(() => {
            checkInitialFramesInViewport();
          }, 100);
        }
      });
    });
  }

  return {
    frames,
    setup,
  };
}
