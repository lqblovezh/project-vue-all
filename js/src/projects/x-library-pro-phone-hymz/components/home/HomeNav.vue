<template lang="pug">
.home-nav.container
	.nav-item.ib.c-6.f14(
		v-for="{ name, id} in list"
		@click="$push('/knowledge-point/list', { query: { id, label: name }})"
	) {{ name }}
</template>
<script>
import { mapState } from 'vuex'
import HomeNavItem from './HomeNavItem'
export default {
	components: { HomeNavItem },
	computed: {
		...mapState('knowledge', {
			list: state => state.knowledge_list
		})
	}
}
</script>
<style lang="stylus">
.home-nav
	padding-bottom 0.3rem
	.nav-item
		margin-right 0.2rem
		margin-bottom 0.2rem
		padding 0.16rem 0.24rem
		border 1px solid #ddd
		border-radius 5px
		box-shadow 0 0 2px rgba(0,0,0,.1)
</style>