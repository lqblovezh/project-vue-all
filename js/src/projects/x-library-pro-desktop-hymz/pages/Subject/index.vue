<template lang="pug">
section.subject-recommend.container.section
  .section-inner
    SubjectItem(
      v-for="i in list"
      :key="i.id"
      :item="i"
    )
    PageMy.pages(
      @currentChange="pageChangeHandler"
      :total="page.total"
      :pageOffset="page.pageOffset"
      :pageNum="page.pageNum"
    )
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { setTimeout } from 'timers'
export default {
  asyncData({ store, route }) {
    store.dispatch('subject/querySubjectList')
  },
  computed: {
    ...mapState('subject', {
      list: state => state.list,
      page: state => state.page,
    }),
  },
  mounted() {
    setTimeout(() => {
      console.log(this.list, 111111)
    }, 2000)
  },
  methods: {
    ...mapActions('subject', ['querySubjectList']),
    pageChangeHandler(pageNum) {
      this.querySubjectList({
        pageNum,
      })
    },
  },
}
</script>
<style lang="stylus">
.subject-recommend
  >div
    padding 0 20px
    background-color #fffdf7
    border 1px solid #d5ccb2
</style>
