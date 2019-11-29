<template lang="pug">
.page-comment
  v-page(title="我的批注")
    template(#rightBtn)
      a.header-link(slot="right" @click="toggleEditMode") {{ isEditMode ? '取消':'管理'}}
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    )
      .scroll.f14.c-bg-main
        InfoAnnotationItem(
          v-for="(el, index) in list"
          :item="el"
          :key="el.id"
          :edit-mode="isEditMode"
          @toggleItemSelectedStatus="toggleItemSelectedStatus"
        )
  EditFooter(:btns="footerBtns" :is-show="isEditMode")
</template>
<script>
import { mapState, mapActions } from 'vuex'
import InfoAnnotationItem from '@/components/user/InfoAnnotationItem'
import { editMode } from '@/mixins'
export default {
  mixins: [editMode],
  asyncData({ store, route }) {
    return store.dispatch('user/queryAnnotationList', { clean: true })
  },
  components: { InfoAnnotationItem },
  computed: {
    ...mapState('user', {
      list: state => state.annotation_list,
      isLoaded: state => state.isLoaded
    }),
    selectItems() {
      return this.list.filter(item =>item.checked)
    }
  },
  data () {
    return {
      ids:[],
      selectedItem: [],
      pullUpLoad: true,
      footerBtns: [
        { text: '全选', type: 'default', clickEvent: this.selectAll },
        { text: '删除', type: 'error', clickEvent: this.del },
      ],
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
    ...mapActions('user', ['queryAnnotationList']),
    del () {
      if (!this.selectItems.length) {
        return
      }
      const ids = []
      this.selectItems.forEach(item=>{
        ids.push(item.id)
      })
      this.$services.info.delMark({ ids, type: 'mark' }).then(res=>{
        this.toggleEditMode()
        this.queryAnnotationList({ clean: true })
      }).catch(e => this.$catchError(e))
    },
    async onPullingUp() {
      if (this.isEditMode) {
        return
      }
      if (!this.isLoaded) {
        // 新数据
        await this.queryAnnotationList()
      }
      this.$refs.scroll.forceUpdate(true, true)
    },
  }
}
</script>
<style lang="stylus">

</style>
