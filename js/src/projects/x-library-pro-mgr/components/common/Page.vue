<script>
export default {
  props:[
    'page',
    'page-sizes',
    'layout',
  ]
}
</script>

<template lang="pug">
  .gruopList
    el-pagination( :small="false" background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.num"
      :page-sizes="[10, 50, 100]"
      :page-size="page.offset"
      layout="total, sizes,prev, pager, next, jumper"
      :total="page.total")
</template>

<style lang="stylus" scoped>

</style>
