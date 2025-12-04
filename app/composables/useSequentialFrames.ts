import { ref, watch, watchEffect, onMounted, type Ref } from 'vue';
import { useScroll, useIntersectionObserver } from '@vueuse/core';

/*
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Frame Activation & Deactivation Conditions                                      │
├──────────┬──────────────────────────────────┬────────────────────────────────────┤
│ Frame    │ ACTIVE Conditions                │ INACTIVE Conditions                │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 1  │ • ENTER (any direction)          │ • No automatic deactivation        │
│          │   → Activate immediately         │ • [REMOVED] Reset on scroll to top │
│          │                                  │                                    │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 2  │ • ENTER (any direction)          │ • No automatic deactivation        │
│          │   + Previous frame active        │ • [REMOVED] Reset on scroll to top │
│          │   + Previous frame animation     │                                    │
│          │     complete                     │                                    │
│          │                                  │                                    │
│          │   Path 1: Frame 1 active +       │                                    │
│          │            animation complete    │                                    │
│          │   → Activate immediately         │                                    │
│          │                                  │                                    │
│          │   Path 2: Frame 1 NOT ready      │                                    │
│          │   → Wait with watchEffect        │                                    │
│          │   → Auto-activate when           │                                    │
│          │      Frame 1 active AND          │                                    │
│          │      animation complete          │                                    │
│          │                                  │                                    │
├──────────┼──────────────────────────────────┼────────────────────────────────────┤
│ Frame 3-6│ • Same logic as Frame 2          │ • No automatic deactivation        │
│          │   Must wait for previous frame   │ • [REMOVED] Reset on scroll to top │
│          │   to be active first             │                                    │
└──────────┴──────────────────────────────────┴────────────────────────────────────┘

⚠️ Global Reset Condition:
- [TEMPORARILY REMOVED] When scroll position = 0px (page top): Reset ALL frames (1-6) and re-check viewport

Key Implementation Notes:
- Frame 1: Uses createStrictHandler() - only responds to ENTER (no LEAVE deactivation)
- Frame 2-6: Use createSequentialHandler() - sequential activation, no LEAVE deactivation
- All frames stay active once activated (scroll-to-top reset temporarily disabled)
- IntersectionObserver threshold: 0 (triggers as soon as any part is visible)
- Initial viewport check: Runs 100ms after mount to handle pre-loaded frames
- Watcher cleanup: Always cleanup before creating new watcher
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
 * - Sequential activation: Frame N waits for Frame N-1 to be active AND animation complete
 * - Frames stay active once activated (no deactivation on LEAVE)
 * - Initial viewport detection: Handles frames already visible on page load
 * - Scroll-to-top reset: All frames reset only when scrolling to page top
 * - Auto-cleanup: Properly manages watchEffect cleanup
 *
 * @param frameConfigs - Array of frame configurations with id and animationDuration
 * @param initialCheckDelay - Delay in ms before checking initial frames in viewport (default: 100)
 * @returns Object with frames array and setup function
 */
