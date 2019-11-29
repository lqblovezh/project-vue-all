<template lang="pug">
.ui-checkbox(:class="inputClass")
	input(type="checkbox" :checked="isChecked")
	label
</template>
<script>
export default {
	props: {
		// 用户自定义input样式
		inputClass: {
			type: String
		},
		isChecked: {
			type: Boolean,
			default: false
		}
	}
}
</script>
<style lang="stylus">
checkbox-len = 20px
theme-color = #1ABC9C
.ui-checkbox
	position relative
	display inline-block
	input[type="checkbox"]
		width checkbox-len
		height checkbox-len
		display none
	input[type="checkbox"] + label
		position relative
		left 0
		display inline-block
		width 18px
		height 18px
		border-radius 50%
		background-color #FFF
		border 1px solid #DDD
	input[type="checkbox"]:checked + label:after
		content ''
		position absolute
		display inline-block
		top 4px
		left 4px
		width 8px
		height 4px
		border-left 3px solid #1ABC9C
		border-bottom 3px solid #1ABC9C
		transform rotate(-40deg)
</style>