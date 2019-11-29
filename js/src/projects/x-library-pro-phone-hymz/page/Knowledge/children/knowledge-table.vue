<template lang="pug">
.knowledge-table
  .title.f15 {{ title }}
  .content.f13
    .item.ellipsis(
      v-for="item in tableList"
      :key="item.id"
      @click="view(item)"
    ) {{ item.text }}
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    title: String,
    tableType: String
  },
  computed: {
    tableList () {
      let temp = []
      if (this.list.length) {
        for (let sub of this.list) {
          let items = sub.nowledge_infos
          let { id, name, book_name } = items && items.length && items[0]
          temp.push({
            id,
            name: sub.name,
            text: `${sub.name}——《${book_name}》${name}`
          })
        }
      }
      return temp
    }
  },
  methods:{
    view ({ name }) {
      const { bookId } = this.$route.query
      this.$push('/knowledge-point/list', { query: { bookId, label: name, nType: this.tableType }})
      // $push('/knowledge-point/list', { query: {...$route.query} })
    }
  }
}
</script>
<style lang="stylus" scoped>
.knowledge-table
  margin-bottom 0.2rem
  padding 0.3rem
  background-color #fff
  .title
    margin-bottom 0.3rem
    color #2e3332
    line-height 1
  .content
    color #666666
    .item
      line-height 0.43rem
</style>
