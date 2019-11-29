<script>
import * as getData from '../../0-home/data'

export default {
  props: {
    order: String,
    prop: String,
    current: String,
    dataType: {
      type: Array,
      default: ['本月', '本年', '今日'],
    },
    getList: {
      type: Function,
      default: () => {
        console.warn('未传入处理函数')
      },
    },
  },
  data() {
    return {
      start_date: '',
      end_date: '',
      currentDate: '',
    }
  },
  created() {
    this.currentDate = this.current
  },
  methods: {
    timeChange(time) {
      this.start_date = this.end_date = ''
      this.currentDate = time
      this.start_date = this.getCurrentDate()
      this.getList({
        order: this.order,
        prop: this.prop,
        start_date: this.start_date,
      })
    },
    getTime(time) {
      if (!time) {
        time = ['', '']
      }
      this.currentDate = ''
      this.start_date = time[0]
      this.end_date = time[1]
      if (!this.end_date && this.current) {
        debugger
        this.currentDate = this.current
        this.start_date = this.getCurrentDate()
      }
      this.getList({
        order: this.order,
        prop: this.prop,
        start_date: this.start_date,
        end_date: this.end_date,
      })
    },
    getCurrentDate() {
      let data
      switch (this.currentDate) {
        case '本年':
        case '按年统计':
          data = getData.getYearStartDate()
          break
        case '本月':
        case '按月统计':
          data = getData.getMonthStartDate()
          break
        case '本周':
          data = getData.getWeekStartDate()
          break
        case '今日':
          data = getData.getTodayStartDate()
          break
        default:
          data = getData.getYearStartDate()
          break
      }
      return data
    },
  },
}
</script>

<template lang="pug">
.content
  ul.data
    li(v-for="item in dataType" :class="{active:currentDate == item}" @click="timeChange(item)" :key="item") {{item}}
  TimePick.timePick(:inputsName="['start_time','end_time']" @getTime="getTime")
</template>

<style lang="stylus" scoped>
.content
  justify-content center
  display flex
  align-items center
  height 50px
  .data
    display inline-block
    line-height 40px
    li
      display inline-block
      cursor pointer
      margin-right 20px
      &.active
        color #44c3aa
  .timePick
    display flex
</style>
