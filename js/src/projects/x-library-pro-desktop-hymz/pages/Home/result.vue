<template lang="pug">
.result.container.f14
  .result-wrap
    .result-num 检索词：
      span(v-if="keyword") “{{ keyword }}”
      p.page(v-if="pageShow")
        |共检索到
        span {{ page.count }}条
        |结果
      .icon.icon-loading(v-else)
    .result-list
      div(
        v-for="(item, index) in list"
        :key="index"
      )
        SearchResultBook(
          v-if="item.type === 'book'"
          :item="item"
          :key-word="privateKey"
        )
        SearchResultArticle(
          v-else-if="item.type === 'chapter'"
          :item="item"
          :key-word="privateKey"
        )
        SearchResultKnowledge(
          v-else
          :item="item"
          :key-word="privateKey"
        )
      .noDate(v-if="!page.total&&pageShow")
        .tips 没有找到相关数据，请重新检索！
    VipPurchaseTips(v-if="pageShow")
  .pages(v-if="pageShow&&userInfo&&userInfo.vip")
    PageMy(
      @currentChange="pageChangeHandler"
      :total="page.total"
      :pageOffset="page.pageOffset"
      :pageNum="page.pageNum"
    )
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import SearchResultArticle from '@/components/search/SearchResultArticle'
import SearchResultBook from '@/components/search/SearchResultBook'
import SearchResultKnowledge from '@/components/search/SearchResultKnowledge'
import { createHash } from 'crypto'
import { SET_SEARCH_RESULT } from '@/store/types'
export default {
  // asyncData({ store, route }) {
  //   const { keyword } = route.query
  //   let method =
  //     typeof keyword !== 'undefined'
  //       ? 'queryResultWithNormal'
  //       : 'queryAdvResultList'
  //   store.dispatch(`search/${method}`, { ...route.query })
  // },
  components: { SearchResultBook, SearchResultArticle, SearchResultKnowledge },
  created() {
    const { keyword } = this.$route.query
    let method =
      typeof keyword !== 'undefined'
        ? 'queryResultWithNormal'
        : 'queryAdvResultList'
    this[method]({ ...this.$route.query })
    // store.dispatch(`search/${method}`, { ...this.$route.query })
  },
  computed: {
    ...mapState('search', {
      list: state => state.list,
      page: state => state.page,
      pageShow: state => state.pageShow,
      isNoDate: state => state.isNoDate,
    }),
    ...mapState('category', {
      categoryList: state => state.category_list,
    }),
    ...mapState('user', {
      userInfo: state => state.info,
    }),
    privateKey() {
      const { keyword, type } = this.$route.query
      if (type === 'all') {
        return keyword
      }
    },
    keyword() {
      let { keyword } = this.$route.query
      if (!keyword) {
        let temp = []
        for (let attr in this.$route.query) {
          if (attr == 'category') {
            let id = this.$route.query[attr]
            let category = this.categoryList.find(item => item.id === id)
            temp.push(category && category.name)
          } else if (attr == 'pageNum' || attr == 'type') {
            continue
          } else {
            temp.push(this.$route.query[attr])
          }
        }
        keyword = temp.join('+')
      }
      return keyword
    },
  },
  beforeRouteLeave(to, from, next) {
    // 离开搜索结果页面，清除保存的搜索结果数据
    this.resetPage()
    this.set_result([])
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate')
    if (to.query.keyword != from.query.keyword) {
      this.resetPage()
      // this.set_result([])
    }
    if (to.query.keyword) {
      this.queryResultWithNormal(to.query)
    } else {
      this.queryAdvResultList(to.query)
    }
    next()
  },
  methods: {
    ...mapMutations('search', {
      set_result: SET_SEARCH_RESULT,
      resetPage: 'resetPage',
    }),
    ...mapActions('search', ['queryResultWithNormal', 'queryAdvResultList']),
    goPage(item) {
      if (item.type == 'book' || item.type == 'chapter') {
        this.$go('/book-detail', { bookId: item.id })
      } else {
        this.$pushWithName('subject_detail', null, { sid: item.id })
      }
    },
    pageChangeHandler(pageNum) {
      this.$go('/result', {
        ...this.$route.query,
        pageNum,
      })
    },
  },
}
</script>
<style lang="stylus">
.result
  padding-top 30px
  &-wrap
    padding 20px
    background-color #fffdf7
    border 1px solid #d5ccb2
  &-num
    padding 10px 0
    border-bottom 1px solid #e9e2d1
    .page
      display inline-block
      span
        color #f00
    span
      color #f00
    .icon
      margin-left 20px
  &-list
    margin-top 2px
    border-top 3px solid #e9e2d1
    >div
      border-bottom 1px solid #efe9d8
      &:last-child
        border none
    .noDate
      min-height 20vh
      width 100%
      text-align center
      display table
      .tips
        display table-cell
        vertical-align middle
        color #333
        font-size 16px
</style>
