<template lang="pug">
.book-room-item(v-longtap="{handler: longTapHandler, click: viewPage}")
	.pr(v-if="item")
		img(:src="item.picture")
		p.tc.f14 {{ item.book_name }}
		BaseCheckbox(:is-checked="item.checked" input-class="pa book-room__input" v-show="edit")
	.book-room-item-full.flex-tc(v-else @click="$go('home')")
		.css-plus
</template>
<script>
export default {
	props: {
		edit: {
			type: Boolean,
			default: false
		},
		img: {
			type: String,
		},
		item: {
			type: Object
		}
	},
	data() {
		return {
			checked: false
		}
	},
	methods: {
		test() {
			this.checked = !this.checked
		},
		longTapHandler() {
			this.$emit('toggleEditMode')
		},
		viewPage() {
			if (!this.edit) {
				this.$read({ id: this.item.book_id })
			} else {
				this.$emit('toggleItemSelectedStatus', this.item)
			}
		}
	}
}
</script>
<style lang="stylus">
.book-room-item
	margin 0 0.15rem
	width 2.05rem
	.pr
		p
			margin 0.3rem 0 0.35rem
			color #4d4d4d
	.circle
		top 0.1rem
		left 0.1rem
		width 0.3rem
		height 0.3rem
		border-radius 50%
		border 1px solid gray
		&-active
			background-color #1ABC9C
			border-color #1ABC9C
			&:after
				content ''
				position absolute
				top 0.06rem
				left 0.03rem
				display inline-block
				height 0.08rem
				width 0.15rem
				border-left 2px solid #FFF
				border-bottom 2px solid #FFF
				transform rotate(-35deg)
	img
		width 100%
		height 3rem
		box-shadow 0 0 2px rgba(0,0,0,.1)
	.book-room-item-full
		height 3.1rem
		line-height 100%
		background-color #f5faf9
		>.css-plus
			position relative
			height 4px
			width 1rem
			border-radius 2px
			background-color #009882
			&:after
				content ''
				display inline-block
				position absolute
				top -0.42rem
				left 50%
				margin-left -2px
				height 1rem
				width 4px
				border-radius 2px
				background-color #009882
	.book-room__input
		top 0.1rem
		left 0.1rem
</style>
