<script>
export default {
  props: {
    background: {
      default: true,
    },
    layout: {
      default: 'prev, pager, next, total',
    },
    total: {
      default: 0,
    },
    pageOffset: {
      default: 1,
    },
    pageNum: {
      default: 1,
    },
  },
  methods: {
    currentChange(page) {
      this.$emit('currentChange', page)
    },
  },
  created() {
    // console.log(this.$props, 1111111)
  },
  data() {
    return {}
  },
  computed: {
    newProps() {
      return {
        background: true,
        layout: 'prev, pager, next, total',
        total: 1000,
      }
    },
  },
}
</script>
<template lang="pug">
.comp-page.tc
  el-pagination(@current-change="currentChange" background :layout="layout" :currentPage="pageNum" :pageSize="pageOffset" :total="total")
</template>

<style lang="stylus">
.comp-page
  padding 40px 0
</style>
