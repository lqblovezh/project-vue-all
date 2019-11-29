<template lang="pug">
.book-detail
  v-page(title="全部评论")
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    )
      .scroll.container
        BookCommentItem(
          v-for="i in list"
          :key="i.id"
          :data="i")
</template>
<script>
import { mapState, mapActions } from 'vuex'
import BookCommentItem from '@/components/book/BookCommentItem'
import BookCommentInput from '@/components/book/BookCommentInput'
export default {
  asyncData({ store, route }) {
    return store.dispatch('book/getComments', { clean: true, ...route.query })
  },
  components: { BookCommentItem, BookCommentInput },
  computed: {
    ...mapState('book', {
      list: state => state.commentList,
      isLoaded: state => state.isLoaded
    })
  },
  data() {
    return {
      options: {
        pullUpLoad: {
          txt: {
            more: '加载中...',
            noMore: '暂无更多数据'
          },
          visible: true
        }
      }
    }
  },
  methods: {
    ...mapActions('book', ['getComments']),
    async onPullingUp() {
      if (!this.isLoaded) {
        // 新数据
        await this.getComments()
      }
      this.$refs.scroll.forceUpdate(true, true)
    },
  }
}
</script>
