<template lang="pug">
.ui-field(:class="[type ==='textarea' ? 'flex':'flex-ac']")
	.ui-field__name {{ label }}
	.ui-field__val.simple-line(v-if="type !== 'textarea'")
		input(:type="inputType" :placeholder="placeholder" :value="value" @change="handleChange($event)")
	.ui-field__val.multi-line(v-else)
		textarea(rows="5" :placeholder="placeholder" :value="value")
</template>
<script>
export default {
	name: 'ui-field',
	props: {
		label: {
			type: String,
			required: true
		},
		value: {
			type: String
		},
		placeholder: {
			type: String
		},
		maxLen: {
			type: Number,
			default: 100
		},
		type: {
			type: String
		}
	},
	computed: {
		inputType() {
			return this.type === 'password' ? 'password' : 'text'
		}
	},
	methods: {
		handleChange(e) {
			this.$emit('input', e.target.value)
		}
	}
}
</script>
<style lang="stylus">
.ui-field
	padding 0.2rem 0
	border-bottom 1px solid #ebf2f1
	font-size 0.28rem
	&__name
		width 1.5rem
		color #4d4d4d
	&__val
		position relative
		flex 1
		&.simple-line
			height 0.6rem
		input, textarea
			width 100%
			border none
			outline none
		> input
			height 100%
		> textarea
			resize none
		span
			position absolute
			right 0.2rem
			top 0.2rem
</style>