<script>
import urlJoin from 'url-join'
import { mapMutations, mapState } from 'vuex'

export default {
  // props: {
  //   vipVisible: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data() {
    return {
      vipList: [],
      currenServe: '',
      currenDuration: '',
      curentPay: 'alipay',
      price: '',
      protocol: '',
      payList: [
        { name: '支付宝', type: 'alipay', calssType: 'Alipay' },
        // { name: '微信支付', type: 'wechat', calssType: 'WeChat' },
      ],
    }
  },
  created() {
    this.$services.user.getVipList().then(res => {
      console.log(res.data, 11111111)
      this.vipList = res.data
      this.init()
    })
  },
  computed: {
    duration() {
      let data = this.vipList.find(item => item.id === this.currenServe)
      return (data && data.child) || []
    },
    basePath() {
      return urlJoin(baseUrl, 'user-services')
    },
    ...mapState('panel', {
      vipVisible: state => state.vipVisible,
    }),
  },
  methods: {
    init() {
      this.currenServe = this.vipList && this.vipList[0].id
      this.currenDuration = this.duration[0] && this.duration[0].id
      this.price = this.duration && this.duration[0].price
    },
    serveChange(item) {
      this.currenServe = item.id
      this.currenDuration = this.duration[0] && this.duration[0].id
      this.price = (this.duration[0] && this.duration[0].price) || 0
    },
    durationChange(item) {
      this.currenDuration = item.id
      this.price = item.price
    },
    payChange(item) {
      this.curentPay = item.type
    },
    beforeClose() {
      this.TOGGLE_VIP_PANEL()
    },
    save() {
      console.log(this.protocol)
      if (!this.protocol) {
        return this.$message.warning('请同意用户协议')
      }
      this.$services.user
        .pay({
          serve: this.currenServe,
          duration: this.currenDuration,
          payType: this.curentPay,
          price: this.price,
          url: location.href,
        })
        .then(res => {
          window.location.href = res.data.url
          // this.TOGGLE_VIP_PANEL()
          // this.$message.success('您已成功开通会员！')
          // this.$services.user.isLogin().then(res => {
          //   this.SET_USER_INFO(res.data)
          // })
        })
    },
    ...mapMutations('user', ['SET_USER_INFO']),
    ...mapMutations('panel', ['TOGGLE_VIP_PANEL']),
  },
}
</script>

<template lang="pug">
  el-dialog.vipDialog(
    :visible.sync="vipVisible"
    width="948px"
    top="50px"
    title="开通服务"
    append-to-body
    center
    :before-close="beforeClose"
  )
    .dialogContent(v-if="vipList.length")
      .group
        .label 开通服务
        ul.right.serve
          li.ellipsis(v-for="item in vipList" :key="item.name" :class="{active:currenServe==item.id}" @click="serveChange(item)") {{item.name}}
      .group
        .label 开通时长
        ul.right.duration
          li(v-for="item in duration" :key="item.name" :class="{active:currenDuration==item.id}" @click="durationChange(item)")
            .flex-center
              .price ￥{{item.price}}
              .time 会员期：{{item.time}}天
      .group
        .label 支付方式
        ul.right.pay
          li(v-for="item in payList" :key="item.name" :class="{active:curentPay==item.type}" @click="payChange(item)")
            .flex-center
              .icon(:class='"icon-"+item.calssType')
              span {{item.name}}
      .group
        .label
          span.price 支付金额：
            span.total ￥{{price}}
      .group
        .label
         el-button(type="theme" size="" @click="save") 确认支付
      .group
        .label.protocol
         el-checkbox(v-model="protocol") 我同意
          router-link(:to="basePath" target="_blank")
            span.protocols 《用户服务协议》
</template>

<style lang="stylus" scoped>
.vipDialog
  >>>.el-dialog__header
    .el-dialog__title
      color #009882
      font-weight bold
.dialogContent
  .group
    .total
      color #e1522c
      font-weight bold
    .protocols
      color #009882
    .protocol
      >>> .el-checkbox__input.is-checked+.el-checkbox__label
        color #737373
    .label
      line-height 24px
      font-weight bold
      font-size 16px
      color #4d4d4d
      margin-bottom 20px
    .serve
      li
        width 140px
        height 42px
        line-height @height
    .pay
      li
        width 145px
        height 46px
        line-height @height
        color #737373
        font-size 18px
        .icon
          margin-right 10px
    .duration
      li
        width 266px
        height 116px
        // background-image url('../../assets/img/vip-bg.png')
        background-size 80%
        background-position center
        background-repeat no-repeat
        .flex-center
          flex-direction column
          height 100%
        .price
          font-size 26px
          color #e1522c
          margin-bottom 18px
        .time
          font-size 20px
          color #cba056
    li
      cursor pointer
      text-align center
      display inline-block
      border solid 1px #d5ccb2
      box-sizing border-box
      border-radius 2px
      margin-right 30px
      margin-bottom 20px
      position relative
      &.active
        background-color #fef5f2
        border-radius 2px
        border-color #e1522c
        &:after
          content ''
          background-image url('../../assets/img/select.png')
          position absolute
          height 23px
          width 23px
          right 0
          bottom 0
</style>
