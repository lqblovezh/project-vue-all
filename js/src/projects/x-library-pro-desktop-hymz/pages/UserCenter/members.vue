<script>
import userMixins from './mixins'
import VipDetail from './cmp/VipDetail'
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'

export default {
  components: { VipDetail },
  computed: {
    ...mapGetters('user', {
      info: 'userInfo',
    }),
    ...mapState('home', {
      contrastChartImg: state => state.contrastChart,
      privilegeList: state => state.privilegeList,
    }),
    ...mapState('panel', {
      vipVisible: state => state.vipVisible,
    }),
  },
  methods: {
    save(data) {
      data.url = this.$route.path
      this.$services.user.pay(data).then(res => {
        // this.vipVisible = false
        this.TOGGLE_VIP_PANEL()
        this.$message.success('您已成功开通会员！')
        this.$services.user.isLogin().then(res => {
          this.SET_USER_INFO(res.data)
        })
      })
    },
    showVipdetail() {
      if (!Object.entries(this.info).length) {
        this.$toggleLoginPanel()
      } else {
        this.TOGGLE_VIP_PANEL(true)
        // this.vipVisible = true
      }
    },
    ...mapMutations('user', {
      setUserInfo: 'SET_USER_INFO',
    }),
    ...mapMutations('panel', ['TOGGLE_VIP_PANEL']),
  },
}
</script>

<template lang="pug">
.member
  //- VipDetail(:vipVisible.sync='vipVisible' v-if="vipVisible" @save="save")
  .img-box
    img(src="@/static/images/member-banner.png")
    .btn(@click="showVipdetail") 开通会员
  .container
    UserTitlePanel(name="特权对比" :icon="false")
    .table
      img(:src="contrastChartImg")
    UserTitlePanel(name="特权介绍" :icon="false")
    ul.introduce
      li(v-for="item,index in privilegeList" :key="index")
        span.index {{index+1}}
        span {{item.name}}：
          span {{item.abs}}
</template>

<style lang="stylus" scoped>
.member
  .img-box
    position relative
    img
      height 300px
      max-width 100%
      object-fit cover
    .btn
      width 120px
      cursor pointer
      height 40px
      margin 0 auto
      line-height 40px
      font-size 16px
      color #ffffff
      position absolute
      text-align center
      left 0
      right 0
      bottom 30px
      background-color #fc8a1c
      border-radius 2px
  .container
    background #fffdf7
    border solid 1px #d5ccb2
    padding 22px
    box-sizing border-box
    margin-top 20px
    .table
      width 840px !important
      min-height 338px
      margin 22px auto
      img
        width 100%
        height 100%
        object-fit contain
      >>> table
        thead
          tr
            th
              background #f8f3e8
              &:nth-of-type(3n)
                background #cfa867
                color #fff
                box-shadow 0px 5px 10px 0px rgba(128, 98, 66, 0.4)
        tbody
          tr
            td
              &:nth-of-type(3n)
                background #fffdf7
                color #c79846
                box-shadow 0px 5px 10px 0px rgba(128, 98, 66, 0.4)
        td, th
          text-align center
          color #666
          border-color #dbceb0
          background-color #fffdf7
    .introduce
      font-size 14px
      line-height 44px
      padding-top 13px
      color #666666
      li
        .index
          width 22px
          height @width
          display inline-block
          border-radius 50%
          border 1px solid #c79846
          margin-right 10px
          vertical-align middle
          text-align center
          line-height 22px
          color #c79846
        >span >>>span
          color #878787
</style>


