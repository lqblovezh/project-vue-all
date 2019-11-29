<script>
import userMixins from './mixins'
import { ReaderMixins } from '@/utils/mixins'

export default {
  mixins: [userMixins, ReaderMixins],
  methods: {
    go(item) {
      this.goReader(item.book_id, {
        chapter_id: item.chapter_id,
        range: item.range,
      })
    },
  },
}
</script>

<template lang="pug">
.rightBox
  //- Reader(
  //-   :readerDialog.sync="readerDialog"
  //-   :readerId="readerId"
  //-   version="draft"
  //-   v-if="readerDialog"
  //- )
  UserTitlePanel(name="我的批注" :icon="false")
  el-table(ref="table"
    stripe
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
  )
    el-table-column(prop="book_name" label="书籍名称" )
    el-table-column(label="所选字段")
      template(slot-scope="{row}")
        .text(:title="row.select") {{row.select|formatText(15)}}
    el-table-column(prop="content" label="批注内容")
      template(slot-scope="{row}")
        .text(:title="row.content") {{row.content|formatText(15)}}
    el-table-column(prop="create_time" label="批注时间")
    el-table-column(label="操作")
      template(slot-scope="{row}")
        .icon.el-icon-view(title="查看" @click="go(row)")
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
