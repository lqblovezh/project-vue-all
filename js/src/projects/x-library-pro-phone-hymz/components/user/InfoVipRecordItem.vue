<template lang="pug">
.vip-record-item.container.c-bg-f
	.record-item__title.flex-bs
		.record-item__title-left
			.icon-vip-diamond
			p.ib.f15.c-3 {{ data.goods }}
		.record-item__title-right {{ data.price|dolar }}
	.record-item__body.flex-bs
		.record-item__body-left.f13.c-6
			p(v-for="(val, key) of meta")
				span {{ key }}：
				span {{ val }}
		.record-item__body-right
			button.f13(v-show="data.status_type === ''") 去支付
</template>
<script>
const status_map = ['待支付', '已完成', '已关闭']
export default {
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			meta: {}
		}
	},
	mounted() {
		switch(this.data.status_type) {
			case '订单已关闭':
			case '等待支付':
				this.meta = {
					"下单时间": this.data.create_time,
					"订单状态": this.data.status_type,
					"订单编号": this.data.order
				}
				break
			case '支付完成':
				this.meta = {
					"会员生效时间": this.data.effective_time,
					"下单时间": this.data.create_time,
					"会员到期时间": this.data.expire_date,
					"支付状态": this.data.status_type,
					"支付方式": this.data.pay_method,
					"订单编号": this.data.order
				}
				break
		}
	},
	filters: {
		dolar(val) {
			return `￥${val.toFixed(2)}`
		}
	}
}
</script>
<style lang="stylus">
.vip-record-item
	margin-bottom 0.2rem
	.record-item__title
		height 0.9rem
		border-bottom 1px dashed #d2d9d8
		&-left
			p
				margin-left 0.25rem
		&-right
			color #ddae5e
	.record-item__body
		&-left
			padding 0.2rem 0
			p
				line-height 2
		button
			width 1.5rem
			height 0.56rem
			border-radius 999px
			color #5f3702
			background linear-gradient(to right, #f1d29e, #ecc78c, #e7bc79)
</style>
