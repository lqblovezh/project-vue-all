<template lang="pug">
.book-detail-info.flex-bs.f14
  Reader(
    :readerDialog.sync="readerDialog"
    :readerId="readerId"
    version="draft"
    v-if="readerDialog"
  )
  img(:src="info.img")
  .info-panel
    .title {{ info.bookname }}
    .info-panel__tr.flex
      p 作者：
        span(v-if="info.auth_nationality") [{{info.auth_nationality}}]
        span {{ info.author }}
      p 译者：{{ info.translator }}
    .info-panel__tr.flex
      p ISBN: {{ info.publishInfo && info.publishInfo.ISBN }}
      p 版本：{{ info.publishInfo && info.publishInfo.version }}
    .info-panel__tr.flex
      p 出版社：{{ info.publishInfo && info.publishInfo.publisher }}
      p 出版年代：{{ info.publish_year }}
    .info-panel__tr.flex
      p 所属丛书：{{ info.publishInfo && info.publishInfo.own_book }}
    .info-panel__tr 知识点：
      router-link.ib.btn__knowledge(
        v-for="point in info.points"
        :to="{path: '/knowledge/chapters', query: { bookId: info.id, name: point.name }}"
        :key="point.id"
        target="_blank"
      ) {{ point&&point.name }}
      //- a.ib.btn__knowledge(
      //-   v-for="point in info.points"
      //-   @click="$go('/knowledge/chapters', { bookId: info.id, name: point.name })"
      //- ) {{ point&&point.name }}
    .info-panel__tr
      button.btn__theme(@click="goRead(info.id)") 进入阅读
      button.btn__sub-theme(@click="addToBookShelf") {{ isJoin?'移出书房':'加入书房' }}
      //- button.btn__sub-theme(@click="share") 分享
      router-link.btn__sub-theme(
        :to="{path: '/book-knowledge', query: { bookId: $route.query.bookId, bookName: info.bookname }}"
        target="_blank"
      ) 知识点
      //- button.btn__sub-theme(@click="$go('/book-knowledge', { bookId: $route.query.bookId, bookName: info.bookname })") 知识点
</template>
<script>
import { mapState } from 'vuex'
import { ReaderMixins } from '@/utils/mixins'

export default {
  mixins: [ReaderMixins],
  computed: {
    ...mapState('book', {
      info: state => state.info,
    }),
  },
  data() {
    return {
      isJoin: false,
    }
  },
  mounted() {
    console.log(this.info, 1111)
  },
  watch: {
    info: {
      handler() {
        if (this.info) {
          this.isJoin = this.info.book_shelf
        }
      },
      immediate: true,
    },
  },
  methods: {
    async addToBookShelf() {
      if (!this.$isUserLogin()) {
        return
      }
      let method = this.isJoin ? 'removeFromBookShelf' : 'addToBookShelf'
      try {
        await this.$services.book[method]({
          bookId: this.info.id,
          book_shelf_id: this.info.book_shelf_id,
        }).then(res => {
          if (res.data) {
            this.info.book_shelf_id = res.data.id
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
    goRead(id) {
      this.goReader(id)
    },
    comment() {
      if (!this.$isUserLogin()) {
        return
      }
      this.$emit('toggle-dialog', true)
    },
    share() {},
  },
}
</script>
<style lang="stylus">
.book-detail-info
  padding 30px 0
  border-bottom 1px solid #e9e2d1
  img
    width 180px
    height 263px
    box-shadow 0 0 3px rgba(0, 0, 0, 0.2)
  >.info-panel
    flex 1
    margin-left 30px
    >.title
      padding 15px 0
      font-size 18px
      color #c39f52
    .info-panel__tr
      padding 9px 0
      p
        flex 1
      >a
        margin-right 10px
        padding 0 11px
        height 24px
        line-height 24px
        cursor pointer
      >button, a
        margin-right 10px
        padding 0 10px
        height 30px
        line-height 30px
        cursor pointer
        display inline-block
</style>
