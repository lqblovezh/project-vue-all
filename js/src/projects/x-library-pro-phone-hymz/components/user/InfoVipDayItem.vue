<template lang="pug">
.vip-day-item.flex-tc(:class="{active: data.checked }" @click="$emit('select', data)")
  .tc
    label.f14.c-3 {{ data.time }}天
    p
      span.f16 ￥
      |{{ data.price }}
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="stylus">
.vip-day-item
  display inline-flex
  width 2rem
  height 1.8rem
  border-radius 5px
  align-items center
  border 1px solid #dae0df
  margin-right 0.2rem
  label
    display inline-block
    margin-bottom 0.3rem
  &.active
    background-color #fef2dd
    border-color #d9b16b
  &:first-child
    margin-left 0.3rem
  &:last-child
    margin-right 0.3rem
  p
    font-size 27px
    color #cc9b44
    line-height 1
    >span
      color #cd9d47
</style>
