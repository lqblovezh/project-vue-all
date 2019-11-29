<template lang="pug">
.home-panel
  .panel-head.clearfix
    .panel-head__left.fl.flex-ac
      div(:class="'icon-'+icon")
      span {{ label }}
    .panel-head__right.fr.f14.cp(@click="$push(path)") 更多
      .icon-more
  .c-bg-f
    slot
</template>
<script>
export default {
  props: {
    icon: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="stylus">
.home-panel
  border 1px solid #dbceb0
  .panel-head
    padding 0 22px
    height 34px
    line-height 34px
    background-color #ede6d5
    &__left
      color #c39f52
      font-weight bold
      >div
        margin-right 10px
    &__right
      color #827667
      >div
        margin-left 10px
</style>
