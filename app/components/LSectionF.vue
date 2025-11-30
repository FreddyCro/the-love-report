<script lang="ts" setup>
import { ref } from "vue";
import sectionFData from "~/locales/section-f.json";
import LPic from "./LPic.vue";

interface CaseContent {
	question: string;
	answer: string;
	image: string;
}

interface CaseItem {
	index: number;
	title: string;
	content: CaseContent;
}

const content = {
	title: sectionFData.title,
	intro: sectionFData.intro as string[],
};

const cases = sectionFData.cases as CaseItem[];

// Track flipped state for each card
const flippedCards = ref<Record<number, boolean>>({});

const toggleCard = (index: number) => {
	flippedCards.value[index] = !flippedCards.value[index];
};

const isFlipped = (index: number) => {
	return flippedCards.value[index] || false;
};
</script>

<template>
	<section class="section-f l-article">
		<!-- Title -->
		<div class="text-center mb-6">
			<div class="section-f__dialogbox">
				<h2 class="text-black l-h2 font-bold">{{ content.title }}</h2>
			</div>
		</div>

		<!-- Intro Text -->
		<div class="l-p l-container">
			<p v-for="(paragraph, index) in content.intro" :key="index">
				{{ paragraph }}
			</p>
		</div>

		<!-- Download Button -->
		<h5
			class="flex items-center gap-2.5 justify-center mt-9 mb-24 l-h5 font-bold"
		>
			<button>點擊卡牌看建議</button>
			<div class="w-10 h-10 text-love-dark">
				<LPic
					src="/img/button_click_down_below"
					ext="svg"
					:use-prefix="false"
					:use2x="false"
					:webp="false"
					:width="40"
					:height="40"
				/>
			</div>
		</h5>

		<!-- Cards Grid -->
		<div
			class="grid grid-cols-3 gap-x-12 gap-y-[68px] mt-[60px] max-w-[1056px] mx-auto"
		>
			<div
				v-for="caseItem in cases"
				:key="caseItem.index"
				class="perspective-[1000px] cursor-pointer h-[500px]"
				:class="{
					'relative bottom-[60px]':
						caseItem.index === 2 || caseItem.index === 5,
				}"
				@click="toggleCard(caseItem.index)"
			>
				<div
					class="relative w-full h-full transition-transform duration-600 transform-3d"
					:class="{ 'transform-[rotateY(180deg)]': isFlipped(caseItem.index) }"
				>
					<!-- Front Side (Question) -->
					<div
						class="absolute w-full h-full backface-hidden rounded-[20px] p-[30px] border-2 border-love-red-02 overflow-hidden bg-white"
					>
						<h4 class="mb-3 text-black l-h4 font-bold">{{ caseItem.title }}</h4>
						<h5 class="mb-5 text-black l-h5 font-bold">
							{{ caseItem.content.question }}
						</h5>
						<div class="mb-5">
							<LPic
								:src="caseItem.content.image"
								ext="jpg"
								default="pad"
								:srcset="['pad', 'mob']"
								:use2x="false"
								:webp="true"
								:width="280"
								:height="211"
							/>
						</div>
						<div
							class="absolute bottom-0 right-0 w-[100px] h-[100px] bg-love-red-02 rounded-tl-[100px] overflow-hidden hover:w-[125px] hover:h-[125px] hover:rounded-tl-[125px] transition-all duration-300"
						>
							<div class="absolute bottom-6 right-6 w-[30px] h-[30px]">
								<LPic
									src="/img/button_card_flip"
									ext="svg"
									:use-prefix="false"
									:use2x="false"
									:webp="false"
									:width="30"
									:height="30"
								/>
							</div>
						</div>
					</div>

					<!-- Back Side (Answer) -->
					<div
						class="absolute w-full h-full backface-hidden rounded-[20px] p-5 border-2 border-love-red-02 overflow-hidden rotate-y-180 bg-love-red-02"
					>
						<h3 class="mb-5 text-black l-h3 font-bold">專家解答</h3>
						<p class="l-p text-black">{{ caseItem.content.answer }}</p>
						<div
							class="absolute bottom-0 right-0 w-[100px] h-[100px] bg-white rounded-tl-[100px] overflow-hidden hover:w-[125px] hover:h-[125px] hover:rounded-tl-[125px] transition-all duration-300"
						>
							<div class="absolute bottom-6 right-5 w-[30px] h-[30px]">
								<LPic
									src="/img/button_card_change_back"
									ext="svg"
									:use-prefix="false"
									:use2x="false"
									:webp="false"
									:width="30"
									:height="30"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.section-f {
	min-height: 100vh;
	padding: 0 0 80px;

	&__dialogbox {
		width: 240px;
		height: 90px;
		background-image: url("/img/intimate_relationships_p0601_dialogbox_pc.svg");
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
