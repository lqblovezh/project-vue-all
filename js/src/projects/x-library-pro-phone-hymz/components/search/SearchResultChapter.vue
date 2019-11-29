<template lang="pug">
.result-chapter.c-bg-f(@click="goRead")
	.name(v-html="$highlightWord(data.name, keyWord)")
	.abs.ellipsis-3(v-html="$highlightWord(data.content, keyWord)")
	.source.ellipsis 来源于：《
		span(v-show="data.name") {{ data.name }}
		|》{{ data.chapter_name }}
</template>
<script>
export default {
	props: {
		data: {
			type: Object
		},
		keyWord: String
	},
	methods: {
		async goRead() {
			const { id, index: chapter_root, chapter_id } = this.data
			this.$read({ id, chapter_root, chapter_id})
		}
	}
}
</script>
<style lang="stylus">
.result-chapter
	&__name
		margin-bottom 0.28rem
		color #2e3332
	&__info
		line-height 1.5
		margin-bottom 0.3rem
	&__tips
		color #a3a3a3
</style>
