<script lang="ts" setup>
import sectionDData from "~/locales/section-d.json";
import LPic from "./LPic.vue";

interface Story {
	position: string;
	name: string;
	content: string;
}

interface ImageItem {
	src: string;
	alt: string;
	desc: string;
	width: number;
	height: number;
	position?: "left" | "right" | "center" | "center-left" | "center-right";
}

interface CaseItem {
	index: number;
	title: string;
	desc: string;
	stories: Story[];
	images: ImageItem[];
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
</script>

<template>
	<section class="section-d bg-love-red-01">
		<!-- Title -->
		<div class="text-center mb-6">
			<div class="section-d__dialogbox">
				<h2 class="text-love-red-03">{{ content.title }}</h2>
			</div>
		</div>

		<!-- Intro Text -->
		<div class="l-container space-y-9">
			<p v-for="(paragraph, index) in content.intro" :key="index" class="text">
				{{ paragraph }}
			</p>
		</div>

		<!-- Cases -->
		<div v-for="caseItem in cases" :key="caseItem.index" class="mb-5">
			<!-- Step Indicator -->
			<div class="py-12 l-container">
				<div class="section-d__step">
					<p class="text-love-red-03">{{ caseItem.index }}</p>
				</div>
				<h3 class="mt-1 pb-3 text-center border-b border-black">
					{{ caseItem.title }}
				</h3>
				<h5 class="pt-3">{{ caseItem.desc }}</h5>
			</div>

			<!-- Stories -->
			<div class="flex flex-col gap-9 max-w-[944px] m-auto mb-9">
				<div
					v-for="(story, index) in caseItem.stories"
					:key="index"
					class="flex gap-6 items-start"
					:class="story.position === 'left' ? 'flex-row' : 'flex-row-reverse'"
				>
					<!-- Avatar -->
					<div class="shrink-0 w-[138px] h-[138px]">
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

					<!-- Dialog Box -->
					<div
						class="flex-1 flex flex-col"
						:class="story.position === 'left' ? 'items-start' : 'items-end'"
					>
						<h4 class="mb-1">
							{{ story.name }}
						</h4>
						<!-- Content -->
						<p
							class="bg-white px-5 py-4 max-w-[547px] text"
							:class="
								story.position === 'left'
									? 'rounded-tr-[10px] rounded-b-[10px]'
									: 'rounded-tl-[10px] rounded-b-[10px]'
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
				class="flex flex-wrap gap-6 max-w-[944px] m-auto mb-9"
			>
				<div
					v-for="(image, index) in caseItem.images"
					:key="index"
					class="flex flex-col"
					:class="{
						'mx-auto': image.position === 'center',
						'mr-auto': image.position === 'left',
						'ml-auto': image.position === 'right',
						'ml-[162px]': image.position === 'center-left',
						'mr-[162px]': image.position === 'center-right',
					}"
					:style="`width: ${image.width}px;`"
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
					<p class="mt-4 pic-info">{{ image.desc }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.section-d {
	min-height: 100vh;
	padding: 80px 0 140px;

	&__dialogbox {
		width: 240px;
		height: 90px;
		background-image: url("/img/intimate_relationships_p0401_dialogbox_pc.svg");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		justify-content: center;
		margin: 0 auto;
		padding-top: 6px;
	}

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
