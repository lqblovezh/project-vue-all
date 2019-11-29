<template lang="pug">
transition(name="fade-in")
  .tan-overlay(@touchmove.prevent @click="hide" v-show="value")
    transition(:name="transName")
      .tan-overlay--content(:class="contentCls" v-show="value")
        slot
</template>
<script>
export default {
  props: {
    value: {
      type:Boolean,
      default: false
    },
    // 插槽的动画名称
    transName: String,
    allowClickHide: Boolean,
    direction: {
      type: String,
      default: 'bottom'
    }
  },
  computed: {
    contentCls() {
      return `tan-overlay--${this.direction}`
    }
  },
  methods: {
    hide() {
      if (this.allowClickHide) {
        this.$emit('input', false)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.tan-overlay
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color rgba(0,0,0,.4)
  z-index 99
  &--content
    position absolute
    width 100%
    z-index 100
  &--up
    top 0
    left 0
  &--bottom
    bottom 0
    left 0
  &--left
    left 0
  &--center
    top 50%
    left 50%
    transform translate(-50%, -50%)
</style>
