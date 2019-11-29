<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-library-pro/implement/mgr/bookStatistics'
import SearchStatistics from '../cmp/SearchStatistics'
import echarts from 'echarts'

export default {
  components: { SearchStatistics },
  data() {
    return {
      dataType: ['按月统计', '按年统计'],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.orderList()
      this.saleList()
    },
    orderList(data = {}) {
      service.orderList(data).then(res => {
        this.draw(res.data, 'charts1')
      })
    },
    saleList(data = {}) {
      service.saleList(data).then(res => {
        this.draw(res.data, 'charts2')
      })
    },
    draw(data, el) {
      let dom = echarts.init(this.$refs[el])
      dom.setOption({
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        grid: {
          left: 50,
          right: 20
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
          },
          data: data.data_X,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data.data_Y,
            type: 'line',
            smooth: true,
          },
        ],
      })
    },
  },
}
</script>

<template lang="pug">
.div
  Template(ref="child")
    span(slot="title") 订单统计
    .btns(slot="rightBtn")
      SearchStatistics(:dataType="dataType" :getList="orderList")
    .list(slot="list")
      .draw(ref="charts1")
  Template(ref="child")
    span(slot="title") 销售统计
    .btns(slot="rightBtn")
      SearchStatistics(:dataType="dataType" :getList="saleList")
    .list(slot="list")
      .draw(ref="charts2")
</template>

<style lang="stylus" scoped>
.draw
  height 300px
</style>
