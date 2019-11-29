<template lang="pug">
.book-item.tc
  .book-item__panel.pr
    .left-triangle(v-if="typeof idx !=='undefined'")
      span.f12.c-f {{ idx+1 }}
    router-link(:to="{name: 'book_detail', query: { bookId: item.id }}" target="_blank")
      img(:src="item.picture")
  .book-item__info.f14
    .name.ell {{ item.bookname }}
    .author.ell {{ item.author }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    idx: {}
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus">
.book-item
  margin-bottom 30px
  &__panel
    .left-triangle
      position absolute
      left 0
      top 0
      width 0
      height 0
      border-bottom 44px solid transparent
      border-left 44px solid #c2c1ba
      >span
        position absolute
        left -34px
        top 10px
  img
    width 100%
    height 263px
    object-fit cover
    box-shadow 0 0 3px rgba(0,0,0,0.2)
  &__info
    height 60px
    overflow hidden
    .name
      margin 14px 0 10px
      color #c39f52
    .author
      color #878787
@media screen and (max-width: 1400px)
  .book-item
    img
      height 218px
</style>
