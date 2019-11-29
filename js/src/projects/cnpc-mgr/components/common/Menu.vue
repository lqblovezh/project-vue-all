<script>
import GliMenu from 'projects/common/menu'
import GliMenuTop from 'projects/common/menu/Menu'
import GliMenuItem from 'projects/common/menu/MenuItem'

export default {
  components: {
    GliMenu,
    GliMenuTop,
    GliMenuItem,
  },
  data() {
    return {
      isCollapse: false,
    }
  },
  computed: {
    defaultActive() {
      let path = this.$route.path
      if (path == '/') {
        path = '/wms/home'
      } else {
        if (path.split('/').length > 3) {
          let index = path.lastIndexOf('/')
          path = path.substring(0, index)
        }
      }
      return path
    },
    nav() {
      return this.$store.state.authority
    },
    isCurrentProject() {
      return __SUFFIX__ == 'hymz'
    },
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    MenuCollapse() {
      this.isCollapse = !this.isCollapse
      var node = document.querySelector('#content')
      if (this.isCollapse) {
        node.classList.add('mini')
      } else {
        node.classList.remove('mini')
      }
    },
    menuItemClickHandler() {},
    menuFoldHandler() {
      this.MenuCollapse()
    },
    getAuthority(type) {
      return this.nav[type] && this.nav[type].status
    },
  },
}
//:unique-opened="true"  这里还不能改, 因为不是二级路由, 非常别扭
</script>


<template lang="pug">
.menu(v-if="nav" :class="{'collLeft': isCollapse}")
  gli-menu(
    @itemClickHandler="menuItemClickHandler"
    @foldHandler="menuFoldHandler"
    :menuRecreate="false"
    topPx="50px"
    :keepOneOpen="true"
    :default-active="$route.path"
    :router="true"
    :collapse="isCollapse"
    background-color="#333744"
    text-color="#fff"
    active-text-color="#44c3aa")
    GliMenuTop( txt="首页" index="/wms/home" v-if="getAuthority('/wms/home')")
      GliMenuItem(
        iconClass="icon-menu-home"
        txt="首页"
        style="display:none"
        index="/wms/home" v-if="getAuthority('/wms/home')")
    GliMenuTop( txt="书籍")
      GliMenuItem(
        iconClass="icon-menu-book"
        txt='书籍管理'
        index="/wms/book")
        //- index="/wms/book" v-if="getAuthority('/wms/book')")
      GliMenuItem(
        iconClass="icon-menu-classify"
        txt="分类设置"
        index="/wms/classify" v-if="getAuthority('/wms/typeSetting')")
      GliMenuItem(
        iconClass="icon-menu-copyright"
        txt="版权管理"
        index="/wms/copyright")
      GliMenuItem(
        iconClass="icon-menu-typeface"
        txt="繁简字管理"
        index="/wms/typeface")
      GliMenuItem(
        iconClass="icon-menu-comment"
        txt="评论审核"
        index="/wms/comment")
    GliMenuTop( txt="检索")
      GliMenuItem(
        iconClass="icon-menu-search"
        txt="检索管理"
        index="/wms/search")
    GliMenuTop( txt="用户")
      GliMenuItem(
        iconClass="icon-menu-memberList"
        txt="用户列表"
        index="/wms/user")
      GliMenuItem(
        iconClass="icon-menu-role"
        txt="用户等级"
        index="/wms/role")
      GliMenuItem(
        iconClass="icon-menu-strategy"
        txt="会员相关设置"
        index="/wms/vip")
      GliMenuItem(
        iconClass="el-icon-potato-strips"
        txt="会员同步"
        index="/wms/setvip")
    GliMenuTop( txt="内容" )
      GliMenuItem(
        iconClass="icon-menu-special"
        v-if="isCurrentProject"
        txt="专题管理"
        index="/wms/special")
      GliMenuItem(
        iconClass="icon-menu-help"
        txt="帮助管理"
        index="/wms/help" )
      GliMenuItem(
        iconClass="icon-menu-banner"
        txt="banner设置"
        v-if="isCurrentProject"
        index="/wms/banner" )
    GliMenuTop( txt="订单" )
      GliMenuItem(
        iconClass="icon-menu-orderManage"
        txt="订单管理"
        index="/wms/orderManage" v-if="getAuthority('/wms/orderManage')")
    GliMenuTop(txt="统计")
      GliMenuItem(
        iconClass="icon-menu-dealStatistics"
        txt="交易统计"
        index="/wms/dealStatistics")
      GliMenuItem(
        iconClass="icon-menu-searchStatistics"
        txt="搜索统计"
        index="/wms/searchStatistics" )
      GliMenuItem(
        iconClass="icon-menu-bookStatistics"
        txt="书籍统计"
        index="/wms/bookStatistics" )
      GliMenuItem(
        iconClass="icon-menu-userStatistics"
        txt="用户统计"
        index="/wms/userStatistics" )
      GliMenuItem(
        iconClass="icon-menu-statistics"
        txt="综合统计"
        index="/wms/statistics" )
    GliMenuTop(txt="系统设置")
      GliMenuItem(
        iconClass="icon-menu-systemSeting"
        txt="基本设置"
        index="/wms/systemSeting")
      //- GliMenuItem(
      //- 	iconClass="icon-menu-book"
      //- 	txt="部门管理"
      //- 	index="/wms/sectionSet")
      //- GliMenuItem(
      //- 	iconClass="icon-menu-book"
      //- 	txt="成员管理"
      //- 	index="/wms/memberSet")
      //- GliMenuItem(
      //- 	iconClass="icon-menu-book"
      //- 	txt="系统日志"
      //- 	index="/wms/journal")
</template>


<style lang="stylus" scoped>
.menu
  position fixed
  width 200px
  top 50px
  bottom 0
  z-index 300
  overflow hidden
  transition width 0.3s ease-in-out
  .el-menu
    width 220px
    height 100%
    overflow-y auto
    overflow-x hidden
    .el-menu-item
      padding-left 30px !important
    .el-submenu
      max-width 200px
      .el-submenu__title
        font-size 16px
        height 44px
        line-height 44px
        i
          font-size 16px
          margin-right 6px
.menu .el-menu
  width 220px
  height 100%
  overflow-y auto
  overflow-x hidden
.menu .el-menu .el-submenu
  max-width 200px
.collapse
  background #565E6E
  height 50px
  max-width 200px
  text-align center
  line-height @height
  color #ffffff
  font-size 16px
  cursor pointer
  user-select none
  i
    font-size 15px
.el-menu-item
  i
    margin-right 10px
    &:before
      font-size 16px
      display inline-block
.collLeft
  width 70px
  .el-menu
    width 70px
    transition width 0.3s ease-in-out
</style>
