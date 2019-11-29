<template lang="pug">
.book-catalog
  v-page(title="目录")
    .scroll-full
      .book-catalog__title.flex-ac
        .icon-chapter
        .ib 共
          span.c-theme {{ list.length }}
          |篇
      .catalog-list.c-6.f13
        BookTreeItem(v-for="(i, index) in list" :data="i" :idx="index")
</template>
<script>
import { mapState } from 'vuex'
import BookTreeItem from '@/components/category/BookTreeItem'
export default {
  components: { BookTreeItem },
  asyncData({ store, route }) {
    store.dispatch('book/getCatalog', { ...route.query })
  },
  computed: {
    ...mapState('book', {
      list: state => state.catalog
    })
  },
  methods: {
    read(item) {
      console.log(item)
    }
  },
  provide() {
    return {
      read: this.read
    }
  }
}
</script>
<style lang="stylus">
.book-catalog
  // padding 0.3rem
  .scroll-full
    padding 0.3rem
    box-sizing border-box
  .book-catalog__title
    margin-bottom 0.1rem
    .icon-chapter
      margin-right 0.1rem
    span
      margin 0 0.1rem
  .catalog-list
    >.book-tree-item
      >.book-tree-item__parent
        p
          color #333
    .book-tree-item
      &__parent
        height 0.85rem
        line-height 0.85rem
        border-bottom 1px solid #ebf2f1
</style>
