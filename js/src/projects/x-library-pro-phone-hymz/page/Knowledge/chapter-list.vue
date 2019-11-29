<template lang="pug">
v-page(title="知识点" class="knowledge-point-list")
  cube-scroll(
    ref="scroll"
    :options="options"
    @pulling-up="onPullingUp"
    class="chapter-list"
  )
    .chapter-list-container
      .title {{typeText}}：
        span {{ label }}
      section.c-6(
        v-for="ele in list"
        :key="ele.id"
        @click="$read({ id: ele.book_id, chapter_root: ele.catalog_pid, chapter_id: ele.b_id })"
      ) {{ ele.content }}
        p.c-9.f12
          span(v-if="ele.book_name") 《{{ ele.book_name}}》
          |{{ ele.chapter_name }}
</template>
<script>
import loadmoreMixin from '@/mixins/loadmore'
import { mapState, mapActions } from 'vuex'
export default {
  mixins: [loadmoreMixin],
	computed: {
		label() {
			return this.$route.query.label
    },
    typeText () {
      const { nType } = this.$route.query
      let text = ''
      switch(nType) {
        case 'person':
          text = '人名'
          break
        case 'address':
          text = '地名'
          break
        default:
          text = '知识点'
      }
      return text
    }
  },
  mounted() {
    this.fetch(true)
  },
	methods: {
    queryList(page) {
      const { label: name, bookId, nType: ntype } = this.$route.query
      return this.$services.knowledge.queryRelatedChapter({...page, name, bookId, ntype })
    }
	}
}
</script>
<style lang="stylus">
@import "~@/common/css/variable.styl";
.knowledge-point-list
  .chapter-list
    &-container
      padding 0.3rem
      .title
        span
          color theme-color
      section
        padding 0.22rem 0
        font-size 14px
        line-height 1.5
        p
          margin-top 0.2rem
        &:not(:last-child)
          border-bottom 1px solid #f0f0f0
</style>
