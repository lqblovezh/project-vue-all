<template lang="pug">
.category.container
  .category-content.flex-bs
    AsidePanel(
      @click-event="selectBookByCategory"
      page-type="category"
      :list="list"
      v-model="categoryName"
    )
    .category-main
      CategoryOfCountryBar(v-model="author_nationality" @click-event="selectBookByCategory")
      CategoryList(:country="author_nationality" @click-event="selectBookByCategory" ref="categoryList")
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CategoryOfCountryBar from '@/components/category/CategoryOfCountryBar'
import CategoryList from '@/components/category/CategoryList'
export default {
  asyncData({ store, route }) {
    store.dispatch('category/init', {
      ...route.query,
    })
  },
  components: { CategoryOfCountryBar, CategoryList },
  computed: {
    ...mapState('category', {
      page: state => state.page,
      list: state => state.category_list,
    }),
    bookCategories() {
      return this.list && this.$recursive(this.list)
    },
  },
  data() {
    return {
      // 作者国籍
      author_nationality: '',
      categoryName: '',
      category_list: [],
    }
  },
  watch: {
    $route() {
      this.queryBookList({
        ...this.$route.query,
        clean: true,
        author_nationality: this.author_nationality,
      })
    },
  },
  methods: {
    ...mapActions('category', ['queryBookList']),
    selectBookByCategory(item = {}) {
      if (!item.keepSearch) {
        this.$refs.categoryList.clear()
      }
      this.queryBookList({
        ...this.$route.query,
        clean: item.pageNum ? false : true,
        author_nationality: this.author_nationality,
        ...item,
      })
    },
  },
}
</script>
<style lang="stylus">
.category
  &-content
    align-items flex-start
    padding-top 30px
  &-main
    flex 1
</style>
