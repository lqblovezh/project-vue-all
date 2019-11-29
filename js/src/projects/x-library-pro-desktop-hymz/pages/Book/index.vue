<template lang="pug">
.book-detail.container
  .book-detail__wrap.flex-bs
    BookLeftPanel
    BookRightPanel
</template>
<script>
import BookLeftPanel from '@/components/book/BookLeftPanel'
import BookRightPanel from '@/components/book/BookRightPanel'
import { mapMutations, mapActions } from 'vuex'
import { SET_BOOK_INFO } from '@/store/types'
export default {
  asyncData({ store, route }) {
    store.dispatch('book/init', { ...route.query })
  },
  components: { BookLeftPanel, BookRightPanel },
  methods: {
    ...mapMutations('book', {
      setBookInfo: SET_BOOK_INFO
    }),
    ...mapActions('book', ['init'])
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.query)
    next()
  },
  beforeDestroy() {
    // 离开路由时清除书籍信息
    this.setBookInfo({})
  }
}
</script>
<style lang="stylus">
.book-detail
  &__wrap
    padding-top 30px
    align-items flex-start
    >div
      background-color #fffdf7
      border 1px solid #d5ccb2
</style>