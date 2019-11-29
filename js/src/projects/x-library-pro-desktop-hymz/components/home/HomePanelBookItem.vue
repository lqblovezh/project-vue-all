<template lang="pug">
.home-panel-book-item.tc.cp(@click="$go('/book-detail', { bookId: item.id })")
  img(:src="item.picture")
  .book-info
    .name.f14.ell {{ item.bookname }}
    .author.f12.ell {{ item.author }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="stylus">
@media screen and (max-width: 1400px)
  .home-panel-book-item
    width 100px
    img
      width 96px
      height 130px
    >.book-info
      margin-top 30px
@media screen and (min-width: 1401px)
  .home-panel-book-item
    width 160px
    img
      width 116px
      height 171px
    >.book-info
      margin-top 42px
.home-panel-book-item
  float left
  img
    box-shadow 0 0 3px rgba(0, 0, 0, .1)
  >.book-info
    .name
      color #555
      margin-bottom 12px
    .author
      color #888
</style>
