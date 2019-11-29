<template lang="pug">
.home-panel.c-bg-f
	.home-panel-title.flex-bs
		.panel-title__name.c-3 {{ title }}
		p.c-9.f13(@click="handlClick") 更多
	slot
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			require: true
		},
		path: {
			type: String
		},
		userClick: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		handlClick() {
			this.userClick ? this.$emit('click') : this.$go(this.path)
		}
	}
}
</script>
<style lang="stylus">
.home-panel
	margin-bottom 0.2rem
	.home-panel-title
		padding 0.3rem 0.2rem
</style>