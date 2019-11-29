<template lang="pug">
.book-left-panel
  BookDetailInfo(@toggle-dialog="toggleDialogStatus")
  BookDetailIntro
  BookDetailContent
  //- BookComment(
  //-   :dialog-visible="showDialog"
  //-   @toggle-dialog="toggleDialogStatus"
  //- )
</template>
<script>
import BookDetailInfo from './BookDetailInfo'
import BookDetailIntro from './BookDetailIntro'
import BookDetailContent from './BookDetailContent'
import BookComment from './BookComment'
export default {
  components: { BookDetailInfo, BookDetailIntro, BookDetailContent, BookComment },
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    toggleDialogStatus(status) {
      this.showDialog = status
    }
  }
}
</script>
<style lang="stylus">
.book-left-panel
  flex 1
  padding 0 20px 60px
</style>