<template lang="pug">
.subject-aside-item.cp(@click="$pushWithName('subject_detail', {}, { sid: item.id })")
  .subject-aside-item__img.pr
    img(:src="item.picture")
    .icon-subject-tag.tc.c-f.pa.f14
  .name {{ item.bookname }}
  .abs.ell2.f14 {{ item.abs }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="stylus">
.subject-aside-item
  margin-bottom 33px
  &__img
    .icon-subject-tag
      left 0
      top 0
      line-height 30px
  img
    width 100%
    height 130px
    box-shadow 0 2px 3px rgba(0,0,0,.2)
  >.name
    margin 15px 0
    color #c39f52
  >.abs
    color #878787
    line-height 1.5
</style>
