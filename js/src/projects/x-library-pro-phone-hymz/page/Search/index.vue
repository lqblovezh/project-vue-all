<template lang="pug">
.search
  v-page(user-define)
    template(#centerContent)
      .header-btns.f16(slot="center")
        button(:class="{active: pageType === 'normal'}" @click="changeRoute('normal')") 搜索
        button(:class="{active: pageType === 'advanced'}" @click="changeRoute('advanced')") 高级搜索
    .scroll-full.c-bg-main
      component(:is="componentType")
</template>
<script>
import { mapState } from 'vuex'
import SearchNormal from '@/components/search/SearchNormal'
import SearchAdvanced from '@/components/search/SearchAdvanced'
export default {
  components: { SearchNormal, SearchAdvanced },
  computed: {
    ...mapState('user', ['userInfo']),
    pageType() {
      const { pageType } = this.$route.query
      return pageType ? pageType : 'normal'
    },
    componentType() {
      return this.pageType === 'normal' ? 'SearchNormal' : 'SearchAdvanced'
    }
  },
  mounted () {
    const { pageType } = this.$route.query
    this.checkIsVip(pageType)
  },
  methods: {
    changeRoute(type) {
      if (this.checkIsVip(type)) {
        this.$replaceWithPath('search', { query: { pageType: type }})
      }
    },
    checkIsVip (type) {
      if (type === 'advanced' && !this.userInfo.vip) {
        this.$router.push({ name: 'vip-buy'})
        return false
      }
      return true
    }
  }
}
</script>
<style lang="stylus">
.search
  .header-btns
    width 4rem
    height 0.6rem
    border 1px solid #FFF
    border-radius 2px
    overflow hidden
    box-sizing border-box
    button
      padding 0
      width 50%
      height 100%
      color #FFF
      background-color transparent
      &.active
        font-size 18px
        color #009882
        background-color #FFF
</style>
