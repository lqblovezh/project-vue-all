<template lang="pug">
.aside-panel-item.cp
  .parent.flex-bs.f14(:class="{active: isActive(item)}" @click="select(item)")
    .name() {{ item.name }}
    .parent-right.flex-ac(
        v-show="hasChildren"
        @click.stop="expandChildren(item)"
      )
      .icon-down-cart(
        :class="{r90: item.expand}"
      )
  .child(v-if="hasChildren && item.expand")
    aside-panel-item(
      v-for="el, index in item.chlidren"
      :item="el"
      :key="`${el.id}_${index}`"
    )
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'aside-panel-item',
  inject: ['select', 'expandChildren', 'panelType'],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasChildren() {
      return this.item.chlidren && this.item.chlidren.length
    },
    ...mapState('category', {
      list: state => state.category_list,
    }),
  },
  methods: {
    isActive(item) {
      if (this.panelType === 'knowledge') {
        // ...
        return item.checked
      } else {
        let currnetId = this.$route.query.id || this.list[0].id
        return item.id == currnetId
      }
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="stylus">
.aside-panel-item
  color #737373
  .parent
    height 43px
    border-bottom 1px solid #e6dace
    &.active
      color #c79846
    .parent-right
      width 25px
      height 100%
      justify-content flex-end
      .icon-down-cart
        transform rotate(-90deg)
        &.r90
          transition all 0.3s
          transform rotate(0deg)
  .child
    padding-left 20px
</style>
