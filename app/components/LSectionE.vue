<script lang="ts" setup>
import sectionEData from "~/locales/section-e.json";
import LPic from "./LPic.vue";

interface ContentBlock {
	type: string;
	desc?: string | string[];
	title?: string;
	prefix?: string;
	text?: string;
	src?: string;
	note?: string;
	width?: number;
	height?: number;
	ext?: string;
	usePrefix?: boolean;
	use2x?: boolean;
	webp?: boolean;
	style?: {
		color?: string;
		position?: string;
	};
}

interface CaseItem {
	index: number;
	title: string;
	content: ContentBlock[];
}

const content = {
	title: sectionEData.title,
	intro: sectionEData.intro as string[],
};

const cases = sectionEData.cases as CaseItem[];
</script>

<template>
	<section class="section-e min-h-screen l-article bg-white rounded-t-[120px]">
		<div class="l-container">
			<!-- Title -->
			<div class="text-center mb-6">
				<div class="section-e__dialogbox">
					<h2 class="text-black l-h2 font-bold">{{ content.title }}</h2>
				</div>
			</div>

			<!-- Intro Text -->
			<div class="space-y-9">
				<p v-for="(paragraph, index) in content.intro" :key="index" class="l-p">
					{{ paragraph }}
				</p>
			</div>

			<!-- Cases -->
			<div v-for="caseItem in cases" :key="caseItem.index" class="mt-[68px]">
				<!-- Step Indicator -->
				<h3 class="pb-2 mb-2 border-b border-black l-h3 font-bold">
					{{ caseItem.title }}
				</h3>

				<!-- Content Blocks -->
				<div v-for="(block, blockIndex) in caseItem.content" :key="blockIndex">
					<!-- Title Block -->
					<h5 v-if="block.type === 'title'" class="mb-5 l-h5 font-bold">
						{{ block.desc }}
					</h5>

					<!-- Text Block -->
					<div v-else-if="block.type === 'text'" class="space-y-9 mb-9 l-p">
						<p
							v-for="(paragraph, pIndex) in (block.desc as string[])"
							:key="pIndex"
						>
							{{ paragraph }}
						</p>
					</div>

					<!-- Comment Block -->
					<div
						v-else-if="block.type === 'comment'"
						class="px-6 py-2.5 border-2 max-w-[469px] mb-9 mx-auto"
						:class="[
							block.style?.color === 'red'
								? 'border-love-red-03'
								: 'border-love-blue-03',
							block.style?.position === 'left-bottom'
								? 'rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px]'
								: block.style?.position === 'right-bottom'
								? 'rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px]'
								: 'rounded-[20px]',
						]"
					>
						<h5 class="l-h5 font-bold">{{ block.desc }}</h5>
					</div>

					<!-- Data Block -->
					<div v-else-if="block.type === 'data'" class="my-9">
						<h5 v-if="block.title" class="l-mob-h5 text-black font-bold">
							{{ block.title }}
						</h5>
						<div class="mt-5 mx-auto max-w-[530px]">
							<LPic
								v-if="block.src"
								:src="block.src"
								:ext="block.ext || 'png'"
								:use2x="block.use2x ?? false"
								:webp="block.webp ?? true"
								:width="block.width"
								:height="block.height"
							/>
						</div>
						<p v-if="block.note" class="pic-info pt-5">{{ block.note }}</p>
					</div>

					<!-- Image Block -->
					<div v-else-if="block.type === 'image'">
						<LPic
							v-if="block.src"
							:src="block.src"
							:ext="block.ext || 'png'"
							:use2x="block.use2x ?? false"
							:webp="block.webp ?? true"
							:width="block.width"
							:height="block.height"
						/>
						<p v-if="block.note" class="mt-2 pic-info">{{ block.note }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins" as *;

.section-e {
	padding: 80px 0 120px;

	&__dialogbox {
		width: 240px;
		height: 90px;
		background-image: url("/img/intimate_relationships_p0501_dialogbox_pc.svg");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		justify-content: center;
		margin: 0 auto;
		padding-top: 6px;
	}
}
</style>
