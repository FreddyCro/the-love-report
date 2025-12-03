import { ref, type Ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

/**
 * Composable to track elements matching a selector and toggle 'active' class on viewport intersection
 *
 * Features:
 * - Uses VueUse's useIntersectionObserver for clean lifecycle management
 * - Automatically observes all elements matching the selector within a container
 * - Adds/removes 'active' class based on viewport visibility
 * - Auto-cleanup on unmount
 *
 * @param containerRef - Ref to the container element to search within (required)
 * @param selector - CSS selector for target elements (e.g., '.chart-content')
 * @param options - Intersection observer options
 * @returns Object with setup function and active elements set
 *
 * @example
 * ```ts
 * const containerRef = ref<HTMLElement | null>(null);
 * const { setup, activeElements } = useActiveOnViewport(
 *   containerRef,
 *   '.chart-content',
 *   { threshold: 0.5 }
 * );
 *
 * onMounted(() => {
 *   setup();
 * });
 * ```
 */
export function useActiveOnViewport(
  containerRef: Ref<HTMLElement | null>,
  selector: string,
  options: IntersectionObserverInit = { threshold: 0.5 }
) {
  // Track which elements are currently active (in viewport)
  const activeElements = ref<Set<HTMLElement>>(new Set());
  
  // Track the index of the currently active element
  const activeIndex = ref<number>(-1);

  // Store stop functions for cleanup
  const stopFunctions: Array<() => void> = [];
  
  // Store elements array for index tracking
  let elementsArray: HTMLElement[] = [];

  /**
   * Setup function to initialize observers
   * Call this in onMounted or after DOM is ready
   */
  function setup() {
    const container = containerRef.value;
    if (!container) {
      console.warn('[useActiveOnViewport] Container ref not available');
      return;
    }

    // Find all target elements within container
    const elements = container.querySelectorAll<HTMLElement>(selector);

    if (elements.length === 0) {
      console.warn(
        `[useActiveOnViewport] No elements found for selector: ${selector}`
      );
      return;
    }
    
    // Store elements array for index tracking
    elementsArray = Array.from(elements);

    // Create observer for each element
    elements.forEach((el, index) => {
      const elRef = ref(el);

      // Use VueUse's useIntersectionObserver for clean lifecycle management
      const { stop } = useIntersectionObserver(
        elRef,
        ([entry]) => {
          if (!entry) return;

          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            // Add active class when entering viewport
            target.classList.add('active');
            activeElements.value.add(target);
            // Update active index to current element
            activeIndex.value = index;
          } else {
            // Remove active class when leaving viewport
            target.classList.remove('active');
            activeElements.value.delete(target);
            // Reset activeIndex if this was the active element
            if (activeIndex.value === index) {
              activeIndex.value = -1;
            }
          }

          // Trigger reactivity by creating new Set
          activeElements.value = new Set(activeElements.value);
        },
        options
      );

      stopFunctions.push(stop);
    });
  }

  /**
   * Manual cleanup function (optional - VueUse handles auto-cleanup on unmount)
   * Call this if you need to stop observing before component unmounts
   */
  function cleanup() {
    stopFunctions.forEach((stop) => stop());
    stopFunctions.length = 0;
    activeElements.value.clear();
    activeIndex.value = -1;
  }

  return {
    setup,
    cleanup,
    activeElements,
    activeIndex,
  };
}
