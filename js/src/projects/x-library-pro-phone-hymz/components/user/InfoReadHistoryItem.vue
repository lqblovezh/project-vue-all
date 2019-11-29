<template lang="pug">
.read-history-item.flex-bs.container(@click="handleClick" :class="{active: item.checked}")
  .read-history-item__left.flex-ac
    .nc-checkbox(v-show="isEditMode")
      input.nc-checkbox-input(type="checkbox" :checked="item.checked")
      .nc-checkbox-core
    img(:src="item.picture")
    div
      p.f14.c-font-main {{ item.bookname }}
      p.f12 {{ item.author }}
  .read-history-item__right.f12 {{ item.end_time }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    isEditMode: Boolean
  },
  methods: {
    handleClick() {
      if (!this.isEditMode) {
        this.$read({ id: this.item.book_id })
      } else {
        this.$emit('toggleItemSelectedStatus', this.item)
      }
    }
  }
}
</script>
<style lang="stylus">
.read-history-item
  height 1.2rem
  &__left
    img
      margin-right 0.2rem
      height 0.9rem
      width 0.9rem
      object-fit contain
    p
      &:first-child
        margin-bottom 0.2rem
</style>
