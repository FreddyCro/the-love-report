<script lang="ts" setup>
import { computed } from "vue";

interface Props {
	title: string;
	intro: string[];
	titleColor?: string;
	dialogboxImg: string; // e.g. "p0201", "p0401", "p0501", "p0601"
	introContainerClass?: string;
	introParagraphClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
	titleColor: "text-black",
	introContainerClass: "l-container space-y-9",
	introParagraphClass: "l-p",
});

// 使用 Nuxt 的 runtimeConfig 取得環境變數
const config = useRuntimeConfig();
const ASSETS_PATH = config.public.APP_ASSETS_PATH;

const dialogboxStyle = computed(() => ({
	backgroundImage: `url("${ASSETS_PATH}/img/intimate_relationships_${props.dialogboxImg}.svg")`,
}));
</script>

<template>
	<!-- Title -->
	<div class="text-center mb-6">
		<div class="l-dialogbox" :style="dialogboxStyle">
			<h2 class="font-bold" :class="titleColor">{{ title }}</h2>
		</div>
	</div>

	<!-- Intro Text -->
	<div :class="introContainerClass">
		<p v-for="(paragraph, index) in intro" :key="index" :class="introParagraphClass">
			{{ paragraph }}
		</p>
	</div>
</template>
