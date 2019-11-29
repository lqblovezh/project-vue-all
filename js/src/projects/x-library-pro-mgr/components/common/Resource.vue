<script>
import * as service from 'services/x-library-pro/implement/mgr/book'
import formSerialize from 'form-serialize'

export default {
  props: {
    resourceDialog: {
      type: Boolean,
      default: false,
    },
    singleElection: {
      //是否单选
      type: Boolean,
      default: true,
    },
    curSoucesList: {
      type: Array,
      default: [],
    },
    maxLength: [String, Number],
  },
  data() {
    return {
      dataList: [], //列表信息
      page: {
        pageNum: 1,
        pageOffset: 10,
      },
      contentType: [
        { name: '文章', value: 'article' },
        { name: '套系', value: 'series' },
      ], //内容属性
      query: {
        book_name: '',
      },
      oldCurSoucesList: [],
    }
  },
  created() {
    this.oldCurSoucesList = [].concat(this.curSoucesList)
    this.getList()
  },
  methods: {
    getList(query) {
      service
        .getList({
          ...this.page,
          ...query,
        })
        .then(res => {
          this.dataList = res.data
          if (res.page) {
            this.page.total = res.page.total
          }
        })
    },
    colse() {
      this.$emit('update:resourceDialog', false)
    },
    seareHandeler() {
      //条件查询
      let query = formSerialize(document.querySelector('#detailSearchForm'), {
        hash: true,
      })
      this.getList(query)
    },
    async addSelection() {
      //添加选中
      const page = document.querySelector('.addBookForm')
      const list = page.querySelectorAll('input[name="ids"]:checked')
      let array = []
      if (!list.length) {
        return this.$message.warning('请选择添加内容')
      }
      for (let item of list) {
        let index = this.oldCurSoucesList.findIndex(items => {
          return items.book_id == item.value || items.id == item.value
        })
        if (index > -1) {
          continue
        }
        array.push(this.dataList.find(items => items.id == item.value))
      }
      if (this.maxLength) {
        this.$emit(
          'select',
          this.curSoucesList.map(item => item.id),
          this.curSoucesList
        )
      } else {
        this.$emit('select', array.map(item => item.id), array)
      }
    },
    checkAll(e, name) {
      //全选
      const parent = document.querySelector('.' + name)
      parent.querySelectorAll('input[name="ids"]').forEach((item, index) => {
        let Findex = this.curSoucesList.findIndex(
          items => items.id == item.value || items.b_id == item.value
        )
        if (e.target.checked) {
          if (Findex == -1) {
            this.curSoucesList.push({
              ...this.dataList.find(items => items.id == item.value),
              action: 'add',
            })
          }
        } else {
          this.curSoucesList.splice(Findex, 1)
        }
        item.checked = e.target.checked
      })
    },
    uncheckedAll(e, item) {
      if (this.maxLength && this.curSoucesList.length >= this.maxLength) {
        this.$message.warning(`最多${this.maxLength}条，不能再多了`)
        e.stopPropagation()
        e.preventDefault()
        return false
      }
      let index = this.curSoucesList.findIndex(items => {
        return items.id == item.id || items.book_id == item.id
      })
      if (e.target.checked) {
        if (index == -1) {
          this.curSoucesList.push(item)
        }
      } else {
        this.curSoucesList.splice(index, 1)
      }
      console.log(this.maxLength, this.curSoucesList.length, 2222)
      if (!this.singleElection) {
        this.$refs.ids.forEach(item => (item.checked = false))
        e.target.checked = true
      }
    },
    isChecked(id) {
      //选中状态
      if (
        this.curSoucesList.findIndex(
          item => item.book_id === id || item.id === id || item.rel_id == id
        ) > -1
      ) {
        return true
      }
      return false
    },
    handleSizeChange(val) {
      //处理size变化
      let query = formSerialize(document.querySelector('#detailSearchForm'), {
        hash: true,
      })
      this.page.pageOffset = val
      this.getList(query)
    },
    handleCurrentChange(val) {
      //处理页码变化
      let query = formSerialize(document.querySelector('#detailSearchForm'), {
        hash: true,
      })
      this.page.pageNum = val
      this.getList()
    },
  },
}
</script>

<template lang="pug">
  div
    //- 添加
    el-dialog(
      :center="false"
      :visible="resourceDialog"
      width="1000px"
      top="50px"
      :show-close="false"
      append-to-body
      )
      .header(slot="title")
        span(class="el-icon-close" @click="colse")
        el-tabs(value="detail")
          el-tab-pane(label="添加" name="detail")
      el-form.addBookForm
        .serachWrap
          form#detailSearchForm
            span.group-inline
              el-input( placeholder="书籍" v-model="query.book_name"  name="name" clearable)
            //- span.group-inline
            //-   el-input( placeholder="ISBN"  name="isbn" clearable)
            //- span.group-inline
            //-   TimePick(:inputsName="['start_time','end_time']")
            span.group-inline.right
              el-button(@click="seareHandeler" type="primary" icon="el-icon-search" plain) 搜索
              el-button(@click="addSelection" type="primary" plain) 添加选中
        table.table(width="100%")
            thead
              tr
                th(width=80)
                  input(v-if="singleElection&&!maxLength" type="checkbox" @click="checkAll($event,'addBookForm')")
                  span(v-text="singleElection&&!maxLength?'全选':'选择'")
                th 书名
                th 作者
                th 创建时间
            tbody(v-if="dataList.length")
              tr(v-for="item,index in dataList")
                td
                  input(type="checkbox" :data-type="item.status" @click="uncheckedAll($event,item)" :value="item.id" ref="ids" :checked="isChecked(item.id)" name="ids")
                td {{item.book_name}}
                td {{item.author}}
                td {{item.create_time}}
        .pageWrap(v-if="page")
          el-pagination( :small="false" background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.pageNum"
            :page-sizes="[10, 50, 100]"
            layout="total,prev, pager, next"
            :total="page.total"
          )
      div(slot="footer" class="dialog-footer")
        el-button(type="info"  @click="colse") 取消
        el-button(type="primary"  @click="addSelection") 确定
</template>


<style lang="stylus" scoped>
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
</style>
