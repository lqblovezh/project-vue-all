<script>
import userMixins from './mixins'
import { ReaderMixins } from '@/utils/mixins'

export default {
  mixins: [userMixins, ReaderMixins],
}
</script>

<template lang="pug">
.rightBox
  UserTitlePanel(name="我的书房" :icon="false")
  el-table(ref="table"
    stripe
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @row-click="tabClickHandle"
  )
    el-table-column(prop="book_name" label="书籍名称" )
    el-table-column(prop="author" label="作者")
    el-table-column(prop="create_time" label="加入时间")
    el-table-column(prop="speed" label="阅读进度")
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

