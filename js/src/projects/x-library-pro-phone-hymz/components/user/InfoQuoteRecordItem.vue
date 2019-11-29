<template lang="pug">
.info-quote-record-item.flex-ac.c-bg-f(:class="{active: item.checked}" @click="handleClick")
  .nc-checkbox(v-show="editMode")
    input.nc-checkbox-input(type="checkbox" :checked="item.checked")
    .nc-checkbox-core
  .quote-record__main
    .quote-record__title.c-font-main.flex-bs
      .quote-record__title-left.f14 {{ item.book_name }}
      .icon-copy(@click.stop="copyText")
    .quote-record__text.f13.l15 {{ item.content }}
    .quote-record__body.pr.f13.l15
      .content 引自：{{ item.chapterName }}
      .author 作者：{{ item.author }}
      .chapter
</template>
<script>
import copy from 'copy-to-clipboard'
export default {
  props: {
    value: {},
    idx: {},
    item: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick() {
      if (!this.editMode) {
        // alert('click view page')
        console.log('click')
      } else {
        this.$emit('toggleItemSelectedStatus', this.item)
      }
    },
    copyText() {
      const { content, book_name, chapterName } = this.item
      copy(`${content}——${book_name}，${chapterName}`)
      this.$Toast({
        message: '复制成功',
        duration: 1000,
        position: 'top'
      })
    }
  }
}
</script>
<style lang="stylus">
.info-quote-record-item
  padding 0.3rem
  .quote-record__main
    border-bottom 1px solid #ebf2f1
    .quote-record__title,
    .quote-record__text
      margin-bottom 0.2rem
    .quote-record__body
      margin-bottom 0.3rem
      padding 0.3rem 0.2rem
      line-height 1.5
      background-color #f5faf9
    >.l15
      line-height 1.5
</style>
