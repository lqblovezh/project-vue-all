<template lang="pug">
//- header(:class="[isThemeType ? 'c-bg-sub-theme' : 'c-bg-theme']")
header.c-bg-theme
  .container
    a.logo(@click="$go('/home')")
      img.cp(src="@/static/images/logos.png")
      //- span.c-header.f12(v-else) 欢迎光临汉译世界学术名著数据库！
    .header-nav.fr.f12(:class="[isThemeType ? 'c-header' : 'c-f']")
      p.ib.cp(v-for='item in jumpList' :key="item.name")
        a(:href="item.url" target="_blank") {{item.name}}
      img(v-if="isLogin && info.picture" :src="info.picture")
      .icon-avatar(v-else-if="isLogin && !info.picture")
      p.ib.cp
        span(v-if="!isLogin" @click="$toggleLoginPanel()") 登录
        span(v-else @click="$go('/user')") {{ info.username }}
      p.ib.cp
        span(v-if="!isLogin" @click="$toggleRegisterPanel()") 注册
        span(@click="loginOut" v-else) 退出
      p.ib.cp(@click="jumpToHelpCenter") 帮助中心
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { isEmptyObject } from '@/utils/helpers'
export default {
  props: {
    type: {
      type: String,
    },
  },
  computed: {
    ...mapGetters('user', {
      info: 'userInfo',
    }),
    ...mapState('home', {
      jumpList: state => state.jumpInfo,
    }),
    isLogin() {
      return !isEmptyObject(this.info)
    },
    isThemeType() {
      return false
      return !isEmptyObject(this.info) || this.type === 'theme'
    },
  },
  methods: {
    loginOut() {
      this.$confirm('是否确认退出?')
        .then(_ => {
          this.$resetUserInfo()
        })
        .catch(_ => {})
    },
    jumpToHelpCenter() {
      this.$router.push('/helpCenter')
    },
  },
}
</script>
<style lang="stylus" scoped>
@import '../../assets/stylus/variable.styl'

header
  height $header-height
  line-height $header-height
  .container
    .logo
      cursor pointer
      img
        vertical-align middle
  &.c-bg-sub-theme
    color #634b33
    height 36px
    line-height 36px
  a.logo
    img
      max-width 149px
      max-height 28px
  .header-nav
    // height 36px
    .icon-avatar
      vertical-align middle
      margin-left 20px
    img
      height 26px
      width 26px
      border-radius 50%
      margin-left 20px
      vertical-align middle
    p
      line-height 1
      padding 0 20px
      a
        color #fff
      &:last-child
        padding-right 0
      &:not(:last-child)
        border-right 1px dashed #fff
  .c-header
    color #fff
    p
      &:not(:first-child)
        border-color $color-text-header
</style>
