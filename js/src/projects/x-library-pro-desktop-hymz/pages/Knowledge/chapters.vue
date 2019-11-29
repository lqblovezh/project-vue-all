<template lang="pug">
.knowledge-chapters
  Reader(
    :readerDialog.sync="readerDialog"
    :params="readerParams"
    :readerId="readerId"
    version="draft"
    v-if="readerDialog"
  )
  .container.c-bg-f
    .knowledge-chapters__title.flex-bs.f14
      .name {{setType}}：
        span {{ name }}
      // button 合并阅读
    .knowledge-chapters__body.f14
      KnowledgeChapterItem(
        v-for="item in list"
        :item="item"
        :key="item.id"
        @click.native="handleRead(item)"
      )
  PageMy.pages(
    @currentChange="pageChangeHandler"
    :total="page.total"
    :pageOffset="page.pageOffset"
    :pageNum="page.pageNum"
  )
</template>
<script>
import { mapState, mapActions } from 'vuex'
import KnowledgeChapterItem from '@/components/knowledge/KnowledgeChapterItem'
import { ReaderMixins } from '@/utils/mixins'

export default {
  asyncData({ store, route }) {
    store.dispatch('knowledge/queryRelatedChapter', {
      ...route.query,
      clean: true,
    })
  },
  mixins: [ReaderMixins],
  components: { KnowledgeChapterItem },
  computed: {
    ...mapState('knowledge', {
      list: state => state.konwledge_chapter_list,
      page: state => state.page,
    }),
    name() {
      return this.$route.query.name
    },
    setType() {
      let item = this.categoryList.find(
        item => item.type == this.$route.query.ntype
      )
      if (item) {
        return item.name
      } else {
        return '知识点'
      }
    },
  },
  data() {
    return {
      categoryList: [
        { name: '人物', type: 'person' },
        { name: '地域', type: 'address' },
      ],
    }
  },
  created() {
    if (this.$route.query.ntype) {
      this.ntype = this.$route.query.ntype
    }
  },
  methods: {
    ...mapActions('knowledge', ['queryRelatedChapter']),
    handleRead({ book_id, b_id, catalog_pid, pindex }) {
      this.goReader(book_id, {
        chapterRid: catalog_pid,
        chapter_id: b_id,
        paraIndex: parseInt(pindex),
        keyword: this.$route.query.name,
      })
    },
    pageChangeHandler(pageNum) {
      this.queryRelatedChapter({ ...this.$route.query, pageNum, clean: true })
    },
  },
}
</script>
<style lang="stylus">
.knowledge-chapters
  padding-top 40px
  .container
    padding 24px 22px
    border 1px solid #d5ccb2
    box-sizing border-box
  &__title
    .name
      color #737373
      >span
        color #f00
    >button
      height 30px
      width 75px
      color #bea05f
      background-color #f8f3e8
      border 1px solid #cab478
      border-radius 3px
  &__body
    margin-top 20px
</style>
