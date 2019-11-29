<template lang="pug">
.knowledge-chart(ref="wrapper")
</template>
<script>
import echarts from 'echarts'
import { mapState, mapActions } from 'vuex'
export default {
	computed: {
		...mapState('knowledge', {
			knowledgeInfo: state => state.info
		}),
		...mapState('book', {
			info: state => state.book_knowledge_list.info
		})
	},
	mounted() {
		const { type } = this.$route.query
		let method = type === 'all' ? 'queryKnowLedgeInfo' : 'queryBookKnowledge'
		this[method]({ ...this.$route.query }).then(() => {
			this.init()
		})
	},
	methods: {
		...mapActions('knowledge', ['queryKnowLedgeInfo']),
		...mapActions('book', ['queryBookKnowledge']),
		init() {
			this.wrapper = this.$refs.wrapper
			this.$nextTick(() => {
				let myChart = echarts.init(this.wrapper)
				const { type } = this.$route.query
				let temp = type === 'all' ? this.knowledgeInfo:this.info
        if (!temp) {return}
        const { categories, data, links } = temp
				let option = {
					title: {
						text: ''
					},
					// animation: false,
					series: [
						{
							name: '',
							type: 'graph',
							layout: 'force',
							symbolSize: 15,
							data,
							links,
              categories,
              roam: true,
							label: {
                show: true,
                normal: {
                  position: 'right'
                }
              },
							force: {
								// 节点之间的斥力因子
                repulsion: 100,
                // edgeLength: 100
              }
						},
					]
				}
				myChart.setOption(option)
				myChart.on('click', item => {
					const { data: { k_id, name } } = item
					if (k_id) {
						this.$replaceWithPath('knowledge-point', { query: { ...this.$route.query, id: k_id, label: name }})
					}
				})
			})
		}
	}
}
</script>
<style lang="stylus">
.knowledge-chart
	margin-bottom 0.2rem
	height 5.84rem
	background-color #FFF
</style>
