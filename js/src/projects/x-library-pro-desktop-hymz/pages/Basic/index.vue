<template>
	<div>
			<img class="basic_search_left_img" src="../../assets/img/hymzLog.png">
			<searchInput></searchInput>
			<basicMenu></basicMenu>
			<router-view class="router"></router-view>
	</div>
</template>

<script>
import searchInput from '@/components/common/searchInput'
import basicMenu from '@/components/common/basicMenu'
export default {
components:{
		searchInput,
		basicMenu,
}
}
</script>

<style lang="stylus" scoped>
img
	float left
	margin-left 17.4%
	margin-top 3px
	margin-right 45px
.router
	margin-top 31px
</style>