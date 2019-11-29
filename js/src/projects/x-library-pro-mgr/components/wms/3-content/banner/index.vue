<script>
import * as service from 'services/x-library-pro/implement/mgr/banner'
import { detail as BookDetail } from 'services/x-library-pro/implement/mgr/book'
import Detail from 'projects/common/readOnlyDetail'
import { main } from '@/util/mixins'

export default {
  mixins: [main],
  components: { Detail },
  data() {
    return {
      service,
      resourceDialog: false,
      curSoucesList: [],
      query: {
        name: '',
      },
    }
  },
  methods: {
    sort(item, sort) {
      service
        .sort({ id: item.id, sort })
        .then(res => {
          this.$message.success(`${sort == 'up' ? '上移' : '下移'}成功`)
          this.getList()
        })
        .catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
    addResource() {
      this.curSoucesList = JSON.parse(
        JSON.stringify(this.detailInfo.relation || [])
      )
      this.resourceDialog = true
    },
    addSelcet(ids, array) {
      if (!this.detailInfo.relation) {
        this.detailInfo.relation = []
      }
      array.forEach(element => {
        let index = this.detailInfo.relation.findIndex(
          item => item.id === element.id
        )
        if (index == -1) {
          this.detailInfo.relation.push(element)
        }
      })
      this.resourceDialog = false
    },
    opneDetailDialog(id) {
      BookDetail({ id }).then(res => {
        this.bookInfo = res.data
        this.detailVisible = true
      })
    },
  },
}
</script>

<template lang="pug">
Template(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" ref="child")
  span(slot="title") Banner设置
  .btns(slot="rightBtn")
    el-button(size="mini" type="primary" plain @click="detail()") 添加banner
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="index" width='120' label="编号")
      el-table-column(label="图片")
        template(slot-scope="{row}")
            img.book_cover(:src="row.img_src")
      el-table-column(type="index" width='120' label="排序")
      el-table-column(prop="relation" label="关联")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          .icon.el-icon-view(title="编辑" @click="detail(row.id)")
          .icon.up.el-icon-back( @click="sort(row,'up')" title="上移")
          .icon.down.el-icon-back( @click="sort(row, 'down')" title="下移")
          .icon.el-icon-delete(title="删除" @click="del([row.id])")
    Resource(
      v-if="resourceDialog"
      :resourceDialog.sync="resourceDialog"
      :singleElection="true"
      :maxLength="1"
      :curSoucesList="curSoucesList"
      @select="addSelcet"
    )
  .detail(slot="detail")
    .group
      .label.must banner名称：
      .right
        el-input.width(size="small" v-model="detailInfo.name")
    .group
      .label.must 封面：
      .right
        el-button(type="primary" size="small" @click="$refs.updateImg.click()") 选择上传文件
        input.hide(type="file" @change="previewImg($event,4096)" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
        span.tip 只能上传jpg/png格式文件，推荐比例：1125*560 px
        img.img(:src="detailInfo.img_src" alt="logo")
    .group
      .label 关联书籍：
      .right
        el-button.btn(type="primary" size="small" @click="addResource" v-if="detailInfo.relation&&detailInfo.relation.length==0") 添加关联
        el-table(ref="table"
          stripe
          :data="detailInfo.relation"
          tooltip-effect="dark"
          :width="700"
        )
          el-table-column(prop="book_name" :width="250" label="书籍名" )
          el-table-column(prop="author" :width="250" label="作者")
          el-table-column(label="操作" :width="200")
            template(slot-scope="{row}")
              .icon.el-icon-view(title="详情" @click="opneDetailDialog(row.book_id)")
              .icon.el-icon-delete(title="删除" @click="dels(row.id)")
</template>

<style lang="stylus" scoped>
.icon.up
  transform rotate(90deg)
  display inline-block
.icon.down
  transform rotate(-90deg)
  display inline-block
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
