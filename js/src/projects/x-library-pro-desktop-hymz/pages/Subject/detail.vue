<template lang="pug">
section.subject-detail.container
  .current-location.f12 当前位置：
    a.cp(@click="$go('/subject')") 专题
    span &gt;
    a.cp 专题详情
  .subject-detail__wrapper.flex-bs
    .subject-detail__body.c-bg-f
      h3.tc {{ info.title }}
      p.time.tr.f12 {{ info.create_time }}
      .content.f14.tc(v-html="info.content")
      .grid-4.clearfix
        BookItem(
          v-for="item in bookList"
          :key="item.id"
          :item="item"
        )
    SubjectDetailAside
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import SubjectDetailAside from '@/components/subject/SubjectDetailAside'
export default {
  asyncData({ store, route }) {
    store.dispatch('subject/querySubjectInfo', route.params )
  },
  components: { SubjectDetailAside },
  computed: {
    ...mapState('subject', {
      info: state => state.info
    }),
    ...mapGetters('subject', ['bookList'])
  },
  methods: {
    ...mapActions('subject', ['querySubjectInfo'])
  },
  beforeRouteUpdate(to, from, next) {
    this.querySubjectInfo(to.params)
    next()
  }
}
</script>
<style lang="stylus">
.subject-detail
  .current-location
    padding 20px 0 11px
    span
      margin 0 5px
  &__wrapper
    align-items flex-start
  &__body
    flex 1
    padding 0 20px
    border 1px solid #dbceb0
    h3
      margin 40px 0 20px
      font-size 18px
      font-weight bold
      color #dbceb0
    .time
      color #b3b3b3
    .content
      margin-top 20px
      padding-bottom 25px
      line-height 1.5
      color #878787
      border-bottom 1px solid #e9e2d1
      text-align left
      p
        margin-bottom 20px
        text-align left
      >img
        width 426px
    >.grid-4
      padding-top 30px
      >div
        // width 178px
        padding-right 18px
        &:nth-of-type(4n)
          padding-right 0
</style>
