<script>
import Tree from './tree'

export default {
  components: {
    Tree,
  },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
  },
  methods: {},
  watch: {
    $route(to, from) {
      if (to.fullPath != from.fullPath) {
        this.$refs.tree.getList()
      }
    },
  },
}
</script>

<template lang="pug">
div
	.content
		Tree(ref="tree")
</template>


<style lang="stylus" scoped>
.content
  background #fff
</style>
