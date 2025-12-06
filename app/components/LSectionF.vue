<script lang="ts" setup>
import { ref } from "vue";
import sectionFData from "~/locales/section-f.json";
import LPic from "./LPic.vue";
import LSectionHeader from "./LSectionHeader.vue";
import useTrackingEvent from "~/composables/useTrackingEvent";

const { gaClickBtn } = useTrackingEvent();

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
	const wasFlipped = flippedCards.value[index] || false;
	flippedCards.value[index] = !wasFlipped;

	// GA tracking: 常見問題－展開/關閉按鈕
	const questionNum = `Q${index}`;
	if (!wasFlipped) {
		gaClickBtn(`question_${questionNum}打開`);
	} else {
		gaClickBtn(`question_${questionNum}關閉`);
	}
};

const isFlipped = (index: number) => {
	return flippedCards.value[index] || false;
};
</script>

<template>
	<section class="section-f min-h-screen l-article pb-15 sm:pb-30 md:pb-20">
		<LSectionHeader
			:title="content.title"
			:intro="content.intro"
			title-color="text-black"
			dialogbox-img="p0601_dialogbox_pc"
			intro-container-class="l-p l-container"
			intro-paragraph-class=""
		/>

		<!-- Download Button -->
		<h5
			class="flex items-center gap-2.5 justify-center my-7 sm:mt-9 sm:mb-24 l-pc-h5 font-bold"
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
			class=" px-5 xs:px-6 grid grid-cols-1 gap-y-6 mx-auto
					sm:px-12 sm:grid-cols-2 sm:gap-y-12 sm:gap-x-8 sm:mt-[60px]
					md:grid-cols-3 md:gap-x-12 md:gap-y-[60px] md:max-w-6xl"
			>
			<div
				v-for="caseItem in cases"
				:key="caseItem.index"
				class="perspective-[1000px] cursor-pointer"
				:class="{
					'sm:-mt-15':
						caseItem.index === 1 ||
						caseItem.index === 3 ||
						caseItem.index === 5,
					'md:mt-0': caseItem.index === 1 || caseItem.index === 3,
					'md:-mt-15': caseItem.index === 2 || caseItem.index === 5,
				}"
				@click="toggleCard(caseItem.index)"
			>
				<div
					class="relative w-full transition-transform duration-600 transform-3d grid"
					:class="{ 'transform-[rotateY(180deg)]': isFlipped(caseItem.index) }"
				>
					<!-- Front Side (Question) -->
					<div
						class="relative col-start-1 row-start-1 backface-hidden rounded-[20px] p-5 pb-20 border-2 border-love-red-02 overflow-hidden bg-white"
					>
						<h4 class="mb-3 text-black section-f__card-title font-bold">{{ caseItem.title }}</h4>
						<h5 class="mb-5 text-black section-f__card-question font-bold">
							{{ caseItem.content.question }}
						</h5>
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
						class="relative col-start-1 row-start-1 backface-hidden rounded-[20px] p-5 pb-20 border-2 border-love-red-02 overflow-hidden rotate-y-180 bg-love-red-02"
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
@use "@/assets/styles/mixins" as *;

.section-f {
	&__card-title {
		font-size: var(--mob-h3-font-size);
	    line-height: var(--mob-h3-line-height);
		@include rwd-min(sm) {
			font-size: var(--pc-h4-font-size);
			line-height: var(--pc-h4-line-height);
		}
	}
	&__card-question {
		font-size: var(--mob-h4-font-size);
    	line-height: var(--mob-h4-line-height);
		@include rwd-min(sm) {
			font-size: var(--pc-h5-font-size);
			line-height: var(--pc-h5-line-height);
		}
	}
}
</style>
