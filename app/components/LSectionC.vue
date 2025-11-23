<script lang="ts" setup>
import sectionCData from "~/locales/section-c.json";

interface CaseItem {
	id: string;
	name: string;
	age: string;
	occupation: string;
	tag?: string;
	story: string;
	highlight: string;
	avatar?: string;
}

const content = {
	title: sectionCData.title,
	intro: sectionCData.intro,
	intro2: sectionCData.intro2,
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
			<div class="section-c__header">
				<h2 class="section-c__title">{{ content.title }}</h2>
			</div>

			<!-- Intro Text -->
			<div class="section-c__intro">
				<p>{{ content.intro }}</p>
				<p>{{ content.intro2 }}</p>
			</div>

			<!-- Avatar Selection -->
			<div class="section-c__avatars">
				<div
					v-for="(avatar, index) in avatarPlaceholders"
					:key="index"
					class="avatar-item"
					:class="{ 'avatar-item--selected': avatar.selected }"
				>
					<div class="avatar-circle" :class="`avatar-circle--${avatar.gender}`">
						<span class="avatar-icon">👤</span>
					</div>
				</div>
				<button class="avatar-nav avatar-nav--next" aria-label="下一個">
					›
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
						<p class="case-card__highlight">{{ caseItem.highlight }}</p>
						<p class="case-card__detail">
							有些人可能會習慣獨身的生活，從頭來過工作忙碌、結束這段關係，也花時間重新調整與身心狀態，也算是個人經驗的一種成長期。公司特別的感覺眼神展開後，也必須要與對方建立之間。
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
		border: 3px solid #0095cc;
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

	&__avatars {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		margin-bottom: 80px;
		position: relative;
	}

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

	.avatar-icon {
		font-size: 32px;
		opacity: 0.6;
	}
}

.avatar-nav {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 2px solid #0095cc;
	background: #fff;
	color: #0095cc;
	font-size: 24px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;

	&:hover {
		background: #0095cc;
		color: #fff;
	}

	&--next {
		margin-left: 8px;
	}
}

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

		&__title {
			font-size: 24px;
			padding: 10px 30px;
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
