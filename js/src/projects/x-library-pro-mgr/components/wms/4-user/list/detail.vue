<script>
import { main } from '@/util/mixins'
import Detail from '../../5-order/detail'
import * as service from 'services/x-library-pro/implement/mgr/user'

export default {
  props: ['userDetail', 'baseInfo'],
  components: { Detail },
  mixins: [main],
  data() {
    return {
      service,
      currentPage: 1,
      orderId: '',
    }
  },
  created() {
    console.log(this.baseInfo)
  },
  methods: {
    getList() {
      service
        .getOrderList({ ...this.page, user_id: this.baseInfo.id })
        .then(res => {
          this.tableData = res.data
          this.total = res.page.total
        })
    },
    colse() {
      this.$emit('update:userDetail', false)
    },
    detail(id) {
      this.orderId = id
      this.detailVisible = true
    },
  },
}
</script>

<template lang="pug">
.userDetail
  Detail(
    :detailVisible.sync="detailVisible"
    v-if="detailVisible"
    :orderId="orderId"
    :detailInfo="detailInfo"
  )
  el-dialog(
    width="1000px"
    :visible.sync="userDetail"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="colse"
    title="用户详情"
    top="50px"
  )
    .content()
      .group
        .label 基本信息
        .right
          .user_info
            .left
              img.img(:src="baseInfo.img_src")
              p {{baseInfo.name}}
            ul.list
              li
                span.name 用户ID
                span.val {{baseInfo.id}}
              li
                span.name 用户等级
                span.val {{baseInfo.grade}}
              li
                span.name 手机号码
                span.val {{baseInfo.phone}}
              li
                span.name 注册时间
                span.val {{baseInfo.create_time}}
              li
                span.name 性别
                span.val {{baseInfo.sex}}
              li
                span.name 会员生效日期
                span.val {{baseInfo.grade_create_time}}
              li
                span.name 生日
                span.val {{baseInfo.birthday}}
              li
                span.name 会员到期时间
                span.val {{baseInfo.grade_end_time}}
              li
                span.name 简介
                span.val {{baseInfo.abs}}
      .group
        .label 统计信息
        .right
          el-table(ref="table"
            stripe
            :data="baseInfo.statistics"
            tooltip-effect="dark"
            width="100%"
          )
            el-table-column(prop="order_quantity" label="订单数量" )
            el-table-column(prop="order_money" label="订单金额")
            el-table-column(prop="book_quantity" label="书房书籍")
            el-table-column(prop="comment" label="评论次数")
            //- el-table-column(prop="login" label="登录次数")
      .group
        .label 订单记录
        .right
          el-table(ref="table"
            stripe
            :data="tableData"
            tooltip-effect="dark"
            :width="700"
          )
              el-table-column(prop="order" label="订单编号")
              el-table-column(prop="create_time" label="提交时间" )
              el-table-column(prop="nick_name" label="用户昵称")
              el-table-column(prop="phone" label="手机号码")
              el-table-column(prop="money" label="订单金额")
              el-table-column(prop="pay_type" label="支付方式")
              el-table-column(prop="order_type" label="订单状态")
              el-table-column(label="操作" fixed="right")
                template(slot-scope="{row}")
                  .icon.el-icon-view(title="查看订单" @click="detail(row.id)")
      .group
        .page(v-if="total")
          el-pagination(
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,50,100]"
            :page-size="10"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          )
    div(slot="footer" class="dialog-footer")
      el-button(type="info" @click="colse" ) 取消
</template>

<style lang="stylus" scoped>
.page
  text-align center
  width 100%
.group
  display flex
  .label
    min-width 100px
  .right
    display flex
    flex-direction column
    justify-content center
    width 100%
    .user_info
      display flex
      .left
        flex 0 0 240px
        justify-content center
        align-items center
        display flex
        flex-direction column
        .img
          width 100px
          height @width
          border-radius 50%
      .list
        width 100%
        font-size 0
        li
          width 50%
          display inline-block
          font-size 14px
          text-align left
          border-bottom 1px solid #f3f3f3
          border-right 1px solid #f3f3f3
          box-sizing border-box
          &:last-child
            width 100%
          .name
            display inline-block
            width 100px
            text-align center
            background #F9FAFC
          .val
            display inline-block
            max-width 50%
            padding-left 10px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
</style>
