<template lang="pug">
.page-vip-record
  //- Header(text="交易记录")
  v-page(title="交易记录")
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    )
      .scroll.c-bg-main
        InfoVipRecordItem(
          v-for="i in order_list"
          :key="i.id"
          :data="i"
        )
</template>
<script>
import { mapState, mapActions } from 'vuex'
import InfoVipRecordItem from '@/components/user/InfoVipRecordItem'
export default {
  asyncData({ store, route }) {
    store.dispatch('user/queryOrderList', { clean: true })
  },
  components: { InfoVipRecordItem },
  computed: {
    ...mapState('user', {
      order_list: state => state.orderList,
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
    ...mapActions('user', ['queryOrderList']),
    async onPullingUp () {
      if (!this.isLoaded) {
          // 新数据
        await this.queryOrderList()
      }
      this.$refs.scroll.forceUpdate()
    }
  }
}
</script>
<style lang="stylus">

</style>
