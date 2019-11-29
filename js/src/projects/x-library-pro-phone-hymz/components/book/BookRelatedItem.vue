<template lang="pug">
.book-related-item
	img(:src="item.picture")
	p.ellipsis.c-6.f12 {{ item.book_name }}
	p.ellipsis.f11 {{ item.author }}
</template>
<script>
export default {
  props: {
    item: {}
  }
}
</script>
<style lang="stylus">
.book-related-item
  img
    width 100%
    height 2.96rem
</style>