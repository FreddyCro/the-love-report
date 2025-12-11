<template>
  <div class="js-ga-sec-view" :data-ga-label="label" />
</template>

<script setup lang="ts">
/**
 * GA Section View Marker
 *
 * 放置於需要追蹤的位置，當進入 viewport 時觸發 GA 事件。
 * 搭配 useGaSectionView composable 使用。
 *
 * @example
 * <LGaMarker label="overview" />
 * <LGaMarker label="keyvisual-upper" />
 */
defineProps<{
  label: string;
}>();
</script>
