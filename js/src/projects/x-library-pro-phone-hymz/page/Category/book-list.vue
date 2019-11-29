<template lang="pug">
.book-list
  v-page(:title="title")
    cube-scroll(
      class="category-list"
      ref="scroll"
      :options="options"
      @pulling-up="onPullingUp"
    )
      .container
        .nationality 作者国籍：
          a(@click="dialogStatus=true") {{ nationality }}
        BookItem(
          v-for="i in list"
          has-footer
          :data="i"
        )
  overlay(
    v-model="dialogStatus"
    direction="center"
    allow-click-hide
  )
    nav-of-country(@change="nationalityChange")
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CategoryListNav from '@/components/category/CategoryListNav'
import NavOfCountry from './children/nav-of-country'
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  components: { CategoryListNav, NavOfCountry },
  computed: {
    title() {
      const {
        label
      } = this.$route.query
      return label || '分类书籍'
    },
    nationality () {
      const { nationality } = this.$route.query
      return nationality
    }
  },
  data () {
    return {
      dialogStatus: false
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.fetch(true, { ...to.query })
    next()
  },
  mounted() {
    this.fetch(true)
  },
  methods: {
    queryList ({ nationality, ...queries } = {}) {
      queries = !nationality ? { ...queries, ...this.$route.query} : {nationality, ...queries}
      return this.$services.book.queryBookListByCategoryId({ ...queries })
    },
    async queryBookList({ id, label }) {
      try {
        await this.queryBookListByCategoryId({
          clean: true,
          author_nationality: label,
          ...this.$route.query
        })
      } catch(e) {}
    },
    nationalityChange({ id, label = '全部' } = {}) {
      this.$replaceWithPath('category/book-list', {query: { ...this.$route.query, nationality: label }})
    }
  }
}
</script>
<style lang="stylus">
.book-list
  .nationality
    margin 0.3rem 0
    color #333
    a
      padding 0.13rem 0.2rem
      display inline-block
      border 1px solid #F0F0F0
      font-size 14px
      color #888
  .category-list
    .home-book-item
      margin-bottom 0.3rem
      &:first-child
        margin-top 0.4rem
</style>
