<template lang="pug">
.search-select
  .search-select__cell.ui-field.flex-ac(@click="togglePickerStatus(true)")
    .name.ib {{ label }}
    .search-select__input
      input(
        type="text"
        disabled
        :value="selectedItem.label"
        :placeholder="placeholder"
      )
  transition(name="fade-in")
    .select-mask(@click="togglePickerStatus()" v-show="pickerStatus")
      .select-box
        .select-header.flex-bs.container
          button(@click.stop="cancel") 取消
          button(@click.stop="comfirm") 确认
        .select-content
          ul.f14.tc
            li(v-for="item in list" @click.stop="checkItem(item)" :class="{active: selectedItem[type] === item[type]}") {{ item.label }}
</template>
<script>
import { isEmptyObject } from '@/common/js/base'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    label: {
      type: String
    },
    value: String,
    type: {
      type: String,
      default: 'name'
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  data() {
    return {
      pickerStatus: false,
      selectedItem: {}
    }
  },
  methods: {
    cancel() {
      this.selectedItem = {}
      this.togglePickerStatus()
    },
    togglePickerStatus(status = false) {
      this.pickerStatus = status
    },
    checkItem(item) {
      this.selectedItem = item.name === this.selectedItem ? null : item
    },
    comfirm() {
      if (!isEmptyObject(this.selectedItem)) {
        this.$emit('input', this.selectedItem[this.type])
      }
      this.togglePickerStatus()
    }
  },
}
</script>
<style lang="stylus">
@import '../../common/css/variable.styl'
.fade-in-enter,
.fade-in-leave-to
  opacity 1
.fade-in-enter-active,
.fade-in-leave-active
  transition opacity .3 linear
.search-select
  &__cell
    .name
      width 1.5rem
      color #4d4d4d
  &__input
    flex 1
    height 0.6rem
    input
      height 100%
      width 100%
      background-color transparent
      border none
      outline none
  .select-mask
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background-color rgba(0,0,0,.5)
    z-index 99
  .select-box
    position absolute
    bottom 0
    width 100%
    height 4rem
    background-color #fff
    box-sizing border-box
    .select-header
      padding 0.1rem 0
      button
        color theme-color
        background-color transparent
    .select-content
      height 2.4rem
      overflow scroll
      ul
        li
          height 0.7rem
          line-height 0.7rem
          &.active
            color theme-color
</style>