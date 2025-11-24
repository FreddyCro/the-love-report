<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import LChatBubbleF from './LChatBubble.vue';

const imgSrc = 'https://picsum.photos/1200/800?random=1';
const imgWrapA = ref<HTMLElement | null>(null);
const imgWrapB = ref<HTMLElement | null>(null);
const imgWrapC = ref<HTMLElement | null>(null);
const imgWrapD = ref<HTMLElement | null>(null);
const imgWrapE = ref<HTMLElement | null>(null);
const imgWrapF = ref<HTMLElement | null>(null);
const imgWrapG = ref<HTMLElement | null>(null);
const imgWrapH = ref<HTMLElement | null>(null);
const scrollTriggerInstances: any[] = [];

onMounted(async () => {
  // Use the composable to get GSAP, ScrollTrigger, and Lenis
  const { gsap } = await useScrollAnimation();

  // Wait for DOM and image to layout
  await nextTick();

  handleAnimationPartA(gsap);
  handleAnimationPartB(gsap);
  handleAnimationPartC(gsap);
  handleAnimationPartD(gsap);
});

// Register lifecycle hook BEFORE any async operations
onBeforeUnmount(() => {
  // Clean up all ScrollTriggers created by this component
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  scrollTriggerInstances.length = 0;
});

function handleAnimationPartA(gsap: any) {
  // Elements
  const wrapA = imgWrapA.value;
  const wrapB = imgWrapB.value;
  // bubble 1 selector: .stack-bubble1（確保只選 part a 的 bubble）
  const bubbleA = document.querySelector('.stack-bubble1');
  const innerImgA = wrapA?.querySelector('img') as HTMLElement | null;
  const innerImgB = wrapB?.querySelector('img') as HTMLElement | null;
  const targetElA = innerImgA || wrapA;
  const targetElB = innerImgB || wrapB;

  // 1. img a scroll 範圍 200vh
  // 2. img a scroll 0=>100vh 時，左右 crop 200px
  // 3. img a scroll 100vh => 200vh 時，維持不動
  // 4. img a scroll 100vh => 200vh 時，img b 由右往左滑 50vw
  // 5. img a scroll 100vh => 200vh 時，bubble a 由左往右滑 50vw

  // Helper: set crop via clip-path
  function setCrop(el: HTMLElement, px: number) {
    el.style.clipPath = `inset(0px ${px}px 0px ${px}px)`;
  }

  // Animation 1: img a crop (-50vh~50vh)
  if (targetElA) {
    const stCrop = gsap.to(targetElA, {
      scrollTrigger: {
        trigger: wrapA,
        start: 'top-=100vh top',
        end: 'top+=100vh top',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // crop 0~200px
          const px = Math.round(self.progress * 200);
          setCrop(targetElA, px);
        },
        onLeave: () => setCrop(targetElA, 200),
        onEnterBack: () => setCrop(targetElA, 0),
      },
    });
    scrollTriggerInstances.push(stCrop.scrollTrigger);
  }

  // Animation 2: img b 由右往左滑 50vw (0vh~100vh)
  if (targetElB) {
    const stImgB = gsap.fromTo(
      targetElB,
      { x: '100vw' },
      {
        x: '60vw',
        ease: 'none',
        scrollTrigger: {
          trigger: wrapA,
          start: 'top top',
          end: '+=100vh',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
    scrollTriggerInstances.push(stImgB.scrollTrigger);
  }

  // Animation 3: bubble a 由最左到最右滑動 (0vh~100vh)
  if (bubbleA) {
    // 先重設 bubble 位置到最左
    gsap.set(bubbleA, { x: '-30vw' });
    const stBubbleA = gsap.to(bubbleA, {
      x: '30vw',
      ease: 'none',
      scrollTrigger: {
        trigger: wrapA,
        start: 'top top',
        end: '+=200vh',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    scrollTriggerInstances.push(stBubbleA.scrollTrigger);
  }

  // Animation 4: img a crop 固定 (100vh~200vh)
  if (targetElA) {
    const stCropHold = gsap.to(targetElA, {
      scrollTrigger: {
        trigger: wrapA,
        start: 'top+=100vh top',
        end: 'top+=200vh top',
        scrub: false,
        invalidateOnRefresh: true,
        onEnter: () => setCrop(targetElA, 200),
        onLeaveBack: () => setCrop(targetElA, 200),
      },
    });
    scrollTriggerInstances.push(stCropHold.scrollTrigger);
  }
}

function handleAnimationPartB(gsap: any) {
  const wrapC = imgWrapC.value;
  const wrapD = imgWrapD.value;
  const imgC = wrapC?.querySelector('img') as HTMLElement | null;
  const imgD = wrapD?.querySelector('img') as HTMLElement | null;
  const bubbleB1 = document.querySelector(
    '.partb-bubble1'
  ) as HTMLElement | null;
  const bubbleB2 = document.querySelector(
    '.partb-bubble2'
  ) as HTMLElement | null;

  // 先初始化 bubble 位置
  if (bubbleB1) gsap.set(bubbleB1, { x: '50vw' }); // 從右邊開始
  if (bubbleB2) gsap.set(bubbleB2, { x: '-50vw' }); // 從左邊開始

  // 上區塊動畫：img c 淡入
  if (imgC) {
    const stImgC = gsap.fromTo(
      imgC,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapC,
          start: 'top 80%',
          end: 'top 40%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
    scrollTriggerInstances.push(stImgC.scrollTrigger);
  }

  // 上區塊動畫：bubble b1 由右往左滑
  if (bubbleB1) {
    const stBubbleB1 = gsap.to(bubbleB1, {
      x: '0vw',
      ease: 'none',
      scrollTrigger: {
        trigger: wrapC,
        start: 'top 80%',
        end: 'top 40%',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    scrollTriggerInstances.push(stBubbleB1.scrollTrigger);
  }

  // 下區塊動畫：img d 淡入
  if (imgD) {
    const stImgD = gsap.fromTo(
      imgD,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapD,
          start: 'top 80%',
          end: 'top 40%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
    scrollTriggerInstances.push(stImgD.scrollTrigger);
  }

  // 下區塊動畫：bubble b2 由左往右滑
  if (bubbleB2) {
    const stBubbleB2 = gsap.to(bubbleB2, {
      x: '0vw',
      ease: 'none',
      scrollTrigger: {
        trigger: wrapD,
        start: 'top 80%',
        end: 'top 40%',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    scrollTriggerInstances.push(stBubbleB2.scrollTrigger);
  }
}

function handleAnimationPartC(_gsap: any) {
  // Placeholder for potential future use
}

function handleAnimationPartD(_gsap: any) {
  // Placeholder for potential future use
}
</script>

<template>
  <section v-if="true" class="h-screen" />
  <section v-else class="section container">
    <!-- part a -->
    <div class="part part-a-stack">
      <div class="stack-container">
        <!-- img 1: 最底層 -->
        <div ref="imgWrapA" class="mock-image-wrapper stack-img1">
          <NuxtImg
            :src="imgSrc"
            width="1920"
            height="900"
            alt="Mock image from picsum"
            format="webp"
            class="mock-image"
          />
        </div>
        <!-- img 2: 中間層 -->
        <div ref="imgWrapB" class="mock-image-wrapper stack-img2">
          <NuxtImg
            src="https://picsum.photos/400/300"
            width="400"
            height="300"
            alt="Mock image from picsum"
            format="webp"
            class="mock-image"
          />
        </div>
        <!-- bubble 1: 最上層 -->
        <LChatBubbleF
          shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
          pointer="top-right"
          radius="16px"
          class="stack-bubble1"
        >
          這是一個聊天泡泡範例
        </LChatBubbleF>
      </div>
    </div>

    <div class="section-gap" />

    <!-- part b -->
    <div class="part part-b mt-20">
      <!-- 上區塊 -->
      <div class="part-b-top">
        <div ref="imgWrapC" class="mock-image-wrapper partb-imgc">
          <NuxtImg
            :src="imgSrc"
            width="800"
            height="450"
            alt="Mock image from picsum"
            format="webp"
            class="mock-image"
          />
          <LChatBubbleF
            shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            pointer="bottom-left"
            radius="16px"
            class="partb-bubble1"
          >
            聊天泡泡 B1
          </LChatBubbleF>
        </div>
      </div>
      <!-- 下區塊 -->
      <div class="part-b-bottom">
        <div ref="imgWrapD" class="mock-image-wrapper partb-imgd">
          <NuxtImg
            :src="imgSrc"
            width="800"
            height="450"
            alt="Mock image from picsum"
            format="webp"
            class="mock-image"
          />
          <LChatBubbleF
            shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            pointer="top-right"
            radius="16px"
            class="partb-bubble2"
          >
            聊天泡泡 B2
          </LChatBubbleF>
        </div>
      </div>
    </div>

    <!-- part c -->
    <div class="part">
      <div ref="imgWrapE" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>
      <div ref="imgWrapF" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>
      <div ref="imgWrapG" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>
      <div ref="imgWrapH" class="mock-image-wrapper">
        <NuxtImg
          :src="imgSrc"
          width="800"
          height="450"
          alt="Mock image from picsum"
          format="webp"
          class="mock-image"
        />
      </div>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="top-left"
        radius="16px"
      >
        聊天泡泡 C1
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="top-right"
        radius="16px"
      >
        聊天泡泡 C2
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="bottom-left"
        radius="16px"
      >
        聊天泡泡 C3
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="bottom-right"
        radius="16px"
      >
        聊天泡泡 C4
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="top-left"
        radius="16px"
      >
        聊天泡泡 C5
      </LChatBubbleF>

      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="top-right"
        radius="16px"
      >
        聊天泡泡 C6
      </LChatBubbleF>
    </div>

    <!-- part d -->
    <div class="part">
      <LChatBubbleF
        shadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        pointer="bottom-left"
        radius="16px"
      >
        最後一個聊天泡泡
      </LChatBubbleF>
    </div>
  </section>
</template>

<style lang="scss">
.section {
  padding: 2rem 0;
}
.section__title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

/* part a stacking styles */
.part-a-stack .stack-container {
  position: relative;
  width: 100%;
  height: 450px;
  margin: 0 auto 2rem auto;
}
.stack-img1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.stack-img2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.stack-bubble1 {
  position: absolute;
  bottom: 32px;
  left: 0;
  z-index: 3;
  width: 20%;
  pointer-events: none;
  background: #ffe7b8;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 999px;
}

.section-gap {
  height: 10rem;
}

/* part b stacking styles */
.partb-imgc,
.partb-imgd {
  position: relative;
  margin-bottom: 2rem;
}

.partb-bubble1 {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 3;
  width: 30%;
  pointer-events: none;
  background: #ffe7b8;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 999px;
}

.partb-bubble2 {
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 3;
  width: 30%;
  pointer-events: none;
  background: #d4f1f4;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 999px;
}
</style>
<style lang="scss">
.test-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
}
.test-img-wrapper {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 4px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
