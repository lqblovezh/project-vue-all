<template lang="pug">
.home-book-item.f13(:class="{'single-item': type === 'single'}")
	.book-item__body.clearfix(@click="$push('/book-detail', {query: { bookId: data.id }})")
		img(:src="data.img || data.picture")
		.book-item__content
			.book-item__name.c-font-main.f14(:class="{'f17': type === 'single'}") {{ data.bookname }}
			p.c-6.author ({{data.auth_nationality}}){{ data.author }}
			p.abs.ellipsis-3(v-if="data.abs && type !== 'single'") {{ data.abs }}
			p.c-6.translator(v-if="data.translator && type === 'single'")
				span.c-9 译者：
				| {{ data.translator}}等
			p.c-6(v-if="data.publish_year")
				span.c-9 出版年代：
				| {{ data.publish_year}}年
	.book-item__points.flex-bs.c-6(v-if="hasFooter")
		.left
			span 知识点：
			a(
				v-for="{name, id} in data.points"
				v-len="len"
				@click="$push('/knowledge-point/list', {query: { id, bookId: data.id, label: name }})"
			) {{ name }}
		.book-more(@click.stop="$push('knowledge-point', { query: { bookId: data.id, bookName: data.bookname }})") 更多
			span.icon-more
</template>
<script>
export default {
	props: {
		data: {
			type: Object,
			required: true
		},
		hasFooter: {
			type: Boolean,
			default: false
		},
		type: {}
	},
	data() {
		return {
			len: 3
		}
	}
}
</script>
<style lang="stylus">
.home-book-item
	&.single-item
		img
			margin-right 0.3rem
			width 2.1rem
			height 3.1rem
			box-shadow 0 0 4px rgba(0,0,0,.2)
	.book-item__body
		margin-bottom 0.32rem
		.book-item__content
			overflow hidden
			.book-item__name
				margin 0.16rem 0 0
			.author, .translator
				margin 0.2rem 0
			>.abs
				color #a3a3a3
				line-height 1.5
	img
		float left
		margin-right 0.2rem
		width 1.49rem
		height 2.2rem
		box-shadow 0 2px 2px rgba(0, 0, 0, .3)
	.book-item__points
		font-size 12px
		.left
			flex 1
			margin-right 0.2rem
		a
			display inline-block
			padding 0.12rem 0.26rem
			margin-right 0.14rem
			border-radius 999px
			background-color #f0f0f0
		.book-more
			width 1.3rem
			height 0.5rem
			line-height 0.5rem
			text-align center
			border-radius 0.25rem
			background-color #f0f0f0
			>span
				transform translateY(0.02rem)
				margin-left 0.04rem
</style>
