<script>
import { main } from '@/util/mixins'
import Detail from 'projects/common/readOnlyDetail'
import * as service from 'services/x-library-pro/implement/mgr/book'
import putSetPage from './pustSet'

export default {
  mixins: [main],
  components: {
    Detail,
    putSetPage,
  },
  data() {
    return {
      service,
      query: {
        book_name: '',
        status: '',
      },
      putDetailData: {}, //上架数据
      pustSetDialog: false, // 上架dialog
    }
  },
  methods: {
    pustChange(e, item) {
      // log(e.target.value,item)
      this.putSet(e.target.value)
    },
    close() {
      this.pustSetDialog = false
    },
    save() {
      this.pustSetDialog = false
      this.getList()
    },
    shelf(type, ids) {
      if (!ids) {
        if (!this.ids.length) return this.$message.warning('请先选中')
        ids = this.ids
      }
      service
        .shelf({ type, id: ids })
        .then(res => {
          this.getList()
          this.$message.success(type == 'up' ? '上架成功' : '下架成功')
        }).catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
    putSet(id) {
      //上架设置详情
      service.putInfo({ id }).then(res => {
        console.log("putinfo")
        console.log(res)
        this.putDetailData = res.data
        this.pustSetDialog = true
      })
    },
  },
}
</script>

<template lang="pug">
Template(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="书籍名" clearable v-model="query.book_name")
    el-select(v-model="query.status" clearable placeholder="请选择")
      el-option(
        v-for="(item,index) in status"
        :key="index"
        :label="item.label"
        :value="item.value"
      )
    el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
  .btns(slot="rightBtn")
    el-button(size="mini" type="primary" plain @click="shelf('up')") 上架
    el-button(size="mini" type="primary" plain @click="shelf('down')") 下架
    el-button(size="mini" type="primary" @click="del(false)" plain) 删除
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="selection" width="55" fixed)
      el-table-column(label="书籍封面")
        template(slot-scope="{row}")
          img.book_cover(:src="row.img_src")
      el-table-column(prop="book_name" label="书籍名" )
      el-table-column(prop="author" label="作者")
      el-table-column(prop="create_time" label="创建时间")
      el-table-column(prop="status_type" label="状态")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          .icon.el-icon-view(title="查看" @click="opneDetailDialog(13, row.id)")
          //.icon.el-icon-setting(title="设置" @click="putSet(row.id)")
          .icon.el-icon-upload2(title="上架" v-if="row.status=='0'" @click="shelf('up',[row.id])")
          .icon.el-icon-download(title="下架" v-if="row.status!='0'" @click="shelf('down',[row.id])")
          .icon.el-icon-delete(title="删除" @click="del([row.id])")
    //- 详情
    Detail(
      :detailVisible.sync="detailVisible"
      v-if="detailVisible"
      detailValue="info"
      :defaultData="detailInfo"
      :type="13"
    )
    //- 上架设置
    putSetPage(
      :pustSetDialog="pustSetDialog"
      :putData="putDetailData"
      v-if="pustSetDialog"
      @close="close"
      @save="save"
      @change="pustChange"
    )
</template>

<style lang="stylus" scoped></style>
