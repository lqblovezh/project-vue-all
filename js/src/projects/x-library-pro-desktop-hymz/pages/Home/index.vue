<template lang="pug">
.home
  HomeSearch
  HomePanelKnowledge(
    label="知识点"
    icon="hat"
    path="knowledge"
  )
  HomePanelSubject(
    label="推荐专题"
    icon="subject"
    path="subject"
    v-if="list.length"
  )
  HomePanelBook(
    label="热门阅读"
    icon="hot"
    path="hotread"
  )
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import HomeSearch from '@/components/home/HomeSearch'
import HomePanelKnowledge from '@/components/home/HomePanelKnowledge'
import HomePanelSubject from '@/components/home/HomePanelSubject'
import HomePanelBook from '@/components/home/HomePanelBook'
import { SET_RECOMMEND_SUBJECT, SET_HOT_READ_LIST } from '@/store/types'
export default {
  asyncData({ store, route }) {
    store.dispatch('home/init')
  },
  components: {
    HomeSearch,
    HomePanelKnowledge,
    HomePanelSubject,
    HomePanelBook,
  },
  methods: {
    ...mapMutations('home', {
      setSubject: SET_RECOMMEND_SUBJECT,
      setHotList: SET_HOT_READ_LIST,
    }),
  },
  computed: {
    ...mapState('home', {
      list: state => state.recommend_home_subject,
    }),
  },
  beforeDestroy() {
    this.setSubject([])
    this.setHotList([])
  },
}
</script>
<style lang="stylus" scoped>
.home
  section
    margin-bottom 26px
</style>
