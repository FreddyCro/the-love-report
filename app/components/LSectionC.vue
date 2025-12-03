<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import sectionCData from "~/locales/section-c.json";
import LPic from "./LPic.vue";
import LSectionHeader from "./LSectionHeader.vue";
import { useScrollAnimation } from "~/composables/useScrollAnimation";

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

// 視窗寬度
const windowWidth = ref(1280);

// Lenis 實例參考
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lenisInstance: any = null;

const openDialog = async (caseItem: CaseItem) => {
	dialogCase.value = caseItem;
	isDialogOpen.value = true;

	// 暫停 Lenis 平滑滾動
	if (!lenisInstance) {
		const { lenis } = await useScrollAnimation();
		lenisInstance = lenis;
	}
	lenisInstance?.stop();
};

const closeDialog = () => {
	isDialogOpen.value = false;
	dialogCase.value = null;

	// 恢復 Lenis 平滑滾動
	lenisInstance?.start();
};

// 切換到上一個
const goToPrevious = () => {
	activeAvatarIndex.value = Math.max(0, activeAvatarIndex.value - 1);
};

// 切換到下一個
const goToNext = () => {
	const maxIndex = cases.length - 1;
	activeAvatarIndex.value = Math.min(maxIndex, activeAvatarIndex.value + 1);
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

// 監聽視窗大小變化
const updateWindowWidth = () => {
	windowWidth.value = window.innerWidth;
};

onMounted(() => {
	if (typeof window !== "undefined") {
		windowWidth.value = window.innerWidth;
		window.addEventListener("resize", updateWindowWidth);
	}
});

onUnmounted(() => {
	if (typeof window !== "undefined") {
		window.removeEventListener("resize", updateWindowWidth);
	}
});

// 根據視窗寬度取得卡片常數
const cardConstants = computed(() => {
	const width = windowWidth.value;

	if (width >= 1280) {
		return {
			CARD_WIDTH: 561,
			CARD_GAP: 24,
			SIDE_PADDING: 330,
			VISIBLE_AVATARS: 6, // 全部顯示
		};
	} else if (width >= 768) {
		return {
			CARD_WIDTH: 561,
			CARD_GAP: 24,
			SIDE_PADDING: 119,
			VISIBLE_AVATARS: 4,
		};
	} else {
		return {
			CARD_WIDTH: 280,
			CARD_GAP: 20,
			SIDE_PADDING: 24,
			VISIBLE_AVATARS: 3,
		};
	}
});

// 計算要顯示的頭像範圍
const visibleAvatars = computed(() => {
	const { VISIBLE_AVATARS } = cardConstants.value;
	const totalCases = cases.length;

	// 如果全部顯示
	if (VISIBLE_AVATARS >= totalCases) {
		return cases.map((c, i) => ({ case: c, index: i }));
	}

	// 計算滑動窗口
	const activeIndex = activeAvatarIndex.value;
	let startIndex = Math.max(
		0,
		activeIndex - Math.floor((VISIBLE_AVATARS - 1) / 2)
	);
	let endIndex = startIndex + VISIBLE_AVATARS;

	// 如果到達右邊界，調整窗口
	if (endIndex > totalCases) {
		endIndex = totalCases;
		startIndex = Math.max(0, endIndex - VISIBLE_AVATARS);
	}

	return cases
		.slice(startIndex, endIndex)
		.map((c, i) => ({ case: c, index: startIndex + i }));
});

// 檢查是否可以向左滑動
const canGoLeft = computed(() => {
	return activeAvatarIndex.value > 0;
});

// 檢查是否可以向右滑動
const canGoRight = computed(() => {
	return activeAvatarIndex.value < cases.length - 1;
});

// 取得左側 margin
const leftMargin = computed(() => {
	const { SIDE_PADDING } = cardConstants.value;
	return `${SIDE_PADDING}px`;
});

// 計算滑動距離
const getTransformX = computed(() => {
	return (index: number) => {
		const { CARD_WIDTH, CARD_GAP, SIDE_PADDING } = cardConstants.value;
		const cardWithGap = CARD_WIDTH + CARD_GAP;
		const isLastCard = index === cases.length - 1;

		if (!isLastCard) {
			return `-${index * cardWithGap}px`;
		}

		// 最後一張：計算讓右邊保持 SIDE_PADDING 的位移
		const totalWidth =
			cases.length * CARD_WIDTH + (cases.length - 1) * CARD_GAP;
		return `calc(-${totalWidth}px + 100vw - ${SIDE_PADDING * 2}px)`;
	};
});
</script>

<template>
	<section
		class="section-c min-h-screen l-article bg-love-blue-01 relative overflow-x-hidden pt-12 pb-[130px] sm:pt-20 rounded-t-[70px] -mt-[70px] sm:rounded-t-[100px] sm:-mt-[100px] sm:pb-45 lg:rounded-t-[120px] lg:-mt-[120px] lg:pb-50"
	>
		<LSectionHeader
			:title="content.title"
			:intro="content.intro"
			title-color="text-love-blue-03"
			dialogbox-img="p0201"
		/>

		<!-- Avatar Selection -->
		<div
			class="mt-9 mb-7 sm:my-9 flex justify-center items-center gap-2 sm:gap-4 max-w-[712px] mx-auto h-[70px] sm:h-[100px]"
		>
			<!-- Left Arrow -->
			<button
				class="w-[50px] h-[50px] shrink-0 transition-opacity duration-300"
				:class="
					canGoLeft ? 'opacity-100 cursor-pointer' : 'opacity-0 cursor-default'
				"
				:disabled="!canGoLeft"
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
				/>
			</button>

			<!-- Avatar Container -->
			<div class="flex items-center gap-2 sm:gap-4">
				<button
					v-for="{ case: caseItem, index } in visibleAvatars"
					:key="caseItem.id"
					:class="
						activeAvatarIndex === index
							? 'w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] opacity-100'
							: 'w-[50px] h-[50px] sm:w-20 sm:h-20 opacity-30'
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
			</div>

			<!-- Right Arrow -->
			<button
				class="w-[50px] h-[50px] shrink-0 transition-opacity duration-300"
				:class="
					canGoRight ? 'opacity-100 cursor-pointer' : 'opacity-0 cursor-default'
				"
				:disabled="!canGoRight"
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
				/>
			</button>
		</div>

		<!-- Case Cards -->
		<div
			class="flex transition-transform duration-500 ease-in-out gap-5 sm:gap-6"
			:style="{
				transform: `translateX(${getTransformX(activeAvatarIndex)})`,
				marginLeft: leftMargin,
			}"
		>
			<div
				v-for="caseItem in cases"
				:key="caseItem.id"
				class="bg-white rounded-[20px] border-2 border-love-blue-02  pt-[18px] pb-[65px] px-[18px]  relative overflow-hidden shrink-0 w-full max-w-70 max-h-[450px]
						sm:rounded-[30px] sm:pt-10 sm:px-[26px] sm:pb-[50px] sm:max-w-[561px] sm:max-h-[486px]"
					>
				<div class="flex gap-6 mb-7 flex-col sm:flex-row">
					<div class="w:100% h:100% sm:w-[154px] sm:h-[158px] py-0.5">
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
						<p class="mb-2 l-h4 font-bold">
							{{ caseItem.name }}
							<span class="text-card-regular"
								>{{ caseItem.age }}{{ caseItem.occupation ? " | " : ""
								}}{{ caseItem.occupation }}</span
							>
						</p>
						<div v-if="caseItem.tag" class="text-card-bold mb-2">
							{{ caseItem.tag }}
						</div>
						<p class="text-card-regular">{{ caseItem.story }}</p>
					</div>
				</div>

				<div class="hidden sm:block pt-7 border-t border-black">
					<p class="text-love-red-03 mb-1 l-h5 font-bold">
						{{ caseItem.sections?.[0]?.title }}
					</p>
					<p class="l-p">
						{{ truncateText(caseItem.sections?.[0]?.desc?.[0] ?? "", 104) }}
					</p>
					<p
						v-if="(caseItem.sections?.[0]?.desc?.[0]?.length ?? 0) < 104"
						class="l-p mt-4"
					>
						{{ truncateText(caseItem.sections?.[0]?.desc?.[1] ?? "", 20) }}
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
						class="section-c__overlay fixed inset-0 z-50 flex items-center justify-center l-article overflow-hidden"
						@click.self="closeDialog"
						@wheel.prevent
						@touchmove.prevent
					>
						<div class="relative mx-4 max-w-[944px]">
							<!-- Close Button -->
							<button
								class="absolute top-3 right-3 z-10 cursor-pointer w-10 h-10 rounded-full bg-love-blue-02 flex items-center justify-center"
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

							<div
								class="section-c__dialog bg-white rounded-[30px] border-2 border-love-blue-02 p-10 max-h-[83vh] overflow-y-auto overscroll-contain"
								@wheel.stop
								@touchmove.stop
							>
								<!-- Dialog Content -->
								<div v-if="dialogCase" class="space-y-6 pr-8">
									<div
										v-for="(section, sectionIndex) in dialogCase.sections"
										:key="sectionIndex"
									>
										<p class="text-love-red-03 mb-2 l-h5 font-bold">
											{{ section.title }}
										</p>
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
					</div>
				</Transition>
			</Teleport>
		</ClientOnly>
	</section>
</template>

<style scoped lang="scss">
.section-c {
	&__overlay {
		background-color: rgba(214, 242, 250, 0.5);
		backdrop-filter: blur(30px);
	}

	&__dialog {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
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
