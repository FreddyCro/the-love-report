import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';

interface UseIntroPinOptions {
  sectionRef: Ref<HTMLElement | null>;
  introContainerClass: string;
  introClassName: string;
  showIndicators?: boolean; // Show visual indicators for debugging
}

interface UseIntroPinReturn {
  isPinned: Ref<boolean>;
  introActive: Ref<'unpinned-top' | 'pinned' | 'unpinned-bottom' | ''>;
  showIndicatorsFlag: Ref<boolean>;
  introHeight: Ref<number>;
}

/**
 * Composable for pinning intro element when it reaches viewport center
 *
 * Logic:
 * 1. Indicator 1: Viewport center line (50vh from top) - FIXED LINE (on screen)
 * 2. Indicator 2: Intro top boundary (section top + padding + intro height/2)
 * 3. Indicator 3: Intro bottom boundary (section bottom - padding - intro height/2)
 *
 * Three states:
 * - unpinned-top: indicator1 < indicator2 (viewport center above intro top boundary)
 * - pinned: indicator1 >= indicator2 && indicator1 <= indicator3 (viewport center between boundaries)
 * - unpinned-bottom: indicator1 > indicator3 (viewport center below intro bottom boundary)
 */
export const useIntroPin = (options: UseIntroPinOptions): UseIntroPinReturn => {
  const {
    sectionRef,
    introContainerClass,
    introClassName,
    showIndicators = false,
  } = options;

  const isPinned = ref(false);
  const introActive = ref<'unpinned-top' | 'pinned' | 'unpinned-bottom' | ''>(
    'unpinned-top'
  );
  const showIndicatorsFlag = ref(showIndicators);
  const introHeight = ref(0);

  let rafId: number | null = null;
  let introContainer: HTMLElement | null = null;
  let intro: HTMLElement | null = null;

  const updatePinState = () => {
    if (!sectionRef.value || !introContainer || !intro) return;

    const section = sectionRef.value;
    const sectionRect = section.getBoundingClientRect();
    const introContainerRect = introContainer.getBoundingClientRect();
    const introRect = intro.getBoundingClientRect();

    // Calculate indicators
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    // Update introHeight ref with intro element's actual height
    introHeight.value = introRect.height;

    // Indicator 1: Fixed viewport center line (50vh from screen top)
    const indicator1Y = viewportCenter;

    // Indicator 2: Intro top boundary (section top + padding + intro height/2)
    const indicator2Y = sectionRect.top + viewportCenter;

    // Indicator 3: Intro bottom boundary (section bottom - padding - intro height/2)
    const indicator3Y = sectionRect.bottom - viewportCenter;

    // Indicators are now styled in CSS, no inline styles needed

    // Three-state logic based on indicator positions:
    // 1. indicator1 < indicator2: intro 置頂 (unpinned-top)
    // 2. indicator1 >= indicator2 && indicator1 <= indicator3: intro 置中 (pinned)
    // 3. indicator1 > indicator3: intro 置底 (unpinned-bottom)

    if (indicator1Y < indicator2Y) {
      // State 1: intro 置頂 - viewport center above intro top boundary
      introActive.value = 'unpinned-top';
      isPinned.value = false;
    } else if (indicator1Y >= indicator2Y && indicator1Y <= indicator3Y) {
      // State 2: intro 置中 (pinned) - viewport center between boundaries
      introActive.value = 'pinned';
      isPinned.value = true;
    } else if (indicator1Y > indicator3Y) {
      // State 3: intro 置底 - viewport center below intro bottom boundary
      introActive.value = 'unpinned-bottom';
      isPinned.value = false;
    }

    // console.log(
    //   'Indicators:',
    //   '1Y:',
    //   indicator1Y,
    //   '2Y:',
    //   indicator2Y,
    //   '3Y:',
    //   indicator3Y,
    //   '4Y:',
    //   indicator4Y,
    //   'State:',
    //   introActive.value
    // );
  };

  const startRAF = () => {
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

    // Start RAF loop
    startRAF();
  });

  onBeforeUnmount(() => {
    stopRAF();
  });

  return {
    isPinned,
    introActive,
    showIndicatorsFlag,
    introHeight,
  };
};
