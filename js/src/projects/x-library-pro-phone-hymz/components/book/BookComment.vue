<template lang="pug">
.book-comment.container.f13.book-panel
  .book-panel__title
    .name 评论
    .edit.f12(@click="$push('/book-detail/comment/edit', { query: { bookId: $route.query.bookId } })")
      .icon-edit-book
      |写评论
  .book-comment__list
    div(v-if="true")
      BookCommentItem(v-for="i in commentList" :data="i")
      .tc.more-comment(v-show="commentList && commentList.length > 3" @click="$go('book-detail/comment', {bookId: $route.query.bookId})") 查看全部评论
    div(v-else) 暂无数据
</template>
<script>
import { mapState } from 'vuex'
import BookCommentItem from './BookCommentItem'
export default {
  components: { BookCommentItem },
  computed: {
    ...mapState('book', {
      commentList: state => state.commentList
    })
  }
}
</script>
<style lang="stylus">
.book-comment
  .book-panel__title
    .edit
      div
        transform translate(-0.1rem, 0.04rem)
  .book-comment__list
    margin-bottom 0.3rem
    .more-comment
      padding 0.3rem 0
    .book-comment-item
      &:last-child
        border-bottom 1px solid #ebf2f1
</style>
