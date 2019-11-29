<template lang="pug">
div
  Reader(
    :readerDialog.sync="readerDialog"
    :params="readerParams"
    :readerId="readerId"
    version="draft"
    v-if="readerDialog"
  )
  el-tabs(
    v-model="activeName"
    type="border-card"
    :stretch="stretch"
    @tab-click=""
  )
    el-tab-pane(label="目录" name="1")
      BookDetailCatalog
    el-tab-pane(label="评论" name="2")
      BookDetailComment
</template>
<script>
import BookDetailCatalog from './BookDetailCatalog'
import BookDetailComment from './BookDetailComment'
import { ReaderMixins } from '@/utils/mixins'

export default {
  mixins: [ReaderMixins],
  components: { BookDetailCatalog, BookDetailComment },
  data() {
    return {
      activeName: '1',
      stretch: true,
    }
  },
}
</script>
<style lang="stylus"></style>
