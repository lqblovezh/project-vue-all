<template lang="pug">
.comp-comment-item.f14.c-bg-f.flex-ac(:class="{active: item.checked}" @click="handleClick")
  .nc-checkbox(v-show="editMode")
    input.nc-checkbox-input(type="checkbox" :checked="item.checked")
    .nc-checkbox-core
  .comment-content
    .comment-item__header.flex-bs
      p.c-6 {{ item.bookname }}
      span.ib.f12.c-9 {{ item.create_time }}
    .comment-item__content {{ item.content }}
</template>
<script>
export default {
  props: {
    item: {},
    editMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      if (!this.editMode) {
        // ...
      } else {
        this.$emit('toggleItemSelectedStatus', this.item)
      }
    }
  }
}
</script>
<style lang="stylus">
.comp-comment-item
  padding 0.3rem
  .comment-item__header
    margin-bottom 0.2rem
  .comment-content
    flex 1
</style>
