<template lang="pug">
.home-nav-item.tc(@click="$go(path)")
	div(:class="'icon-'+iconClass")
	p {{ txt }}
</template>
<script>
export default {
	props: {
		iconClass: {
			type: String,
			required: true
		},
		txt: {
			type: String,
			required: true
		},
		path: {
			type: String,
			required: true
		}
	}
}
</script>
<style lang="stylus">
.home-nav-item
	flex 1
	div
		margin-bottom 0.2rem
</style>