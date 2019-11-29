<template lang="pug">
.vip-panel.container
	.vip-panel__title.c-3.f17 会员特权
	.vip-panel__wrap.flex
		.vip-panel__card.flex-ac(v-for='el in vipList')
			img(:src="el.value_src")
			p.f13 {{ el.name }}
	.vip-panel__title.c-3.f17 特权介绍
	.vip-panel__list
		.vip-panel__item(v-for="nav in vipList")
			.vip-panel__item-title.f14 {{ nav.name }}
			.vip-panel__item-abs.f13 {{ nav.abs }}
</template>
<script>
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState('user', {
			vipList: state => state.vip_privilege
		})
	},
}
</script>
<style lang="stylus">
.vip-panel
	margin-top 0.5rem
	&__wrap
		margin-top 0.4rem
		flex-wrap wrap
	&__card
		margin-right 11px
		margin-bottom 0.22rem
		width calc(100%/2 - 5.5px)
		height 1.48rem
		padding 0 0.26rem
		box-sizing border-box
		background-color #f2f2f2
		img
			width 0.88rem
			height 0.88rem
			border-radius 50%
		p
			margin-left 0.26rem
			line-height 1.5em
		&:nth-of-type(2n)
			margin-right 0
	&__item
		padding 0.3rem 0
		&:not(:last-child)
			border-bottom 1px solid #ebf2f1
		&-title
			color #2e3332
			margin-bottom 0.2rem
		&-abs
			line-height 1.5
			color #7d8388
</style>
