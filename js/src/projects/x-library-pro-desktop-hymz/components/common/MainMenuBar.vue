<template lang="pug">
.main-menu-bar.c-bg-theme
  .container.flex-bs
    ul.tc.left
      li(
        @click="$go(path)"
        v-for="{ label, path } in left_navs"
        :key="label"
        :class="{active: currActive.indexOf(path) > -1}"
      )
        a {{ label }}
    ul.tc.right
      li(@click="$go('/user/bookRoom')")
        .icon.icon-bookshelf
        a 我的书房
      li(@click="$go('/members')")
        .icon.icon-vip
        a 会员中心
      li
        el-popover(
          placement="top-end"
          trigger="hover"
          content=""
        )
          .download-panel
            .name 扫码下载app
            img(:src="qrcodeUrl" ref="reference")
          .btn(slot="reference")
            .icon.icon-phone
            a 客户端
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      left_navs: [
        { label: '首页', path: '/home' },
        { label: '分类', path: '/category' },
        { label: '知识点', path: '/knowledge' },
        { label: '索引表', path: '/indexTable' },
        { label: '专题', path: '/subject' },
        { label: '热门阅读', path: '/hotread' },
      ],
    }
  },
  computed: {
    currActive() {
      return this.$route.path
    },
    ...mapState('home', {
      qrcodeUrl: state => state.qrcodeUrl,
    }),
  },
}
</script>
<style lang="stylus" scoped>
.main-menu-bar
  height 50px
  >.container
    height 100%
    line-height 50px
  ul
    &.left
      position relative
      left -27px
      li
        padding 0 27px
    &.right
      li
        padding-left 30px
        .icon
          margin-right 5px
          transform translateY(2px)
    li
      cursor pointer
      display inline-block
      &.active
        background #c39f52
      a
        color #fff
</style>
