/* eslint-disable @typescript-eslint/no-explicit-any */

// Singleton state to ensure only one Lenis + RAF loop across all components
let gsapInstance: any = null;
let ScrollTriggerInstance: any = null;
let LenisInstance: any = null;
let lenisObject: any = null;
let rafId: number | null = null;
let isInitialized = false;

interface ScrollAnimationReturn {
  gsap: any;
  ScrollTrigger: any;
  Lenis: any;
  lenis: any;
  cleanup: () => void;
}

/**
 * Composable for using GSAP + ScrollTrigger + Lenis with singleton setup.
 * Usage:
 *   const { gsap, ScrollTrigger, Lenis, lenis } = await useScrollAnimation()
 *
 * Features:
 * - Dynamic imports (SSR-safe)
 * - Singleton RAF loop (only one across all components)
 * - ScrollerProxy integration
 * - Auto cleanup on unmount
 */
export const useScrollAnimation = async (): Promise<ScrollAnimationReturn> => {
  // If already initialized, return cached instances
  if (isInitialized && gsapInstance && ScrollTriggerInstance && LenisInstance) {
    return {
      gsap: gsapInstance,
      ScrollTrigger: ScrollTriggerInstance,
      Lenis: LenisInstance,
      lenis: lenisObject,
      cleanup: () => {
        // Individual component cleanup (kills its own ScrollTriggers)
        // Don't destroy global RAF/lenis here
      },
    };
  }

  // Dynamic imports to avoid SSR issues
  const gsapModule = await import('gsap');
  const ScrollTriggerModule = await import('gsap/ScrollTrigger');
  const LenisModule = await import('lenis');

  gsapInstance =
    (gsapModule as any).gsap || (gsapModule as any).default || gsapModule;
  ScrollTriggerInstance =
    (ScrollTriggerModule as any).ScrollTrigger ||
    (ScrollTriggerModule as any).default ||
    ScrollTriggerModule;
  LenisInstance = (LenisModule as any).default || LenisModule;

  // Register ScrollTrigger plugin
  gsapInstance.registerPlugin(ScrollTriggerInstance);

  // Configure ScrollTrigger to reduce resize-triggered scroll jumps
  // Option 1: Keep default auto-refresh on resize (current approach)
  // This helps prevent scroll-to-top on window resize by controlling refresh behavior
  ScrollTriggerInstance.config({
    // Limit when ScrollTrigger automatically refreshes
    // By default, it refreshes on: 'visibilitychange,DOMContentLoaded,load,resize'
    // autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',

    // Option 2: Disable auto-refresh on resize (more aggressive, uncomment if needed)
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });

  // Create Lenis instance (smooth scroller) - singleton
  // DISABLED: Lenis conflicts with GSAP ScrollTrigger pin, causing scroll issues
  if (!lenisObject) {
    // Mock Lenis object to prevent errors
    lenisObject = {
      raf: () => {},
      scrollTo: () => {},
      destroy: () => {},
      resize: () => {},
    };

    // Start RAF loop for ScrollTrigger only (no Lenis)
    function raf(time: number) {
      // lenisObject.raf(time); // Disabled
      ScrollTriggerInstance.update();
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
  }

  isInitialized = true;

  // Cleanup function - call manually if needed (e.g., in onBeforeUnmount)
  const cleanup = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    try {
      if (ScrollTriggerInstance && ScrollTriggerInstance.getAll) {
        ScrollTriggerInstance.getAll().forEach((t: any) => t.kill());
      }
    } catch {
      // ignore
    }
    if (lenisObject && typeof lenisObject.destroy === 'function') {
      lenisObject.destroy();
      lenisObject = null;
    }
    isInitialized = false;
    gsapInstance = null;
    ScrollTriggerInstance = null;
    LenisInstance = null;
  };

  return {
    gsap: gsapInstance,
    ScrollTrigger: ScrollTriggerInstance,
    Lenis: LenisInstance,
    lenis: lenisObject,
    cleanup,
  };
};
