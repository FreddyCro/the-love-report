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

const dialogboxStyle = computed(() => ({
	backgroundImage: `url("/img/intimate_relationships_${props.dialogboxImg}_dialogbox_pad.svg")`,
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
