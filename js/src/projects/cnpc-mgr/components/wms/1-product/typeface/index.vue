<script>
import * as dataServices from 'services/x-publish/data'
import * as service from 'services/x-library-pro/implement/mgr/typeface'
import { main } from '@/util/mixins'

export default {
  mixins: [main],
  data() {
    return {
      service,
      detailVisible: false,
      detailDate: {
        id: '',
        simp: '',
        trad: [],
      },
      query: {
        simp: '',
      },
    }
  },
  methods: {
    showDetaile(id, item = {}) {
      //查看详情
      this.detailDate = JSON.parse(JSON.stringify(item))
      if (!id) {
        this.$set(this.detailDate, 'trad', [])
        this.detailVisible = true
      } else {
        service
          .detail({
            id,
            simp: item.simp,
          })
          .then(res => {
            this.detailDate.trad = res.data.trad
            this.detailVisible = true
          })
      }
    },
    addTraditional() {
      //添加简体字对应繁体字
      let index = this.detailDate.trad.length + 1
      this.detailDate.trad.push({
        index,
        id: '',
        trad: '',
        action: 'add',
      })
      console.log(this.detailDate.trad)
    },
    save() {
      //保存
      const id = this.detailDate.id
      const findError = this.detailDate.trad.findIndex(item => !item.trad)
      if (findError > -1) {
        this.$message({
          message: '请输入完整信息',
          type: 'warning',
        })
        return
      }
      service.save(this.detailDate).then(res => {
        this.getList()
        this.detailVisible = false
        this.$message.success('保存成功')
      }).catch(({message}) => {
        this.$message.error(message)
      })
    },
    deleteTraditional(id, index) {
      //详情删除
      this.$confirm('是否删除？')
        .then(_ => {
          if (id) {
            service
              .dels({ id: [id] })
              .then(res => {
                this.getList()
                this.showDetaile(id, this.detailDate)
                this.$message.success('删除成功')
              })
              .catch(({ payload, message }) => {
                this.$message.error((payload && payload.message) || message)
              })
          } else {
            this.detailDate.trad.splice(index, 1)
          }
        })
        .catch(_ => {})
    },
  },
}
</script>

<template lang="pug">
Template(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="简体" clearable v-model="query.simp")
    el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
  .btns(slot="rightBtn")
    el-button(size="mini" type="primary" plain @click="showDetaile()") 新增
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
      el-table-column(prop="simp" label="简体")
      el-table-column(prop="trad" label="繁体" )
      el-table-column(prop="create_time" label="创建时间")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          .icon.el-icon-view(title="编辑" @click="showDetaile(row.id,row)")
          .icon.el-icon-delete(title="删除" @click="del([row.id])")
    //- 详情dialog
    el-dialog(:visible.sync="detailVisible" v-if="detailVisible")
      .header(slot="title")
        el-tabs(value="detail")
          el-tab-pane(label="详情" name="detail")
      el-form
        el-form-item(label="简体字:" label-width="120px")
          input.form-control(v-model="detailDate.simp")
          el-button.addNew(type="primary" size="mini" plain @click="addTraditional()") 新增
        el-form-item(label="" label-width="120px")
          table.table(width="100%")
            thead
              tr
                th 序号
                th 繁体字
                th 操作
            tbody
              tr(v-for="item,index in detailDate.trad")
                td(align="center" v-text='index+1')
                td(align="center")
                  input(type="text" v-model="item.trad" v-if="item.index")
                  span(v-text='item.trad' v-if="!item.index")
                td(align="center")
                  el-button(type="danger" plain size="mini" @click="deleteTraditional(item.id,index)") 删除
      div(slot="footer" class="dialog-footer")
        el-button(type="info"  @click="detailVisible = false") 取消
        el-button(type="primary"  @click="save()") 确定
</template>


<style lang="stylus" scoped>
.serachWrap
  margin-bottom 15px
.addNew
  float right
  float right
  position relative
  top 7px
.el-form-item__label
  text-align left
.clear
  position absolute
  top 150px
  left 355px
  color #d9d9d9
  border-radius 50%
  background #efefef
  width 20px
  height 20px
  line-height 20px
  text-align center
  cursor pointer
</style>
