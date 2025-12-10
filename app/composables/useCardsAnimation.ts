interface CardData {
  rotation: number;
  [key: string]: any;
}

interface UseCardsAnimationOptions {
  cardsContainerClass: string;
  cardClass: string;
  cardsFallbackClass?: string;
  cardData: CardData[];
  cardStaggerDelay: number;
  scrollPerCard?: number;
  scrollTriggerInstances: any[];
}

/**
 * Composable for creating GSAP card stacking animation
 *
 * @param options - Configuration options
 * @returns Cleanup function to remove event listeners
 */
export const useCardsAnimation = async (
  gsap: any,
  ScrollTrigger: any,
  options: UseCardsAnimationOptions
): Promise<(() => void) | undefined> => {
  const {
    cardsContainerClass,
    cardClass,
    cardsFallbackClass = '.state-card',
    cardData,
    cardStaggerDelay,
    scrollPerCard = 150,
    scrollTriggerInstances,
  } = options;

  const cardsContainer = document.querySelector(cardsContainerClass);

  if (!cardsContainer) {
    console.warn('Cards container not found');
    return;
  }

  // Prefer JS-prefixed selector for script queries; fall back to regular class if missing
  let cards = cardsContainer.querySelectorAll(cardClass);
  if (!cards || cards.length === 0) {
    cards = cardsContainer.querySelectorAll(cardsFallbackClass);
  }
  if (cards.length === 0) return;

  // Create animation immediately on mount to support bi-directional scrolling
  createCardsAnimation(
    gsap,
    ScrollTrigger,
    cards,
    cardsContainer,
    cardData,
    cardStaggerDelay,
    scrollPerCard,
    scrollTriggerInstances
  );

  // Handle window resize to prevent layout issues
  let resizeTimeout: NodeJS.Timeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (isAnimationCreated) {
        ScrollTrigger.refresh();
      }
    }, 150); // Debounce resize events
  };

  window.addEventListener('resize', handleResize);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimeout);
  };
};

function createCardsAnimation(
  gsap: any,
  ScrollTrigger: any,
  cards: NodeListOf<Element>,
  cardsContainer: Element,
  cardData: CardData[],
  cardStaggerDelay: number,
  scrollPerCard: number,
  scrollTriggerInstances: any[]
) {
  // Calculate scroll distance for smooth card stacking
  // Each card needs sufficient scroll distance to animate smoothly
  // Formula: cards.length * scroll per card
  const scrollDistance = cards.length * scrollPerCard; // Total: 6 cards * 150vh = 900vh

  // Create timeline for the stacking animation (only controls cards, not intro)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cardsContainer,
      start: 'top top',

      // End after all cards have animated and extra viewing space
      end: `+=${scrollDistance}%`,

      // Pin (freeze) only the cards container, not intro
      pin: true,
      pinSpacing: true, // Ensure proper spacing after pin
      scrub: 0.5, // Smooth scrubbing

      // Smooth pin start
      anticipatePin: 1,

      // Recalculate on refresh
      invalidateOnRefresh: true,

      // Control refresh behavior to prevent scroll jumps on resize
      refreshPriority: 0,
      fastScrollEnd: true,
    },
  });

  // Set initial state: cards are below viewport
  tl.set(cards, { y: '100vh', opacity: 1, rotation: 0 }, 0);

  // Cards stack on top of intro (first card appears immediately)
  cards.forEach((card, index) => {
    const yOffset = index * 0; // Each card slightly offset from previous
    const targetRotation = cardData[index]?.rotation || 0; // Use rotation from data

    tl.to(
      card,
      {
        y: yOffset,
        opacity: 1,
        rotation: targetRotation,
        duration: 1,
        ease: 'power2.out',
      },
      index * cardStaggerDelay // First card starts immediately (no initial delay)
    );
  });

  // Store the ScrollTrigger instance for cleanup
  if (tl.scrollTrigger) {
    scrollTriggerInstances.push(tl.scrollTrigger);
  }

  // Refresh ScrollTrigger
  ScrollTrigger.refresh();
}
