<template lang="pug">
.form-control.flex-ac
	.form-control__left(v-show="iconClass" :class="leftClass")
	input.c-9.f15(
		ref="input"
		:type="inputType"
		:placeholder="placeholder"
		v-model="val"
		@change="$emit('input', $refs.input.value)"
	)
	.form-control__right
		button.btn-send.c-6.f13(v-if="type === 'message-code'" @click.prevent="$emit('click-event')") {{ btnTxt }}
		img(v-else-if="type === 'img-code'" :src="imgSrc" @click="$emit('click-event')")
		.icon(v-else-if="type === 'password'" @click="canYouSee" :class="[inputType === 'password' ? 'icon-eye-close' : 'icon-eye-open']")
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			default: 'text'
		},
		value: {
			type: String
		},
		iconClass: {
			type: String
		},
		placeholder: {
			type: String
		},
		imgSrc: {
			type: String
		},
		// 发送验证码按钮文字
		btnTxt: {
			type: String
		}
	},
	computed: {
		leftClass() {
			return `icon-${this.iconClass ? this.iconClass : ''}`
		}
	},
	data() {
		return {
			inputType: this.type,
			val: this.value
		}
	},
	methods: {
		canYouSee() {
			this.inputType = this.inputType === 'password' ? 'text' : 'password'
			this.val = this.value
		}
	}
}
</script>
<style lang="stylus">
.form-control
	height 1.09rem
	border-bottom 1px solid #dcdcdc
	&__left
		width 0.8rem
	&__right
		margin-right 0.28rem
		>.btn-send
			max-width 2rem
			width auto
			color #fff
			background-color #009882
			border-radius 5px
		>img
			width 1.5rem
			height 0.7rem
	>input
		flex 1
		border none
		outline none
</style>
