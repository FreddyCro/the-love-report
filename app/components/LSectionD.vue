<script lang="ts" setup>
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import sectionDData from "~/locales/section-d.json";
import LPic from "./LPic.vue";
import LSectionHeader from "./LSectionHeader.vue";
import { useScrollAnimation } from "~/composables/useScrollAnimation";

interface Story {
	position: "left" | "right";
	name: string;
	content: string;
}

interface ImageItem {
	src: string;
	alt: string;
	desc: string;
	width: number;
	height: number;
	position?: "left" | "right" | "center" | "centerLeft" | "centerRight";
	sequence?: string[];
}

interface CaseItem {
	index: number;
	title: string;
	desc: string;
	stories: Story[];
	images?: ImageItem[];
}

const imgPositionClasses = {
	left: "mx-auto sm:mr-auto sm:ml-0",
	right: "mx-auto sm:ml-auto sm:mr-0",
	center: "mx-auto",
	centerLeft: "mx-auto sm:mr-auto sm:ml-0 lg:ml-[162px]",
	centerRight: "mx-auto sm:ml-auto sm:mr-0 lg:mr-[162px]",
};

const content = {
	title: sectionDData.title,
	intro: sectionDData.intro as string[],
	img: sectionDData.img as { liora: string; luma: string },
};

const cases = sectionDData.cases as CaseItem[];

