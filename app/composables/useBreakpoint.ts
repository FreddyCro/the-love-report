import { ref, onMounted, onBeforeUnmount } from 'vue';

export type Breakpoint =
  | 'xxs'
  | 'xs'
  | 'mob'
  | 'sm'
  | 'pad'
  | 'md'
  | 'pc'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

const breakpoints = {
  xxs: 375,
  xs: 414,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
  '2xl': 1920,
  // '3xl': 2560,
} as const;

/**
 * Get the current breakpoint based on window width
 */
function getCurrentBreakpoint(width: number): Breakpoint {
  // if (width >= breakpoints['3xl']) return '3xl';
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  if (width >= breakpoints.xs) return 'xs';
  return 'xxs';
}

// Shared state for breakpoint
const currentBreakpoint = ref<Breakpoint>('lg');

export function useBreakpoint() {
  let resizeObserver: ResizeObserver | null = null;

  const updateBreakpoint = () => {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    currentBreakpoint.value = getCurrentBreakpoint(width);
  };

  onMounted(() => {
    // Set initial breakpoint
    updateBreakpoint();

    // Use ResizeObserver for more efficient resize detection
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateBreakpoint();
      });
      resizeObserver.observe(document.documentElement);
    } else {
      // Fallback to window resize event
      window.addEventListener('resize', updateBreakpoint);
    }
  });

  onBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    } else {
      window.removeEventListener('resize', updateBreakpoint);
    }
  });

  return {
    currentBreakpoint,
    breakpoints,
  };
}
