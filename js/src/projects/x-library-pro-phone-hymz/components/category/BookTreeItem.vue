<template lang="pug">
.book-tree-item
	.book-tree-item__parent(@click="read(data)")
		p(:style="{'margin-left': level * 0.26 + 'rem'}") {{ $getWhichChapter(level, idx+1) }} {{ data.name }}
	.book-tree-item__children(v-show="data.children && data.children.length")
		book-tree-item(
			v-for="(i, index) in data.children"
			:data="i"
			:level="r_level"
			:idx="index"
		)
</template>
<script>
export default {
	name: 'book-tree-item',
	props: {
		level: {
			type: Number,
			default: 0
		},
		idx: {
			type: Number,
			required: true
		},
		data: {
			type: Object,
			default: function() {
				return {}
			}
		}
	},
	computed: {
		r_level () {
			return this.level+1
		}
	},
  inject: ['read']
}
</script>
<style lang="stylus">

</style>