export function useSequentialFrames(
  frameConfigs: FrameConfig[],
  initialCheckDelay: number = 100
) {
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

  // Track active animation timers for cleanup
  const animationTimers = new Map<number, number>();

  // Prevent race conditions during reset
  let resetInProgress = false;

  // Watch each frame's isEnter state and manage animation completion
  frames.forEach((frame, index) => {
    watch(frame.isEnter, (newValue, oldValue) => {
      if (newValue && !oldValue) {
        // Activation: start animation timer
        frame.isAnimationComplete.value = false;

        // Clear existing timer if any
        const existingTimer = animationTimers.get(index);
        if (existingTimer) {
          clearTimeout(existingTimer);
        }

        // Start new timer
        const timerId = setTimeout(() => {
          frame.isAnimationComplete.value = true;
          animationTimers.delete(index);
        }, frame.animationDuration) as unknown as number;

        animationTimers.set(index, timerId);
      } else if (!newValue && oldValue) {
        // Deactivation: reset animation state and clear timer
        frame.isAnimationComplete.value = false;

        const existingTimer = animationTimers.get(index);
        if (existingTimer) {
          clearTimeout(existingTimer);
          animationTimers.delete(index);
        }
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
   * Deactivate frame with different transition modes
   *
   * This function handles three different deactivation scenarios:
   *
   * 1. **Fade-out mode** (withFadeOut = true):
   *    - Applies `.frame-fade-out` CSS class (opacity: 0, 200ms transition)
   *    - Does NOT change `isEnter` state immediately
   *    - Used in `resetAllFrames()` to create smooth visual fade before reset
   *    - State change happens in the calling function after fade completes
   *
   * 2. **No-transition mode** (withoutTransition = true):
   *    - Applies `.no-transition` class to disable ALL CSS transitions
   *    - Immediately sets `isEnter = false`
   *    - Uses double rAF to ensure class takes effect before removal
   *    - Used when we need instant state change without visual animation
   *
   * 3. **Normal mode** (both false):
   *    - Simply sets `isEnter = false`
   *    - Triggers normal CSS transition defined in component
   *    - Used by `createSequentialHandler()` on LEAVE_UP
   *
   * @param frameIndex - Index of the frame to deactivate (0-based)
   * @param withoutTransition - If true, disable all transitions for instant change
   * @param withFadeOut - If true, apply fade-out animation (state change deferred)
   *
   * @example
   * // Normal deactivation with CSS transition
   * deactivateFrame(2);
   *
   * // Instant deactivation without animation
   * deactivateFrame(2, true);
   *
   * // Fade-out animation (for reset sequence)
   * deactivateFrame(2, false, true);
   */
  function deactivateFrame(
    frameIndex: number,
    withoutTransition = false,
    withFadeOut = false
  ) {
    const frame = frames[frameIndex];
    if (!frame) return;

    if (withFadeOut && frame.ref) {
      // Mode 1: Fade-out animation
      // Add CSS class that triggers opacity transition to 0
      frame.ref.classList.add('frame-fade-out');
      // Note: isEnter state is NOT changed here
      // The calling function (resetAllFrames) will handle state change after fade completes
    } else if (withoutTransition && frame.ref) {
      // Mode 2: Instant deactivation without transition
      // Temporarily disable all CSS transitions
      frame.ref.classList.add('no-transition');
      frame.isEnter.value = false;

      // Remove no-transition class after style recalculation (double rAF)
      // Why double requestAnimationFrame?
      //
      // Browser rendering pipeline: JS → Style → Layout → Paint → Composite
      //
      // 1st rAF: Schedules callback for next paint frame
      //          Browser queues the style change (no-transition applied)
      //
      // 2nd rAF: Ensures browser has completed style recalculation
      //          Browser has processed the no-transition class and applied styles
      //          Now safe to remove the class without triggering unwanted transitions
      //
      // Without double rAF: Class might be removed before browser processes it,
      // causing the original transition to execute (defeating the purpose)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          frame.ref?.classList.remove('no-transition');
        });
      });
    } else {
      // Mode 3: Normal deactivation with CSS transition
      // Simply change state, CSS transitions defined in component will execute
      frame.isEnter.value = false;
    }

    // Always cleanup any pending watchers (watchEffect from waitForPreviousFrame)
    cleanupWatcher(frameIndex);
  }

  /**
   * Check if previous frame allows current frame to activate
   * Rule: Previous frame must be active AND animation complete
   */
  function canActivateByPreviousFrame(frameIndex: number): boolean {
    if (frameIndex === 0) return true;

    const prevFrame = frames[frameIndex - 1];
    if (!prevFrame) return false;

    // Previous frame must be active AND animation must be complete
    return prevFrame.isEnter.value && prevFrame.isAnimationComplete.value;
  }

  /**
   * Wait for previous frame to become active AND complete animation using watchEffect
   */
  function waitForPreviousFrame(frameIndex: number) {
    cleanupWatcher(frameIndex);

    const prevFrame = frames[frameIndex - 1];
    if (!prevFrame) return;

    const stopWatch = watchEffect(() => {
      if (prevFrame.isEnter.value && prevFrame.isAnimationComplete.value) {
        activateFrame(frameIndex);
        stopWatch();
      }
    });

    frameWatchers.set(frameIndex, stopWatch);
  }
  /**
   * Create handler for Frame 2-6 (sequential mode)
   * Activates on ENTER when previous frame is active
   * Never deactivates (only resets on scroll-to-top)
   */
  function createSequentialHandler(frameIndex: number) {
    return (state: FrameState) => {
      const frame = frames[frameIndex];
      if (!frame) return;

      // Track viewport state on LEAVE (but don't deactivate)
      if (state.action === 'LEAVE') {
        framesInViewport.set(frameIndex, false);
        return;
      }

      // Handle ENTER (any direction)
      if (state.action === 'ENTER') {
        framesInViewport.set(frameIndex, true);

        // Skip if already active
        if (frame.isEnter.value) return;

        if (canActivateByPreviousFrame(frameIndex)) {
          activateFrame(frameIndex);
        } else {
          waitForPreviousFrame(frameIndex);
        }
      }
    };
  }

  /**
   * Reset all frames to initial state
   * Cleans up watchers, timers, and resets all frame states
   */
  function resetAllFrames() {
    if (resetInProgress) return;
    resetInProgress = true;

    // 1. First, apply fade-out to all active frames
    frames.forEach((frame, index) => {
      if (frame.isEnter.value && frame.ref) {
        deactivateFrame(index, false, true);
      }
    });

    // 2. Wait for fade-out animation (200ms) + pause (800ms), then reset
    setTimeout(() => {
      // 3. Cleanup all watchers
      frameWatchers.forEach((cleanup) => cleanup());
      frameWatchers.clear();

      // 4. Clear all animation timers
      animationTimers.forEach((timerId) => clearTimeout(timerId));
      animationTimers.clear();

      // 5. Reset all frame states (without transition to prevent glitch)
      frames.forEach((frame, index) => {
        if (frame.ref) {
          // Remove fade-out class and add no-transition
          frame.ref.classList.remove('frame-fade-out');
          frame.ref.classList.add('no-transition');
        }
        frame.isEnter.value = false;
        frame.isAnimationComplete.value = false;

        // Remove no-transition after style recalc
        // Why double rAF? (same reason as deactivateFrame)
        // Ensures browser fully processes the no-transition class before removing it
        if (frame.ref) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              frame.ref?.classList.remove('no-transition');
            });
          });
        }
      });

      // 6. Don't clear viewport tracking - keep current intersection state
      // framesInViewport.clear();

      // 7. Re-check viewport after brief delay
      setTimeout(() => {
        // Manually check each frame's intersection and update viewport state
        frames.forEach((frame, index) => {
          if (frame.ref) {
            const rect = frame.ref.getBoundingClientRect();
            const isInViewport =
              rect.top < window.innerHeight && rect.bottom > 0;
            framesInViewport.set(index, isInViewport);
          }
        });

        checkInitialFramesInViewport();
        resetInProgress = false;
      }, 100);
    }, 1000); // Fade-out duration (200ms) + pause (800ms)
  }

  /**
   * Check and activate frames that are initially in viewport on page load
   */
  function checkInitialFramesInViewport() {
    frames.forEach((frame, index) => {
      const isInViewport = framesInViewport.get(index);

      // Skip if not in viewport or already activated
      if (!isInViewport || frame.isEnter.value) return;

      // Check if can activate based on previous frame
      if (canActivateByPreviousFrame(index)) {
        activateFrame(index);
      } else {
        waitForPreviousFrame(index);
      }
    });
  }

  /**
   * [TEMPORARILY DISABLED]
   * Setup scroll-to-top reset watcher
   * Resets all frames when user scrolls to page top
   */
  // function setupScrollToTopReset() {
  //   let hasScrolledDown = false;

  //   watch(y, (scrollY) => {
  //     // Track if user has scrolled down
  //     if (scrollY > 100) {
  //       hasScrolledDown = true;
  //     }

  //     // Reset only when scrolling back to top after scrolling down
  //     if (scrollY === 0 && hasScrolledDown) {
  //       hasScrolledDown = false;
  //       resetAllFrames();
  //     }
  //   });
  // }

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
      }, initialCheckDelay);

      // [TEMPORARILY DISABLED] Setup scroll-to-top reset watcher
      // setupScrollToTopReset();
    });
  }

  return {
    frames,
    setup,
    resetAllFrames,
  };
}
