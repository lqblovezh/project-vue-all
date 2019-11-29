<script>
import * as service from 'services/x-library-pro/implement/mgr/user'
import { getList as roleList } from 'services/x-library-pro/implement/mgr/role'
import { main } from '@/util/mixins'
import Detail from './detail'

export default {
  mixins: [main],
  components: { Detail },
  data() {
    return {
      service,
      query: {
        nick_name: '',
        phone: '',
        role: '',
      },
      gradeList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    opneDetailDialog(id) {
      service
        .detailInfo({ id })
        .then(res => {
          this.detailInfo = res.data
          this.detailVisible = true
        })
        .catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
    getRoleList() {
      roleList().then(res => {
        this.gradeList = res.data
      })
    },
  },
}
</script>


<template lang="pug">
Template(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="用户昵称" clearable v-model="query.nick_name")
    el-input.dy_inputWidth(placeholder="手机号码" clearable v-model="query.phone")
    //- el-input.dy_inputWidth(placeholder="用户角色" clearable v-model="query.role")
    el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
  .btns(slot="rightBtn")
    el-button(size="mini" type="primary" plain @click="detail()") 新建用户
    el-button(size="mini" type="primary" plain @click="derivedData") 导出数据
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="selection" width="55" fixed)
      el-table-column(prop="id" label="用户ID")
      el-table-column(prop="phone" label="手机号码" )
      el-table-column(prop="nick_name" label="用户昵称")
      el-table-column(prop="user_type" label="用户等级")
      el-table-column(prop="status_type" label="账户启用状态")
      el-table-column(prop="create_time" label="创建时间")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          .icon.el-icon-view(title="查看" @click="opneDetailDialog(row.id)")
          .icon.el-icon-edit(title="编辑" @click="detail(row.id)")
          //- .icon.el-icon-delete(title="删除" @click="del([row.id])")
    Detail(
      :userDetail.sync="detailVisible"
      v-if="detailVisible"
      :baseInfo="detailInfo"
    )
  .detail(slot="detail")
    .group
      .item
        span 用户昵称：
          el-input.width(size="small" v-model="detailInfo.nick_name")
      .item
        span 手机号码：
          el-input.width(size="small" v-model="detailInfo.phone")
      .item
        span 用户等级：
        el-select(v-model="detailInfo.grade" placeholder="请选择")
          el-option(
            v-for="(item,index) in gradeList"
            :key="index"
            :label="item.name"
            :value="item.id"
          )
      .item
        span 性别：
        span.sex
          el-radio(v-model="detailInfo.sex" label="男") 男
          el-radio(v-model="detailInfo.sex" label="女") 女
          el-radio(v-model="detailInfo.sex" label="保密") 保密
      .item
        span 出生年月：
        el-date-picker.width(size="small" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="detailInfo.birth" :picker-options="pickerOptions")
      .item
        span 个人简介：
        el-input.width(size="small" type='textarea' v-model="detailInfo.abs")
      .pass(v-if="!detailInfo.id")
        .item
          span 新密码：
          el-input.width(size="small" v-model="detailInfo.pass")
        .item
          span 确认密码：
          el-input.width(size="small" v-model="detailInfo.passes")
      .item(v-if="detailInfo.id")
        span 重置密码：
        el-switch(
          v-model="detailInfo.reset_pass"
          active-color="#13ce66"
          inactive-color="#ddd"
        )
        span.tip 重置后的密码为123456
      .item
        span 账户启用状态：
        el-switch(
          v-model="detailInfo.user_type"
          active-color="#13ce66"
          inactive-color="#ddd"
        )
</template>

<style lang="stylus" scoped>
.detail
  width 500px
  margin 0 auto
  .group
    .item
      margin-bottom 15px
.sex
  .el-radio
    line-height inherit
</style>
