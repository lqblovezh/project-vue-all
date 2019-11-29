<template lang="pug">
.book-knowledge-chpater-item(@click="")
  .content(v-html="$highlight(item.content,item.point)")
  .item-footer.tr 《{{ item.book_name }}》{{ item.chapter_name }}
</template>
<script>
export default {
  props: {
    item: {
      type:Object,
      required: true
    }
  }
}
</script>
<style lang="stylus">
.book-knowledge-chpater-item
  cursor pointer
  padding 19px 0
  &:not(:last-child)
    border-bottom 1px solid #e9e2d1
  >.content
    line-height 1.8
    color #878787
    >span
      color #f00
  >.item-footer
    margin-top 10px
    color #b3b3b3
</style>
