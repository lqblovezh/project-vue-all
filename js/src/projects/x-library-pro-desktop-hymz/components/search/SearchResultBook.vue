<template lang="pug">
.result-of-book
  SearchResultTitle(:key-name="keyWord" :str="item.name")
  .content.flex
    router-link(:to="{path: 'book-detail', query: { bookId: item.id }}" target="_blank")
      .img-box
        img(:src="item.picture")
      .right
        .author 作者：
          b(v-if="item.auth_nationality") [{{item.auth_nationality}}]
          b {{item.author}}
        .authors 译者：{{item.translator}}
        .isbn ISBN：{{item.isbn}}
        .version 出版社：{{item.press}}
        .abs(v-html="$highlight(item.content, keyWord, 100)" :class='{ell2:item.picture}')
</template>
<script>
import SearchResultTitle from './SearchResultTitle'
export default {
  components: { SearchResultTitle },
  props: {
    item: {
      type: Object,
      required: true,
    },
    keyWord: {
      type: String,
    },
  },
}
</script>
<style lang="stylus">
.result-of-book
  .content
    a
      display flex
      .img-box
        flex 0 0 116px
        img
          width 116px
          height 171px
          box-shadow 0 0 2px rgba(0, 0, 0, 0.2)
      .right
        padding-left 20px
        box-sizing border-box
        flex 1
        color #888
        >div
          margin-bottom 15px
          &.abs
            margin-top 10px
            margin-bottom 0
</style>
