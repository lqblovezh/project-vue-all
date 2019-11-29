<template lang="pug">
.ui-cell(@click="enterToOtherPage")
	.flex-bs
		.ui-cell__left.flex-ac.c-font-main
			span(:class="'icon-'+ iconClass" v-if="iconClass")
			p {{ label }}
		.ui-cell__right.flex-ac
			input(type="text" ref="input" :value="value" v-if="editable && edit" @change="$emit('change-name', $refs.input.value)" @blur="edit = !edit")
			.ui-cell__val(v-else-if="type !== 'img'" @click.stop="chooseOneEvent") {{ value }}
			.ui-cell__val(v-else)
				slot
			.icon-enter(v-if="isLink")
</template>
<script>
export default {
	name: 'ui-cell',
	props: {
		// 左值
		label: {
			type: String,
			required: true
		},
		// 右值 
		value: {
			type: [String, Date]
		},
		// cell类型
		type: {
			type: String
		},
		// 是否显示进入图标
		isLink: {
			type: Boolean
		},
		// 跳转的路径
		to: {
			type: String
		},
		// 图标样式
		iconClass: {
			type: String
		},
		editable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			edit: false
		}
	},
	methods: {
		chooseOneEvent() {
			if (this.editable) {
				this.edit = true
				this.$nextTick(() => {
					this.$refs.input.focus()
				})
			}
			this.$emit('click-event')
		},
		enterToOtherPage() {
			this.$emit('search-event')
			if (this.type === 'jump' && this.to) {
				this.$go(this.to)
			}
		}
	}
}
</script>
<style lang="stylus">
.ui-cell
	padding 0 0.3rem
	>div
		height 100%
		.ui-cell__left
			span
				margin-right 0.2rem
		.ui-cell__right
			.icon-enter
				margin-left 0.2rem
			input
				height 0.6rem
				width 2rem
	img
		margin-right 0.2rem
		width 0.9rem
		height 0.9rem
		border-radius 50%
</style>
