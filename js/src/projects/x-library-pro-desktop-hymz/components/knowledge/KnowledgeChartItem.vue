<template lang="pug">
.knowledge-chart-item.f14()
  p.ell2.abs {{ item.content }}
  p.source
    span 《{{ item.book_name }}》
    |{{ item.chapter_name }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus">
.knowledge-chart-item
  padding 14px 0
  color #878787
  line-height 1.5
  border-bottom 1px solid #e9e2d1
  >.abs
    margin-bottom 10px
  >.source
    color #b3b3b3
</style>