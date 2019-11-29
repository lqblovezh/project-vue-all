<template lang="pug">
.vip-pay-method.c-bg-f
	.vip-pay__title.c-3 选择支付方式
	.vip-pay__list.container
		.vip-pay__item.flex-bs(v-for="{ label, name, icon} in methods")
			.vip-pay__item-left.flex-ac
				div(:class="['icon-'+icon]")
				p {{ label }}
			.vip-pay__item-right
				input.dn(type="radio" :value="name" :checked="value === name" name="methods" :id="name" @click="doThis(name)" )
				label(:for="name")
</template>
<script>
export default {
	props: {
		value: String
	},
	data () {
		return {
			methods: [
				{ label: '支付宝支付', name: 'alipay', icon: 'alipay' },
				{ label: '微信支付', name: 'wechat', icon: 'WeChatpay'}
			]
		}
	},
	methods: {
		doThis(name) {
			this.$emit('input', name)
		}
	}
}
</script>
<style lang="stylus">
.vip-pay-method
	.vip-pay__item
		padding-bottom 0.38rem
		&-left
			p
				margin-left 0.22rem
		&-right
			label
				position relative
				display inline-block
				width 0.3rem
				height 0.3rem
				background-color red
				background-color #fff
				border 0.01rem solid #dae0df
				border-radius 50%
			input[type="radio"]:checked + label
				border-color transparent
				background radial-gradient(#f1d29e, #ecc78c, #e7bc79)
				&:after
					content ''
					position absolute
					top 50%
					left 50%
					transform translate(-50%, -50%)
					display inline-block
					width 0.1rem
					height 0.1rem
					border-radius 50%
					background-color #fff
</style>
