<script>
export default {
  data() {
    return {
      navs: [
        { label: '个人中心', path: '/user/center' },
        { label: '阅读历史', path: '/user/read' },
        { label: '我的书房', path: '/user/bookRoom' },
        { label: '我的批注', path: '/user/annot' },
        { label: '引用记录', path: '/user/record' },
        { label: '我的评论', path: '/user/assess' },
        { label: '我的会员', path: '/user/vip' },
        { label: '账户设置', path: '/user/account' },
        { label: '安全设置', path: '/user/security' },
      ],
    }
  },
  methods: {
    go(path) {
      if (this.$route.path.indexOf(path) == -1) {
        this.$go(path)
      }
    },
  },
  computed: {
    currActive() {
      return this.$route.path
    },
  },
}
</script>

<template lang="pug">
.user-center.container
  .left
    .top
      .icon.icon-user
      span 个人中心
    ul.list
      li(v-for="({label, path}, index) in navs" :class="{active:currActive.indexOf(path) > -1}" :key="index" @click="go(path)") {{ label }}
  .right
    router-view
</template>

<style lang="stylus" scoped>
.user-center
  margin-top 30px
  overflow hidden
  padding-bottom 40px
  .left
    width 260px
    height 478px
    text-align center
    background-color #fffdf7
    border solid 1px #dbceb0
    display inline-block
    cursor pointer
    .top
      font-size 16px
      line-height 50px
      height 50px
      background-color #f0eadb
      color #c39f52
      .icon
        vertical-align text-bottom
        margin-right 7px
      span
        font-weight bold
    .list
      padding 17px 0
      li
        font-size 14px
        line-height 44px
        color #737373
        &.active
          color #c79846
  .right
    width 810px
    float right
    display inline-block
    >>> .rightBox
      padding 17px 20px
      background-color #fffdf7
      border solid 1px #dbceb0
    >>> .el-table
      margin-top 20px
      .el-table__body-wrapper
        background #fffdf7
      .el-table__header-wrapper
        border 1px solid #dbceb0
        box-sizing border-box
      .el-table__fixed-right
        top 1px
        right 1px
      tr
        background #fffdf7
        cursor pointer
        th
          background #f8f3e8
          color #666666
          text-align center
        td
          text-align center
          .icon
            margin-right 10px
            cursor pointer
            color #009882
            &.el-icon-delete
              color #9d381c
@media screen and (max-width: 1400px)
  .user-center .left
    width 130px
</style>
