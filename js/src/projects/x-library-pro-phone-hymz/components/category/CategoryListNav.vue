<template lang="pug">
.book-nav.f14.c-bg-f(:class="{more: isShowMore}")
	.book-nav__head.container
		.book-nav__countries(:class="{ellipsis: !isShowMore}")
			span.ib.ctitle 作者国别：
			a(
				v-for="item in list"
				:key="item.id"
				:class="{active: value === item.label }"
				@click="$emit('click-event', item)"
			) {{ item.label }}
		a(@click="showMore") 更多
	.book-nav__selectbox
</template>
<script>
import { mapState } from 'vuex'
export default {
	props: {
		value: {
			type: String
		}
	},
	computed: {
		...mapState('category', {
			list: state => state.countries
		})
	},
	data() {
		return {
			isShowMore: false
		}
	},
	methods: {
		showMore() {
			this.isShowMore = !this.isShowMore
		}
  }
}
</script>
<style lang="stylus">
@import '../../common/css/variable.styl';
.book-nav
	min-height 0.9rem
	line-height 0.9rem
	box-shadow 0 0 4px rgba(0,0,0,.1)
	transition all .4s ease
	&.more
		min-height 2rem
		z-index 99
	&__head
		display flex
		align-items flex-start
		justify-content space-between
	&__countries
		flex 1
		color #333
		> a
			margin-right 0.4rem
			&.active
				color theme-color
</style>
