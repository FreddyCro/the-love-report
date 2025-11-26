<script lang="ts" setup>
import sectionCData from "~/locales/section-c.json";
import LPic from "./LPic.vue";

interface CaseItem {
	id: string;
	name: string;
	age: string;
	occupation: string;
	tag?: string;
	story: string;
	title: string;
	desc: string;
	avatar?: string;
	imgCircle: string;
	imgSquare: string;
}

const content = {
	title: sectionCData.title,
	intro: sectionCData.intro as string[],
};

const cases = sectionCData.cases as CaseItem[];
</script>

<template>
	<section class="section-c bg-love-blue-01 rounded-t-[120px]">
		<!-- Title -->
		<div class="text-center mb-6">
			<div class="section-c__dialogbox">
				<h2 class="text-love-blue-03">{{ content.title }}</h2>
			</div>
		</div>
		<!-- Intro Text -->
		<div class="l-container space-y-9">
			<p v-for="(paragraph, index) in content.intro" :key="index">
				{{ paragraph }}
			</p>
		</div>

		<!-- Avatar Selection -->
		<div
			class="my-6 flex justify-between items-center gap-4 max-w-[712px] mx-auto"
		>
			<button
				class="w-[50px] h-[50px] shrink-0 cursor-pointer"
				aria-label="上一個"
			>
				<LPic
					src="/img/button_card_click_left"
					ext="svg"
					:use-prefix="false"
					:use2x="false"
					:webp="false"
					:width="50"
					:height="50"
					classname=""
				/>
			</button>
			<button
				v-for="caseItem in cases"
				:key="caseItem.id"
				class="w-20 h-20 shrink-0 cursor-pointer"
			>
				<LPic
					:src="caseItem.imgCircle"
					ext="png"
					:use-prefix="false"
					:use2x="false"
					:webp="true"
				/>
			</button>
			<button
				class="w-[50px] h-[50px] shrink-0 cursor-pointer"
				aria-label="下一個"
			>
				<LPic
					src="/img/button_card_click_right"
					ext="svg"
					:use-prefix="false"
					:use2x="false"
					:webp="false"
					:width="50"
					:height="50"
					classname=""
				/>
			</button>
		</div>

		<!-- Case Cards -->
		<!-- TODO: 卡牌向右出現、文字104... -->
		<div class="section-c__cards l-container flex gap-6 overflow-x-hidden">
			<div
				v-for="caseItem in cases"
				:key="caseItem.id"
				class="bg-white rounded-[30px] border-2 border-love-blue-02 pt-10 px-7 pb-[52px] relative overflow-hidden shrink-0 w-full max-w-[561px] max-h-[486px]"
			>
				<div class="flex gap-6 mb-7">
					<div class="w-[154px] h-[158px] py-0.5">
						<LPic
							:src="caseItem.imgSquare"
							ext="jpg"
							default="pad"
							:srcset="['pad', 'mob']"
							:use2x="false"
							:webp="true"
							:width="154"
							:height="154"
						/>
					</div>
					<div class="flex-1 text-black">
						<h4 class="mb-2">
							{{ caseItem.name }}
							<span class="text-card-regular"
								>{{ caseItem.age }}{{ caseItem.occupation ? " | " : ""
								}}{{ caseItem.occupation }}</span
							>
						</h4>
						<p v-if="caseItem.tag" class="text-card-bold mb-2">
							{{ caseItem.tag }}
						</p>
						<p>{{ caseItem.story }}</p>
					</div>
				</div>

				<div class="pt-7 border-t border-black">
					<h5 class="text-love-red-03 mb-1">{{ caseItem.title }}</h5>
					<p class="line-clamp-4">
						{{ caseItem.desc }}
					</p>
				</div>

				<button
					class="section-c__corner-button absolute right-4 bottom-5 w-5 h-5 cursor-pointer"
					aria-label="查看更多"
				>
					<LPic
						src="/img/button_card_plus_corner"
						ext="svg"
						:use-prefix="false"
						:use2x="false"
						:webp="false"
						:width="20"
						:height="20"
					/>
				</button>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.section-c {
	min-height: 100vh;
	padding: 80px 0 120px;

	&__dialogbox {
		width: 240px;
		height: 90px;
		background-image: url("/img/intimate_relationships_p0201_dialogbox_pad.svg");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		justify-content: center;
		margin: 0 auto;
		padding-top: 6px;
	}

	&__corner-button {
		z-index: 1;

		&::before {
			content: "";
			position: absolute;
			bottom: calc(-70px - 1.25rem);
			right: calc(-70px - 1rem);
			width: 140px;
			height: 140px;
			background-color: var(--color-love-blue-02);
			border-radius: 50%;
			transition: all 0.3s;
			z-index: -1;
		}

		&:hover::before {
			bottom: calc(-100px - 1.25rem);
			right: calc(-100px - 1rem);
			width: 200px;
			height: 200px;
		}
	}
}
</style>
