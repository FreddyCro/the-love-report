import { ref } from 'vue';

// Shared state for Section B's isEntered status
// This allows sibling components (LSectionA and LSectionB) to share state
const sectionBEntered = ref(false);

export function useSectionBState() {
  return {
    sectionBEntered,
  };
}
