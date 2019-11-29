<script>
import { setTimeout } from 'timers'
export default {
  methods: {
    handleScroll() {
      console.log(
        '文本高度->:' + document.getElementById('first-contailer').scrollHeight,
        '视窗高度->:' + document.documentElement.clientHeight
      )
      this.$nextTick(() => {
        setTimeout(() => {
          if (document.getElementById('first-contailer')) {
            this.isBottom =
              document.documentElement.clientHeight - 40 >
              document.getElementById('first-contailer').scrollHeight
          }
        }, 1000)
      })
    },
  },
  // mounted() {
  //   this.handleScroll()
  // },
  data() {
    return {
      isBottom: false,
    }
  },
  // watch: {
  //   $route() {
  //     this.handleScroll()
  //   },
  // },
  computed: {
    isHideFooter() {
      const { path } = this.$route
      return /reader$/.test(path)
    },
  },
}
</script>


<template lang="pug">
  div.footer(v-show="!isHideFooter")
    span 京ICP备14028887号-12
    span Copyright © 2006-2019
    span 商务印书馆有限公司
</template>

<style lang="stylus">
@keyframes fadeInFooter
  from
    -webkit-transform translateY(100px)
    transform translateY(100px)
  to
    -webkit-transform translateY(0)
    transform translateY(0)
.footer
  position absolute
  width 100%
  height 40px
  background-color #009882
  text-align center
  margin-top 60px
  bottom 0
  left 0
  z-index 99
  &.fadeIn
    box-shadow 0 -2px 10px #888
    animation fadeInFooter 0.5s
.footer span
  margin-left 20px
  font-size 12px
  font-family 'SimSun'
  color rgb(255, 255, 255)
  line-height 40px
</style>

