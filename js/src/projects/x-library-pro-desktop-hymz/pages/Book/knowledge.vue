<template lang="pug">
.book-knowledge.container
  .current-location.f12 当前位置：
    a.cp(@click="$go('/book-detail', { bookId: $route.query.bookId })") {{ bookName }}
    span &gt;
    a.cp 书籍知识点
  .book-knowledge__body
    BookKnowledgeChart(v-model="knowledge_name")
    BookKnowledgeChapter(v-model="knowledge_name")
</template>
<script>
import BookKnowledgeChart from '@/components/book/BookKnowledgeChart'
import BookKnowledgeChapter from '@/components/book/BookKnowledgeChapter'
import { mapMutations } from 'vuex'
export default {
  components: { BookKnowledgeChart, BookKnowledgeChapter },
  // asyncData({ store, route }) {
  //   store.dispatch('book/queryBookKnowledge', { ...route.query })
  // },
  created() {
    this.RESET_page()
    this.SET_KNOWLEDGE_CHAPTER_LIST([])
  },
  computed: {
    bookName() {
      const { bookName } = this.$route.query
      return bookName
    },
  },
  methods: {
    ...mapMutations('knowledge', ['SET_KNOWLEDGE_CHAPTER_LIST', 'RESET_page']),
  },
  data() {
    return {
      knowledge_name: '',
    }
  },
}
</script>
<style lang="stylus">
.book-knowledge
  .current-location
    margin 19px 0 10px
    color #878787
    >span
      margin 0 3px
  &__body
    padding 30px 20px
    background-color #fffdf7
    border 1px solid #d5ccb2
</style>
