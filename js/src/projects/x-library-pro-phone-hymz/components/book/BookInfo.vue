<template lang="pug">
.book-detail-info.container.f12.book-panel
  .book-panel__title
    .name 出版信息
  p.c-6 出版社：
    span.c-9 {{ info.publisher }}
  p.c-6 ISBN：
    span.c-9 {{ info.ISBN }}
  p.c-6 版本：
    span.c-9 {{ info.version }}
  p.c-6 所属丛书：
    span.c-9 {{ info.own_book }}
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>
<style lang="stylus">
.book-detail-info
  padding-bottom 0.3rem
  margin-top 0.2rem
  p
    line-height 1.5
</style>
