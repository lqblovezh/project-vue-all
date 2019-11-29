<script>
import userMixins from './mixins'

export default {
  mixins: [userMixins],
}
</script>

<template lang="pug">
.rightBox
  UserTitlePanel(name="我的评论" :icon="false")
  el-table(ref="table"
    stripe
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
  )
    el-table-column(prop="book_name" label="书籍名称" )
    el-table-column(prop="create_time" label="评论时间")
    el-table-column(prop="content" label="评论内容")
      template(slot-scope="{row}")
        .text(:title="row.content") {{row.content|formatText(15)}}
    el-table-column(label="操作")
      template(slot-scope="{row}")
        .icon.el-icon-delete(title="删除" @click.stop="del(row.id)")
  PageMy.pages(
    @currentChange="pageChangeHandler"
    :total="page.total"
    v-if="page.total"
    :pageOffset="page.pageOffset"
    :pageNum="page.pageNum"
  )
</template>

<style lang="stylus" scoped></style>
