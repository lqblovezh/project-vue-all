<template lang="pug">
.hot-list
  v-page(title="全部热门")
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    )
      .scroll.container
        BookItem(v-for="item in list" :data="item")
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { SET_HOT_BOOK_LIST } from '@/store/types'
export default {
  asyncData({ store, route }) {
    store.dispatch('book/queryHotList', { clean: true })
  },
  computed: {
    ...mapState('book', {
      list: state => state.hot_book_list,
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
    ...mapMutations('book', {
      setHotList: SET_HOT_BOOK_LIST
    }),
    ...mapActions('book', ['queryHotList']),
    async onPullingUp() {
      if (!this.isLoaded) {
        // 新数据
        await this.queryHotList()
      }
      this.$refs.scroll.forceUpdate(true, true)
    },
  },
  beforeDestroy() {
    // this.setHotList([])
  }
}
</script>
<style lang="stylus">
.hot-list
  .container
    margin-top 0.3rem
</style>
