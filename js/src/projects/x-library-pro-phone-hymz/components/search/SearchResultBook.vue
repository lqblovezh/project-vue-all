<template lang="pug">
.result-book.c-bg-f(@click="$push('/book-detail', { query: { bookId: data.id }})")
	.name.f15(v-html="$highlightWord(data.name, keyWord)")
	.result-book__info.clearfix
		img(:src="data.picture")
		.c-6.f14.ellipsis-5(v-html="$highlightWord(data.content, keyWord)")
</template>
<script>
export default {
	props: {
		data: {
			type: Object
		},
		keyWord: String
	}
}
</script>
<style lang="stylus">
.result-book
	&__info
		img
			float left
			margin-right 0.2rem
			width 1.2rem
			height 1.79rem
		>div
			overflow hidden
			line-height 1.5
</style>
