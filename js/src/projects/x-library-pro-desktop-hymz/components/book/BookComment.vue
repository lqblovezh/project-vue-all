<template lang="pug">
.book-comment-field
  textarea(v-model="content")
  .tr
    button.btn__theme.cp(@click="comfirm") 评论
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { isEmptyObject } from '@/utils/helpers'
export default {
  computed: {
    ...mapState('book', {
      info: state => state.info
    }),
    ...mapState('user', {
      userInfo: state => state.info
    })
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    ...mapActions('book', ['getComments']),
    async comfirm() {
      if (!this.$isUserLogin()) {
        return
      }
      try {
        await this.$services.book.addComment({
          id: this.info.id,
          content: this.content
        })
        await this.getComments({
          clean: true,
          bookId: this.info.id
        })
      } catch(e) {
        this.$message({
          message: e.toString(),
          type: 'error'
        })
      } finally {
        this.content = ''
      }
    }
  }
}
</script>
<style lang="stylus">
.book-comment-field
  textarea
    width 100%
    min-height 78px
    padding 5px
    font-size 16px
    box-sizing border-box
    resize none
    line-height 1.5
  >div
    margin-top 10px
    button
      padding 5px 20px
      border-radius 5px
</style>
