<template lang="pug">
.search-normal
	.search-normal__block.pr
		.search-normal__field.flex-ac.pa.c-bg-f
			.search-normal__type.flex-ac(@click="toggleSelectBoxStatus")
				.ib.type-name.f13 {{ searchTypeData.name }}
				.ib.icon-triangle
			.search-normal__input.pr.f13.c-9
				input(type="text" placeholder="书籍检索" @input="sliceStr" v-model="keyword")
				.icon-search.pa(@click="search")
		transition(name="slide-down")
			.search-normal__selectbox.c-bg-f.pa.f14(v-show="showSelectBox")
				.selectbox-item(v-for="item in type" @click="changeSelectType(item)" :class="{'selectbox-item__active': searchTypeData.name === item.type}") {{item.type}}
		SearchHistory(
			:list="list"
			@remove="clearList"
			@goSearch="search"
		)
</template>
<script>
import {mapState,mapActions } from 'vuex'
import SearchHistory from './SearchHistory'
import storage from '@/common/js/storage'
import { throttle } from '@/common/js/base'
export default {
	components: { SearchHistory },
	data () {
		return {
			showSelectBox: false,
			searchTypeData: {},
			keyword: '',
			list: []
		}
	},
	computed: {
		...mapState('search', {
			type: state => state.type
		})
	},
	methods: {
    ...mapActions('search' , ['searchType']),
    sliceStr: throttle(function() {
      this.keyword = this.keyword.length > 20 ? this.keyword.slice(0, 20) : this.keyword
    }, 300),
		toggleSelectBoxStatus() {
			this.showSelectBox = !this.showSelectBox
		},
		changeSelectType({ type, value }) {
			this.searchTypeData.name = type
			this.searchTypeData.value = value
			this.toggleSelectBoxStatus()
		},
		search (k) {
			let keyword = typeof k === 'string' ? k : this.keyword
			this.$go('search/result', { keyword, type: this.searchTypeData.value,...this.$route.query })
		},
		clearList() {
			this.list = []
			storage.removeAll()
		}
	},
	async mounted() {
		await this.searchType()
		if (this.type.length) {
			let typeAll = this.type.find(tp => tp.type === '全部')
			let { type: name, value } = typeAll ? typeAll : this.type[0]
			this.searchTypeData = { name, value }
		}
		this.list = storage.data
	},
}
</script>
<style lang="stylus">
.search-normal
	&__field
		padding 0 0.3rem
		height 0.9rem
		width 100%
		box-sizing border-box
		z-index 10
		box-shadow 0 0 4px rgba(0,0,0,.1)
		.icon-triangle
			height 0
			width 0
			border-top 0.08rem solid #b2b2b2
			border-left 0.07rem solid transparent
			border-right 0.07rem solid transparent
		> div
			background-color #fff
	&__type
		width 1.5rem
		line-height 0.7rem
		>.type-name
			margin-right 0.1rem
	&__input
		padding-right 0.7rem
		flex 1
		border-left 1px solid #ebebeb
		input
			text-indent 1em
			width 100%
			height 100%
			border none
			outline none
		> .icon-search
			right 0.2rem
			top 0
			border-color #999
			&:after
				background-color #999
	&__selectbox
		width 100%
		top 0.9rem
		padding 0 0.3rem
		color #4d4d4d
		box-sizing border-box
		z-index 9
		box-shadow 0 0 3px rgba(0,0,0,.4)
		.selectbox-item
			height 0.9rem
			line-height 0.9rem
			&:not(:last-child)
				border-bottom 1px solid #ebf2f1
			&__active
				// background-color lightblue
</style>
