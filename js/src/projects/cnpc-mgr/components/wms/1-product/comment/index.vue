<script>
import * as service from 'services/x-library-pro/implement/mgr/comment'
import { main } from '@/util/mixins'

export default {
  mixins: [main],
  data() {
    return {
      service,
      query: {
        book_name: '',
        nick_name: '',
        state: '',
      },
      status: [
        { label: '通过', value: 'success' },
        { label: '待审核', value: 'wait' },
        { label: '失败', value: 'fail' },
      ],
    }
  },
  methods: {
    adopt(ids) {
      if (!ids) {
        if (!this.ids.length) return this.$message.warning('请先选中')
        ids = this.ids
      }
      service
        .adopt({ id: ids })
        .then(res => {
          this.getList()
          this.$message.success('通过成功')
        })
        .catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
  },
}
</script>


<template lang="pug">
Template(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="书籍名" clearable v-model="query.book_name")
    el-input.dy_inputWidth(placeholder="输入用户昵称" clearable v-model="query.nick_name")
    el-select(v-model="query.state" clearable placeholder="请选择用户类别")
      el-option(
        v-for="(item,index) in status"
        :key="index"
        :label="item.label"
        :value="item.value"
      )
    el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
  .btns(slot="rightBtn")
    el-button(size="mini" type="primary" plain @click="adopt(false)") 通过
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
      el-table-column(prop="nike_name" label="用户昵称")
      //- el-table-column(prop="user_type" label="用户类别" )
      el-table-column(prop="book_name" label="书籍名称")
      el-table-column(prop="content" label="评论内容")
      el-table-column(prop="status_type" label="状态")
      el-table-column(prop="create_time" label="评论时间")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          .icon.el-icon-check(title="通过" @click="adopt([row.id])")
          .icon.el-icon-delete(title="删除" @click="del([row.id])")
</template>

<style lang="stylus" scoped></style>
