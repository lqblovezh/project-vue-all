<template lang="pug">
.subject-item
  router-link.flex-bs(:to="{name: 'subject_detail', params: {sid: item.id }}" target="_blank")
    .subject-item__img.cp
      .icon-subject-tag
      img.fl(:src="item.picture")
    .subject-item__info.f14
      .title {{ item.name }}
      p 专题简介：
      p.abs.ell3(v-html="item.content.replace(/<[^>]+>/g, '')")
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    viewSubjectDetail() {
      this.$pushWithName('subject_detail', null, { sid: this.item.id })
    }
  }
}
</script>
<style lang="stylus">
.subject-item
  padding 30px 0
  align-items flex-start
  &:not(:last-child)
    border-bottom 1px solid #e9e2d1
  &__img
    position relative
    .icon-subject-tag
      position absolute
      left 0
      top 0
  img
    width 196px
    height 168px
    object-fit cover
    box-shadow 0 2px 4px rgba(0,0,0,.1)
  &__info
    flex 1
    margin-left 30px
    color #737373
    line-height 1.7
    >.title
      margin-bottom 24px
      font-size 18px
      color #c39f52
    .abs
      color #888888
</style>
