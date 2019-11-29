<script>
import userMixins from './mixins'
import { mapGetters } from 'vuex'
import { ReaderMixins } from '@/utils/mixins'

export default {
  mixins: [userMixins, ReaderMixins],
  computed: {
    ...mapGetters('user', {
      info: 'userInfo',
    }),
    setBaseUrl() {
      return staticUrl + 'images/avatar.png'
    },
  },
}
</script>

<template lang="pug">
.center
  .info
    img(:src="info.picture||setBaseUrl")
    .name {{info.username}}
    .btns
      el-button(type="theme" size="mini" @click="$go('/user/account')") 账户设置
      el-button(type="theme" size="mini" @click="$go('/user/security')") 安全设置
  .rightBox
    UserTitlePanel(name="阅读历史" path="/user/read")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @row-click="tabClickHandle"
    )
      el-table-column(prop="book_name" label="书籍名称" )
      el-table-column(prop="author" label="作者")
      el-table-column(prop="speed" label="阅读进度")
      el-table-column(label="操作")
        template(slot-scope="{row}")
          .icon.el-icon-delete(title="删除" @click.stop="del(row.id,'read')")
  .rightBox
    UserTitlePanel(name="我的书房" path="/user/bookRoom")
    el-table(ref="table"
      stripe
      :data="bookRoomList"
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
          .icon.el-icon-delete(title="删除" @click.stop="del(row.id,'bookRoom')")
</template>

<style lang="stylus" scoped>
.center
  .info
    text-align center
    height 229px
    background-color #fffdf7
    border solid 1px #dbceb0
    font-size 0
    justify-content center
    align-items center
    display flex
    flex-direction column
    img
      width 96px
      height 96px
      border-radius 50%
      background-color #f1f0bd
    .name
      font-size 16px
      line-height 36px
      color #c39f52
      margin 7px 0
  .rightBox
    margin-top 22px
</style>

