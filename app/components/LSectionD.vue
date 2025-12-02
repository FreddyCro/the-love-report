<script lang="ts" setup>
import sectionDData from "~/locales/section-d.json";
import LPic from "./LPic.vue";

interface Story {
	position: "left" | "right" | "center" | "centerLeft" | "centerRight";
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
}

interface CaseItem {
	index: number;
	title: string;
	desc: string;
	stories: Story[];
	images: ImageItem[];
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
</script>

<template>
	<section
		class="section-d min-h-screen l-article bg-love-red-01 relative rounded-[100px]"
	>
		<!-- Title -->
		<div class="text-center mb-6">
			<div class="section-d__dialogbox">
				<h2 class="text-love-red-03 l-h2 font-bold">{{ content.title }}</h2>
			</div>
		</div>

		<!-- Intro Text -->
		<div class="l-container space-y-9">
			<p v-for="(paragraph, index) in content.intro" :key="index" class="l-p">
				{{ paragraph }}
			</p>
		</div>

		<!-- Cases -->
		<div
			v-for="caseItem in cases"
			:key="caseItem.index"
			class="mb-5 px-6 pc:px-0"
		>
			<!-- Step Indicator -->
			<div class="py-12 l-container">
				<div class="section-d__step">
					<p class="text-love-red-03">{{ caseItem.index }}</p>
				</div>
				<h3 class="mt-1 pb-3 text-center border-b border-black l-h3 font-bold">
					{{ caseItem.title }}
				</h3>
				<h5 class="pt-3 l-h5 font-bold">{{ caseItem.desc }}</h5>
			</div>

			<!-- Stories -->
			<div class="flex flex-col gap-9 max-w-[944px] m-auto mb-9">
				<div
					v-for="(story, index) in caseItem.stories"
					:key="index"
					class="flex flex-col gap-3 xs:gap-6"
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
					:class="
						image.position ? imgPositionClasses[image.position] : 'mx-auto'
					"
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
	padding: 80px 0 140px;
	margin-top: -100px;

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
