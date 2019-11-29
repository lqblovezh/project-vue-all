<template lang="pug">
.book-detail-intro
  p.title.pr 内容介绍
  p.f14.abs {{ info.abs }}
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('book', {
      info: state => state.info
    })
  }
}
</script>
<style lang="stylus">
.book-detail-intro
  padding 30px
  >.title
    color #c79846
    margin-bottom 5px
    padding-left 14px
    &:before
      content ''
      display inline-block
      position absolute
      top -2px
      left 0
      height 16px
      width 4px
      background-color #c79846
  >.abs
    color #888888
    line-height 2
</style>