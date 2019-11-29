<template lang="pug">
.history-panel.c-bg-f(v-if="list && list.length")
	.history-title.c-3 历史搜索
	.history-list
		ui-cell(:label="i" @search-event="$emit('goSearch', i)" is-link v-for="i in list")
	p.tc.c-theme.f14(@click="$emit('remove')") 清空搜索记录
</template>
<script>
import storage from '@/common/js/storage'
export default {
	props: {
		list: {
			type: Array,
			required: true
		}
	}
}
</script>
<style lang="stylus">
.history-panel
	padding 1.2rem 0.3rem 0
	>.history-title
		margin-bottom 0.2rem
	>.history-list
		.ui-cell
			height 0.9rem
			padding 0
			color #4d4d4d
			font-size 14px
			border-bottom 1px solid #ebf2f1
	>p
		height 0.9rem
		line-height 0.9rem
</style>
