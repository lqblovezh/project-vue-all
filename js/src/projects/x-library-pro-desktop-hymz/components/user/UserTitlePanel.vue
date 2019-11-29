<script>
export default {
  props: {
    name: {},
    path: {},
    query: {},
    rname: {
      default: '查看全部',
    },
    icon: {
      default: 'more',
    },
    leftIcon: {
      default: null,
    },
  },
  methods: {
    go() {
      this.$emit('more')
      if (!this.path) return
      this.$go(this.path, this.query)
    },
  },
}
</script>

<template lang="pug">
.title
  .flex.vm-list
    .name.f16.f600 {{name}}
      //- .ib.icon(:class="['icon-' + leftIcon,!leftIcon?'vt-line':'']")
    .more(@click="go" v-if="icon")
      span.f14.c_6 {{rname}}
      .icon( :class="'icon-' + icon")
</template>

<style lang="stylus" scoped>
.title
  line-height 30px
  border-bottom 1px solid #e6dace
  .flex
    justify-content space-between
    line-height 44px
    >.name
      font-size 18px
      color #c79846
      >.vt-line
        width 4px
        height 30px
        background #c99c5e
        border-radius 2px
      >.icon
        height 30px
        margin-right 12px
    >.more
      cursor pointer
      >span
        margin-right 10px
        font-size 14px
        color #878787
</style>


