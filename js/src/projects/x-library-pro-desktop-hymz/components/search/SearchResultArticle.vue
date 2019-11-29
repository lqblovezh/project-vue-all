<template lang="pug">
.search-result-article.cp(@click="go(item)")
  //- router-link(:to="{path: 'book-detail', query: { bookId: item.id }}" target="_blank")
  SearchResultTitle(:key-name="keyWord" :str="item.chapter_name" )
  .abs(v-html="$highlight(item.content, keyWord)")
  .source.f12 来源于：
    .ib.c-theme(v-html="bookname")
    | {{ item.chapter_name }}
</template>
<script>
import SearchResultTitle from './SearchResultTitle'
import { ReaderMixins } from '@/utils/mixins'

export default {
  components: { SearchResultTitle },
  mixins: [ReaderMixins],
  props: {
    item: {
      type: Object,
      required: true,
    },
    keyWord: String,
  },
  computed: {
    bookname() {
      return `《${this.$highlight(this.item.name, this.keyWord)}》`
    },
  },
  methods: {
    go(item) {
      this.goReader(item.id, {
        chapterRid: item.index && item.index.split(' ')[1],
        chapter_id: item.chapter_id,
        chapterId: item.chapter_id,
        paraIndex: parseInt(item.pindex),
        range: item.range,
        keyword: this.$route.query.keyword,
      })
    },
  },
}
</script>
<style lang="stylus">
.search-result-article
  .abs
    margin 10px 0
</style>
