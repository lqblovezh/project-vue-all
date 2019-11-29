<template lang="pug">
.catalogue-list
	.catalogue-list__item(v-for="i in data")
		.catalogue-list__title {{ i.name }}
		div.p20(v-if="i.children && i.children.length")
			bookDetailCatalogue(:data="i.children")
</template>
<script>
export default {
	name: 'bookDetailCatalogue',
	props: {
		data: {
			type: Array,
		}
	}
}
</script>
<style lang="stylus">

</style>