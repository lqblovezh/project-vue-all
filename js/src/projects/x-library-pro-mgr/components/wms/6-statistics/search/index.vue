<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-library-pro/implement/mgr/searchStatistics'

export default {
  mixins: [main],
  data() {
    return {
      service,
    }
  },
  created() {},
  methods: {
    sortChange(val) {
      const { column, ...data } = val
      this.getList({ data })
    },
  },
}
</script>

<template lang="pug">
Template(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child")
  span(slot="title") 书籍统计
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    )
      el-table-column(prop="sort" label="排序" )
      el-table-column(prop="book_name" label="关键词" )
      //- el-table-column(prop="from" label="来源")
      el-table-column(prop="search_all" sortable="custom" label="总搜索")
      el-table-column(prop="search_month" sortable="custom" label="本月")
      el-table-column(prop="search_week" sortable="custom" label="本周")
      el-table-column(prop="search_today" sortable="custom" label="今日")
      //- el-table-column(label="操作" fixed="right")
      //-   template(slot-scope="{row}")
      //-     .icon.el-icon-delete(title="删除" @click="del([row.id])")
</template>

<style lang="stylus" scoped>
.data
  display inline-block
  line-height 40px
  li
    display inline-block
    cursor pointer
    margin-right 20px
    &.active
      color #44c3aa
</style>
