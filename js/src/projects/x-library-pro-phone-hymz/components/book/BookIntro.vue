<template lang="pug">
.book-intro.container.book-panel
  .book-panel__title
    .name 简介
  .book-panel__body.c-6.f13
    .content(:class="{'ellipsis-4': isExceedLine && !showAll }") {{ abs }}
    .tc(v-show="isExceedLine" @click="showAll = !showAll")
      .icon-expand(:class="{r180: showAll}")
  ui-cell(label="目录" icon-class="chapter" type="jump" :to="path" is-link)
</template>
<script>
export default {
  props: {
    abs: {
      type: String,
      required: true,
      default: ''
    },
    id: String
  },
  computed: {
    path() {
      return `book-detail/catalog?bookId=${this.id}`
    }
  },
  data () {
    return {
      isExceedLine: false,
      showAll: false,
      line: 4
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.judgeLine()
    })
  },
  methods: {
    judgeLine() {
      try {
        if (!this.$isServer) {
          const el = this.$refs.intro,
                totalHeight = el.offsetHeight - 10, // 总的高度
                lineHeight = parseFloat(window.getComputedStyle(el)['line-height']) // 单行高度
          this.isExceedLine = totalHeight / lineHeight > this.line ? true : false
        }
      } catch(e) {}
    }
  }
}
</script>
<style lang="stylus">
.book-intro
  margin-bottom 0.2rem
  &__info
    line-height 1.5
    padding-top 10px
  >.ui-cell
    height 0.87rem
    padding 0
  .book-panel__body
    .tc
      padding-top 0.2rem
</style>
