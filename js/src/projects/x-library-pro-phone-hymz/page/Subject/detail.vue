<template lang="pug">
.subject-detail
  v-page(title="专题详情页")
    .scroll-full
      .subject-detail__info.container
        .name.f15.c-font-main.tc {{ info.title }}
        .content.f14(v-html="info.content")
      .subject-detail__list
        BookItem(v-for="i in info.list" :data="i")
</template>
<script>
import { mapState } from 'vuex'
export default {
  asyncData({ store, route }) {
    store.dispatch('subject/querySubjectInfo', {...route.query})
  },
  computed: {
    ...mapState('subject', {
      info: state => state.info
    })
  }
}
</script>
<style lang="stylus">
.subject-detail
  &__info
    .name
      padding 0.3rem 0
    .content
      padding-bottom 0.3rem
      line-height 1.5
      color #4d4d4d
      border-bottom 1px solid #ebf2f1
      > p
        text-indent 2em
  &__list
    padding 0.3rem
</style>
