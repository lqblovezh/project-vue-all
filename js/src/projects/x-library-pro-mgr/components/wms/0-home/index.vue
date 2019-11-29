<script>
import {
  homeInfo,
  homeSearch,
} from 'services/x-library-pro/implement/mgr/common'
import RunningTime from 'projects/common/runningTime'
import SearchStatistics from '../6-statistics/cmp/SearchStatistics'
import { getWeekStartDate, getMonthStartDate, getTodayStartDate } from './data'
import echarts from 'echarts'

export default {
  components: { RunningTime, SearchStatistics },
  data() {
    return {
      staticUrl,
      seriverTime: '',
      timeStamp: '',
      info: {},
      searchInfo: {},
      plantInfo: this.$config.plantInfo,
      dataType: ['本月', '本周', '今日'],
    }
  },
  created() {
    this.getInfo()
    this.getSearch()
  },
  methods: {
    getInfo() {
      homeInfo().then(res => {
        this.info = res.data
        this.seriverTime = res.data.seriverTime
      })
    },
    getSearch(data = {}) {
      if (!data || !data.start_date) {
        data.start_date = getMonthStartDate()
      }
      homeSearch(data).then(res => {
        this.searchInfo = res.data
        this.draw(res.data)
      })
    },
    draw(data) {
      let dom = echarts.init(this.$refs.charts)
      dom.setOption({
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        grid: {
          left: 50,
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
.mainRight
  .headGuide
    .logo
      img(:src="plantInfo?plantInfo.logo_absolute:''", alt="alt")
    .guide
      h2 {{plantInfo?plantInfo.name:''}}
      p {{plantInfo?plantInfo.exp:''}}
      RunningTime(:currentTime='seriverTime' v-if='seriverTime')
        span 服务器当前时间：
  .content
    .warehouse.rukou
      .title 统计
      ul.list
        li(v-for="item in info.statistics" :key="item.name")
          img(:src="staticUrl+'images/icon-'+item.type+'.png'")
          p
            span {{item.name}}
            span {{item.num}}
    .equally
      .warehouse
        .title 书籍总览
        ul.list
          li(v-for="item in info.books" :key="item.name")
            p {{item.num}}
            p {{item.name}}
      .warehouse
        .title 用户总览
        ul.list
          li(v-for="item in info.overviews" :key="item.name")
            p {{item.num}}
            p {{item.name}}
    .warehouse.rukou
      .title 快捷入口
      ul.list
        li(v-for='item in info.entry')
          router-link.body(:to="'/wms/'+item.type")
            img(:src="staticUrl+'images/icon-entry-'+item.type+'.png'")
            p
              span {{item.name}}
    .warehouse
      .title 检索统计
        .time
          SearchStatistics(:dataType="dataType" :getList="getSearch" current="本月" ref="statistics")
      .search-box
        .left
          p 搜索总量
          p {{searchInfo.data_A}}
        .right
          .draw(ref="charts")
</template>
<style lang="stylus" scoped>
.mainRight
  padding 0 20px 0
  padding-right 20px
  .headGuide
    padding 20px
    .logo
      width 78px
      height 44px
      display inline-block
      margin-right 10px
      text-align center
      img
        max-width 100%
        max-height 100%
    .guide
      display inline-block
      h2
        padding-bottom 10px
        font-weight bold
        font-size 17px
        color #444
      p
        font-size 14px
        line-height 24px
        color #777
  .content
    .equally
      display flex
      flex-direction row
      .warehouse
        margin-right 2%
        width 49%
        color #666666
        .list li
          text-align center
          p:first-child
            color red
            font-size 24px
        &:last-child
          margin-right 0
    .warehouse
      background-color #fff
      padding 10px 20px
      margin-bottom 20px
      box-sizing border-box
      .search-box
        display flex
        .left
          flex 200px 0 0
          text-align center
          justify-content center
          display flex
          flex-direction column
          color #8e8e8e
          p:last-child
            font-size 20px
            margin-top 20px
            color #333
        .right
          width 100%
          position relative
          .timePick
            display inline-block
          .draw
            height 300px
      .title
        color #424857
        font-size 16px
        position relative
        padding-left 20px
        line-height 36px
        border-bottom 1px solid #e3e6ec
        .time
          position absolute
          top -12px
          right 120px
          z-index 11
          .data
            display inline-block
            line-height 40px
            li
              display inline-block
              cursor pointer
              margin-right 20px
              &.active
                color #44c3aa
        &:after
          content ''
          display block
          width 3px
          height 16px
          top 50%
          left 0
          margin-top -8px
          background-color #44c3aa
          position absolute
      .list
        padding-top 35px
        padding-bottom 15px
        display flex
        justify-content start
        li
          a
            display block
            height 100%
            text-decoration none
          width 190px
          height 110px
          display inline-block
          p
            position relative
            &:first-child
              top 30px
              font-size 14px
            &:last-child
              top 40px
              font-size 14px
              // padding-right 12px
      &.rukou
        padding-bottom 35px
        li
          height 60px
          text-align left
          display flex
          flex-direction row
          img
            width 60px
            height @width
            padding-right 20px
            display inline-block
            object-fit contain
          p
            display inline-block
            color #555
            line-height 60px
            &:last-child
              padding 0
              top 0
              font-size 14px
          >p
            line-height 30px
            display flex
            flex-direction column
            justify-content center
</style>
