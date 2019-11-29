
<script>
import * as service from 'services/x-library-pro/implement/mgr/order'

export default {
  props: ['detailVisible', 'orderId'],
  data() {
    return {
      detailInfo: {
        orderInfo: [],
        googsInfo: [],
        operationInfo: [],
      },
    }
  },
  created() {
    this.detail()
  },
  methods: {
    detail() {
      service.detail({ id: this.orderId }).then(res => {
        this.detailInfo = res.data
      })
    },
    handleClose() {
      this.$emit('update:detailVisible', false)
    },
    closeOrder(name = '备注') {
      this.$prompt('操作备注', name + '订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.+$/,
        inputErrorMessage: '不能为空',
      })
        .then(({ value }) => {
          ;(name == '备注' ? service.remarks : service.close)({
            id: this.orderId,
            message: value,
          }).then(
            res => {
              this.detail()
              this.$message.success(name + '成功')
            },
            ({ payload, message }) => {
              this.$message.error((payload && payload.message) || message)
            }
          )
        })
        .catch(() => {})
    },
  },
  computed: {
    getTotalPrice() {
      let num = 0
      this.detailInfo.googsInfo.forEach(element => {
        num += Number(element.price)
      })
      return '￥' + num.toFixed(2)
    },
  },
}
</script>

<template lang="pug">
el-dialog.dialog(
  :visible.sync= "detailVisible"
  v-if="detailVisible"
  :before-close="handleClose"
  :lock-scroll="false"
  :close-on-click-modal="false"
  width="1100px"
  top="50px"
)
  .header(slot="title")
    el-tabs(value="detail")
      el-tab-pane(label="详情" name="detail")
  .group
    .label 订单状态：
    .right
      el-button.btn(type="danger" size="small" @click="closeOrder('关闭')" v-if="detailInfo.order_type=='待支付'") 关闭订单
      el-button.btn(type="primary" size="small" @click="closeOrder('备注')") 备注订单
  .group
    .label 基本信息：
    .right.all
      el-table(ref="table"
        stripe
        :data="detailInfo.orderInfo"
        tooltip-effect="dark"
        width="100%"
      )
        el-table-column(prop="order" label="订单编号" :key='Math.random()')
        el-table-column(prop="nick_name" label="用户昵称" :key='Math.random()')
        el-table-column(prop="phone" label="手机号码" :key='Math.random()')
        el-table-column(prop="pay_type" label="支付方式" :key='Math.random()')
        el-table-column(prop="money" label="订单金额" :key='Math.random()')
        el-table-column(prop="from" label="订单来源" :key='Math.random()')
        el-table-column(prop="create_time" label="提交时间" :key='Math.random()')
        el-table-column(prop="pay_time" label="支付时间" v-if="detailInfo.order_type == '已完成'" :key='Math.random()')
        el-table-column(prop="close_time" label="关闭时间" v-if="detailInfo.order_type == '已关闭'" :key='Math.random()')
  .group
    .label 商品信息：
    .right.all
      el-table(ref="table"
        stripe
        :data="detailInfo.googsInfo"
        tooltip-effect="dark"
        width="100%"
      )
        el-table-column(prop="name" label="名称" )
        el-table-column(prop="time" label="期限（天）")
        el-table-column(prop="price" label="价格")
          template(slot-scope="{row}") {{'￥'+row.price}}
        el-table-column(prop="abs" label="备注")
        el-table-column(label="小计")
          template(slot-scope="{row}") {{'￥'+row.price}}
      .total 合计：
        span {{getTotalPrice}}
  .group
    .label 操作信息：
    .right.all
      el-table(ref="table"
        stripe
        :data="detailInfo.operationInfo"
        tooltip-effect="dark"
        width="100%"
      )
        el-table-column(prop="name" label="操作者" )
        el-table-column(prop="create_time" label="操作时间")
        el-table-column(prop="order_type" label="订单状态")
        el-table-column(prop="order_type" label="付款状态")
        el-table-column(prop="abs" label="备注")
  div(slot="footer" class="dialog-footer")
    el-button(type="info" @click="handleClose" size="small" ) 取消
</template>

<style lang="stylus" scoped>
.group
  display flex
  .el-radio
    line-height inherit
  .save
    margin-left 70px
  .right
    .total
      font-size 16px
      padding-right 65px
      span
        color #F04844
        font-weight bold
    &.all
      width 100%
      >>> textarea
        height 200px
    .btn
      display inline-block
      width 150px
    .tip
      color #999999
    .img
      width 150px
      height 150px
      object-fit contain
</style>
