<template lang="pug">
.book-detail
  v-page(:title="bookInfo.name||bookInfo.bookname" scroll-type="center")
    .scroll-full.c-bg-main
      .book-info.container.c-bg-f
        BookItem(has-footer :data="bookInfo" type="single")
      BookIntro(:abs="bookInfo.abs" :id="bookInfo.id")
      BookComment
      BookInfo(:info="bookInfo.publishInfo")
      BookRelated
  BookFooter(
    @read="goToReader"
    :info="bookInfo"
  )
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { SET_BOOKINFO } from '@/store/types'
import BookIntro from '@/components/book/BookIntro'
import BookComment from '@/components/book/BookComment'
import BookInfo from '@/components/book/BookInfo'
import BookRelated from '@/components/book/BookRelated'
import BookFooter from '@/components/book/BookFooter'
export default {
  components: { BookIntro, BookComment, BookInfo, BookRelated, BookFooter },
  asyncData ({ store, route }) {
    store.dispatch('book/init', { ...route.query })
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('book', {
      bookInfo: state => state.bookInfo,
      list: state => state.related_list
    })
  },
  methods: {
    ...mapMutations('book', {
      set_info: SET_BOOKINFO
    }),
    goToReader() {
      this.$read(this.bookInfo)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.set_info({})
    next()
  }
}
</script>
<style lang="stylus">
.book-detail
  .scroll-full
    .book-info
      padding 0.3rem
    >div
      background-color #fff
      position relative
      &:not(:last-child)
        margin-bottom 0.2rem
</style>
