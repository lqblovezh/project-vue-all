<template lang="pug">
.book-knowledge-chart
  .chart(
    ref="wrapper"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  )
  .right
    BookKnowledgePanel(label="人名表" :list="person" v-show="person && person.length")
    BookKnowledgePanel(label="地名表" :list="address" v-show="address && address.length")
</template>
<script>
import echarts from 'echarts'
import BookKnowledgePanel from './BookKnowledgePanel'
import { mapState, mapActions } from 'vuex'
export default {
  components: { BookKnowledgePanel },
  props: {
    value: String,
  },
  computed: {
    ...mapState('book', {
      info: state => state.book_knowledge_list.info,
      person: state => state.book_knowledge_list.person,
      address: state => state.book_knowledge_list.address,
    }),
  },
  data() {
    return {
      ids: {
        id: '',
        bookId: '',
      },
      loading: true,
    }
  },
  mounted() {
    this.queryBookKnowledge({ ...this.$route.query }).then(() => {
      this.loading = true
      this.init()
    })
  },
  methods: {
    ...mapActions('knowledge', ['queryRelatedChapter']),
    ...mapActions('book', ['queryBookKnowledge']),
    init() {
      this.wrapper = this.$refs.wrapper
      this.$nextTick(() => {
        let myChart = echarts.init(this.wrapper, null)
        const { categories, data, links } = this.info
        let option = {
          color: [
            '#f98866',
            '#90afc5',
            '#505160',
            '#66a5ad',
            '#98dbc6',
            '#34675c',
            '#2e4600',
            '#4cb5f5',
            '#f4cc70',
            '#75b1a9',
            '#34888c',
            '#626d71',
            '#a1be95',
            '#c1e1dc',
            '#F4ec6a',
            '#cb6318',
            '#A10115',
            '#D8412f',
            '#89da59',
            '#598234',
          ],
          title: {},
          tooltip: {},
          animation: false,
          series: [
            {
              name: '',
              type: 'graph',
              layout: 'force',
              data,
              links,
              categories,
              roam: true,
              label: {
                show: true,
                color: '#000',
                position: 'right',
              },
              force: {
                repulsion: 150,
              },
            },
          ],
        }
        myChart.setOption(option)
        myChart.on('click', params => {
          const {
            data: { name, k_id: _id },
          } = params
          if (!_id || !name) {
            return
          }
          const { bookId } = this.$route.query
          this.$emit('input', name)
          this.ids = {
            id: _id,
            bookId,
          }
          this.queryRelatedChapter({
            ...this.ids,
            name,
            offset: 2,
            clean: true,
          })
        })
      })
    },
  },
}
</script>
<style lang="stylus">
.book-knowledge-chart
  height 487px
  background-color #f5f1e6
  position relative
  .chart
    padding-right 400px
    height 100%
  >.right
    position absolute
    right 0
    top 0
    >div
      margin-bottom 20px
      box-sizing border-box
</style>
