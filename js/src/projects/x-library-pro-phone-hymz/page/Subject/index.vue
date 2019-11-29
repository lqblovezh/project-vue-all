<template lang="pug">
.subject-list
  v-page(title="专题列表")
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    )
      .scroll.subject-scroll
        transition-group(name="slide-up" tag="ul")
          SubjectListItem(v-for="item in list" :data="item" :key="item.id")
</template>
<script>
import { mapState, mapActions } from 'vuex'
import SubjectListItem from '@/components/SubjectListItem'
export default {
  asyncData({ store, route }) {
    store.dispatch('subject/queryAllSubjectList', { clean: true })
  },
  components: { SubjectListItem },
  computed: {
    ...mapState('subject', {
      list: state => state.list,
      isLoaded: state => state.isLoaded
    })
  },
  data() {
    return {
      options: {
        pullUpLoad: {
          txt: {
            more: '加载中...',
            noMore: '暂无更多数据'
          },
          visible: true
        }
      }
    }
  },
  methods: {
    ...mapActions('subject', ['queryAllSubjectList']),
    async onPullingUp() {
      if (!this.isLoaded) {
        // 新数据
        await this.queryAllSubjectList()
      }
      this.$refs.scroll.forceUpdate(true, true)
    },
  }
}
</script>
<style lang="stylus"></style>
