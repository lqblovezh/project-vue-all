<template lang="pug">
.vip-day.c-bg-f
  .slide-box(v-model="current")
    .slide-item(
      @click="changeHandler(item, index)"
      :class="{'slide-item-active': item.name === current.name }"
      v-for="(item, index) in list"
    ) {{ item.name }}
  .vip-pay__days
    .list-wrapper
      InfoVipDayItem(
        v-for="(item, index) in sub_list"
        :data="item"
        :key="index"
        @select="select"
      )
</template>
<script>
import InfoVipDayItem from './InfoVipDayItem'
export default {
  components: { InfoVipDayItem },
  computed: {
    selectedPrice() {
      return this.sub_list.find(item => item.checked)
    },
    sub_list () {
      return this.current && this.current.child
    }
  },
  data() {
    return {
      list: [],
      current: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init() {
      try {
        const { data } = await this.$services.user.getVipList()
        this.list = data
        this.current = this.list[0]
      } catch(e) {}
    },
    changeHandler(item, index) {
      this.resetCheckedStatus()
      this.current = item
    },
    resetCheckedStatus() {
      this.selectedPrice && this.$set(this.selectedPrice, 'checked', false)
      this.$emit('selectMemberLevel', [])
    },
    select(item) {
      this.selectedPrice && this.$set(this.selectedPrice, 'checked', false)
      this.$set(item, 'checked', !item.checked)
      this.uploadDataSync(item)
    },
    uploadDataSync(sub_item) {
      this.$emit('selectMemberLevel', [this.current, sub_item])
    }
  }
}
</script>
<style lang="stylus">
  .vip-day
    margin-bottom 0.2rem
    .slide-box
      display -webkit-box
      overflow-x scroll
      -webkit-overflow-scrolling touch
      box-shadow 0 0 3px rgba(0,0,0,.3)
      .slide-item
        min-width 0.8rem
        padding 0.3rem
        &:first-child
          margin-left 0.3rem
        &-active
          border-bottom 2px solid #d9b16b
    .vip-pay__days
      margin-top 20px
      height 2.2rem
      width 100%
      overflow scroll
      &::-webkit-scrollbar
        display none
      .list-wrapper
        display flex
        float left
        height 100%
      &-inner
        width 2000px
        height 1.9rem
        overflow-x scroll
        white-space nowrap
</style>
