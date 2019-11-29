<template lang="pug">
.comment-list.f14
  book-comment
  ul.list
    li.flex(v-for="item in list")
      img(:src="item.commentor_avatar" alt="头像")
      .comment-info
        .username {{ item.commentor_name }}
          .icon-expert(v-show="item.is_expert")
        .content {{ item.content }}
        .time.f12 {{ item.create_time }}
  PageMy.pages(
    @currentChange="pageChangeHandler"
    :total="page.total"
    :pageOffset="page.pageOffset"
    :pageNum="page.pageNum"
  )
</template>
<script>
import { mapState } from 'vuex';
import BookComment from './BookComment'
export default {
  components: {
    'book-comment': BookComment
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('book', {
      list: state => state.comment.list,
      page: state => state.comment.page
    })
  },
  methods: {
    pageChangeHandler() {}
  }
}
</script>
<style lang="stylus">
.comment-list
  padding 0 20px
  ul.list
    li
      padding 20px 0
      align-items flex-start
      &:not(:last-child)
        border-bottom 1px solid #e9e2d1
      >img
        width 44px
        height 44px
        border-radius 50%
      >.comment-info
        flex 1
        margin-left 16px
        >.username
          color #808080
          >div
            margin-left 5px
            transform translateY(2px)
        >.content
          margin 10px 0
          color #737373
          line-height 1.5
        >.time
          color #999999
</style>