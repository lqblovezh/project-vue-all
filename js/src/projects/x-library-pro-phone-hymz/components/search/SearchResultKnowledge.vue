<template lang="pug">
  .result-of-knowledge.c-bg-f(@click="$push('knowledge-point/list', { query: { id: data.id, bookId: data.book_id, label: data.knowledge_name.split(':')[1]}})")
    .name.f15(v-html="$highlightWord(data.knowledge_name, keyWord)")
    .abs.ellipsis-3(v-html="$highlightWord(data.content, keyWord)")
    .source.ellipsis 来源于：《
      span(v-html="$highlightWord(data.name, keyWord)")
      |》{{ data.chapter_name }}
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    keyWord: String
  }
}
</script>
<style lang="stylus">
.result-of-knowledge
  padding 0.3rem
</style>
