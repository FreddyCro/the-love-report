<script lang="ts" setup>
import { ref } from "vue";
import sectionFData from "~/locales/section-f.json";

interface CaseContent {
	question: string;
	answer: string;
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
	<section class="section-f bg-love-red-01 rounded-t-[120px]">
		<div class="l-container">
			<!-- Title -->
			<div class="section-f__header">
				<h2 class="section-f__title">{{ content.title }}</h2>
			</div>

			<!-- Intro Text -->
			<div class="section-f__intro">
				<p v-for="(paragraph, index) in content.intro" :key="index">
					{{ paragraph }}
				</p>
			</div>

			<!-- Download Button -->
			<div class="section-f__download">
				<button class="download-btn">
					<span class="download-icon">⬇</span>
					點擊卡牌看建議
				</button>
			</div>

			<!-- Cards Grid -->
			<div class="cards-grid">
				<div
					v-for="caseItem in cases"
					:key="caseItem.index"
					class="card-wrapper"
					:class="{ flipped: isFlipped(caseItem.index) }"
					@click="toggleCard(caseItem.index)"
				>
					<div class="card">
						<!-- Front Side (Question) -->
						<div class="card-front">
							<div class="card-content">
								<h3 class="card-title">{{ caseItem.title }}</h3>
								<p class="card-question">{{ caseItem.content.question }}</p>
							</div>
							<div class="card-corner">
								<span class="corner-icon">↘</span>
							</div>
						</div>

						<!-- Back Side (Answer) -->
						<div class="card-back">
							<div class="card-content">
								<h3 class="card-title-back">專家解答</h3>
								<p class="card-answer">{{ caseItem.content.answer }}</p>
							</div>
							<div class="card-corner card-corner--back">
								<span class="corner-icon">✕</span>
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
	padding: 80px 0 120px;

	&__header {
		text-align: center;
		margin-bottom: 40px;
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
		margin: 0 auto 40px;
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

	&__download {
		text-align: center;
		margin-bottom: 60px;
	}
}

.download-btn {
	display: inline-flex;
	align-items: center;
	gap: 12px;
	padding: 16px 32px;
	background: #404040;
	color: #fff;
	border: none;
	border-radius: 999px;
	font-size: 18px;
	font-weight: 700;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background: #2a2a2a;
		transform: translateY(-2px);
	}

	.download-icon {
		font-size: 24px;
	}
}

.cards-grid {
	max-width: 1200px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 32px;
	padding: 0 20px;
}

.card-wrapper {
	perspective: 1000px;
	cursor: pointer;
	aspect-ratio: 3 / 4;

	&.flipped {
		.card {
			transform: rotateY(180deg);
		}
	}
}

.card {
	position: relative;
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	transition: transform 0.6s;
}

.card-front,
.card-back {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	border-radius: 20px;
	padding: 32px;
	display: flex;
	flex-direction: column;
}

.card-front {
	background: #fff;
	border: 2px solid #ffa59b;
}

.card-back {
	background: #ffa59b;
	transform: rotateY(180deg);
}

.card-content {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.card-title {
	font-size: 20px;
	font-weight: 700;
	color: #404040;
	margin-bottom: 16px;
}

.card-title-back {
	font-size: 24px;
	font-weight: 700;
	color: #fff;
	margin-bottom: 20px;
	text-align: center;
}

.card-question {
	font-size: 18px;
	line-height: 32px;
	color: #404040;
	font-weight: 700;
	margin-bottom: 24px;
}

.card-answer {
	font-size: 18px;
	line-height: 32px;
	color: #fff;
	flex: 1;
}

.card-image {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 16px;
}

.image-placeholder {
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #666;
	font-size: 16px;
}

.card-corner {
	position: absolute;
	bottom: 16px;
	right: 16px;
	width: 48px;
	height: 48px;
	background: #ffa59b;
	border-radius: 50% 0 20px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;

	&--back {
		background: #fff;
	}

	.corner-icon {
		font-size: 24px;
		color: #fff;
	}

	&--back .corner-icon {
		color: #ffa59b;
	}
}

.card-wrapper:hover .card-corner {
	transform: scale(1.1);
}

@media (max-width: 1024px) {
	.cards-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (max-width: 768px) {
	.section-f {
		padding: 60px 20px 100px;

		&__title {
			font-size: 24px;
			padding: 10px 30px;
		}

		&__intro {
			font-size: 16px;
			line-height: 32px;
			margin-bottom: 40px;
		}
	}

	.download-btn {
		font-size: 16px;
		padding: 14px 28px;
	}

	.cards-grid {
		grid-template-columns: 1fr;
		gap: 24px;
	}

	.card-front,
	.card-back {
		padding: 24px;
	}

	.card-title {
		font-size: 18px;
	}

	.card-title-back {
		font-size: 20px;
	}

	.card-question,
	.card-answer {
		font-size: 16px;
		line-height: 28px;
	}
}
</style>
