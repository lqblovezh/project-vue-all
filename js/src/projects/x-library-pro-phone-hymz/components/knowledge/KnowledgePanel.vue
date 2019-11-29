<template lang="pug">
.knowledge-panel.c-bg-f.f13
	.knowledge-panel__title.c-font-main.f15(v-if="type === 'table'") {{ title }}
	.knowledge-panel__title.c-font-main.f15(v-else) 知识点：
		span.c-theme {{ title }}
	.knowledge-panel__body.c-6
		slot
</template>
<script>
export default {
	props: {
		title: {
			type: String
		},
		type: {
			type: String,
			default: 'table'
		}
	}
}
</script>
<style lang="stylus">
.knowledge-panel
	padding 0.3rem
	&__title
		height 0.6rem
		line-height 0.6rem
	&__body
		padding-top 0.2rem
		p
			line-height 0.44rem
</style>