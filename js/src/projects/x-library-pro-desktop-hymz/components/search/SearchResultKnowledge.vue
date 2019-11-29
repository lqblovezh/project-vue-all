<template lang="pug">
.result-of-knowledge.cp
  router-link(:to="{path: '/knowledge/chapters', query: { name: item.name }}" target="_blank")
    SearchResultTitle(:key-name="keyWord" :str="item.knowledge_name")
  //- .abs(v-html="$highlight(item.content, keyWord)")
  //- .source.f12 来源于：《
  //-   .ib.c-theme(v-html="$highlight(item.name, keyWord)")
  //-   |》{{ item.chapter_name }}
</template>
<script>
import SearchResultTitle from './SearchResultTitle'
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    keyWord: String,
  },
  components: {
    SearchResultTitle,
  },
}
</script>
<style lang="stylus">
.result-of-knowledge
  >.abs
    margin 10px 0
</style>
