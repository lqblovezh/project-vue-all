<template lang="pug">
.book-related.container.book-panel
  .book-panel__title
    .name 相关书籍
  .related-list.clearfix
    BookRelatedItem(
      v-for="(i, index) in list"
      :key="`${i}_${index}`"
      :item="i"
    )
  .tc.f12(@click="changeHandler")
    .icon-refresh
    |换一批
</template>
<script>
import { mapState, mapActions } from 'vuex'
import BookRelatedItem from './BookRelatedItem'
export default {
  components: { BookRelatedItem },
  computed: {
    ...mapState('book', {
      list: state => state.related_list
    })
  },
  methods: {
    ...mapActions('book', ['queryRelatedBookList']),
    async changeHandler() {
      const { bookId } = this.$route.query
      await this.queryRelatedBookList({ bookId })
    }
  }
}
</script>
<style lang="stylus">
.book-related
  .related-list
    padding-bottom 0.2rem
    border-bottom 1px solid #ebf2f1
    .book-related-item
      float left
      width 2rem
      margin-right 0.45rem
      margin-bottom 0.15rem
      >img
        margin-bottom 0.2rem
      >p
        line-height 1.5
      &:nth-of-type(3n)
        margin-right 0
    .tc
      padding 0.3rem 0
      border-top 1px solid #ebf2f1
      color #555
      div
        transform translateX(-0.1rem, 0.04rem)
  >.tc
    padding 0.3rem 0
    .icon-refresh
      margin-right 0.1rem
      transform translateY(0.04rem)
</style>
