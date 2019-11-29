<template lang="pug">
section.hot-read.container.section
  .section-inner.grid-5.clearfix
    BookItem(
      v-for="(item, index) in list"
      :key="item.id"
      :item="item"
      :idx="index"
    )
</template>
<script>
import { mapState } from 'vuex'
export default {
  asyncData({ store, route }) {
    store.dispatch('home/queryHotReadList', { offset: 15 })
  },
  computed: {
    ...mapState('home', {
      list: state => state.hot_read_list
    })
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus">
.hot-read
  >div
    background-color #fffdf7
    border 1px solid #d5ccb2
  .book-item
    padding 0 20px
    &:nth-of-type(1)
      .left-triangle
        border-left-color #ff2e2e
    &:nth-of-type(2)
      .left-triangle
        border-left-color #ff732e
    &:nth-of-type(3)
      .left-triangle
        border-left-color #ffa92e
    &:nth-of-type(4)
      .left-triangle
        border-left-color #f7cf30
    &:nth-of-type(5)
      .left-triangle
        border-left-color #f5e52e
</style>
