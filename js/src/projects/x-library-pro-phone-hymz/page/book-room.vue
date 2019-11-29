<template lang="pug">
.page-book-room
  v-page(title="书房" scroll-type="center" hide-back)
    .scroll-full
      .book-room.clearfix.flex
        BookRoomItem(
          v-for="i in list"
          :edit="edit"
          :item="i"
          @toggleEditMode="toggleEditMode"
          @toggleItemSelectedStatus="toggleItemSelectedStatus"
        )
        BookRoomItem
  EditFooter(
    @footer-click-event="cancel"
    :is-show="edit"
    :btns="footerBtns"
  )
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import BookRoomItem from '@/components/bookroom/BookRoomItem'
import { SET_BOOKSHELF } from '@/store/types'
export default {
  asyncData({ store, route }) {
    return store.dispatch('book/queryBookShelfList')
  },
  components: { BookRoomItem },
  computed: {
    ...mapState('book', {
      list: state => state.bookshelf_list
    }),
    selectedItems () {
      return this.list.filter(item => item.checked)
    }
  },
  data () {
    return {
      timer: null,
      edit: false,
      footerBtns: [
        { text: '取消', type: '', clickEvent: this.cancel },
        { text: '删除', type: 'error', clickEvent: this.del }
      ]
    }
  },
  methods: {
    ...mapMutations('book', {
      setBookShelfList: SET_BOOKSHELF
    }),
    cancel() {
      this.edit = false
      this.list.forEach(item => {
        if (item.checked) {
          this.$set(item, 'checked', false)
        }
      })
    },
    toggleEditMode(evt) {
      this.edit = true
    },
    toggleItemSelectedStatus(item) {
      this.$set(item, 'checked', !item.checked)
    },
    async del () {
      try {
        if (this.selectedItems.length) {
          let bookId = [], book_shelf_id = []
          this.selectedItems.forEach(item => {
            bookId.push(item.id)
            book_shelf_id.push(item.book_shelf_id)
          })
          await this.$services.book.removeFromBookShelf({ bookId, book_shelf_id })
          this.setBookShelfList(this.removeItems())
          this.edit = false
        }
      } catch(e) {
        this.$Toast('移除失败')
      }
    },
    removeItems() {
      return this.list.filter(item => {
        if (this.selectedItems.find(si => si.id === item.id)) {
          return false
        }
        return true
      })
    }
  }
}
</script>
<style lang="stylus">
.page-book-room
  .book-room
    padding 0.3rem 0.15rem
    flex-wrap wrap
</style>
