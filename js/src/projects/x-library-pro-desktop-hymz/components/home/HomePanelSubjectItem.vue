<template lang="pug">
.home-panel-subject-item.c-f.cp
  //- img(:src="item.picture" @click="$pushWithName('subject_detail', {}, {sid: item.id})")
  router-link(:to="{name: 'subject_detail', params: { sid: item.id }}" target="_blank")
    img(:src="item.picture")
    .subject-item__mask
      p.tc.title.f14 {{ item.name }}
      p.abs.f12.ell4 {{ item.abs }}
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
    return {}
  },
}
</script>
<style lang="stylus">
@media screen and (max-width: 1400px)
  .home-panel-subject-item
    width 100%
    height 149px
@media screen and (min-width: 1401px)
  .home-panel-subject-item
    width 230px
    height 180px
.home-panel-subject-item
  position relative
  &:hover
    .subject-item__mask
      width 100%
      height 100%
      p.title
        padding 10px
  >a
    position relative
    display block
    width 100%
    height 100%
    color #fff
  img
    width 100%
    height 100%
    object-fit cover
  .subject-item__mask
    position absolute
    bottom 0
    height 36px
    width 100%
    background-color rgba(0, 0, 0, 0.4)
    overflow hidden
    p.title
      height 36px
      line-height 36px
    p.abs
      padding 0 13px
      line-height 1.5
      max-height 70px
      span, .list-text
        background-color transparent !important
</style>
