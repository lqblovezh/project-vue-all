<template lang="pug">
.book-right-panel
  h4.tc
    .icon-relate-book
    |相关书籍
  .book-right-panel__list.f14
    BookRightItem(
      v-for="item in list"
      :item="item"
      :key="item.id"
    )
</template>
<script>
import { mapState } from 'vuex'
import BookRightItem from './BookRightItem'
export default {
  components: { BookRightItem },
  computed: {
    ...mapState('book', {
      list: state => state.related_list
    })
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus">
.book-right-panel
  width 200px
  margin-left 28px
  h4
    height 50px
    line-height 50px
    font-weight bold
    color #c39f52
    background-color #f0eadb
    >div
      margin-right 5px
      transform translateY(2px)
  &__list
    padding 5px 40px 30px
</style>