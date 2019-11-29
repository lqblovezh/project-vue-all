<template lang="pug">
.page-comment
  v-page(title="我的评论")
    template(#rightBtn)
      a.header-link(slot="right" @click="toggleEditMode") {{ isEditMode ? '取消':'管理'}}
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    )
      .scroll.f14.c-bg-main
        InfoCommentItem(
          v-for="item in list"
          :item="item"
          :key="item.id"
          :edit-mode="isEditMode"
          @toggleEditMode="toggleEditMode"
          @toggleItemSelectedStatus="toggleItemSelectedStatus"
        )
  EditFooter(:btns="footerBtns" :is-show="isEditMode")
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { editMode } from '@/mixins'
import InfoCommentItem from '@/components/user/InfoCommentItem'
export default {
  mixins: [editMode],
  asyncData({ store, route }) {
    return store.dispatch('user/queryCommentList', { clean: true })
  },
  components: { InfoCommentItem },
  computed: {
    ...mapState('user', {
      list: state => state.comment_list,
      isLoaded: state => state.isLoaded
    }),
    selectItems() {
      return this.list.filter(item =>item.checked)
    }
  },
  data() {
    return {
      ids:[],
      pullUpLoad: true,
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
    ...mapActions('user', ['queryCommentList']),
    del () {
      if (!this.selectItems.length) {
        return
      }
      const ids = []
      this.selectItems.forEach(item=>{
        ids.push(item.id)
      })
      this.$services.info.delComments({ _ids: ids }).then(res=>{
        this.toggleEditMode()
        this.queryCommentList({ clean: true })
      }).catch(e => this.$catchError(e))
    },
    async onPullingUp() {
      if (this.isEditMode) {
        return
      }
      if (!this.isLoaded) {
        // 新数据
        await this.queryCommentList()
      }
      this.$refs.scroll.forceUpdate(true, true)
    },
  }
}
</script>
<style lang="stylus">

</style>
