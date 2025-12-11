import useTrackingEvent from './useTrackingEvent';

/**
 * GA Section View 追蹤
 *
 * 使用單一 IntersectionObserver 監測所有 `.js-ga-sec-view` 元素，
 * 當元素進入 viewport 時觸發 GA 事件，每個元素只觸發一次。
 *
 * @example
 * // 1. 在 app.vue 的 onMounted 中呼叫
 * onMounted(() => {
 *   useGaSectionView();
 * });
 *
 * // 2. 在需要追蹤的位置放置 marker
 * <div class="js-ga-sec-view" data-ga-label="keyvisual-up" />
 * <div class="js-ga-sec-view" data-ga-label="overview" />
 *
 * // Label 參考: keyvisual-upper, keyvisual-lower, overview, story,
 * // AI_CH1, AI_CH2, AI_CH3, AI_CH4, value, trust, busy, 3C, unrealistic, question, editor
 */
export function useGaSectionView() {
  const { gaSectionView } = useTrackingEvent();

  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const label = (entry.target as HTMLElement).dataset.gaLabel;
            if (label) {
              gaSectionView(label);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );

    document.querySelectorAll('.js-ga-sec-view').forEach((el) => {
      observer.observe(el);
    });
  });
}