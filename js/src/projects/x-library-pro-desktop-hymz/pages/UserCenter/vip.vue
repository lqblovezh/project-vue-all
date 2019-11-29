<script>
import userMixins from './mixins'
import { mapState, mapGetters, mapMutations } from 'vuex'
import VipDetail from './cmp/VipDetail'

export default {
  mixins: [userMixins],
  components: { VipDetail },
  computed: {
    setBaseUrl() {
      return staticUrl + 'images/avatar.jpg'
    },
    ...mapGetters('user', {
      info: 'userInfo',
    }),
    ...mapState('panel', {
      vipVisible: state => state.vipVisible,
    }),
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    detail(item) {
      this.detailInfo = item
      this.visible = true
    },
    beforeClose() {
      this.visible = false
    },
    pay({ id }) {
      this.$services.user
        .payAgain({
          id,
          url: location.href,
        })
        .then(res => {
          window.location.href = res.data.url
        })
    },
    showVipdetail() {
      this.TOGGLE_VIP_PANEL(true)
    },
    ...mapMutations('user', ['SET_USER_INFO']),
    ...mapMutations('panel', ['TOGGLE_VIP_PANEL']),
  },
}
</script>

<template lang="pug">
.vip
  .dialog
    el-dialog(
      :visible.sync="visible"
      width="600px"
      top="30vh"
      :before-close="beforeClose"
      append-to-body
    )
      .dialogTitle(slot="title")
        .name 会员14天
        .price ¥{{detailInfo.price}}
      .dialogContent
        .group
          .label 会员生效时间：
          .right {{detailInfo.effective_time}}
        .group
          .label 会员到期时间：
          .right {{detailInfo.expire_date}}
        .group
          .label 下单时间：
          .right {{detailInfo.create_time}}
        .group
          .label 支付状态：
          .right {{detailInfo.status_type}}
        .group
          .label 支付方式：
          .right {{detailInfo.pay_method}}
        .group
          .label 订单编号：
          .right {{detailInfo.order}}
  .rightBox.my
    UserTitlePanel(name="我的会员" :icon="false")
    ul.set
      li(v-if="info.vip")
        .title {{info.username}}
          .icon.icon-vips
        .tips 将于{{info.expire_date}}到期
        .btn
          el-button(type="warning" size="small" @click="showVipdetail" plain) 续费会员
      li(v-else)
        .title 您尚未开通会员
        .tips 开通会员，即可享受专属功能特权
        .btn
          el-button(type="warning" size="small" @click="showVipdetail" plain) 开通会员
  .rightBox.privilege
    UserTitlePanel(name="会员特权" :icon="false")
    ul.box
      li(v-for="item in privilegeList" :key="item.id" @click="$go('/members')")
        .centent
          img(:src="item.img_src||setBaseUrl")
          .name {{item.name}}
  .rightBox
    UserTitlePanel(name="交易记录" :icon="false")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    )
      el-table-column(prop="order" label="订单号" )
      el-table-column(prop="goods" label="商品名称")
      el-table-column(prop="money" label="订单金额")
      el-table-column(prop="create_time" label="下单时间")
      el-table-column(prop="status_type" label="订单状态")
      el-table-column(label="操作")
        template(slot-scope="{row}")
          .icon.el-icon-goods(title="去支付" @click="pay(row)" v-if="row.status_type=='等待支付'")
          .icon.el-icon-view(title="查看详情" @click="detail(row)" v-if="row.status_type=='支付完成'")
</template>

<style lang="stylus" scoped>
.dialogTitle
  >div
    display inline-block
    font-size 18px
    font-weight blod
    color #999999
    &.price
      float right
.dialogContent
  .group
    display flex
    line-height 30px
    .label
      font-size 14px
      color #737373
    .right
      font-size 14px
      color #999999
.rightBox
  margin-bottom 22px
  &.my
    margin-bottom 39px
    .set
      margin-bottom 23px
      li
        color #878787
        margin-top 20px
        padding 30px 20px
        background-color #f8f3e8
        border solid 1px #dbceb0
        position relative
        .title
          font-size 16px
          margin-bottom 20px
          color #666666
          .icon
            vertical-align middle
            margin-left 8px
        .tips
          font-size 14px
        .btn
          position absolute
          top 50%
          right 21px
          margin-top -16px
  &.privilege
    padding-bottom 0 !important
    .box
      margin-top 21px
      li
        width 235px
        height 140px
        cursor pointer
        background-color #f6ecd6
        display inline-block
        margin-right 31px
        margin-bottom 30px
        text-align center
        padding 10px
        box-sizing border-box
        &:nth-of-type(3n)
          margin-right 0
        .centent
          border 1px dashed #e1cda0
          height 100%
          width 100%
          display flex
          align-items center
          justify-content center
          flex-direction column
          color #c39f52
          img
            width 67px
            height @width
            margin-bottom 10px
            object-fit contain
</style>

