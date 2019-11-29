<template lang="pug">
.list-wrapper(ref="wrapper")
	.scroll-content
		div(ref="listWrapper")
			slot
				ul.list-content
					li.list-item(@click="clickItem($event, item)" v-for="item in 30") {{ item }}
		slot(
			name="pullup"
			:pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad"
		)
			.pullup-wrapper(v-if="pullUpLoad")
				.before-trigger(v-if="!isPullUpLoad")
					span {{ pullUpTxt }}
				.after-trigger(v-else)
					cube-loading
	slot(
		name="pulldown" :pullDownRefresh="pullDownRefresh" :pullDownStyle="pullDownStyle" :beforePullDown="beforePullDown" :isPullingDown="isPullingDown" :bubbleY="bubbleY"
	)
		.pulldown-wrapper(
			ref="pulldown"
			:style="pullDownStyle" v-if="pullDownRefresh"
		)
			.before-trigger(v-if="beforePullDown")
				Bubble
			.after-trigger(v-else)
				.loading(v-if="isPullingDown")
					cube-loading
				div(v-else)
					span {{ refreshTxt }}
</template>
<script>
import BScroll from 'better-scroll'
import Bubble from './Bubble'
import { getRect } from '@/common/js/base'
const COMPONENT_NAME = 'vui-scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'
const DEFAULT_REFRESH_TXT = '刷新成功'
const DEFAULT_MORE_TXT = '加载更多'
const DEFAULT_NO_MORE_TXT = '加载完毕'
export default {
	name: COMPONENT_NAME,
	components: { Bubble },
	props: {
		data: {
			type: Array,
			default: function() {
				return []
			}
		},
		/**
		 * 1 屏幕滑动超过一定时间派发scroll事件
		 * 2 屏幕滑动过程中实时派发scroll事件
		 * 3 不仅屏幕滑动，momentum滚动动画运行过程中实时派发scroll事件
		 */
		probeType: {
			type: Number,
			default: 1
		},
		click: {
			type: Boolean,
			default: true
		},
		listenScroll: {
			type: Boolean,
			default: false
		},
		listenBeforeScroll: {
			type: Boolean,
			default: false
		},
		listenScrollEnd: {
			type: Boolean,
			default: false
		},
		direction: {
			type: String,
			default: DIRECTION_V
		},
		scrollbar: {
			type: null,
			default: false
		},
		pullDownRefresh: {
			type: null,
			default: false
		},
		pullUpLoad: {
			type: null,
			default: false
		},
		refreshDelay: {
			type: Number,
			default: 20
		},
		freeScroll: {
			type: Boolean,
			default: false
		},
		bounce: {
			default: true
		},
		zoom: {
			default: false
		},
		// 初始化时先禁用scroll的滚动
		initDisable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			beforePullDown: true,
			isRebounding: false,
			isPullingDown: false,
			isPullUpLoad: false,
			pullUpDirty: true,
			pullDownStyle: '',
			bubbleY: 0
		}
	},
	computed: {
		pullUpTxt() {
			const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) || DEFAULT_MORE_TXT
			const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore) || DEFAULT_NO_MORE_TXT
			return this.pullUpDirty ? moreTxt : noMoreTxt
		},
		refreshTxt() {
			return (this.pullDownRefresh && this.pullDownRefresh.txt) || DEFAULT_REFRESH_TXT
		}
	},
	created() {
		this.pullDownInitTop = -30
	},
	mounted() {
		setTimeout(() => {
			this.initScroll()
		}, 20)
	},
	destroyed() {
		this.$refs.scroll && this.$refs.scroll.destory()
	},
	methods: {
		initScroll() {
			if (!this.$refs.wrapper) {
				return
			}
			if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
				this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
			}
			let options = {
				probeType: this.probeType,
				click: this.click,
				scrollY: this.freeScroll || this.direction === DIRECTION_V,
				scrollX: this.freeScroll || this.direction === DIRECTION_H,
				scrollbar: this.scrollbar,
				pullDownRefresh: this.pullDownRefresh,
				pullUpLoad: this.pullUpLoad,
				freeScroll: this.freeScroll,
				bounce: this.bounce,
				zoom: this.zoom
			}
			this.scroll = new BScroll(this.$refs.wrapper, options)
			if (this.initDisable) {
				this.disable()
			}
			if (this.listenScroll) {
				this.scroll.on('scroll', pos => {
					this.$emit('scroll', pos)
				})
			}
			if (this.listenScrollEnd) {
				this.scroll.on('scrollEnd', pos => {
					this.$emit('scroll-end', pos)
				})
			}
			if (this.listenBeforeScroll) {
				this.scroll.on('beforeScroll', () => {
					this.$emit('beforeScrollStart')
				})
				this.scroll.on('scrollStart', () => {
					this.$emit('scroll-start')
				})
			}
			if (this.pullDownRefresh) {
				console.log('init pull down')
				this._initPullDownRefresh()
			}
			if (this.pullUpLoad) {
				this._initPullUpLoad()
			}
		},
		disable() {
			console.log('disable')
			this.scroll && this.scroll.disable()
		},
		enable() {
			this.scroll && this.scroll.enable()
		},
		refresh() {
			this.scroll && this.scroll.refresh()
		},
		scrollTo() {
			this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
		},
		autoPullDownRefresh() {
			this.scroll && this.scroll.autoPullDownRefresh()
		},
		scrollToElement() {
			this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
		},
		clickItem(e, item) {
			this.$emit('click', item)
		},
		destroy() {
			this.scroll.destroy()
		},
		forceUpdate(dirty = false) {
			if (this.pullDownRefresh && this.isPullingDown) {
				this.isPullingDown = false
				this._reboundPullDown().then(() => {
					this._afterPullDown(dirty)
				})
			} else if (this.pullUpLoad && this.isPullUpLoad) {
				this.isPullUpLoad = false
				this.scroll.finishPullUp()
				this.pullUpDirty = dirty
				dirty && this.refresh()
			} else {
				dirty && this.refresh()
			}
		},
		_initPullDownRefresh() {
			this.scroll.on('pullingDown', () => {
				this.beforePullDown = false
				this.isPullingDown = true
				this.$emit('pullingDown')
			})
			this.scroll.on('scroll', pos => {
				if (!this.pullDownRefresh) {
					return
				}
				if (this.beforePullDown) {
					this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
					this.pullDownStyle = `top: ${Math.min(pos.y + this.pullDownInitTop, 10)}px`
				} else {
					this.bubbleY = 0
				}
				if (this.isRebounding) {
					this.pullDownStyle = `top: ${10 - (this.pullDownRefresh.stop - pos.y)}px`
				}
			})
		},
		_initPullUpLoad() {
			this.scroll.on('pullingUp', () => {
				this.isPullUpLoad = true
				this.$emit('pullingUp')
			})
		},
		_reboundPullDown() {
			const { stopTime = 600 } = this.pullDownRefresh
			return new Promise(resolve => {
				setTimeout(() => {
					console.log('end rebound pull down')
					this.isRebounding = true
					this.scroll.finishPullDown()
					resolve()
				}, stopTime)
			})
		},
		_afterPullDown() {
			setTimeout(() => {
				this.pullDownStyle = `top: ${this.pullDownInitTop}px`
				this.beforePullDown = true
				this.isRebounding = false
				this.refresh()
			}, this.scroll.options.bounceTime)
		}
	},
	watch: {
		data() {
			setTimeout(() => {
				this.forceUpdate(true)
			}, this.refreshDelay)
		}
	}
}
</script>
<style lang="stylus">
.list-wrapper
	position relative
	height 100%
	overflow hidden
	background #fff
	.scroll-content
		position relative
		z-index 1
	.list-content
		position relative
		z-index 10
		background #fff
		.list-item
			height 60px
			line-height 60px
			font-size 18px
			padding-left 20px
			border-bottom 1px solid #e5e5e5
	.pulldown-wrapper
		position absolute
		width 100%
		left 0
		display flex
		justify-content center
		align-items center
		transtion all
		.after-trigger
			margin-top 10px
	.pullup-wrapper
		width 100%
		display flex
		justify-content center
		align-items center
		padding 16px 0
</style>