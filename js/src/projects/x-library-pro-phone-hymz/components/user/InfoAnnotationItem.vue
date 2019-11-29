<template lang="pug">
.info-annotation-item.c-bg-f.flex-ac(:class="{active: item.checked}" @click="handleClick")
  .nc-checkbox(v-show="editMode")
    input.nc-checkbox-input(type="checkbox" :checked="item.checked")
    .nc-checkbox-core
  .annotation
    .annotation-item__head
      .annotation-item__title.flex-bs
        .annotation-item__title-name.c-6 {{ item.bookname }}
        p.c-font-gray.f12 {{ item.create_time }}
      .annotation-item__text.c-font-main(v-len="maxCharLen") {{ item.content }}
    .annotation-item__body.c-font-gray(v-len="maxCharLen") {{ item.select }}
  input.dn(type="checkbox" :checked="item.checked")
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
  data() {
    return {
      maxCharLen: 50
    }
  },
  methods: {
    handleClick() {
      if (!this.editMode) {
        // alert('click view page')
      } else {
        this.$emit('toggleItemSelectedStatus', this.item)
      }
    }
  }
}
</script>
<style lang="stylus">
.info-annotation-item
  padding 0.3rem
  margin-bottom 0.3rem
  line-height 1
  .annotation-item__title
    margin-bottom 0.3rem
  .annotation-item__text
    line-height 1.5
    margin-bottom 0.2rem
    padding-bottom 0.15rem
    border-bottom 1px solid #ebf2f1
  .annotation-item__body
    line-height 1.5
</style>
