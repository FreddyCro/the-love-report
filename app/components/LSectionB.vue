<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import LStateCard from './LStateCard.vue';
import LStateCardGroup from './LStateCardGroup.vue';

type CartType = {
  title: string;
  description: string;
  note: string;
};

const data: CartType[] = [
  {
    title: '全球Z世代近7成單身',
    description:
      '數據研究公司GlobalWebIndex（GWI）2025年發布的《Z世代報告》針對32個地區、年齡介於16至27歲的20萬名年輕人進行調查，該報告指出，目前僅有3成受訪者的感情狀態為「已婚或戀愛中」，其餘7成為「單身」（69％）或「離婚及其他」（1％）。',
    note: '資料來源／GWI 2025年《Z世代報告》<br>註：該報告針對32個地區、年齡介於16至27歲的20萬名年輕人進行調查。',
  },
  {
    title: '台灣有4成年輕人母胎單身',
    description:
      '不只是國外婚戀市場冷清，中央研究院2024年《家庭動態調查》顯示，16至25歲的未婚受訪者中，從未交過男女朋友的比例達40％。該調查為中研院自1999年起針對台灣家庭樣貌進行的長期調查，目前持續追蹤超過6000位受訪者 。',
    note: '資料來源／中央研究院2024年《家庭動態調查》<br>註：該調查以全台428位16至25歲的未婚受訪者為分析樣本。',
  },
  {
    title: '女性更不想結婚',
    description:
      '根據中央研究院2024年《家庭動態調查》統計顯示，在未婚族群中，女性「不太想結婚」與「非常不想結婚」的比例皆超過5成且明顯高於同齡男性。',
    note: '資料來源／中央研究院2024年《家庭動態調查》<br>註：該調查以全台2250位16至45歲的未婚受訪者為分析樣本。',
  },
  {
    title: '享受一個人 不想結婚的理由',
    description: '進一步詢問16至45歲未婚者為何沒有結婚，主要原因包含：',
    note: '資料來源／中央研究院2024年《家庭動態調查》<br>註：該調查以全台2991位16至45歲的未婚受訪者為分析樣本。',
  },
  {
    title: '超過25%的青年人口找不到對象',
    description:
      '現代人步入親密關係的機會似乎比想像中更少。研究顯示，16至45歲的人口中，有超過60％的人表示，日常生活中「很少有機會」或「幾乎沒有機會」遇到理想的交往對象。',
    note: '資料來源／中央研究院2024年《家庭動態調查》<br>註：該調查以全台2250位16至45歲的未婚受訪者為分析樣本。',
  },
  {
    title: '青壯世代未婚率持續攀升',
    description: '缺乏戀愛經驗加上理想伴侶難尋，台灣各年齡層的未婚率近15年持續攀升。內政部人口統計資料顯示，2024年35至39歲人口未婚率達41.4％，較15年前增加17.6％。',
    note: '資料來源／內政部人口統計資料。 單位：%<br>註1：未婚率計算公式為（該年齡區間未婚人數÷該年齡區間總人數）×100％。註2：統計中的「未婚」不包括已婚、離婚、婚姻關係終止和喪偶者。',
  },
];

const isEntered = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scrollTriggerInstances: any[] = [];

defineExpose({
  isEntered,
});

onMounted(async () => {
  // Use the composable to get GSAP, ScrollTrigger, and Lenis
  const { gsap, ScrollTrigger, lenis } = await useScrollAnimation();

  // Wait for DOM and image to layout
  await nextTick();

  // Add a small delay to ensure everything is rendered
  setTimeout(() => {
    handleIsEntered();
    handleAnimation(gsap, ScrollTrigger, lenis);
  }, 100);
});

// Register lifecycle hook BEFORE any async operations
onBeforeUnmount(() => {
  // Clean up all ScrollTriggers created by this component
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) trigger.kill();
  });

  scrollTriggerInstances.length = 0;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleAnimation(gsap: any, ScrollTrigger: any, _lenis: any) {
  const section = document.querySelector('.section-b');
  if (!section) return;

  const cards = section.querySelectorAll('.state-card');
  if (cards.length === 0) return;

  // Create timeline for the stacking animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=300%', // Extend the scroll distance for smoother animation
      pin: true, // Pin (freeze) the section
      scrub: 1,
      anticipatePin: 1, // Smooth pin start
      invalidateOnRefresh: true,
      onRefresh: () => {
        // Reset cards position when scrolltrigger refreshes
        gsap.set(cards, {
          y: '100vh',
          opacity: 0,
        });
      },
    },
  });

  // Set initial state at the beginning of timeline (position 0)
  tl.set(
    cards,
    {
      y: '100vh',
      opacity: 0,
    },
    0
  );

  // Add each card to timeline with stacking effect
  cards.forEach((card, index) => {
    const yOffset = index * 20; // Each card slightly offset from previous
    const rotation = (index - 2.5) * 2; // Slight rotation for visual interest

    tl.to(
      card,
      {
        y: yOffset,
        opacity: 1,
        rotation: rotation,
        duration: 1,
        ease: 'power2.out',
      },
      index * 0.4 // Stagger each card animation
    );
  });

  // Store the ScrollTrigger instance for cleanup
  if (tl.scrollTrigger) {
    scrollTriggerInstances.push(tl.scrollTrigger);
  }

  // Refresh ScrollTrigger after setup to ensure correct calculations
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

function handleIsEntered() {
  isEntered.value = true;
}
</script>

<template>
  <section class="section-b">
    <div class="l-container">
      <LStateCardGroup>
        <LStateCard
          v-for="(item, index) in data"
          :key="index"
          class="state-card"
          :title="item.title"
          :description="item.description"
          :note="item.note"
        >
          <div class="chart-placeholder">
            <span>圖表 {{ index + 1 }}</span>
          </div>
        </LStateCard>
      </LStateCardGroup>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-b {
  min-height: 100vh;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.l-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.state-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  will-change: transform, opacity;
}

.chart-placeholder {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  opacity: 0.8;
}
</style>
