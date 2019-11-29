<template lang="pug">
.search-advanced
	p.search-tips.flex-ac.f11.container
		span.ib.tc !
		|温馨提示：您可以输入一个或多个条件进行检索
	.container.c-bg-f
		ui-field(
			v-for="({ type, value }, index) in types"
			:label="type+'：'"
			:placeholder="'请输入'+type"
			v-model="form[value]"
			v-if="type !== '学科领域'"
		)
		SearchSelect(
			:list="category_list"
			:label="type+'：'"
			:placeholder="'请输入'+type"
			type="label"
			v-model="form[value]"
			v-else
		)
		.search-advanced__button.tc
			BaseButton(txt="搜索" type="theme" @click-event="search" large)
</template>
<script>
import { mapState } from 'vuex';
import SearchSelect from './SearchSelect'
export default {
	asyncData({ store, route }) {
		store.dispatch('category/queryCategoryList')
		store.dispatch('search/searchType', { type: 'advanced' })
	},
	components: { SearchSelect },
	computed: {
		...mapState('search', {
			types: state => state.type
		}),
		...mapState('category', {
			category_list: state => state.category_list
		})
	},
	data () {
		return {
			form: {}
		}
	},
	methods: {
		search() {
			this.$go('search/result', {...this.form})
		}
	}
}
</script>
<style lang="stylus">
.search-advanced
	.search-tips
		height 0.58rem
		>span
			margin-right 0.1rem
			height 11px
			width 11px
			border 1px solid #f1ce44
			color #f1ce44
			border-radius 50%
	&__button
		padding-top 0.8rem
		padding-bottom 0.74rem
		button
			width 100%
			height 0.8rem
			border-radius 5px
</style>