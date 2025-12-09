/**
 * Section A Frame Animation Timings
 * All values in milliseconds
 *
 * Usage:
 * - Import SECTION_A_DURATIONS for useSequentialFrames
 * - Import SECTION_A_FRAME_TIMINGS for individual frame components
 * - Use toCssTime() to convert ms to CSS time format
 */

/**
 * Detailed timing configurations for each frame
 */
export const SECTION_A_FRAME_TIMINGS = {
  FRAME_1: {
    CROP_DURATION: 1000,
    CROSSFADE_DURATION: 1000,
    CROSSFADE_DELAY: 1000,
    IMG3_DURATION: 1000,
    IMG3_DELAY: 1000,
    TEXT_DURATION: 1000,
    TEXT_DELAY: 1000,
  },
  FRAME_2: {
    IMG_DURATION: 1000,
    IMG_DELAY: 1500, // Wait for Frame 1 second phase to complete
    TEXT_DURATION: 1000,
    TEXT_DELAY: 1800, // 1000ms (wait for Frame 1) + 300ms (original delay)
  },
  FRAME_3: {
    IMG_DURATION: 1000,
    TEXT_DURATION: 1000,
    TEXT_DELAY: 300,
  },
  FRAME_4: {
    IMG1_DURATION: 1000,
    TEXT1_DURATION: 1000,
    IMG2_DURATION: 1000,
    IMG2_DELAY: 750,
    TEXT2_DURATION: 1000,
    TEXT2_DELAY: 750,
    IMG3_DURATION: 1000,
    IMG3_DELAY: 1500,
    TEXT3_DURATION: 1000,
    TEXT3_DELAY: 1500,
    TEXT4_DURATION: 1000,
    TEXT4_DELAY: 1500,
  },
  FRAME_5: {
    IMG_DURATION: 1000,
    TEXT1_DURATION: 1000,
    TEXT2_DURATION: 1000,
  },
  FRAME_6: {
    IMG_DURATION: 1000,
    TEXT_DURATION: 1000,
  },
} as const;

/**
 * Calculate total animation duration for a frame
 * Finds the longest animation chain (delay + duration)
 */
function calculateTotalDuration(timings: Record<string, number>): number {
  let maxDuration = 0;

  // Find all delay + duration pairs
  Object.keys(timings).forEach((key) => {
    if (key.includes('DELAY')) {
      const baseKey = key.replace('_DELAY', '');
      const durationKey = `${baseKey}_DURATION`;

      if (timings[durationKey]) {
        const total = timings[key] + timings[durationKey];
        maxDuration = Math.max(maxDuration, total);
      }
    } else if (key.includes('DURATION') && !key.includes('DELAY')) {
      // For durations without delays
      maxDuration = Math.max(maxDuration, timings[key]);
    }
  });

  return maxDuration;
}

/**
 * Exported total durations for useSequentialFrames
 * These are automatically calculated from SECTION_A_FRAME_TIMINGS
 */
export const SECTION_A_DURATIONS = {
  FRAME_1: calculateTotalDuration(SECTION_A_FRAME_TIMINGS.FRAME_1), // 2000ms (1000 + 1000)
  FRAME_2: calculateTotalDuration(SECTION_A_FRAME_TIMINGS.FRAME_2), // 2300ms (1300 + 1000)
  FRAME_3: calculateTotalDuration(SECTION_A_FRAME_TIMINGS.FRAME_3), // 1300ms (300 + 1000)
  FRAME_4: calculateTotalDuration(SECTION_A_FRAME_TIMINGS.FRAME_4), // 2500ms (1500 + 1000)
  FRAME_5: calculateTotalDuration(SECTION_A_FRAME_TIMINGS.FRAME_5), // 1000ms
  FRAME_6: calculateTotalDuration(SECTION_A_FRAME_TIMINGS.FRAME_6), // 1000ms
} as const;

/**
 * Helper to convert milliseconds to CSS time string
 * @param ms - Time in milliseconds
 * @returns CSS time string (e.g., "1000ms")
 */
export function toCssTime(ms: number): string {
  return `${ms}ms`;
}
