<template lang="pug">
.book-knowledge-point
  v-page(:title="bookname")
    .scroll-full.c-bg-main
      KnowledgeNav(v-if="!bookid")
      KnowledgeChart
      knowledge-table(title="人名表" v-show="person" table-type="person" :list="person")
      knowledge-table(title="地名表" v-show="address" table-type="address" :list="address")
      KnowledgePanel(:title="label" type="point")
        section.c-6(v-for="i in list" @click="$read({ id: i.book_id, chapter_root: i.catalog_pid, chapter_id: i.b_id })") {{ i.content }}
          p.c-9.f12
            span 《{{ i.book_name}}》
            |{{ i.chapter_name }}
      a.c-bg-f.knowledge-point__link.tc.f14(v-show="list&&list.length>=5" @click="$push('/knowledge-point/list', { query: {...$route.query} })") 查看更多
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import KnowledgeNav from '@/components/knowledge/KnowledgeNav'
import KnowledgeChart from '@/components/knowledge/KnowledgeChart'
import KnowledgePanel from '@/components/knowledge/KnowledgePanel'
import KnowledgeTable from './children/knowledge-table'
import { SET_KNOWLEDGE_LIST, SET_KNOWLEDGE_CHAPTER_LIST } from '@/store/types'
export default {
  asyncData({ store, route }) {
    const { type, label } = route.query
    store.dispatch('knowledge/queryKnowLedge', { clear: true, offset: 3 })
    typeof label !== 'undefined' && store.dispatch('knowledge/queryRelatedChapter', { clean: true, keep_nav: true, ...route.query })
  },
  components: { KnowledgeNav, KnowledgeTable, KnowledgeChart, KnowledgePanel },
  computed: {
    ...mapState('knowledge', {
      list: state => state.konwledge_chapter_list,
      knowledgeInfo: state => state.info
    }),
    ...mapState('book', {
      info: state => state.book_knowledge_list.info,
      person: state => state.book_knowledge_list.person,
      address: state => state.book_knowledge_list.address
    }),
    bookid() {
      return this.$route.query.bookId
    },
    bookname() {
      const { bookName } = this.$route.query
      return bookName ? bookName:'知识点导航'
    },
    label() {
      return this.$route.query.label
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.queryRelatedChapter({ clean: true, keep_nav: true, ...to.query})
    next()
  },
  beforeRouteLeave(to,from, next) {
    this.set_book_knowledge({})
    next()
  },
  methods: {
    ...mapMutations('knowledge', {
      setKnowLedge: SET_KNOWLEDGE_LIST,
      setKnowLedgeChapter: SET_KNOWLEDGE_CHAPTER_LIST
    }),
    ...mapActions('knowledge', ['init', 'queryRelatedChapter']),
    ...mapMutations('book', ['set_book_knowledge'])
  }
}
</script>
<style lang="stylus">
.book-knowledge-point
  .top-scroll
    .knowledge-panel
      &:not(:last-child)
        margin-bottom 0.2rem
      section
        padding  0.3rem 0
        border-bottom 1px solid #ebf2f1
        line-height 1.5
        &:first-child
          padding-top 0
    .knowledge-point__link
      display block
      height 0.7rem
      line-height 0.7rem
</style>
