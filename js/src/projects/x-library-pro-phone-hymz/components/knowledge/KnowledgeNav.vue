<template lang="pug">
.knowledge-nav.flex-bs.c-bg-f
  .knowledge-nav__left.c-6.f14 推荐
    a(
      v-for="item, index in list"
      :key="`${index}_${item.id}`"
      @click="queryKnowledgeInfo(item)"
    ) {{ item.name|wordSlice }}
  button.c-theme(@click="changeKnowledegList")
    .icon-k-refresh
    span 换一批
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('knowledge', {
      list: state => state.knowledge_list
    })
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions('knowledge', ['queryKnowLedgeInfo', 'queryKnowLedge']),
    queryKnowledgeInfo({ name, id}) {
      // this.queryKnowLedgeInfo({id})
      this.$replaceWithPath('/knowledge-point', { query: { ...this.$route.qurey, id, label: name }})
    },
    changeKnowledegList() {
      this.queryKnowLedge({ offset: 3 })
    }
  },
  filters: {
    wordSlice(value) {
      return value.length > 3?value.slice(0,3):value
    }
  }
}
</script>
<style lang="stylus">
.knowledge-nav
  margin-bottom 0.2rem
  padding 0.17rem 0.3rem
  box-shadow 0 2px 3px rgba(0, 0, 0, .1)
  &__left
    a
      margin-left 0.14rem
      display inline-block
      line-height 0.56rem
      padding 0 0.19rem
      height 0.56rem
      font-size 12px
      color #555
      border 1px solid #bfbfbf
      border-radius 3px
  button
    background-color transparent
    width 1.6rem
    >div
      margin-right 0.08rem
      transform translateY(0.06rem)
</style>
