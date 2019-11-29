<template lang="pug">
.home-subject-item(@click="$go(path, { sid: data.id })")
	.subject-item__img
		img(:src="data.picture")
		.subject-item__name.f14.ellipsis {{ data.name }}
	.subject-item__intro.f13.ellipsis-2 {{ $convertHtmlToStr(data.content) }}
</template>
<script>
export default {
	props: {
		data: {
			type: Object,
			required: true
		},
		path: {
			type: String,
		}
	}
} 
</script>
<style lang="stylus">
.home-subject-item
	width 3.3rem
	line-height 1
	img
		width 100%
		height 1.96rem
	.subject-item__name
		margin 0.2rem 0 0.14rem
		color #2e3332
	.subject-item__intro
		color #a3a3a3
		line-height 1.3
		> img
			display none
</style>