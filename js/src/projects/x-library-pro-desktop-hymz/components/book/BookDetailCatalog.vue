<template lang="pug">
.book-detail-catalog
  el-tree(
    :data="list"
    :props="defaultProps"
    icon-class="icon-more"
    @node-click="clickHandler"
  )
</template>
<script>
import { mapState } from 'vuex'
import { ReaderMixins } from '@/utils/mixins'

export default {
  mixins: [ReaderMixins],
  computed: {
    ...mapState('book', {
      list: state => state.catalog,
    }),
  },
  data() {
    return {
      defaultProps: {
        label: 'name',
      },
    }
  },
  methods: {
    clickHandler(data) {
      let { chapter_id, index } = data
      this.goReader(this.$route.query.bookId, { chapter_id })
    },
  },
}
</script>
