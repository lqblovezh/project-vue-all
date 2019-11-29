<script>
import userMixins from './mixins'
import { ReaderMixins } from '@/utils/mixins'
import copy from 'copy-to-clipboard'

export default {
  mixins: [userMixins, ReaderMixins],
  methods: {
    copy({ text }) {
      copy(text)
      this.$message.success('拷贝成功!')
    },
  },
}
</script>

<template lang="pug">
.rightBox
  UserTitlePanel(name="引用记录" :icon="false")
  el-table(ref="table"
    stripe
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @row-click="tabClickHandle"
  )
    el-table-column(prop="book_name" label="书籍名称" )
    el-table-column(prop="author" label="作者")
    el-table-column(label="引用内容")
      template(slot-scope="{row}")
        .text(:title="row.content") {{row.content|formatText(30)}}
    el-table-column(prop="chapterName" label="引用目录")
    el-table-column(label="操作")
      template(slot-scope="{row}")
        .icon.el-icon-document-copy(title="复制" @click.stop="copy(row)")
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
