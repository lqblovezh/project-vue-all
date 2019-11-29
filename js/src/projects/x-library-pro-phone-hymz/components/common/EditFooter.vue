<template lang="pug">
.footer.flex-tc.fixed-bottom.c-bg-f.edit-footer(v-show="isShow")
	BaseButton(v-for="btn in btns" :txt="btn.text" :btn-class="btn.btnClass" :type="btn.type" large @click-event="btn.clickEvent()")
</template>
<script>
export default {
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		btns: {
			type: Array,
			required: true
		}
	}
}
</script>
<style lang="stylus">
.edit-footer
	z-index 10
	>div
		flex 1
	button
		height 1rem
		border none
</style>