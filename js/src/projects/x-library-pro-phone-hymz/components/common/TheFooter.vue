<template lang="pug">
.footer.flex-tc.fixed-bottom.c-bg-f(v-show="isShowFooter")
  .footer-item.tc(v-for="nav in navs" :class="{active: calculate(nav.path) === $route.path }" @click="$go(nav.path)")
    div(:class="'icon-' + nav.icon + (calculate(nav.path) === $route.path ? '-active' : '') ")
    p.f12 {{ nav.txt }}
</template>
<script>
import { caculateRouteBaseUrl } from '@/common/js/base'
export default {
  data () {
    return {
      pathname: '',
      navs: [
        { icon: 'home', txt: '首页', path: 'home' },
        { icon: 'category', txt: '分类', path: 'category' },
        { icon: 'bookroom', txt: '书房', path: 'book-room' },
        { icon: 'my', txt: '我的', path: 'my' },
      ]
    }
  },
  computed: {
    isShowFooter() {
      for (let nav of this.navs) {
        if (caculateRouteBaseUrl(nav.path) === this.$route.path) {
          return true
        }
      }
      return false
    }
  },
  mounted () {
    // this.setPathName()
  },
  methods: {
    calculate(pathname) {
      return caculateRouteBaseUrl(pathname)
    },
    setPathName() {
      let path = ''
      try {
        path = caculateRouteBaseUrl()
      } catch(e) {}
    }
  },
  watch: {
    '$route'() {
      // console.log(this.$route)
      this.setPathName()
    }
  }
}
</script>
<style lang="stylus">
.footer
  height 1rem
  box-shadow 0 0 1px rgba(0, 0, 0, .1)
  color #b5bdbc
  bottom -0.08rem
  .footer-item
    flex 1
    height 100%
    >div
      margin-top 0.14rem
    &.active
      color #009882
</style>
