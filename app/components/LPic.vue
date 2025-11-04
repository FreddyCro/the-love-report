<script setup lang="ts">
import { computed } from 'vue';
import { PC_BREAKPOINTS, TABLET_BREAKPOINTS } from '@/utils/constants';

type SrcsetType = Array<'mob' | 'pad' | 'pc'>;

interface LeoPicProps {
  id?: string;
  classname?: string;
  src: string;
  srcset?: SrcsetType;
  default?: 'mob' | 'pad' | 'pc';
  ext?: string;
  width?: number;
  height?: number;
  alt?: string;
  altby?: string;
  loading?: 'eager' | 'lazy';
  use2x?: boolean;
  usePrefix?: boolean;
  webp?: boolean;
  pcBreakpoint?: number;
}

const props = withDefaults(defineProps<LeoPicProps>(), {
  use2x: true,
  usePrefix: true,
  webp: true,
  loading: 'lazy',
});

const { VITE_ASSETS_PATH } = import.meta.env;

const DEFAULT_SRCSET: SrcsetType = ['pc', 'pad', 'mob'];
const DEFAULT_EXT = 'jpg';

const srcsetValue = computed(() => props.srcset ?? DEFAULT_SRCSET);
const extValue = computed(() => props.ext ?? DEFAULT_EXT);
const use2xValue = computed(() => props.use2x ?? true);
const usePrefixValue = computed(() => props.usePrefix ?? true);

const mediaQueries = {
  pc: `(min-width: ${props.pcBreakpoint || PC_BREAKPOINTS}px)`,
  pad: `(min-width: ${TABLET_BREAKPOINTS}px)`,
  mob: '',
};

const parsedMedia = computed(() =>
  srcsetValue.value.map((type) => mediaQueries[type])
);

function buildSrcset(
  type: 'mob' | 'pad' | 'pc',
  ext: string,
  use2x: boolean,
  usePrefix: boolean
) {
  const prefix = usePrefix ? `_${type}` : '';
  const base = `${VITE_ASSETS_PATH}${props.src}${prefix}.${ext} 1x`;
  if (!use2x) return base;
  const retina = `${VITE_ASSETS_PATH}${props.src}${prefix}@2x.${ext} 2x`;
  return `${base}, ${retina}`;
}

const parsedSrcset = computed(() =>
  srcsetValue.value.map((type) =>
    buildSrcset(type, extValue.value, use2xValue.value, usePrefixValue.value)
  )
);

const parsedWebpSrcset = computed(() =>
  props.webp
    ? srcsetValue.value.map((type) =>
        buildSrcset(type, 'webp', use2xValue.value, usePrefixValue.value)
      )
    : undefined
);

const parsedDefault = computed(() => {
  const type = props.default ?? 'pc';
  const prefix = usePrefixValue.value ? `_${type}` : '';
  return `${VITE_ASSETS_PATH}${props.src}${prefix}.${extValue.value}`;
});
</script>

<template>
  <picture class="l-pic">
    <template v-for="(media, index) in parsedMedia" :key="media + index">
      <source
        v-if="webp"
        :media="media"
        :srcset="parsedWebpSrcset?.[index]"
        type="image/webp"
      />
      <source
        v-if="srcsetValue.length > 0"
        :media="media"
        :srcset="parsedSrcset[index]"
      />
    </template>
    <img
      :id="id"
      class="l-pic-img"
      :class="classname || ''"
      :src="parsedDefault"
      :alt="alt"
      :aria-labelledby="altby"
      :loading="loading"
      :width="width"
      :height="height"
    />
  </picture>
</template>

<style lang="scss">
.l-pic-img {
  width: 100%;
  height: auto;
  pointer-events: none;
}
</style>
