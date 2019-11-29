<script>
import * as service from 'services/x-library-pro/implement/mgr/columnSetting'
import { recursionTree } from '@/util/math.js'
import { main } from '@/util/mixins'

export default {
  mixins: [main],
  data() {
    return {
      service,
      detailDialog: false,
      currentDescribe: {},
      currentDate: {},
      currentNode: {},
      curSoucesList: [],
      list: [],
      resourceDialog: false,
      resourceType: null,
      navTab: [], // 顶级导航菜单
      state: [
        {
          value: 'false',
          label: '否',
        },
        {
          value: 'true',
          label: '是',
        },
      ],
    }
  },
  methods: {
    // 获取顶级导航菜单
    append(data) {
      const newChild = {
        children: [],
        name: '',
        detail: [],
        keyword: '',
        code: '',
        create_time: this.formatDate(new Date()),
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.$refs.tree.store.nodesMap[data.id].expanded = true
      data.children.push(newChild)
    },
    remove(node, data) {
      if (data.id) {
        this.del(data.id)
      } else {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }
    },
    add() {
      this.tableData.push({
        children: [],
        pid: 'root',
        name: '',
        level: '',
        state: '',
        create_time: this.formatDate(new Date()),
      })
    },
    save(data, node) {
      let parent = node.parent ? node.parent.data : {}
      service
        .save({
          ...data,
          pid: parent.id,
        })
        .then(res => {
          this.$message.success('成功')
          this.getList()
        })
    },
    async getDetailList() {
      await service
        .detail({
          ...this.currentDate,
          id: this.currentDate.id,
          ...this.page,
        })
        .then(res => {
          this.list = res.data || []
          this.page.total = res.page.total
          console.log(this.list, 111111)
        })
    },
    muluSort(item, sort) {
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
    sort(item, sort) {
      service
        .sorts({ ...item, id: item.id, sort })
        .then(res => {
          this.$message.success(`${sort == 'up' ? '上移' : '下移'}成功`)
          this.getDetailList()
        })
        .catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
    formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          )
        }
      }
      return fmt
    },
    padLeftZero(str) {
      return ('00' + str).substr(str.length)
    },
    addSelcet(data, array) {
      service
        .add({
          category_id: this.currentDate.id,
          rel_id: array.map(item => item.id),
        })
        .then(res => {
          this.getDetailList()
          this.resourceDialog = false
        })
        .catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
    async showDetail(node, data) {
      this.currentDate = data
      this.page = {
        pageOffset: 10,
        pageNum: 1,
      }
      await this.getDetailList()
      this.detailDialog = true
    },
    dels(id) {
      let ids = []
      if (id) {
        ids.push(id)
      } else {
        ids = this.$getChecked()
        if (!ids) {
          return
        }
      }
      this.$confirm('是否删除？')
        .then(_ => {
          service
            .dels({
              rel_id: ids,
              category_id: this.currentDate.id,
            })
            .then(res => {
              this.$message.success('删除成功')
              this.getDetailList()
            })
            .catch(({ payload, message }) => {
              this.$message.error((payload && payload.message) || message)
            })
        })
        .catch(_ => {})
    }, //删除或多个单个
    openResource() {
      if (this.type == 'subject') {
        this.resourceType = 'series'
      }
      this.curSoucesList = JSON.parse(JSON.stringify(this.list || []))
      this.resourceDialog = true
    },
    handleSizeChange(val) {
      this.page.pageOffset = val
      this.getDetailList({ ...this.page, ...this.query })
    },
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.getDetailList({ ...this.page, ...this.query })
    },
    async classFile(e) {
      let node = e.target
      let file = node.files[0]
      const { url, path, name } = await this.$globalUpdateFile(file)
      this.importClass(path)
    },
    importClass(file) {
      service
        .importClass({ file })
        .then(res => {
          this.getList()
          this.$message.success('导入成功')
        })
        .catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
    download() {
      service
        .download()
        .then(res => {
          window.location.href = res.data
        })
        .catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
  },
}

</script>

<template lang="pug">
.tree
  Resource(
    v-if="resourceDialog"
    :resourceDialog.sync="resourceDialog"
    :curSoucesList="curSoucesList"
    :currentType='resourceType'
    @select="addSelcet"
  )
  el-dialog.detailDialog(
    width="1000px"
    title="关联产品"
    top="50px"
    :visible.sync="detailDialog"
    v-if="detailDialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
  )
    .btn
      el-button(type="primary" plain @click="openResource" size="mini") 添加关联
    table.table
      thead
        tr
          th.table-check
            input(type="checkbox" @click="$checkAll($event)")
          th 书籍名
          th 作者
          th 创建时间
          th 状态
          th(width=100) 操作
      tbody
        tr(v-for="item in list")
          th
            input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
          th
            img.cover-photo()
            .th-name.bookName(:title="item.book_name") {{item.book_name}}
          th
            .th-name {{item.author}}
          th
            .th-name {{item.create_time}}
          th
            .th-name {{item.state}}
          th
            .div
              .icon.up.el-icon-back( @click.stop="sort(item,'up')" title="上移")
              .icon.down.el-icon-back( @click.stop="sort(item, 'down')" title="下移")
              Icon(type='icon-delete' title="删除" @click="dels(item.id)")
    .page(v-if="page")
        el-pagination(
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[10,50,100]"
          :page-size="10"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        )
    .btns(slot="footer")
      el-button( type="info" @click="detailDialog=false") 取消
      el-button(@click="detailDialog=false" type="primary") 确定
  .btn
    el-button(class="el-icon-plus" type="primary" plain @click="add()") 添加顶级
    .class
      el-button(class="el-icon-plus" type="text" plain @click="$refs.classFile.click()") 导入分类表
      el-button(type="text" plain @click="download()") 模板文件下载
    input.hide(type="file"  ref="classFile" accept=".xlsx,.xls"  @change="classFile")
  table.table.table1(ref="table")
    thead
      tr
        th(style="padding-left:80px")  类别名称
        th 级别
        th 显示
        th 创建时间
        th.options  操作
  el-tree(
    :data="tableData"
    ref="tree"
    node-key="id"
  )
    span(class="custom-tree-node" slot-scope="{ node, data }")
      input.form-control(v-model="data.name")
      span.level(v-text="data.level")
      span.whether
        el-select(v-model="data.state" clearable placeholder="是否显示")
          el-option(
            v-for="(item,index) in state"
            :key="index"
            :label="item.label"
            :value="item.value"
          )
      span.time(v-text="data.create_time")
      span.options
        .icon.icon-detail( @click.stop="showDetail(node,data)" v-if="data.id"  title="添加关系")
        //- .icon.up.el-icon-back( @click.stop="muluSort(data,'up')" v-if="data.id"  title="上移")
        //- .icon.down.el-icon-back( @click.stop="muluSort(data, 'down')" v-if="data.id"  title="下移")
        .icon.el-icon-upload2( @click.stop="save(data,node)" title="保存")
        .icon.el-icon-plus( @click.stop="append(data)" v-if="data.id" title="添加")
        .icon.icon-delete( @click.stop="remove(node, data)" title="删除")
</template>

<style lang="stylus" scoped>
.page
  text-align center
  margin 20px 0
.detailDialog
  >>> .btn
    margin 20px 0
.icon.up
  transform rotate(90deg)
  display inline-block
.icon.down
  transform rotate(-90deg)
  display inline-block
.tree
  position relative
  min-width 1300px
  .options
    width 170px
    text-align center
    .icon
      color #44c3aa
  .time, .keyword, .code
    float right
    width 200px
    line-height 40px
  padding 20px
  .btn
    margin 20px 0
    .class
      display inline-block
      float right
  >>> .el-tree-node__content
    height 50px
    line-height 50px
    .custom-tree-node
      width 100%
      flex 1
      display flex
      align-items center
      justify-content space-between
      font-size 14px
      padding-right 8px
      .form-control
        width 150px
</style>
