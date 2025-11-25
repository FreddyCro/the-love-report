<script lang="ts" setup>
import sectionEData from "~/locales/section-e.json";

interface ContentBlock {
	type: string;
	desc?: string | string[];
	title?: string;
	prefix?: string;
	text?: string;
	src?: string;
	note?: string;
}

interface CaseItem {
	index: number;
	title: string;
	content: ContentBlock[];
}

const content = {
	title: sectionEData.title,
	intro: sectionEData.intro as string[],
};

const cases = sectionEData.cases as CaseItem[];
</script>

<template>
	<section class="section-e bg-white rounded-t-[120px]">
		<div class="l-container">
			<!-- Title -->
			<div class="section-e__header">
				<h2 class="section-e__title">{{ content.title }}</h2>
			</div>

			<!-- Intro Text -->
			<div class="section-e__intro">
				<p v-for="(paragraph, index) in content.intro" :key="index">
					{{ paragraph }}
				</p>
			</div>

			<!-- Cases -->
			<div v-for="caseItem in cases" :key="caseItem.index" class="case-section">
				<!-- Step Indicator -->
				<div class="section-e__step">
					<div class="step-number">{{ caseItem.index }}</div>
				</div>

				<h3 class="case-section__title">{{ caseItem.title }}</h3>

				<!-- Content Blocks -->
				<div
					v-for="(block, blockIndex) in caseItem.content"
					:key="blockIndex"
					class="content-block"
				>
					<!-- Title Block -->
					<div v-if="block.type === 'title'" class="block-title">
						<h4>{{ block.desc }}</h4>
					</div>

					<!-- Text Block -->
					<div v-else-if="block.type === 'text'" class="block-text">
						<p
							v-for="(paragraph, pIndex) in (block.desc as string[])"
							:key="pIndex"
						>
							{{ paragraph }}
						</p>
					</div>

					<!-- Comment Block -->
					<div v-else-if="block.type === 'comment'" class="block-comment">
						<div class="comment-box">
							<p>{{ block.desc }}</p>
						</div>
					</div>

					<!-- Data Block -->
					<div v-else-if="block.type === 'data'" class="block-data">
						<h5 v-if="block.title" class="data-title">{{ block.title }}</h5>
						<div class="data-items">
							<div
								v-for="(item, itemIndex) in (block.desc as any[])"
								:key="itemIndex"
								class="data-item"
							>
								<div class="data-prefix">{{ item.prefix }}</div>
								<div class="data-text">{{ item.text }}</div>
							</div>
						</div>
						<p v-if="block.note" class="data-note">{{ block.note }}</p>
					</div>

					<!-- Image Block -->
					<div v-else-if="block.type === 'image'" class="block-image">
						<NuxtImg
							:src="block.src"
							alt=""
							class="block-image__img"
							format="webp"
						/>
						<p v-if="block.note" class="block-image__note">{{ block.note }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.section-e {
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
		border: 3px solid #404040;
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
		margin-bottom: 40px;
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
	border: 3px solid #404040;
	font-size: 32px;
	font-weight: 700;
	color: #404040;
}

.case-section {
	max-width: 620px;
	margin: 0 auto 80px;

	&__title {
		font-size: 28px;
		font-weight: 700;
		color: #404040;
		margin-bottom: 40px;
		text-align: center;
	}
}

.content-block {
	margin-bottom: 32px;
}

.block-title {
	h4 {
		font-size: 20px;
		font-weight: 700;
		color: #404040;
		line-height: 32px;
		margin-bottom: 16px;
	}
}

.block-text {
	p {
		font-size: 18px;
		line-height: 36px;
		color: #404040;
		margin-bottom: 16px;

		&:last-child {
			margin-bottom: 0;
		}
	}
}

.block-comment {
	margin: 32px 0;

	.comment-box {
		background: #f5f5f5;
		border-left: 4px solid #0095cc;
		padding: 20px 24px;
		border-radius: 8px;

		p {
			font-size: 18px;
			line-height: 32px;
			color: #404040;
			margin: 0;
		}
	}
}

.block-data {
	margin: 40px 0;
	padding: 32px;
	background: #f9f9f9;
	border-radius: 20px;

	.data-title {
		font-size: 18px;
		font-weight: 700;
		color: #404040;
		margin-bottom: 24px;
		text-align: center;
	}

	.data-items {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.data-item {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.data-prefix {
		font-size: 24px;
		font-weight: 700;
		color: #0095cc;
		min-width: 80px;
		text-align: center;
		padding: 8px 16px;
		background: #d6f2fa;
		border-radius: 999px;
	}

	.data-text {
		font-size: 18px;
		line-height: 32px;
		color: #404040;
		flex: 1;
	}

	.data-note {
		font-size: 14px;
		line-height: 24px;
		color: #666;
		margin-top: 16px;
		text-align: center;
	}
}

.block-image {
	margin: 40px 0;

	&__img {
		width: 100%;
		height: auto;
		border-radius: 20px;
		margin-bottom: 16px;
	}

	&__note {
		font-size: 14px;
		line-height: 24px;
		color: #666;
		text-align: center;
	}
}

@media (max-width: 768px) {
	.section-e {
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
	}

	.block-title {
		h4 {
			font-size: 18px;
		}
	}

	.block-text {
		p {
			font-size: 16px;
			line-height: 28px;
		}
	}

	.block-comment {
		.comment-box {
			padding: 16px 20px;

			p {
				font-size: 16px;
				line-height: 28px;
			}
		}
	}

	.block-data {
		padding: 24px 16px;

		.data-title {
			font-size: 16px;
		}

		.data-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}

		.data-prefix {
			font-size: 20px;
			min-width: auto;
		}

		.data-text {
			font-size: 16px;
			line-height: 28px;
		}

		.data-note {
			font-size: 12px;
		}
	}

	.block-image {
		&__note {
			font-size: 12px;
		}
	}
}
</style>
