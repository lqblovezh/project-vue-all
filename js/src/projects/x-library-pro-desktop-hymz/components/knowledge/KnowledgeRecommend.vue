<template lang="pug">
.knowledge-recommend
  span.f14 知识点推荐：
  ul.ib.f12
    li.cp(
      v-for="({ name, id, name_id }, index) in list"
      :key="index"
    )
      router-link(:to="{path: '/knowledge/chapters', query: { id:name_id,  name }}" target="_blank") {{ name }}
  button.fresh-btn.c-f.f12.cp(@click="queryKnowLedge")
    .icon-refresh
    span 换一批
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('knowledge', {
      list: state => state.knowledge_list,
    }),
  },
  methods: {
    ...mapActions('knowledge', ['queryKnowLedge', 'queryKnowLedgeInfo']),
  },
}
</script>
<style lang="stylus">
.knowledge-recommend
  >span
    color #878787
  ul
    color #666666
    li
      display inline-block
      margin-right 10px
      padding 6px 10px
      background-color #f7f2e6
      border 1px solid rgba(55, 129, 102, 0.32)
      border-radius 3px
  >.fresh-btn
    width 68px
    line-height 22px
    background-color #009882
    border 1px solid #267258
    border-radius 3px
    >div
      margin-right 4px
      transform translateY(2px)
</style>
