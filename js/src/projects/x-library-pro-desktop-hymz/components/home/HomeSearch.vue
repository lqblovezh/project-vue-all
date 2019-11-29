<template lang="pug">
.home-search.container
  .home-search__inner
    h1.tc
      img(src="@/static/images/entry-name.png")
    HomeSearchInput
    .search-nav.clearfix.flex
      .search-nav__left
        //- .fl(v-for="(item,index) in list" :key="index" @click="$go('/category',{id:item.id})")
        .fl
          a 热门搜索：
        .fl(v-for="(item,index) in hotList" :key="index" @click="$go('/result',{keyword:item,type:'all',pageNum:1})")
          a.ell {{item}}
      .search-nav__right.fl.flex-ac(@click="$go('/category')")
        //- span.ib.line
        .icon-nav.cp
        span.ib.f14.txt.cp 分类导航
</template>
<script>
import HomeSearchInput from './HomeSearchInput'
import { mapState } from 'vuex'

export default {
  components: { HomeSearchInput },
  computed: {
    ...mapState('category', {
      list: state => state.category_list,
    }),
    ...mapState('home', {
      hotList: state => state.hotList,
    }),
  },
}
</script>
<style lang="stylus" scoped>
.home-search
  margin 0 auto 30px
  h1
    margin 40px 0 16px
  &__inner
    width 885px
    margin 0 auto
  .search-nav
    margin 17px 0 0
    color #737373
    &__left
      overflow hidden
      white-space nowrap
      height 28px
      .fl:first-child
        a
          margin-right 20px
      a
        display inline-block
        // padding 0 20px
        max-width 70px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        height 24px
        line-height 24px
        text-align center
        font-size 14px
        margin-right 35px
        cursor pointer
        background-color #f7f2e6
        // border 1px solid rgba(55, 129, 102, 0.32)
        border-radius 5px
    &__right
      padding-left 24px
      flex 0 0 110px
      .line
        height 15px
        width 1px
        background-color #dcb464
      >div
        margin 0 10px 0 25px
      >.txt
        height 24px
        line-height 24px
</style>
