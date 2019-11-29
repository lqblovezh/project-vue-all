<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-library-pro/implement/mgr/bookStatistics'
import SearchStatistics from '../cmp/SearchStatistics'

export default {
  mixins: [main],
  components: { SearchStatistics },
  data() {
    return {
      service,
      order: '',
      prop: '',
      dataType: ['按月统计', '按年统计'],
    }
  },
  created() {},
  methods: {
    sortChange(val) {
      const { prop, order } = val
      this.prop = prop
      this.order = order
      const { start_date, end_date } = this.$refs.statistics
      this.getList({ prop: this.prop, order: this.order, start_date, end_date })
    },
  },
}
</script>

<template lang="pug">
Template(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child")
  span(slot="title") 书籍统计
  .btns(slot="rightBtn")
    SearchStatistics(:dataType="dataType" :getList="getList" :order="order" :prop="prop" ref="statistics")
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
      el-table-column(prop="book_name" label="书籍名" )
      el-table-column(prop="views_num" sortable="custom" label="浏览次数")
      el-table-column(prop="share_num" sortable="custom" label="分享次数")
      el-table-column(prop="collect_num" sortable="custom" label="收藏次数")
      el-table-column(prop="read_num" sortable="custom" label="阅读次数")
      el-table-column(prop="com_num" sortable="custom" label="评论数")
</template>

<style lang="stylus" scoped></style>
