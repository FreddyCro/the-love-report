<script lang="ts" setup>
import sectionEData from "~/locales/section-e.json";
import LPic from "./LPic.vue";
import LSectionHeader from "./LSectionHeader.vue";

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
	img?: {
		src: string;
		ext: string;
		use2x?: boolean;
		webp?: boolean;
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
	<section class="section-e min-h-screen l-article bg-white rounded-t-[120px] py-15 sm:pt-20 sm:pb-30">
		<div class="l-container">
			<LSectionHeader
				:title="content.title"
				:intro="content.intro"
				title-color="text-black"
				dialogbox-img="p0501_dialogbox_pc"
				intro-container-class="space-y-9"
			/>

			<!-- Cases -->
			<div v-for="caseItem in cases" :key="caseItem.index" class="mt-14 sm:mt-[68px]">
				<!-- Step Indicator -->
				<h3 class="section-e__step pb-2 mb-2 border-b border-black font-bold">
					{{ caseItem.title }}
				</h3>

				<!-- Content Blocks -->
				<div v-for="(block, blockIndex) in caseItem.content" :key="blockIndex">
					<!-- Title Block -->
					<h5 v-if="block.type === 'title'" class="mb-5 l-h5 font-bold pb-2 border-b border-black sm:pb-0 sm:border-0">
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
						<h5 class="l-pc-h5 font-bold">{{ block.desc }}</h5>
					</div>

					<!-- Data Block -->
					<div v-else-if="block.type === 'data'" class="my-9">
						<h5 v-if="block.title" class="l-h5 text-black font-bold">
							{{ block.title }}
						</h5>
						<div class="mt-5 mx-auto max-w-[530px]">
							<LPic
								v-if="block.img.src"
								:src="block.img.src"
								ext="png"
								:use2x="block.img.use2x ?? false"
								:webp="block.img.webp ?? true"
							/>
						</div>
						<p v-if="block.note" class="pic-info pt-5">{{ block.note }}</p>
					</div>

					<!-- Image Block -->
					<div v-else-if="block.type === 'image'">
						<LPic
							v-if="block.src"
							:src="block.src"
							:ext="block.ext || 'jpg'"
							:use-prefix="block.usePrefix ?? false"
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

	&__step {
		font-size: var(--mob-h3-font-size);
  		line-height: var(--mob-h3-line-height);
		  @include rwd-min(sm) {
			font-size: var(--pc-h4-font-size);
			line-height: var(--pc-h4-line-height);
		}
	}
}
</style>
