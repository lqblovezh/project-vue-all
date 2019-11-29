<template lang="pug">
.country-wrapper
  cube-scroll(
    ref="scroll"
    :options="options"
    @pulling-up="onPullingUp"
  )
    ul
      li(
        @click="clickHandler()"
        :class="{'is-active': selectedText === '全部'}"
      ) 全部
      li(
        @click="clickHandler(item)"
        v-for="item in list"
        :class="{'is-active': selectedText === item.label }"
        :key="item.id"
      ) {{item.label}}
</template>
<script>
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  data () {
    return {}
  },
  computed: {
    selectedText() {
      const {nationality} = this.$route.query
      return nationality
    }
  },
  async mounted() {
    await this.fetch(true)
    this.$nextTick(() => {
      this.$refs.scroll.refresh()
    })
  },
  methods: {
    clickHandler(item) {
      this.$emit('change', item)
    },
    queryList(params) {
      return this.$services.category.queryCountries({ ...params })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/common/css/variable.styl";
.country-wrapper
  margin 0 auto
  width 70%
  height 6rem
  border-radius 0.1rem
  box-shadow 0 0 0.04rem rgba(0,0,0,.3)
  background-color #fff
  ul
    padding 0.3rem
    box-sizing border-box
    font-size 14px
    color font-color__3
    li
      height 0.6rem
      line-height 0.6rem
      border-bottom 1px solid #F0F0F0
      &.is-active
        color theme-color
</style>
