<template lang="pug">
.search-result(:class="{'ios': is_ios}")
  v-page(:title="resultTitle")
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    )
      .f11.result-tips.container.c-bg-main 共检索到
        span {{ page.total }}
            |条结果
      .scroll.c-bg-main.result-list
        SearchResultBook(
          v-for="i in list"
          v-if="i.type === 'book'"
          :data="i"
          :key-word="keyword"
        )
        SearchResultChapter(
          v-else-if="i.type ==='chapter'"
          :data="i"
          :key-word="keyword"
        )
        SearchResultKnowledge(
          v-else
          :data="i"
          :key-word="keyword"
        )
        .result-vip-tips(v-if="isComplete&&!userInfo.vip")
          button(@click="buyVip") 购买
          p 成为付费会员查看剩下内容
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import SearchResultBook from '@/components/search/SearchResultBook'
import SearchResultChapter from '@/components/search/SearchResultChapter'
import SearchResultKnowledge from '@/components/search/SearchResultKnowledge'
import { isIos } from '@/common/js/base'
export default {
  asyncData({ store, route }) {
    const {keyword} = route.query
    let method = typeof keyword !== 'undefined' ? 'queryResultWithNormal' : 'queryAdvResultList'
    store.dispatch(`search/${method}`, { clean: true, ...route.query})
  },
  components: {
    SearchResultBook,
    SearchResultChapter,
    SearchResultKnowledge
  },
  computed: {
    ...mapState('search', {
      list: state => state.list,
      page: state => state.page,
      isLoaded: state => state.isLoaded,
      isComplete: state => state.isComplete
    }),
    ...mapState('user', ['userInfo']),
    keyword() {
      return this.$route.query.keyword
    },
    resultTitle() {
      return this.keyword ? this.keyword : '检索结果'
    },
    is_ios() {
      return isIos()
    }
  },
  data() {
    return {
      options: {
        pullUpLoad: {
          txt: {
            more: '加载中...'
          },
          visible: true
        }
      }
    }
  },
  methods: {
    ...mapMutations('search', ['set_result']),
    ...mapActions('search', ['queryResultWithNormal', 'queryAdvResultList']),
    search () {
      const { keyword } = this.$route.query
      let method = typeof keyword !== 'undefined' ? 'queryResultWithNormal' : 'queryAdvResultList'
      this[method]({ ...this.$route.query })
    },
    onPullingUp () {
      setTimeout(() => {
        if (!this.isLoaded) {
          // 新数据
          this.search()
        }
        this.$refs.scroll.forceUpdate(true, this.isLoaded)
      }, 1500)
    },
    buyVip () {
      this.$router.push({ name: 'vip-buy'})
    }
  },
  beforeRouteLeave(to, from, next) {
    this.set_result({ clear: true})
    next()
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/common/css/variable.styl";
.ios
  .top-scroll--ios
    padding-top 1.56rem
.search-result
  .top-scroll--ios
    .scroll
      span
        color #d00000
  .result-tips
    height 0.58rem
    line-height 0.58rem
    color #b2c2bf
    >span
      margin 0 2px
      color #d00000
  .result-vip-tips
    background-color #FFF
    text-align center
    border-color transparent
    button
      font-size 14px
      color #FFF
      background-color theme-color
    p
      margin 0.1rem 0
      font-size 12px
      color #999
</style>
