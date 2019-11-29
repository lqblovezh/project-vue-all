<template lang="pug">
.book-knowledge-chapter.f14
  .book-knowledge-title
    .chapter-name 知识点:
      span {{ value }}
    .look-all(v-if="page&&page.total>2" @click="goToKnowledge")
      span 查看全部
  BookKnowledgeChapterItem(
    v-for="item,index in list"
    :item="item"
    :key="`${item.id}_${index}`"
    @click.native="go(item)"
  )
</template>
<script>
import BookKnowledgeChapterItem from './BookKnowledgeChapterItem'
import { mapState } from 'vuex'
import { ReaderMixins } from '@/utils/mixins'

export default {
  components: { BookKnowledgeChapterItem },
  props: {
    value: String,
  },
  mixins: [ReaderMixins],
  computed: {
    ...mapState('knowledge', {
      list: state => state.konwledge_chapter_list,
      page: state => state.page,
    }),
  },
  methods: {
    go({ book_id, catalog_pid, b_id, pindex, range }) {
      this.goReader(book_id, {
        chapterRid: catalog_pid,
        chapter_id: b_id,
        paraIndex: parseInt(pindex),
        range,
      })
    },
    goToKnowledge() {
      this.$go('/knowledge/chapters', {
        bookId: this.$route.query.bookId,
        name: this.value,
      })
    },
  },
}
</script>
<style lang="stylus">
.book-knowledge-chapter
  .book-knowledge-title
    margin 30px 0 20px
    .chapter-name
      display inline-block
      >span
        color #f00
    .look-all
      float right
      cursor pointer
</style>
