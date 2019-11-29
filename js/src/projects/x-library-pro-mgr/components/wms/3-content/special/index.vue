<script>
import Ueditor from 'projects/x-publish-mgr/components/1-contentLibrary/question/Ueditor'
import * as service from 'services/x-library-pro/implement/mgr/special'
import { detail as BookDetail } from 'services/x-library-pro/implement/mgr/book'
import Detail from 'projects/common/readOnlyDetail'
import { main } from '@/util/mixins'

export default {
  mixins: [main],
  components: { Ueditor, Detail },
  data() {
    return {
      service,
      resourceDialog: false,
      isShowUeditor: false,
      curSoucesList: [],
      bookInfo: {},
      query: {
        name: '',
      },
    }
  },
  methods: {
    addSelcet(ids, array) {
      array.forEach(element => {
        if (!this.detailInfo.relation) {
          this.detailInfo.relation = []
        }
        let index = this.detailInfo.relation.findIndex(
          item => item.id === element.id
        )
        if (index == -1) {
          this.detailInfo.relation.push(element)
        }
      })
      this.resourceDialog = false
    },
    addResource() {
      this.curSoucesList = JSON.parse(
        JSON.stringify(this.detailInfo.relation || [])
      )
      this.resourceDialog = true
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
Template(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="专题名称" clearable v-model="query.name")
    el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
  .btns(slot="rightBtn")
    el-button(size="mini" type="primary" plain @click="detail()") 新建专题
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="selection" width="55" fixed)
      el-table-column(label="封面图片")
        template(slot-scope="{row}")
          img.book_cover(:src="row.img_src")
      el-table-column(prop="name" label="标题" )
      el-table-column(prop="create_time" label="发布时间")
      el-table-column(prop="status_type" label="显示")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          .icon.el-icon-view(title="编辑" @click="detail(row.id)")
          .icon.el-icon-delete(title="删除" @click="del([row.id])")
    Resource(
      v-if="resourceDialog"
      :resourceDialog.sync="resourceDialog"
      :curSoucesList="curSoucesList"
      :maxLength="10"
      @select="addSelcet"
    )
    Detail(
      :detailVisible.sync="detailVisible"
      v-if="detailVisible"
      detailValue="info"
      :defaultData="bookInfo"
      :type="13"
    )
  .detail(slot="detail")
    .group
      .label.must 专题标题：
      .right
        el-input.width(size="small" v-model="detailInfo.name")
    .group
      .label.must 专题描述：
      .right
        el-input.width(type='textarea' v-model="detailInfo.abs" maxlength="100" show-word-limit style='width:400px')
    .group
      .label.must 封面：
      .right
        el-button(type="primary" size="small" @click="$refs.updateImg.click()") 选择上传文件
        input.hide(type="file" @change="previewImg($event,4096)" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
        span.tip 只能上传jpg/png格式文件，文件不能超过4M
        img.img(:src="detailInfo.img_src" alt="logo")
    .group
      .label 是否前台显示
      .right
        el-switch(
          v-model="detailInfo.status"
          active-color="#13ce66"
          inactive-color="#ddd"
        )
    .group(v-if="isShowUeditor")
      .label 专题正文：
      Ueditor(:isImage="true" id="agreement" :item="detailInfo" name='text' @uechange="uechange" :frameHeight='300' :frameWidth='700')
    .group
      .label 关联书籍：
      .right
        el-button.btn(type="primary" size="small" @click="addResource" v-if="detailInfo.relation&&detailInfo.relation.length<10") 添加关联
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
