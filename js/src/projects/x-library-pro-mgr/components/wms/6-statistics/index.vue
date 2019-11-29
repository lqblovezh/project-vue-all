<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-library-pro/implement/mgr/bookStatistics'

export default {
  data() {
    return {
      time: '',
      detailInfo: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      start_date: '',
      end_date: '',
    }
  },
  created() {
    this.getAllDate()
  },
  methods: {
    getAllDate() {
      service
        .getAllDate({
          start_date: this.start_date,
          end_date: this.end_date,
        })
        .then(res => {
          this.detailInfo = res.data
        })
    },
    change() {
      if (!this.time) {
        this.time = ['', '']
      }
      this.currentDate = ''
      this.start_date = this.time[0]
      this.end_date = this.time[1]
      this.getAllDate()
    },
  },
}
</script>

<template lang="pug">
Template(ref="child")
  span(slot="title") 综合统计
  .btns(slot="rightBtn")
    .content
      el-date-picker(
        v-model="time"
        type="datetimerange"
        @change="change"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      )
  .list(slot="list")
    .group 
      .label 订单统计
      ul.right
        li
          span 销售总额
          span {{detailInfo.saleAll}}
        li
          span 有效订单总数
          span {{detailInfo.orderAll}}
        li
          span 有效订单总额
          span {{detailInfo.saleAllY}}
        li
          span 无效订单总数(关闭或取消)
          span {{detailInfo.orderAllW}}
        li
          span 无效订单总额
          span {{detailInfo.saleAllW}}
    .group 
      .label 用户统计
      ul.right
        li
          span 用户总数
          span {{detailInfo.userAll}}
        li
          span 会员用户数
          span {{detailInfo.vipAll}}
        li
          span 用户会员开通率
          span {{detailInfo.ratio}}
</template>

<style lang="stylus" scoped>
.content
  justify-content center
  display flex
  align-items center
  height 50px
.group
  display flex
  margin-bottom 30px
  .right
    width 100%
    li
      span
        width 50%
        text-align center
        display inline-block
        border-top 1px solid #ddd
      span:first-child
        background #F9FAFC
        width 50%
      &:last-child
        border-bottom 1px solid #ddd
    &.all
      width 100%
</style>
