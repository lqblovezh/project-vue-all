<template lang="pug">
.book-right-item.tc.cp(@click="$go('/book-detail', { bookId: item.id})")
  img(:src="item.picture")
  .name {{ item.book_name }}
  .author.f12 {{ item.author }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
}
</script>
<style lang="stylus">
.book-right-item
  padding-top 30px
  img
    width 117px
    height 172px
    box-shadow 0 0 3px rgba(0, 0, 0, 0.2)
  >.name
    margin 14px 0 10px
    color #555555
  >.author
    color #888888
</style>
