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
	classname?: string;
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
						<div class="mt-5 relative mx-auto" :class="block.classname">
							<div
								v-for="(item, itemIndex) in (block.desc as any[])"
								:key="itemIndex"
								class="flex gap-2 items-end px-6 py-[13px] w-fit absolute"
								:class="[
									`${block.classname}__${itemIndex}`,
									item.style?.color === 'red'
										? 'bg-love-red-02'
										: 'bg-love-blue-02',
									item.style?.position === 'left-bottom'
										? 'rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px]'
										: item.style?.position === 'right-bottom'
										? 'rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px]'
										: 'rounded-[20px]',
								]"
							>
								<p class="text-[40px] font-bold text-black">
									{{ item.prefix }}
								</p>
								<h5 class="text-black l-h5 font-bold">{{ item.text }}</h5>
							</div>
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

	.tinder-data {
		width: 366px;
		height: 541px;

		@include rwd-min(sm) {
			width: 530px;
			height: 470px;
		}

		&__0 {
			left: 6px;
			top: 15px;

			@include rwd-min(sm) {
				left: 7px;
				top: 19px;
				transform: rotate(10deg);
			}
		}
		&__1 {
			left: 110px;
			top: 110px;
			transform: rotate(-10deg);

			@include rwd-min(sm) {
				left: 114px;
				top: 122px;
				transform: rotate(-5deg);
			}
		}
		&__2 {
			right: 102px;
			top: 230px;
			transform: rotate(10deg);

			@include rwd-min(sm) {
				right: 5px;
				top: 215px;
				transform: rotate(3deg);
			}
		}
		&__3 {
			left: 111px;
			top: 340px;
			transform: rotate(5deg);

			@include rwd-min(sm) {
				left: 63px;
				top: 294px;
			}
		}
		&__4 {
			right: 146px;
			bottom: 15px;
			transform: rotate(5deg);

			@include rwd-min(sm) {
				right: 44px;
				bottom: 20px;
				transform: rotate(-10deg);
			}
		}
	}

	.housework-data {
		display: none;
		@include rwd-min(sm) {
			display: block;
			width: 530px;
			height: 525px;
		}
		&__0 {
			left: 7px;
			top: 39px;
			transform: rotate(-10deg);
		}
		&__1 {
			right: 9.5px;
			top: 162px;
			transform: rotate(5deg);
		}
		&__2 {
			left: 9px;
			top: 280px;
			transform: rotate(-5deg);
		}
		&__3 {
			right: 36px;
			bottom: 33px;
			transform: rotate(5deg);
		}
	}
}
</style>
