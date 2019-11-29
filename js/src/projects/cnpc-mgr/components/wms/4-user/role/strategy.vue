<script>
import Ueditor from 'projects/x-publish-mgr/components/1-contentLibrary/question/Ueditor'
import * as service from 'services/x-library-pro/implement/mgr/strategy'
import { main } from '@/util/mixins'

export default {
  mixins: [main],
  components: { Ueditor },
  data() {
    return {
      service,
      resourceDialog: false,
      curSoucesList: [],
      query: {
        name: '',
      },
      parameter: {
        pid: this.$route.query.id,
      },
    }
  },
  methods: {},
}
</script>

<template lang="pug">
Template(ref="child")
  span(slot="title") 等级价格设置（最多5个）
  .btns(slot="rightBtn")
    el-button(size="mini" type="primary" plain @click="detail()" v-if="tableData.length<5") 新建
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(prop="name" label="名称" )
      el-table-column(prop="time" label="期限（天）")
      el-table-column(prop="price" label="价格")
      el-table-column(prop="abs" label="备注")
      el-table-column(prop="create_time" label="创建时间")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          .icon.el-icon-edit(title="编辑" @click="detail(row.id)")
          .icon.el-icon-delete(title="删除" @click="del([row.id])")
  .detail(slot="detail")
    .group
      .label.must 名称：
      .right
        el-input.width(size="small" v-model="detailInfo.name")
    .group 
      .label.must 期限（天）：
      .right
        el-input.width(type='textarea' v-model="detailInfo.time")
    .group 
      .label.must 价格：
      .right
        el-input.width(type='textarea' v-model="detailInfo.price")
    .group 
      .label.must 备注：
      .right
        el-input.width(type='textarea' v-model="detailInfo.abs")
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
