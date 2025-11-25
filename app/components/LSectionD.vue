<script lang="ts" setup>
import sectionDData from "~/locales/section-d.json";

interface Story {
	position: string;
	name: string;
	content: string;
}

interface ImageItem {
	src: string;
	alt: string;
	desc: string;
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
};

const cases = sectionDData.cases as CaseItem[];
</script>

<template>
	<section class="section-d bg-love-red-01 rounded-t-[120px]">
		<div class="l-container">
			<!-- Title -->
			<div class="section-d__header">
				<h2 class="section-d__title">{{ content.title }}</h2>
			</div>

			<!-- Intro Text -->
			<div class="section-d__intro">
				<p v-for="(paragraph, index) in content.intro" :key="index">
					{{ paragraph }}
				</p>
			</div>

			<!-- Cases -->
			<div v-for="caseItem in cases" :key="caseItem.index" class="case-section">
				<!-- Step Indicator -->
				<div class="section-d__step">
					<div class="step-number">{{ caseItem.index }}</div>
				</div>

				<h3 class="case-section__title">{{ caseItem.title }}</h3>
				<p class="case-section__desc">{{ caseItem.desc }}</p>

				<!-- Stories -->
				<div class="stories">
					<div
						v-for="(story, index) in caseItem.stories"
						:key="index"
						class="story-card"
						:class="`story-card--${story.position}`"
					>
						<div class="story-card__avatar">
							<div class="avatar-circle">
								<span class="avatar-icon">👤</span>
							</div>
						</div>
						<div class="story-card__content">
							<h4 class="story-card__name">{{ story.name }}</h4>
							<p class="story-card__text">{{ story.content }}</p>
						</div>
					</div>
				</div>

				<!-- Images -->
				<div v-if="caseItem.images" class="case-images">
					<div
						v-for="(image, index) in caseItem.images"
						:key="index"
						class="image-item"
					>
						<NuxtImg
							:src="image.src"
							:alt="image.alt"
							class="image-item__img"
							format="webp"
						/>
						<p class="image-item__desc">{{ image.desc }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.section-d {
	min-height: 100vh;
	padding: 80px 0 120px;

	&__header {
		text-align: center;
		margin-bottom: 60px;
	}

	&__title {
		display: inline-block;
		font-size: 32px;
		font-weight: 700;
		color: #404040;
		padding: 12px 40px;
		border: 3px solid #fe7152;
		border-radius: 60px;
		background: transparent;
	}

	&__intro {
		max-width: 620px;
		margin: 0 auto 80px;
		font-size: 18px;
		line-height: 36px;
		color: #404040;

		p {
			margin-bottom: 24px;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}

	&__step {
		text-align: center;
		margin-bottom: 60px;
	}
}

.step-number {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 70px;
	height: 70px;
	border-radius: 50%;
	background: #fff;
	border: 3px solid #fe7152;
	font-size: 32px;
	font-weight: 700;
	color: #fe7152;
}

.case-section {
	max-width: 620px;
	margin: 0 auto 80px;

	&__title {
		font-size: 28px;
		font-weight: 700;
		color: #404040;
		margin-bottom: 16px;
		text-align: center;
	}

	&__desc {
		font-size: 18px;
		line-height: 32px;
		color: #404040;
		margin-bottom: 40px;
		text-align: center;
	}
}

.stories {
	display: flex;
	flex-direction: column;
	gap: 40px;
	margin-bottom: 60px;
}

.story-card {
	display: flex;
	gap: 24px;
	align-items: flex-start;

	&--left {
		flex-direction: row;
	}

	&--right {
		flex-direction: row-reverse;
	}

	&__avatar {
		flex-shrink: 0;
	}

	&__content {
		flex: 1;
	}

	&__name {
		font-size: 20px;
		font-weight: 700;
		color: #404040;
		margin-bottom: 12px;
	}

	&__text {
		font-size: 18px;
		line-height: 32px;
		color: #404040;
	}
}

.avatar-circle {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	background: linear-gradient(135deg, #ffa59b 0%, #ffeded 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid #ffa59b;

	.avatar-icon {
		font-size: 40px;
		opacity: 0.6;
	}
}

.case-images {
	display: grid;
	grid-template-columns: 1fr;
	gap: 40px;
}

.image-item {
	&__img {
		width: 100%;
		height: auto;
		border-radius: 20px;
		margin-bottom: 16px;
	}

	&__desc {
		font-size: 16px;
		line-height: 28px;
		color: #404040;
		text-align: center;
	}
}

@media (max-width: 768px) {
	.section-d {
		padding: 60px 20px 100px;

		&__title {
			font-size: 24px;
			padding: 10px 30px;
		}

		&__intro {
			font-size: 16px;
			line-height: 32px;
			margin-bottom: 60px;
		}
	}

	.step-number {
		width: 60px;
		height: 60px;
		font-size: 28px;
	}

	.case-section {
		&__title {
			font-size: 24px;
		}

		&__desc {
			font-size: 16px;
			line-height: 28px;
		}
	}

	.story-card {
		flex-direction: column !important;
		gap: 16px;

		&__name {
			font-size: 18px;
		}

		&__text {
			font-size: 16px;
			line-height: 28px;
		}
	}

	.avatar-circle {
		width: 60px;
		height: 60px;

		.avatar-icon {
			font-size: 32px;
		}
	}

	.image-item {
		&__desc {
			font-size: 14px;
			line-height: 24px;
		}
	}
}
</style>
