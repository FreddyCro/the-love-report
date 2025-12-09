import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';

interface UseIntroPinOptions {
  sectionRef: Ref<HTMLElement | null>;
  introContainerClass: string;
  introClassName: string;
  showIndicators?: boolean; // Show visual indicators for debugging
}

interface UseIntroPinReturn {
  isPinned: Ref<boolean>;
  introActive: Ref<'pinned' | 'unpinned' | ''>;
  placeholderStyle: Ref<Record<string, string>>;
  indicator1Style: Ref<Record<string, string>>;
  indicator2Style: Ref<Record<string, string>>;
  indicator3Style: Ref<Record<string, string>>;
}

/**
 * Composable for pinning intro element when it reaches viewport center
 *
 * Logic:
 * 1. Indicator 1: Section top + 50vh (viewport center marker)
 * 2. Indicator 2: Intro center point
 * 3. Indicator 3: Section bottom - 50vh
 *
 * When intro center (indicator 2) crosses indicator 1, intro becomes fixed at center
 * When intro center (indicator 2) crosses indicator 3, intro unfixes and scrolls with section
 */
export const useIntroPin = (options: UseIntroPinOptions): UseIntroPinReturn => {
  const {
    sectionRef,
    introContainerClass,
    introClassName,
    showIndicators = false,
  } = options;

  const isPinned = ref(false);
  const introActive = ref<'pinned' | 'unpinned' | ''>('');
  const placeholderStyle = ref<Record<string, string>>({});
  const indicator1Style = ref<Record<string, string>>({});
  const indicator2Style = ref<Record<string, string>>({});
  const indicator3Style = ref<Record<string, string>>({});

  let rafId: number | null = null;
  let introContainer: HTMLElement | null = null;
  let intro: HTMLElement | null = null;
  let introHeight = 0;

  const updatePinState = () => {
    if (!sectionRef.value || !introContainer || !intro) return;

    const section = sectionRef.value;
    const sectionRect = section.getBoundingClientRect();
    const introContainerRect = introContainer.getBoundingClientRect();

    // Calculate indicators
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    // Indicator 1: Viewport center line (50vh from top) - FIXED LINE
    const indicator1Y = viewportCenter;

    // Indicator 2: Intro container center point (moves with scroll)
    const indicator2Y = introContainerRect.top + introContainerRect.height / 2;

    // Indicator 3: Section bottom - 50vh line (moves with section)
    const indicator3Y = sectionRect.bottom - viewportCenter;

    // Update indicator styles for visualization
    if (showIndicators) {
      // Indicator 1: Red line at viewport center (fixed)
      indicator1Style.value = {
        position: 'absolute',
        top: '50vh',
        left: '0',
        width: '100%',
        height: '2px',
        backgroundColor: 'red',
        zIndex: '9999',
        pointerEvents: 'none',
      };

      // Indicator 2: Green line at intro center (follows intro)
      indicator2Style.value = {
        position: 'absolute',
        top: '50%',
        left: '0',
        width: '100%',
        height: '2px',
        backgroundColor: 'green',
        zIndex: '9999',
        pointerEvents: 'none',
      };

      // Indicator 3: Blue line at section bottom - 50vh (inside section)
      indicator3Style.value = {
        position: 'absolute',
        bottom: '50vh',
        left: '0',
        width: '100%',
        height: '2px',
        backgroundColor: 'blue',
        zIndex: '9999',
        pointerEvents: 'none',
      };
    }

    // Pin logic based on indicator positions:
    // 1. Pin: when indicator 2 (intro center) crosses indicator 1 (viewport center) going down
    // 2. Unpin: when indicator 2 goes back above indicator 1 (scrolling up) OR when indicator 3 reaches indicator 1 (section exiting)
    
    const introBelowCenter = indicator2Y <= indicator1Y; // Intro center is at or below viewport center
    const sectionNotExiting = indicator3Y > indicator1Y; // Section bottom - 50vh is still below viewport center

    if (introBelowCenter && sectionNotExiting && !isPinned.value) {
      // Start pinning: intro center has reached viewport center (scrolling down)
      isPinned.value = true;
      introHeight = introContainerRect.height;

      // Set intro to pinned state
      introActive.value = 'pinned';

      // Set placeholder to maintain layout space (always present, just change height)
      placeholderStyle.value = {
        height: `${introHeight}px`,
        visibility: 'hidden',
      };
    } else if (isPinned.value && (!introBelowCenter || !sectionNotExiting)) {
      // Unpin conditions:
      // 1. Scrolling up: indicator 2 moves back above indicator 1
      // 2. Scrolling down: indicator 3 reaches indicator 1 (section exiting)
      
      if (!sectionNotExiting) {
        // Case 1: Section is exiting (scrolling down far enough)
        isPinned.value = false;

        // Intro should stick to section, positioned at bottom - 50vh
        introActive.value = 'unpinned';

        // Hide placeholder by setting height to 0 (but keep in DOM)
        placeholderStyle.value = {
          height: '0px',
          visibility: 'hidden',
        };
      } else if (!introBelowCenter) {
        // Case 2: Scrolling back up, intro center moved above viewport center
        isPinned.value = false;

        // Reset to normal flow - hide placeholder
        introActive.value = '';
        placeholderStyle.value = {
          height: '0px',
          visibility: 'hidden',
        };
      }
    }
  };  const startRAF = () => {
    const loop = () => {
      updatePinState();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
  };

  const stopRAF = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  onMounted(() => {
    if (!sectionRef.value) return;

    // Get intro elements
    introContainer = sectionRef.value.querySelector(`.${introContainerClass}`);
    intro = sectionRef.value.querySelector(`.${introClassName}`);

    if (!introContainer || !intro) {
      console.warn('Intro elements not found');
      return;
    }

    // Store initial intro height for consistent placeholder
    introHeight = intro.offsetHeight;

    // Start RAF loop
    startRAF();
  });

  onBeforeUnmount(() => {
    stopRAF();
  });

  return {
    isPinned,
    introActive,
    placeholderStyle,
    indicator1Style,
    indicator2Style,
    indicator3Style,
  };
};
