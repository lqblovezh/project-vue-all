<script>
export default {
  props: ['currentTime'],
  data() {
    return {
      timmer: null, //时间定时器
      seriverTime: null,
    }
  },
  created() {
    if(typeof this.currentTime == 'object'){
      this.seriverTime = this.timeReset('',this.currentTime)
    }else{
      this.seriverTime = this.currentTime
    }
    this.time()
  },
  computed: {},
  methods: {
    time() {
      clearInterval(this.timmer)
      this.timmer = setInterval(() => {
        this.seriverTime = this.format()
      }, 1000)
    },
    format(fmt = '') {
      let date = ''
      if(this.currentTime) {
        if(typeof this.currentTime == 'object') {
          date = new Date()
        }else{
          date = new Date(Date.parse(this.seriverTime.replace(/-/g,"/")))
        }
      }else{
        date = ''
      }
      return this.timeReset(fmt,date)
    },
    timeReset(fmt,date) {
      const o = {
          'y': date.getFullYear(),
          "M": date.getMonth() + 1, //月份
          "d": date.getDate(), //日
          "h": date.getHours(), //小时
          "m": date.getMinutes(), //分
          "s": date.getSeconds()+1, //秒
      }
      if(date.getSeconds()>=59){
        o.s = 0
        o.m += 1
      }
      if(date.getMinutes()>=59){
        o.s = 0
        o.m = 0
        o.h += 1
      }
      fmt = `${o.y}-${this.toMax(o.M)}-${this.toMax(o.d)} ${this.toMax(o.h)}:${this.toMax(o.m)}:${this.toMax(o.s)}`
      return fmt
    },
    toMax(num) {
      if(num < 10){
        return `0${num}`
      }
      return num
    },
  },
};
</script>

<template lang="pug">
p.div
  slot
  span(v-text="seriverTime")
</template>


<style lang="stylus" scoped>
</style>
