<template lang="pug">
.home-nav-search.c-bg-theme(@click="$go('search')")
	.nav-search.flex-ac.c-bg-f.f13
		.icon-search
		span 书籍搜索
</template>
<script>
export default {}
</script>
<style lang="stylus">
.home-nav-search
	padding 0.16rem 0.68rem
	.nav-search
		height 0.56rem
		border-radius 999px
		color #999999
		> .icon-search
			margin 0 0.1rem
</style>
