<template lang="pug">
div(:class="scrollClass")
  .page-home.c-bg-main
    .home-top.pr.c-bg-f
      .home-top__circle
        HomeNavSearch
      nav-swiper
    HomePanel(title="知识点导航" path="knowledge-point" @click="enterKnowledge" user-click)
      HomeNav
    HomePanel(title="推荐专题" path="subject-list")
      .flex.container.subject-menu
        HomeSubjectItem(v-for="i in subject_list" :data="i" path="subject-detail")
    HomePanel(title="热门阅读" path="hot-list")
      .container.pb20rem
        BookItem(v-for="i in hot_list" :data="i")
</template>
<script>
import { isIos } from '@/common/js/base'
import { mapState, mapMutations } from 'vuex'
import NavSwiper from './children/nav-swiper'
import HomeNav from '@/components/home/HomeNav'
import HomePanel from '@/components/home/HomePanel'
import HomeSubjectItem from '@/components/home/HomeSubjectItem'
import HomeNavSearch from '@/components/home/HomeNavSearch'
import { SET_KNOWLEDGE_LIST } from '@/store/types'
export default {
  asyncData({ store, route }) {
    store.dispatch('knowledge/queryKnowLedge', { clear: true })
    store.dispatch('home/init')
  },
  components: { NavSwiper, HomeNav, HomePanel, HomeSubjectItem, HomeNavSearch },
  computed: {
    ...mapState('home', {
      subject_list: state => state.recommend_subject,
      hot_list: state => state.hot_read_list
    }),
    ...mapState('knowledge', {
			list: state => state.knowledge_list
    }),
    scrollClass() {
      return `bottom-scroll${isIos()?'--ios': ''}`
    }
  },
  methods: {
    ...mapMutations('knowledge', {
      setKnowLedge: SET_KNOWLEDGE_LIST
    }),
    enterKnowledge() {
      if (this.list.length) {
        this.$push('/knowledge-point', { query: { type: 'all' }})
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    next()
  }
}
</script>
<style lang="stylus">
.page-home
  padding-bottom 1rem
  .home-top
    padding-bottom 0.6rem
    .home-top__circle
      width 100%
      height 3.6rem
      border-radius 0 0 100% 100%
      background-color #009882
  .subject-menu
    padding-bottom 0.3rem
    .home-subject-item
      &:first-child
        margin-right 0.3rem
</style>
