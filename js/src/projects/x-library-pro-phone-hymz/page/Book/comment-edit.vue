<template lang="pug">
.book-comment-edit.f14
  v-page(title="写评论")
    .container
      .text-input.pr
        textarea(
          placeholder="请输入评论内容"
          v-model="content"
          @input="sliceStr"
        )
        span.pa {{ content.length }}/{{ maxLen }}字
      BaseButton(
        txt="发布"
        type="theme"
        btn-class="btn-publish"
        large
        @click-event="publish"
      )
</template>
<script>
export default {
  data() {
    return {
      content: '',
      maxLen: 150
    }
  },
  methods: {
    sliceStr() {
      this.content = this.content.substr(0, this.maxLen)
    },
    publish() {
      const { bookId } = this.$route.query
      this.$services.book.addComment({ id: bookId, content: this.content}).then(res => {
        this.$Toast('评论成功')
        this.$back()
      }).catch(e => {
        this.$Toast({
          message: e.toString().split(':')[1].trim()
        })
      })
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/css/variable.styl'
.book-comment-edit
  .text-input
    margin 0.3rem 0
    color #999
    textarea
      width 100%
      padding 0.2rem
      height 4.1rem
      border none
      border-radius 3px
      box-shadow 0 0 2px rgba(0,0,0,.3)
      background-color #ebf2f1
      box-sizing border-box
      line-height 1.5
      resize none
      outline none
      &:focus
        box-shadow 0 0 3px theme-color
    >span
      right 0.22rem
      bottom 0.22rem
  .btn-publish
    height 0.8rem
    border-radius 5px
</style>
