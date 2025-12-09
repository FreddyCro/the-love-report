<script lang="ts" setup>
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import sectionDData from "~/locales/section-d.json";
import LPic from "./LPic.vue";
import LSectionHeader from "./LSectionHeader.vue";
import { useScrollAnimation } from "~/composables/useScrollAnimation";


type TextStory = {
	position: "left" | "right";
	name: string;
	content: string;
	type?: undefined;
	image?: {
		src: string;
		alt: string;
		desc: string;
		width: number;
		height: number;
	};
};

type ImageStory = {
	type: "image";
	src: string;
	alt: string;
	desc: string;
	width: number;
	height: number;
	position?: "left" | "right" | "center";
	sequence?: string[];
};

type Story = TextStory | ImageStory;

interface CaseItem {
	index: number;
	title: string;
	desc: string;
	stories: Story[];
}

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
			start: "top 65%",
			end: "bottom 10%",
			onEnter: () => gsap.to(item, { opacity: 1, duration: 0.4, ease: "power2.out" }),
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
		class="section-d min-h-screen l-article relative bg-love-red-01 rounded-[70px] -mt-17.5 pt-12 pb-20 sm:rounded-[100px] sm:-mt-25 sm:pt-20 sm:pb-25 lg:rounded-[120px] lg:-mt-30 lg:pb-30"
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
			<div class="l-container pt-5 pb-9 lg:pb-12">
				<div class="section-d__step">
					<p class="text-love-red-03">{{ caseItem.index }}</p>
				</div>
				<h3 class="mt-1 pb-3 text-center border-b border-black l-h3 font-bold">
					{{ caseItem.title }}
				</h3>
				<h5 class="pt-3 l-h5 font-bold">{{ caseItem.desc }}</h5>
			</div>

			<div class="flex flex-col gap-7 sm:gap-9 section-d__container m-auto mt-9 sm:mt-12 px-5 xs:px-6 sm:px-0">
				<template v-for="(story, index) in caseItem.stories" :key="index">
					<!-- 圖片型 story -->
					<div
						v-if="story.type === 'image' && story.sequence"
						class="t-1 sm:mt-3 mx-auto image-sequence-container flex flex-col max-w-full"
					>
						<div class="relative w-full" :style="`max-width: ${story.width}px;`">
							<div
								v-for="(seqSrc, seqIndex) in story.sequence"
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
									:width="story.width"
									:height="story.height"
									classname="w-full h-auto"
								/>
							</div>
							<p class="mt-2 pic-info">{{ story.desc }}</p>
						</div>
					</div>
					<!-- 文字型 story -->
					<div
						v-else-if="!story.type"
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
							class="flex gap-4 items-center sm:block sm:shrink-0 sm:w-34.5"
							:class="
								story.position === 'right' ? 'flex-row-reverse' : 'flex-row'
							"
						>
							<div class="shrink-0 w-25 h-25 sm:w-34.5 sm:h-34.5">
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
								class="bg-white px-5 py-4 l-p max-w-136.75"
								:class="
									story.position === 'left'
										? 'rounded-tr-[10px] rounded-b-[10px] mr-9.5 sm:mr-0'
										: 'rounded-tl-[10px] rounded-b-[10px] ml-9.5 sm:ml-0'
								"
							>
								{{ story.content }}
							</p>
							<div v-if="story.image" class="mt-7 sm:mt-9 max-w-136.75">
								<LPic
									:src="story.image.src"
									ext="jpg"
									:use-prefix="false"
									:use2x="false"
									:use-webp="true"
									:width="story.image.width"
									:height="story.image.height"
									classname="w-full h-auto"
								/>
								<p class="mt-2 pic-info">{{ story.image.desc }}</p>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins" as *;

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

	&__container {
		width: 100%;
		margin: 0 auto;
		padding-left: 20px;
		padding-right: 20px;
		@include rwd-min(xxs) {
			padding-left: 24px;
			padding-right: 24px;
		}

		@include rwd-min(pad) {
			max-width: calc(530px + 60px * 2);
			padding-left: 60px;
			padding-right: 60px;
		}

		@include rwd-min(pc) {
			max-width: calc(944px + 120px * 2);
			padding-left: 120px;
			padding-right: 120px;
		}

		&--full {
			max-width: 100%;
		}
	}
}

</style>
