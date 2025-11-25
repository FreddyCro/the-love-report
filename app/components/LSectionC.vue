<script lang="ts" setup>
import sectionCData from "~/locales/section-c.json";
import LPic from './LPic.vue';

interface CaseItem {
	id: string;
	name: string;
	age: string;
	occupation: string;
	tag?: string;
	story: string;
	title: string;
	desc: string;
	avatar?: string;
	imgCircle: string;
	imgSquare: string;
}

const content = {
	title: sectionCData.title,
	intro: sectionCData.intro as string[],
};

const cases = sectionCData.cases as CaseItem[];

const avatarPlaceholders = [
	{ gender: "female", selected: true },
	{ gender: "male", selected: false },
	{ gender: "male", selected: false },
	{ gender: "female", selected: false },
	{ gender: "female", selected: false },
	{ gender: "male", selected: false },
];
</script>

<template>
	<section class="section-c bg-love-blue-01 rounded-t-[120px]">
		<div class="l-container">
			<!-- Title -->
			<div class="text-center mb-6">
				<div class="section-c__dialogbox">
					<h2 class="text-love-blue-03">{{ content.title }}</h2>
				</div>
			</div>
			<!-- Intro Text -->
			<div class="section-c__intro">
				<p v-for="(paragraph, index) in content.intro" :key="index">
					{{ paragraph }}
				</p>
			</div>

			<!-- Avatar Selection -->
			<div class="section-c__avatars my-6 flex justify-between items-center gap-4">
				<button class="avatar-nav--prev" aria-label="上一個">
					<LPic
						src="/img/button_card_click_left"
						ext="svg"
						:use-prefix="false"
						:use2x="false"
						:webp="false"
					/>
				</button>
				<div
					v-for="caseItem in cases"
					:key="caseItem.id"
					class=""
				>
					<div class="">
						<LPic
						:src="caseItem.imgCircle"
						ext="png"
						:use-prefix="false"
						:use2x="false"
						:webp="true"
					/>
					</div>
				</div>
				<button class="avatar-nav--next" aria-label="下一個">
					<LPic
						src="/img/button_card_click_right"
						ext="svg"
						:use-prefix="false"
						:use2x="false"
						:webp="false"
					/>
				</button>
			</div>

			<!-- Case Cards -->
			<div class="section-c__cards">
				<div v-for="caseItem in cases" :key="caseItem.id" class="case-card">
					<div class="case-card__header">
						<div class="case-card__avatar">
							<div class="avatar-placeholder">
								<span class="avatar-icon">👤</span>
							</div>
						</div>
						<div class="case-card__info">
							<h4 class="case-card__name">
								{{ caseItem.name }}
								<span class="case-card__meta"
									>{{ caseItem.age }} | {{ caseItem.occupation }}</span
								>
							</h4>
							<p v-if="caseItem.tag" class="case-card__tag">
								{{ caseItem.tag }}
							</p>
							<p class="case-card__story">{{ caseItem.story }}</p>
						</div>
					</div>

					<div class="case-card__content">
						<p class="case-card__highlight">{{ caseItem.title }}</p>
						<p class="case-card__detail">
							{{ caseItem.desc }}
						</p>
					</div>

					<!-- <button class="case-card__expand" aria-label="展開更多">
						<span class="expand-icon">+</span>
					</button> -->
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.section-c {
	min-height: 100vh;
	padding: 80px 0 120px;

	&__dialogbox {
		width: 240px;
		height: 90px;
		background-image: url('/img/intimate_relationships_p0201_dialogbox_pad.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		justify-content: center;
		margin: 0 auto;
		padding-top: 6px;
	}

	&__intro {

		p {
			margin-bottom: 36px;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}

	// &__avatars {
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	gap: 16px;
	// 	position: relative;
	// }

	&__cards {
		max-width: 620px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
}

.avatar-item {
	transition: all 0.3s ease;

	&--selected {
		transform: scale(1.2);

		.avatar-circle {
			border-width: 4px;
		}
	}
}

.avatar-circle {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	border: 2px solid #9fd8f0;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.3s ease;

	&--female {
		background: linear-gradient(135deg, #ffa59b 0%, #ffeded 100%);
	}

	&--male {
		background: linear-gradient(135deg, #9fd8f0 0%, #d6f2fa 100%);
	}

	// .avatar-icon {
	// 	font-size: 32px;
	// 	opacity: 0.6;
	// }
}

// .avatar-nav {
// 	width: 40px;
// 	height: 40px;
// 	border-radius: 50%;
// 	border: 2px solid #0095cc;
// 	background: #fff;
// 	color: #0095cc;
// 	font-size: 24px;
// 	cursor: pointer;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	transition: all 0.3s ease;

// 	&:hover {
// 		background: #0095cc;
// 		color: #fff;
// 	}

// 	&--next {
// 		margin-left: 8px;
// 	}
// }

.case-card {
	background: #fff;
	border-radius: 30px;
	border: 2px solid #9fd8f0;
	padding: 40px;
	position: relative;
	box-shadow: 0 4px 20px rgba(0, 149, 204, 0.1);

	&__header {
		display: flex;
		gap: 24px;
		margin-bottom: 24px;
	}

	&__avatar {
		flex-shrink: 0;
	}

	.avatar-placeholder {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: linear-gradient(135deg, #ffa59b 0%, #ffeded 100%);
		display: flex;
		align-items: center;
		justify-content: center;

		.avatar-icon {
			font-size: 40px;
			opacity: 0.6;
		}
	}

	&__info {
		flex: 1;
	}

	&__name {
		font-size: 28px;
		font-weight: 700;
		color: #404040;
		margin-bottom: 8px;
		line-height: 1.2;
	}

	&__meta {
		font-size: 18px;
		font-weight: 400;
		color: #404040;
		margin-left: 8px;
	}

	&__tag {
		font-size: 18px;
		line-height: 32px;
		color: #404040;
		margin-bottom: 12px;
	}

	&__story {
		font-size: 18px;
		line-height: 32px;
		color: #404040;
	}

	&__content {
		padding-top: 24px;
		border-top: 2px solid #9fd8f0;
	}

	&__highlight {
		font-size: 18px;
		line-height: 32px;
		color: #fe7152;
		font-weight: 700;
		margin-bottom: 16px;
	}

	&__detail {
		font-size: 18px;
		line-height: 32px;
		color: #404040;
	}

	&__expand {
		position: absolute;
		bottom: -20px;
		left: 50%;
		transform: translateX(-50%);
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: #9fd8f0;
		border: 2px solid #fff;
		color: #fff;
		font-size: 32px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 149, 204, 0.3);

		&:hover {
			background: #0095cc;
			transform: translateX(-50%) scale(1.1);
		}

		.expand-icon {
			line-height: 1;
			font-weight: 300;
		}
	}
}

@media (max-width: 768px) {
	.section-c {
		padding: 60px 20px 100px;

		&__dialogbox {
			width: 180px;
			height: 68px;
		}

		&__title {
			font-size: 24px;
		}

		&__intro {
			font-size: 16px;
			line-height: 32px;
			margin-bottom: 60px;
		}

		&__avatars {
			gap: 12px;
			margin-bottom: 60px;
		}
	}

	.avatar-circle {
		width: 50px;
		height: 50px;

		.avatar-icon {
			font-size: 24px;
		}
	}

	.case-card {
		padding: 24px;
		border-radius: 20px;

		&__header {
			flex-direction: column;
			gap: 16px;
		}

		&__name {
			font-size: 24px;
		}

		&__meta {
			font-size: 16px;
			display: block;
			margin-left: 0;
			margin-top: 4px;
		}

		&__tag,
		&__story,
		&__highlight,
		&__detail {
			font-size: 16px;
			line-height: 28px;
		}
	}
}

</style>
