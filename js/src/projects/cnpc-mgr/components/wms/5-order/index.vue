<script>
import * as service from 'services/x-library-pro/implement/mgr/order'
import Detail from './detail'
import { main } from '@/util/mixins'

export default {
  mixins: [main],
  components: { Detail },
  data() {
    return {
      service,
      orderId: '',
      query: {
        order: '',
        phone: '',
        time: '',
      },
    }
  },
  methods: {
    detail(id) {
      this.orderId = id
      this.detailVisible = true
    },
  },
}
</script>

<template lang="pug">
Template(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="订单编号" clearable v-model="query.order")
    el-input.dy_inputWidth(placeholder="手机号码" clearable v-model="query.phone")
    el-date-picker(
      v-model="query.time"
      type="date"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择提交时间"
      clearable
    )
    el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
  .btns(slot="rightBtn")
    el-button(size="mini" type="primary" plain @click="derivedData") 导出订单
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="selection" width="55" fixed)
      el-table-column(prop="order" label="订单编号")
      el-table-column(prop="create_time" label="提交时间" )
      el-table-column(prop="nick_name" label="用户昵称")
      el-table-column(prop="phone" label="手机号码")
      el-table-column(prop="money" label="订单金额")
      el-table-column(prop="pay_type" label="支付方式")
      //- el-table-column(prop="from" label="订单来源")
      el-table-column(prop="order_type" label="订单状态")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          .icon.el-icon-view(title="查看订单" @click="detail(row.id)")
          .icon.el-icon-delete(title="删除" @click="del([row.id])" v-if="row.order_type!='待付款'")
    Detail(
      :detailVisible.sync="detailVisible"
      v-if="detailVisible"
      :orderId="orderId"
      :detailInfo="detailInfo"
    )
</template>

<style lang="stylus" scoped></style>
