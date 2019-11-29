<template lang="pug">
.ui-button(:class="[large?'tc':'ib']" :style="padStyle")
	button.btn-default(@click.prevent="$emit('click-event')" :class="computedBtnClass")
		span(:class="iconClass")
		| {{ txt }}
</template>
<script>
export default {
	props: {
		// icon图标样式
		iconClass: {
			type: String
		},
		// 按钮文字
		txt: {
			type: String,
			required: true
		},
		// 是否是大按钮
		large: {
			type: Boolean,
			default: false
		},
		// 设置按钮外层的水平内边距
		pad: {
			type: String,
			default: '0'
		},
		// 自定义按钮样式，动态传入
		btnClass: {
			type: String,
			default: ''
		},
		// 选中状态的按钮样式
		// 结合actived使用
		activeClass: {
			type: String
		},
		// 按钮类型
		type: {
			type: String
		},
		actived: {
			type: Boolean
		}
	},
	computed: {
		computedBtnClass () {
			let str = ''
			if (this.type) {
				str += ` btn-${this.type}`
			}
			if (this.actived) {
				str += ` ${this.activeClass}`
			}
			return  this.btnClass + str
		},
		padStyle() {
			return {
				'padding-left': this.pad,
				'padding-right': this.pad
			}
		}
	}
}
</script>
<style lang="stylus">
.ui-button.tc
	button
		width 100%
</style>