<script>
import * as service from 'services/x-library-pro/implement/mgr/role'
import Detail from './detail'
import { main } from '@/util/mixins'
import { Server } from 'http'
import { constants } from 'crypto';

export default {
  mixins: [main],
  components: { Detail },
  data() {
    return {
      service,
      query: {
        id: '',
        phone: '',
        role: '',
      },
      dialogVisible: false,
    }
  },
  methods: {
    powerSet(id) {
      service
        .info({ id })
        .then(res => {
          this.detailInfo = res.data
          console.log(this.detailInfo)
          this.dialogVisible = true
        })
        .catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
    priceSet(id) {
      this.$router.push({
        path: '/wms/strategy',
        query: { id, index: '/wms/role' },
      })
    },
    saveInfo(data) {
      console.log(data)
      service.saveInfo(data).then(res => {
        this.$message.success('保存成功')
        this.dialogVisible = false
      })
    },
  },
}
</script>

<template lang="pug">
Template(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child")
  span(slot="title") 用户等级
  .btns(slot="rightBtn")
    el-button(size="mini" type="primary" plain @click="detail()") 添加
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="selection" width="55" fixed)
      el-table-column(prop="name" label="等级名称")
      el-table-column(prop="abs" label="描述" )
      el-table-column(prop="status_type" label="显示" )
      el-table-column(prop="number" label="成员数量")
      el-table-column(prop="create_time" label="添加时间")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          .icon.el-icon-info(title="权限设置" @click="powerSet(row.id)")
          .icon.el-icon-setting(title="价格设置" @click="priceSet(row.id)" v-if="row.type=='after_add'")
          .icon.el-icon-view(title="编辑" @click="detail(row.id)" v-if="row.type=='after_add'")
          .icon.el-icon-delete(title="删除" @click="del([row.id])" v-if="row.type=='after_add'")
    Detail(
      :dialogVisible.sync="dialogVisible"
      :detailInfo="detailInfo"
      v-if="dialogVisible"
      @saveInfo="saveInfo"
    )
  .detail(slot="detail")
    .group
      .label.must 等级名称：
      .right
        el-input.width(size="small" v-model="detailInfo.name")
    .group
      .label.must 描述：
      .right
        el-input.width(size="small" v-model="detailInfo.abs")
    .group
      .label.must 是否显示：
      .right
        el-switch(
          v-model="detailInfo.status"
          active-color="#13ce66"
          inactive-color="#ddd"
        )
    .group
      .label 会员标识：
      .right
        el-button(type="primary" size="small" @click="$refs.updateImg.click()") 选择上传文件
        input.hide(type="file" @change="previewImg($event,4096)" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
        span.tip 只能上传jpg/png格式文件，文件不能超过4M
        img.img(:src="detailInfo.img_src" alt="logo")
</template>

<style lang="stylus" scoped>
.group
  display flex
  .el-radio
    line-height inherit
  .save
    margin-left 70px
  .label
    min-width 150px
  .right
    display flex
    flex-direction column
    justify-content center
    .btn
      width 150px
      margin-bottom 20px
    .tip
      color #999999
    .img
      width 150px
      height 150px
      object-fit contain
</style>
