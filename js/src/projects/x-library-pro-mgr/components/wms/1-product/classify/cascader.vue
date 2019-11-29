<script>
export default {
  name: 'cascader',
  props: {
    options: {}
  },
  computed: {
    selectedItem () {
      return this.options.filter(op => op.checked)[0] || {}
    }
  },
  methods: {
    selectItem (i) {
      const select = this.options.filter(i => i.checked)[0]
      select && this.$set(select, 'checked', false) && this.$set(select, 'children', [])
      if (!select || (select && (select.id && select.id !== i.id) || (select.type && select.type !== i.type))) {
        this.$set(i, 'checked', true)
        this.$emit('message', i)
      }
    }
  }
}
</script>
<template lang="pug">
.ui-cascader
  .ui-cascader__item(v-for="i in options" @click.stop="selectItem(i)" :class="{active: i.checked}")
    p {{ i.txt || i.name }}
    cascader(v-if="i.checked && i.children && i.children.length" :options="i.children")
</template>
<style lang="stylus">
.ui-cascader
  position relative
  &__item
    position relative
    line-height 45px
    text-indent 1em
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    cursor pointer
    p
      border-bottom 1px solid #DDD
    &.active
      >p
        color #409EFF
      >.icon-enter
        transform rotate(90deg)
    span
      position absolute
      top 15px
      right 5px
  .ui-cascader
    padding-left 20px
</style>