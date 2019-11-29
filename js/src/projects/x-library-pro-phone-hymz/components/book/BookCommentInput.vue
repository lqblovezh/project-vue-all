<template lang="pug">
.book-comment__edit.flex-bs
	.left
		input(type="text")
	button 发送
</template>
<script>
export default {
	
}
</script>
<style lang="stylus">
@import '../../common/css/variable.styl'
.book-comment__edit
	position fixed
	bottom 0
	width 100%
	z-index 99
	box-shadow 0 0 2px rgba(0, 0, 0, .2)
	.left
		padding 0 0.2rem
		flex 1
		input
			width 100%
			margin 0.2rem 0
			height 0.7rem
			outline none
			border none
			border-radius 5px
			text-indent 1em
			box-shadow 0 0 3px rgba(0, 0, 0, .3)
	>button
		margin-right 0.2rem
		width 1.4rem
		height 0.7rem
		color #FFF
		border-radius 5px
		background-color theme-color
</style>