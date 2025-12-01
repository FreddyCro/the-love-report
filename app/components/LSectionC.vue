<script lang="ts" setup>
import { ref } from "vue";
import sectionCData from "~/locales/section-c.json";
import LPic from "./LPic.vue";

interface Section {
	title: string;
	desc: string[];
}

interface CaseItem {
	id: string;
	name: string;
	age: string;
	occupation: string;
	tag?: string;
	story: string;
	sections: Section[];
	imgCircle: string;
	imgSquare: string;
}

const content = {
	title: sectionCData.title,
	intro: sectionCData.intro as string[],
};

const cases = sectionCData.cases as CaseItem[];

// 控制目前 active 的頭像
const activeAvatarIndex = ref(0);

// Dialog 控制
const isDialogOpen = ref(false);
const dialogCase = ref<CaseItem | null>(null);

const openDialog = (caseItem: CaseItem) => {
	dialogCase.value = caseItem;
	isDialogOpen.value = true;
	document.body.style.overflow = 'hidden';
};

const closeDialog = () => {
	isDialogOpen.value = false;
	dialogCase.value = null;
	document.body.style.overflow = '';
};

// 切換到上一個
const goToPrevious = () => {
	activeAvatarIndex.value =
		activeAvatarIndex.value === 0
			? cases.length - 1
			: activeAvatarIndex.value - 1;
};

// 切換到下一個
const goToNext = () => {
	activeAvatarIndex.value =
		activeAvatarIndex.value === cases.length - 1
			? 0
			: activeAvatarIndex.value + 1;
};

// 設定 active 頭像
const setActiveAvatar = (index: number) => {
	activeAvatarIndex.value = index;
};

// 截斷文字到指定字數
const truncateText = (text: string, limit: number = 104): string => {
	if (text.length <= limit) return text;
	return text.slice(0, limit) + "...";
};

// 常數定義
const CARD_WIDTH = 561;
const CARD_GAP = 24;
const SIDE_PADDING = 330;
const VIEWPORT_WIDTH = 1280;
// 計算滑動距離
const getTransformX = (index: number) => {
	const cardWithGap = CARD_WIDTH + CARD_GAP;
	const isLastCard = index === cases.length - 1;

	if (!isLastCard) {
		return `-${index * cardWithGap}px`;
	}


	// 最後一張：計算讓右邊保持 padding 的位移
	const totalWidth = cases.length * CARD_WIDTH + (cases.length - 1) * CARD_GAP;
	const paddingRatio = (SIDE_PADDING * 2) / VIEWPORT_WIDTH;

	return `calc(-${totalWidth}px + 100vw - 100vw * ${paddingRatio})`;
};
</script>

