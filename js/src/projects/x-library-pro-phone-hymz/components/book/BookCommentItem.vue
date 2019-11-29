<template lang="pug">
.book-comment-item.clearfix
  .comment-item__left.pr.tc
    img(:src="data.commentor_avatar")
    .commentor-tag.c-f.f12.pa(v-show="data.is_expert") 专家
  .comment-item__right
    .comment-item__title.flex-bs
      p.commentor-name {{ data.commentor_name }}
      p.c-9.f12 {{ data.create_time }}
    .comment-item__content.c-6.f12 {{ data.content }}
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="stylus">
.book-comment-item
  padding 0.2rem 0
  .comment-item__left
    float left
    width 0.86rem
    img
      width 0.74rem
      height 0.74rem
      border-radius 50%
    >.commentor-tag
      top 0.6rem
      left 0
      width 100%
      height 0.28rem
      line-height 0.28rem
      background-color #f6a800
      border-radius 999px
  .comment-item__right
    padding-left 0.25rem
    padding-top 0.25rem
    overflow hidden
  .comment-item__title
    color #484c4b
    margin-bottom 0.36rem
  .comment-item__content
    line-height 1.5
</style>