<template lang="pug">
.home-swiper
	.swiper-container(ref="container")
		.swiper-wrapper
			.swiper-slide(
				v-for="item, index in banner_list"
				:key="index"
			)
				img(:src="item.picture" @click="$push('/book-detail', {query: { bookId: item.book_id }})")
</template>
<script>
import Swiper from 'swiper'
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState('home', {
			banner_list: state => state.banners
		})
	},
	mounted() {
		this.$nextTick(() => {
			this.init()
		})
	},
	methods: {
		init() {
			this.swiper = new Swiper(this.$refs.container, {
				loop: true,
        autoplay: true,
        observer: true,
        observeParents: true
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
.home-swiper
	position absolute
	width 100%
	top 0.88rem
.swiper-container
	.swiper-slide
		box-sizing border-box
		padding 0 0.3rem
	img
		width 100%
		height 3rem
		border-radius 5px
</style>