<template>
	<section
		class="section-c min-h-screen l-article bg-love-blue-01 overflow-x-hidden"
	>
		<!-- Title -->
		<div class="text-center mb-6">
			<div class="section-c__dialogbox">
				<h2 class="text-love-blue-03 l-h2 font-bold">{{ content.title }}</h2>
			</div>
		</div>
		<!-- Intro Text -->
		<div class="l-container space-y-9">
			<p v-for="(paragraph, index) in content.intro" :key="index" class="l-p">
				{{ paragraph }}
			</p>
		</div>

		<!-- Avatar Selection -->
		<div
			class="my-6 flex justify-between items-center gap-4 max-w-[712px] mx-auto h-[100px]"
		>
			<button
				class="w-[50px] h-[50px] shrink-0 cursor-pointer"
				:class="activeAvatarIndex === 0 ? 'opacity-0' : ''"
				aria-label="上一個"
				@click="goToPrevious"
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
				v-for="(caseItem, index) in cases"
				:key="caseItem.id"
				:class="
					activeAvatarIndex === index
						? 'w-[70px] h-[70px] xs:w-[100px] xs:h-[100px] opacity-100'
						: 'w-[50px] h-[50px] xs:w-20 xs:h-20 opacity-30'
				"
				class="shrink-0 cursor-pointer transition-all duration-300"
				@click="setActiveAvatar(index)"
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
				:class="activeAvatarIndex === 5 ? 'opacity-0' : ''"
				aria-label="下一個"
				@click="goToNext"
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
		<div
			class="flex transition-transform duration-500 ease-in-out gap-6 ml-[calc(100vw*330/1280)]"
			:style="{ transform: `translateX(${getTransformX(activeAvatarIndex)})` }"
		>
			<div
				v-for="caseItem in cases"
				:key="caseItem.id"
				class="bg-white rounded-[30px] border-2 border-love-blue-02 pt-[38px] px-[26px] pb-[50px] relative overflow-hidden shrink-0 w-full max-w-[561px] max-h-[486px]"
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
						<h4 class="mb-2 l-h4 font-bold">
							{{ caseItem.name }}
							<span class="text-card-regular"
								>{{ caseItem.age }}{{ caseItem.occupation ? " | " : ""
								}}{{ caseItem.occupation }}</span
							>
						</h4>
						<div v-if="caseItem.tag" class="text-card-bold mb-2">
							{{ caseItem.tag }}
						</div>
						<p class="text-card-regular">{{ caseItem.story }}</p>
					</div>
				</div>

				<div class="pt-7 border-t border-black">
					<h5 class="text-love-red-03 mb-1 l-h5 font-bold">
						{{ caseItem.sections?.[0]?.title }}
					</h5>
					<p class="l-p">
						{{ truncateText(caseItem.sections?.[0]?.desc?.[0] ?? '', 104) }}
					</p>
					<p
						v-if="(caseItem.sections?.[0]?.desc?.[0]?.length ?? 0) < 104"
						class="l-p mt-4"
					>
						{{ truncateText(caseItem.sections?.[0]?.desc?.[1] ?? '', 20) }}
					</p>
				</div>

				<button
					class="section-c__corner-button absolute right-4 bottom-5 w-5 h-5 cursor-pointer"
					aria-label="查看更多"
					@click="openDialog(caseItem)"
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

		<!-- Dialog -->
		<ClientOnly>
			<Teleport to="body">
				<Transition name="fade">
					<div
						v-if="isDialogOpen"
						class="section-c__overlay fixed inset-0 z-50 flex items-center justify-center  l-article"
						@click.self="closeDialog"
					>
					<div
						class="section-c__dialog bg-white rounded-[30px] border-2 border-love-blue-02 p-10 relative max-w-[944px] max-h-150 overflow-y-auto mx-4"
					>
						<!-- Close Button -->
						<button
							class="absolute top-4 right-4 cursor-pointer w-10 h-10 rounded-full bg-love-blue-02 flex items-center justify-center"
							aria-label="關閉"
							@click="closeDialog"
						>
							<div class="w-5 h-5 rotate-45">
								<LPic
									src="/img/button_card_plus_corner"
									ext="svg"
									:use-prefix="false"
									:use2x="false"
									:webp="false"
									:width="20"
									:height="20"
								/>
							</div>
						</button>

						<!-- Dialog Content -->
						<div v-if="dialogCase" class="space-y-6 pr-8">
							<div
								v-for="(section, sectionIndex) in dialogCase.sections"
								:key="sectionIndex"
							>
								<h5 class="text-love-red-03 mb-2 l-h5 font-bold">
									{{ section.title }}
								</h5>
								<p
									v-for="(paragraph, pIndex) in section.desc"
									:key="pIndex"
									class="l-p"
									:class="{ 'mt-4': pIndex > 0 }"
								>
									{{ paragraph }}
								</p>
							</div>
						</div>
					</div>
					</div>
				</Transition>
			</Teleport>
		</ClientOnly>
	</section>
</template>

<style scoped lang="scss">
.section-c {
	min-height: 100vh;
	padding: 80px 0 120px;

	&__overlay {
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(8px);
	}

	&__dialog {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}

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

// Dialog 過渡動畫
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
