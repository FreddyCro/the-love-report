<script lang="ts" setup>
import { ref } from 'vue';
import LPic from './LPic.vue';

// Directly declare testImages as objects matching LPic props
const testImages = ref([
  {
    src: '/img/button_card_change_back',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/button_card_click_left',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/button_card_click_right',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/button_card_flip',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/button_card_plus_corner',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/button_click_down_below',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_love_blue01',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_love_blue02',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_love_red01',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_love_red02',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p01_frame01_00_pcpad',
    ext: 'jpg',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p01_frame01_01',
    ext: 'png',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p01_frame01_02',
    ext: 'png',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p01_frame01_03',
    ext: 'png',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p01_frame02_04',
    ext: 'png',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p01_frame03_05',
    ext: 'png',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p01_frame04_06',
    ext: 'png',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p01_frame04_07',
    ext: 'png',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p01_frame04_08',
    ext: 'png',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p01_frame05_09',
    ext: 'png',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p01_frame06_10',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0201_dialogbox_pad',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0201_maintext_01',
    ext: 'svg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0201_maintext_02',
    ext: 'svg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0202_card03_info',
    ext: 'svg',
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0202_card04_info01',
    ext: 'svg',
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0202_card04_info02',
    ext: 'svg',
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0202_card04_info03',
    ext: 'svg',
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0202_card04_info04',
    ext: 'svg',
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0202_card04_info05',
    ext: 'svg',
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0202_card05_info',
    ext: 'svg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0202_card06_info',
    ext: 'svg',
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0301_dialogbox',
    ext: 'svg',
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0302_card01_piccir_b_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card01_piccir_s_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card01_picsq',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card02_piccir_b_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card02_piccir_s_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card02_picsq',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card03_piccir_b_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card03_piccir_s_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card03_picsq',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card04_piccir_b_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card04_piccir_s_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card04_picsq',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card05_piccir_b_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card05_piccir_s_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card05_picsq',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card06_piccir_b_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card06_piccir_s_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0302_card06_picsq',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0401_dialogbox',
    ext: 'svg',
    default: 'pc',
    srcset: ['pc', 'mob'],
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0402_heartsign_pcpadmob',
    ext: 'svg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0403_piccir_liora_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0403_piccir_luma_pcpadmob',
    ext: 'png',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0404_picsq_liora__pcpadmob',
    ext: 'jpg',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0404_picsq_luma__pcpadmob',
    ext: 'jpg',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0405_picsq01_luma__pcpadmob',
    ext: 'jpg',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0405_picsq02_luma__pcpadmob',
    ext: 'jpg',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0501_dialogbox',
    ext: 'svg',
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0502_dialogboxes',
    ext: 'png',
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0502_picsq01_pcpadmob',
    ext: 'jpg',
    usePrefix: false,
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0502_picsq02_pcpadmob',
    ext: 'jpg',
    usePrefix: false,
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0601_dialogbox',
    ext: 'svg',
    use2x: false,
    webp: false,
  },
  {
    src: '/img/intimate_relationships_p0602_picsq01',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0602_picsq02',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0602_picsq03',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0602_picsq04',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0602_picsq05',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
  {
    src: '/img/intimate_relationships_p0602_picsq06',
    ext: 'jpg',
    default: 'pad',
    srcset: ['pad', 'mob'],
    use2x: false,
    webp: true,
  },
]);
</script>

<template>
  <div class="test-all-img w-full p-10 overflow-hidden">
    <div class="flex gap-4 flex-wrap">
      <div
        v-for="(item, index) in testImages"
        :key="index"
        class="relative group flex items-center justify-center w-[100px] h-[100px] bg-gray-50"
      >
        <LPic
          :src="item.src"
          :srcset="item.srcset"
          :default="item.default"
          :ext="item.ext"
          :use-prefix="item.usePrefix"
          :use2x="false"
          :webp="item.webp"
        />

        <div
          class="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 bg-black/60 text-white text-xs p-2 text-center"
        >
          <div class="z-10 bg-black p-1">
            {{ item.src }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.test-all-img {
  .l-pic {
    display: contents;
    width: 100%;
    height: 100%;
  }

  .l-pic-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
