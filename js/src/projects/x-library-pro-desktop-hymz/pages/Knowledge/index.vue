<template lang="pug">
.knowledge-point.container
  .flex.knowledge-point__wrap
    AsidePanel(
      @change-point="changePointHandler"
      panel-type="knowledge"
      :list="category_list"
      ref="asidePanel"
    )
    .knowledge-point__body
      KnowledgeRecommend
      KnowledgeChart(:point-id="knowledge_point_id")
</template>
<script>
import KnowledgeRecommend from '@/components/knowledge/KnowledgeRecommend'
import KnowledgeChart from '@/components/knowledge/KnowledgeChart'
import { mapActions } from 'vuex'
export default {
  components: { KnowledgeChart, KnowledgeRecommend },
  data() {
    return {
      knowledge_point_id: '',
      category_list: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('knowledge', ['queryKnowLedge']),
    changePointHandler(id) {
      // this.knowLedgeCheck(id)
      this.knowledge_point_id = id
    },
    async init() {
      this.queryKnowLedge({ clear: true })
      try {
        let { data = [] } = await this.$services.category.queryCategoryList()
        data.unshift({
          name: '全部',
          id: '',
        })
        this.category_list = data
        this.$set(this.category_list[0], 'checked', true)
        this.$refs.asidePanel.selectItem = this.category_list[0]
        this.knowledge_point_id = this.category_list[0].id
      } catch (e) {
        console.log(e.toString())
      }
    },
  },
}
</script>
<style lang="stylus">
.knowledge-point
  &__wrap
    justify-content space-between
    align-items flex-start
    padding-top 30px
  &__body
    flex 1
</style>
