<script>
import * as services from 'services/x-library-pro/implement/sbck/helpCenter'
export default {
  components: {},
  data() {
    return {
      topLoginVisi: true,
      helpInfo: '', // 帮助信息
    }
  },
  mounted() {
    // this.getHelpVisit()
    this.getHelpInfo()
  },
  methods: {
    getHelpInfo() {
      services.getHelpInfo().then(res => {
        this.helpInfo = res
      })
    },
  },
}
</script>
<template lang="pug">
.helper.container
  .main
    .helper_info
      h4.helper_info_title 帮助中心
      .helper_info_tips
        pre.helper_info_tip1(v-html="helpInfo")
</template>

<style lang="stylus" scoped>
.helper
  padding-top 30px
  .main
    width 100%
    margin 0 auto
    background #fff
    .helper_info
      .helper_info_title
        padding-left 2vw
        line-height 5vh
        background #f0eadb
        color #c39f52
        font-weight bold
      .helper_info_tips
        min-height 39vh
        font-size 1.4vh
        padding 1.5vw 2vw
        .helper_info_tip1
          padding-bottom 2vh
          .helper_info_tip1_abs
            padding-bottom 0.3vh
</style>
