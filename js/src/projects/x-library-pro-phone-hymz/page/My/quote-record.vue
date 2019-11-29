<template lang="pug">
.quote-record
  v-page(title="引用记录")
    template(#rightBtn)
      a.header-link(slot="right" @click="toggleEditMode") {{ isEditMode ? '取消':'管理'}}
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    )
      .scroll
        InfoQuoteRecordItem(
          v-for="(el, index) in list"
          :key="index"
          :item="el"
          :edit-mode="isEditMode"
          @toggleItemSelectedStatus="toggleItemSelectedStatus"
        )
  EditFooter(:btns="footerBtns" :is-show="isEditMode")
</template>
<script>
import { mapState, mapActions } from 'vuex'
import InfoQuoteRecordItem from '@/components/user/InfoQuoteRecordItem'
import { editMode } from '@/mixins'
export default {
  mixins: [editMode],
  asyncData({ store, route }) {
    return store.dispatch('info/queryQuoteList', { clean: true })
  },
  components: { InfoQuoteRecordItem },
  computed: {
    ...mapState('info', {
      list: state => state.quote_list,
      isLoaded: state => state.isLoaded
    }),
    selectItems() {
      return this.list.filter(item =>item.checked)
    }
  },
  data () {
    return {
      ids:[],
      pullUpLoad: true,
      selectedItem: [],
      footerBtns: [
        { text: '全选', type: 'default', clickEvent: this.selectAll },
        { text: '删除', type: 'error', clickEvent: this.del }
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
    ...mapActions('info', ['queryQuoteList']),
    del () {
      if (!this.selectItems.length) {
        return
      }
      const ids = []
      this.selectItems.forEach(item=>{
        ids.push(item.id)
      })
      this.$services.info.delMark({ ids, type: 'quote' }).then(res=>{
        this.toggleEditMode()
        this.queryQuoteList({ clean: true })
      }).catch(e => this.$catchError(e))
    },
    async onPullingUp() {
      if (this.isEditMode) {
        return
      }
      if (!this.isLoaded) {
        // 新数据
        // await this.()
        await this.queryQuoteList()
      }
      this.$refs.scroll.forceUpdate(true, true)
    },
  }
}
</script>
<style lang="stylus">

</style>