const getAvatarImage = (name: string) => {
	if (name === "露瑪") {
		return content.img.luma;
	} else if (name === "Liora") {
		return content.img.liora;
	}
	return "";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let scrollTriggers: any[] = [];

onMounted(async () => {
	const { gsap, ScrollTrigger } = await useScrollAnimation();

	await nextTick();

	// Story items 透明度動畫
	const storyItems = document.querySelectorAll(".story-item");
	storyItems.forEach((item) => {
		gsap.set(item, { opacity: 0.3 });

		const trigger = ScrollTrigger.create({
			trigger: item,
			start: "top 80%",
			end: "bottom 10%",
			onEnter: () => gsap.to(item, { opacity: 1, duration: 0.4, ease: "power2.out" }),
			onLeave: () => gsap.to(item, { opacity: 0.3, duration: 0.4, ease: "power2.out" }),
			onEnterBack: () => gsap.to(item, { opacity: 1, duration: 0.4, ease: "power2.out" }),
			onLeaveBack: () => gsap.to(item, { opacity: 0.3, duration: 0.4, ease: "power2.out" }),
		});
		scrollTriggers.push(trigger);
	});

	// 圖片序列切換動畫
	const sequenceContainers = document.querySelectorAll(".image-sequence-container");
	sequenceContainers.forEach((container) => {
		const images = container.querySelectorAll(".sequence-image");
		if (images.length < 2) return;

		const firstImage = images[0];
		const secondImage = images[1];

		gsap.set(firstImage, { opacity: 1 });
		gsap.set(secondImage, { opacity: 0 });

		const trigger = ScrollTrigger.create({
			trigger: container,
			start: "top 40%",
			end: "bottom 10%",
			onEnter: () => {
				gsap.to(firstImage, { opacity: 0, duration: 0.5 });
				gsap.to(secondImage, { opacity: 1, duration: 0.5 });
			},
			onLeave: () => {
				gsap.to(firstImage, { opacity: 1, duration: 0.5 });
				gsap.to(secondImage, { opacity: 0, duration: 0.5 });
			},
			onEnterBack: () => {
				gsap.to(firstImage, { opacity: 0, duration: 0.5 });
				gsap.to(secondImage, { opacity: 1, duration: 0.5 });
			},
			onLeaveBack: () => {
				gsap.to(firstImage, { opacity: 1, duration: 0.5 });
				gsap.to(secondImage, { opacity: 0, duration: 0.5 });
			},
		});
		scrollTriggers.push(trigger);
	});

	ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
	scrollTriggers.forEach((trigger) => trigger.kill());
	scrollTriggers = [];
});
</script>

<template>
	<section
		id="ai-companion"
		class="section-d min-h-screen l-article relative bg-love-red-01 rounded-[70px] -mt-[70px] pt-12 pb-20 sm:rounded-[100px] sm:-mt-[100px] sm:pt-20 sm:pb-[100px] lg:rounded-[120px] lg:-mt-30 lg:pb-30"
	>
		<LSectionHeader
			:title="content.title"
			:intro="content.intro"
			title-color="text-love-red-03"
			dialogbox-img="p0401_dialogbox_pc"
		/>

		<!-- Cases -->
		<div
			v-for="caseItem in cases"
			:key="caseItem.index"
			class="pt-9 sm:pt-12"
		>
			<!-- Step Indicator -->
			<div class="l-container pt-5">
				<div class="section-d__step">
					<p class="text-love-red-03">{{ caseItem.index }}</p>
				</div>
				<h3 class="mt-1 pb-3 text-center border-b border-black l-h3 font-bold">
					{{ caseItem.title }}
				</h3>
				<h5 class="pt-3 l-h5 font-bold">{{ caseItem.desc }}</h5>
			</div>

			<!-- Stories -->
			<div class="flex flex-col gap-7 sm:gap-9 max-w-[944px] m-auto mt-9 sm:mt-12 px-5 xs:px-6 sm:px-0">
				<div
					v-for="(story, index) in caseItem.stories"
					:key="index"
					class="story-item flex flex-col gap-3 sm:gap-6"
					:class="{
						'sm:flex-row': story.position === 'left',
						'sm:flex-row-reverse': story.position === 'right',
						'items-start sm:items-start': story.position === 'left',
						'items-end sm:items-start': story.position === 'right',
					}"
				>
					<!-- Avatar & Name (Mobile) -->
					<div
						class="flex gap-4 items-center sm:block sm:shrink-0 sm:w-[138px]"
						:class="
							story.position === 'right' ? 'flex-row-reverse' : 'flex-row'
						"
					>
						<div class="shrink-0 w-[100px] h-[100px] sm:w-[138px] sm:h-[138px]">
							<LPic
								:src="getAvatarImage(story.name)"
								ext="png"
								:use-prefix="false"
								:use2x="false"
								:webp="true"
								:width="138"
								:height="138"
							/>
						</div>
						<h4 class="mb-0 sm:hidden l-h4 font-bold">
							{{ story.name }}
						</h4>
					</div>

					<!-- Dialog Box -->
					<div
						class="flex-1 flex flex-col"
						:class="story.position === 'left' ? 'items-start' : 'items-end'"
					>
						<h4 class="mb-1 l-h4 font-bold hidden sm:block">
							{{ story.name }}
						</h4>
						<!-- Content -->
						<p
							class="bg-white px-5 py-4 max-w-[547px] l-p"
							:class="
								story.position === 'left'
									? 'rounded-tr-[10px] rounded-b-[10px] mr-[38px] sm:mr-0'
									: 'rounded-tl-[10px] rounded-b-[10px] ml-[38px] sm:ml-0'
							"
						>
							{{ story.content }}
						</p>
					</div>
				</div>
			</div>

			<!-- Images -->
			<div
				v-if="caseItem.images"
				class="flex flex-wrap gap-6 max-w-[944px] m-auto mt-7 sm:mt-9 px-5 xs:px-6 sm:px-0"
			>
				<!-- 有 sequence 的圖片：使用 pin + 切換動畫 -->
				<template v-for="(image, index) in caseItem.images" :key="index">
					<div
						v-if="image.sequence && image.sequence.length > 1"
						class="image-sequence-container flex flex-col max-w-full"
						:class="
							image.position ? imgPositionClasses[image.position] : 'mx-auto'
						"
					>
						<div class="relative w-full">
							<div
								v-for="(seqSrc, seqIndex) in image.sequence"
								:key="seqIndex"
								class="sequence-image"
								:class="{ 'absolute inset-0': seqIndex > 0 }"
							>
								<LPic
									:src="seqSrc"
									ext="jpg"
									:use-prefix="false"
									:use2x="false"
									:use-webp="true"
									:width="image.width"
									:height="image.height"
									classname="w-full h-auto"
								/>
							</div>
						</div>
						<p class="mt-2 pic-info">{{ image.desc }}</p>
					</div>

					<!-- 一般圖片：無 sequence -->
					<div
						v-else
						class="flex flex-col"
						:class="
							image.position ? imgPositionClasses[image.position] : 'mx-auto'
						"
					>
						<LPic
							:src="image.src"
							ext="jpg"
							:use-prefix="false"
							:use2x="false"
							:use-webp="true"
							:width="image.width"
							:height="image.height"
							classname="w-full h-auto"
						/>
						<p class="mt-2 pic-info">{{ image.desc }}</p>
					</div>
				</template>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.section-d {

	&__step {
		width: 70px;
		height: 60px;
		background-image: url("/img/intimate_relationships_p0402_heartsign_pcpadmob.svg");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		padding-top: 7px;
		p {
			font-size: 30px;
			line-height: 40px;
		}
	}
}

</style>
