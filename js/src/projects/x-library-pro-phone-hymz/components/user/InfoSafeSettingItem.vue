<template lang="pug">
.info-safe-setting-item.flex-bs(@click="$go(to)")
	.safe-setting-item__left
		.label.c-font-main.f14 {{ label }}
		.tips.f12.c-font-gray {{ tips }}
	.safe-setting-item__right.flex-ac
		p.f14(v-if="value") {{ value | phoneFormat }}
		.icon-enter
</template>
<script>
export default {
	props: {
		label: {
			type: String
		},
		tips: {
			type: String
		},
		value: {
			type: String,
		},
		to: {
			type: String,
			required: true
		}
	}
}
</script>
<style lang="stylus">
.info-safe-setting-item
	height 1.3rem
	padding 0 0.3rem

	.safe-setting-item__left
		.label
			margin-bottom 0.2rem
</style>