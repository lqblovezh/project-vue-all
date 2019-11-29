<template lang="pug">
.category-item.flex.f14
  router-link(target="_blank" :to="{path: 'book-detail', query: { bookId: item.id }}")
    img(:src="item.picture")
  .category-item__panel
    .category-item__head
      .name
        router-link(target="_blank" :to="{path: 'book-detail', query: { bookId: item.id }}") {{ item.book_name }}
      .actions
        router-link(tag="button" :to="{path: 'book-detail', query: { bookId: item.id }}")
          a(target="_blank") 查看详情
        button.theme-btn(@click="addToBookShelf") {{ isJoin ? '移出书房':'加入书房' }}
        //- button 分享
        button(@click="$go('/book-knowledge', { bookId: item.id, bookName: item.book_name })") 知识点
    .category-item__info
      p.ib 作者：
        span(v-if="item.auth_nationality") [{{item.auth_nationality}}]
        span {{ item.author }}
      p.ib 译者：{{ item.translator }}
    .category-item__abs.ell2 简介：{{ item.abs }}
    .category-item__knowledge 知识点：
      a.cp(
        v-for="{ id, name } in item.points"
        :key="id"
        @click="$go('/book-knowledge', { bookId: item.id, id: id, bookName: item.book_name })"
        v-len="len"
        :title="name"
      ) {{ name }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isJoin: this.item.is_book_shelf,
      len: 10,
    }
  },
  methods: {
    async addToBookShelf() {
      if (!this.$isUserLogin()) {
        return
      }
      let method = this.isJoin ? 'removeFromBookShelf' : 'addToBookShelf'
      try {
        await this.$services.book[method]({
          bookId: this.item.id,
          book_shelf_id: this.item.book_shelf_id,
        }).then(res => {
          if (res.data) {
            this.item.book_shelf_id = res.data.id
          }
        })
        this.isJoin = !this.isJoin
        this.$message({
          message: '操作成功',
          type: 'success',
        })
      } catch ({ message }) {
        this.$message({
          message: message
            .toString()
            .split(':')[1]
            .trim(),
          type: 'error',
        })
      }
    },
  },
}
</script>
<style lang="stylus">
.category-item
  padding 30px 0
  &:not(:last-child)
    border-bottom 1px solid #e9e2d1
  img
    width 117px
    height 173px
  &__panel
    margin-left 20px
    flex 1
  &__head
    display flex
    align-items flex-start
    justify-content space-between
    >.name
      font-size 18px
      > a
        color #c39f52
    .actions
      a
        color #000
      button
        margin-left 10px
        height 28px
        padding 0 10px
        background-color #f8f3e8
        border 1px solid #cab478
        border-radius 3px
        cursor pointer
        &.theme-btn
          color #fff
          background-color #009882
          border-color #267258
  &__info
    margin-top 12px
    color #737373
    >p
      margin-right 50px
  &__abs
    margin-top 10px
    line-height 2
  &__knowledge
    margin-top 10px
    >a
      display inline-block
      padding 0 10px
      height 24px
      line-height 24px
      border 1px solid #009882
      border-radius 999px
      color #009882
      margin-right 10px
</style>
