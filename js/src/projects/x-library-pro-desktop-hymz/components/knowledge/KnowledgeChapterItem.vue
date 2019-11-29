<template lang="pug">
.knowledge-chapter-item(@click="$emit('click')")
  .content(v-html="$highlight(item.content,$route.query.name)")
  .tips.tr 《{{ item.book_name}}》{{ item.chapter_name }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style lang="stylus">
.knowledge-chapter-item
  padding 19px 0 24px
  border-top 1px solid #e9e2d1
  cursor pointer
  >.content
    color #878787
    line-height 1.5
    >span
      color #f00
  >.tips
    margin-top 20px
    color #b3b3b3
</style>
