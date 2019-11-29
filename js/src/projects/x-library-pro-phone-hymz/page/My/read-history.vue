<template lang="pug">
.read-history
  v-page(title="阅读历史")
    template(#rightBtn)
      a.header-link(slot="right" @click="toggleEditMode") {{ isEditMode ? '取消':'管理'}}
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    )
      .scroll
        InfoReadHistoryItem(
          v-for="item in list"
          :key="item.id"
          :item="item"
          :is-edit-mode="isEditMode"
          @toggleItemSelectedStatus="toggleItemSelectedStatus"
        )
  EditFooter(:btns="btns" :is-show="isEditMode")
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import InfoReadHistoryItem from '@/components/user/InfoReadHistoryItem'
import { TOGGLE_EDIT_MODE } from '@/store/types'
export default {
  asyncData({ store, route }) {
    store.dispatch('user/queryHistoryList', { clean: true })
  },
  components: { InfoReadHistoryItem },
  computed: {
    ...mapState({
      isEditMode: state => state.editMode
    }),
    ...mapState('user', {
      list: state => state.history_list,
      isLoaded: state => state.isLoaded
    }),
    selectItems() {
      return this.list.filter(item =>item.checked)
    }
  },
  data() {
    return {
      pullUpLoad: true,
      btns: [
        { text: '全选', type: 'default', clickEvent: this.selectAll},
        { text: '删除', type: 'error', clickEvent: this.del}
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
    ...mapMutations([TOGGLE_EDIT_MODE]),
    ...mapActions('user', ['queryHistoryList']),
    toggleEditMode() {
      if (this.isEditMode) {
        this.changeListStatus(false)
      }
      this.TOGGLE_EDIT_MODE(!this.isEditMode)
    },
    changeListStatus(status) {
      this.list.forEach(item => {
        this.$set(item, 'checked', status)
      })
    },
    del () {
      if (!this.selectItems.length) {
        return
      }
      const ids = []
      this.selectItems.forEach(item=>{
        ids.push(item.id)
      })
      this.$services.info.delReadHistory({ _ids: ids }).then(res=>{
        this.toggleEditMode()
        this.queryHistoryList({ clean: true })
      }).catch(e => this.$catchError(e))
    },
    toggleItemSelectedStatus(item) {
      this.$set(item, 'checked', !item.checked)
    },
    selectAll() {
      this.changeListStatus(true)
    },
    onPullingUp() {
      setTimeout(async () => {
        if (!this.isLoaded) {
          await this.queryHistoryList()
        }
        this.$refs.scroll.forceUpdate(true, true)
      }, 1500)
    },
  },
  beforeDestroy(){
    this.TOGGLE_EDIT_MODE(false)
  }
}
</script>
