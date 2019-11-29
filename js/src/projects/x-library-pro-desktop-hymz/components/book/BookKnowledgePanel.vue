<template lang="pug">
.book-knowledge-panel.c-bg-f
  .title {{ label }}
  ul.content.f14
    //- li.ell(v-for="item in list" @click="go(item)") {{item.name}}——《{{ item.nowledge_infos.length && item.nowledge_infos[0].book_name }}》{{ item.nowledge_infos.length && item.nowledge_infos[0].name }}
    li.ell.ib(v-for="item in list")
      router-link(:to="{path:'/indexTable/chapters',query:{bookId:$route.query.bookId,name:item.name,ntype:item.knowledge_type}}" target="_blank") {{item.name}}
</template>
<script>
export default {
  props: {
    label: {},
    list: {
      type: Array,
    },
  },
  methods: {
    go(item) {
      this.$go('/indexTable/chapters', {
        bookId: this.$route.query.bookId,
        name: item.name,
        ntype: item.knowledge_type,
      })
    },
  },
}
</script>
<style lang="stylus">
.book-knowledge-panel
  padding 16px 20px
  border-radius 5px
  box-shadow 0 0 5px rgba(0, 0, 0, 0.2)
  width 400px
  >.title
    color #c39f52
    margin-bottom 10px
  >ul
    >li
      line-height 1.8
      width 25%
      cursor pointer
</style>
