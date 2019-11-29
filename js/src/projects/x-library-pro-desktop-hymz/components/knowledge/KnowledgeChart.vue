<template lang="pug">
.knowledge-chart.c-bg-f
  .knowledge-chart__head.flex-bs
    .name 知识点-汉译名著
    .deep-num.f14 深度：
      el-select(
        v-model="deepNum"
        @change="updateChartData"
      )
        el-option(label="1" value="1")
        el-option(label="2" value="2")
        el-option(label="3" value="3")
  .pr
    .knowledge-chart__body(
      ref="wrapper"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    )
    .knowledge-chart__tips.pa.c-bg-f.f14(v-show="tipStatus")
      .p20
        .tips-title.flex-bs
          p.title 知识点：
            span {{ name }}
          .icon-close.cp(@click="hideTips")
        KnowledgeChartItem(
          v-for="i in list"
          :item="i"
          :key="i.id"
        )
      //- .tips-foot.tc.c-theme.cp(@click="getMore")
      .tips-foot.tc.c-theme.cp
        router-link(:to="{path: '/knowledge/chapters', query: { ...ids, name: name }}" target="_blank") 查看全部&gt;&gt;
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { isEmptyObject } from '@/utils/helpers'
import echarts from 'echarts'
import KnowledgeChartItem from './KnowledgeChartItem'

export default {
  components: { KnowledgeChartItem },
  props: {
    pointId: String,
  },
  computed: {
    ...mapState('knowledge', {
      info: state => state.info,
      list: state => state.konwledge_chapter_list,
    }),
  },
  data() {
    return {
      deepNum: 1,
      name: '',
      ids: {
        id: '',
        bookId: '',
      },
      tipStatus: false,
      myChart: null,
      loading: true,
    }
  },
  mounted() {
    this.queryKnowLedgeInfo({
      ...this.$route.query,
      category_id: this.pointId,
    }).then(() => {
      this.loading = false
      this.init()
    })
  },
  methods: {
    ...mapActions('knowledge', ['queryRelatedChapter', 'queryKnowLedgeInfo']),
    init() {
      this.wrapper = this.$refs.wrapper
      if (this.$isServer) {
        return
      }
      this.$nextTick(() => {
        this.myChart = echarts.init(this.wrapper, null)
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
          legend: [
            {
              // selectedMode: 'single',
              data: categories.map(a => a.name),
            },
          ],
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
                // fontSize: 12,
                // normal: {
                //   position: 'right',
                // },
              },
              force: {
                repulsion: 100,
              },
            },
          ],
        }
        this.myChart.setOption(option)
        this.myChart.on('click', params => {
          const {
            data: { name, k_id: _id },
          } = params
          if (!_id || (this.ids.id === _id && this.tipStatus)) {
            return
          }
          const { bookId } = this.$route.query
          this.name = name
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
          this.tipStatus = true
        })
      })
    },
    getMore() {
      this.$go('/knowledge/chapters', { ...this.ids, name: this.name })
    },
    hideTips() {
      this.tipStatus = false
    },
    getPrevSelectData(idx, data) {
      if (typeof idx !== 'undefined') {
        let { name, cid, category } = data[idx]
        data[idx] = { name, cid, category }
      }
      return data
    },
    modifyChartData(oldId) {
      let itemStyle = {
        color: '#009882',
        borderColor: '#FFF',
        borderWidth: 3,
      }
      let option = this.myChart.getOption(),
        data = option.series[0].data,
        prev_index,
        cur_index
      for (let i = 0; i < data.length; i++) {
        if (data[i].cid === this.pointId) {
          cur_index = i
        }
        if (data[i].cid === oldId) {
          prev_index = i
        }
        if (
          typeof prev_index !== 'undefined' &&
          typeof cur_index !== 'undefined'
        ) {
          break
        }
      }
      data[cur_index] = { ...data[cur_index], itemStyle }
      data = this.getPrevSelectData(prev_index, data)
      // debugger
      option.series[0].data = data
      this.myChart.setOption(option)
    },
    updateChartData({ category_id, depth } = {}) {
      this.queryKnowLedgeInfo({
        category_id: category_id || this.pointId,
        depth: this.deepNum,
      }).then(res => {
        if (isEmptyObject(this.info)) {
          this.myChart.clear()
        } else {
          this.init()
        }
      })
    },
  },
  watch: {
    pointId: {
      handler(newVal, oldVal) {
        this.deepNum = 1
        this.updateChartData({ category_id: newVal })
      },
    },
  },
}
</script>
<style lang="stylus">
.knowledge-chart
  margin-top 10px
  padding 10px 20px 20px
  border 1px solid #d5ccb2
  border-radius 3px
  &__head
    .name
      font-size 18px
      color #c79846
    .deep-num
      color #878787
  .el-select
    .el-input
      width 70px
      >input
        border none
  &__body
    height 616px
    margin-top 22px
    background-color #f5f1e6
  &__tips
    width 340px
    // height 100px
    right 66px
    bottom 42px
    box-shadow 0 0 5px rgba(0, 0, 0, 0.3)
    border-radius 5px
    .title
      color #737373
      >span
        color #f00
    .tips-foot
      height 46px
      line-height 46px
      background-color #e8e1cf
</style>
