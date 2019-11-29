<template lang="pug">
.subject-list-item.clearfix(@click="$push('subject-detail', {query: {sid: data.id }})")
	img(:src="data.picture")
	.subject-item__content
		.subject-item__name.f14.ellipsis {{ data.name }}
		p.f13.ellipsis-3 {{ $convertHtmlToStr(data.content) }}
</template>
<script>
export default {
	props: {
		data: {
			type: Object,
			required: true
		}
	}
}
</script>
<style lang="stylus">
.subject-list-item
	margin 0.3rem
	img
		float left
		margin-right 0.3rem
		width 2.5rem
		height 1.48rem
	.subject-item__name
		color #2e3332
		margin-bottom 0.35rem
		p
			color #a3a3a3
			line-height 1.5
</style>