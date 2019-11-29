<template lang="pug">
.footer.fixed-bottom.book-detail-footer.f11
	button.btn-copyright(v-if="!hadCopyRight") 暂无版权
	.flex-tc(v-else)
		button.c-bg-f(type="button" @click="addToBookShelf")
			div(:class="[isJoined ? 'icon-bookshelf-enter' : 'icon-bookshelf']")
			p {{ isJoined ? '已加入书架' : '加入书架'}}
		button.btn-theme(type="button" @click="$emit('read')")
			.icon-book
			p {{ hadRead ? '继续阅读': '立即阅读'}}
</template>
<script>
export default {
	props: {
		hadCopyRight: {
			type: Boolean,
			default: true
		},
		hadRead: {
			type: Boolean,
			default: false
		},
		info: {
      type: Object,
      required: true
    }
  },
  computed: {
    isJoined () {
      return this.info.has_join
    }
  },
	methods: {
		async addToBookShelf() {
			let name = this.isJoined ? 'removeFromBookShelf' : 'addToBookShelf',
					msg = '',
					bookId = this.isJoined ? [this.info.id] : this.info.id,
					book_shelf_id = this.isJoined ? [this.info.book_shelf_id] : this.info.book_shelf_id
			try {
				const { data } = await this.$services.book[name]({bookId, book_shelf_id })
				this.$set(this.info, 'has_join', !this.isJoined)
				msg = `${this.isJoined?'加入成功':'移除成功'}`
			} catch(e) {
				msg = e.toString().split(':')[1].trim()
			} finally {
				this.$Toast({
					message: msg
				})
			}
		}
	}
}
</script>
<style lang="stylus">
.book-detail-footer
	height 1.1rem
	z-index 10
	.btn-copyright
		width 100%
		height 100%
	.flex-tc
		height 1.1rem
		> button
			flex 1
			height 100%
			padding 0.15rem 0
			box-sizing border-box
			&:first-child
				color #6a7272
			> p
				line-height 1
</style>
