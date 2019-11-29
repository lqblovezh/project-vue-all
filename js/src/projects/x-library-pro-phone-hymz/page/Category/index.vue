<template lang="pug">
.category
  div(:class="scrollClass")
    HomeNavSearch
    .category-wrapper
      .left-panel
        cube-scroll
          cube-tab-bar(v-model="selectLabel" :data="c_list" @change="changeHandler")
      .right-panel
        cube-scroll(ref="scroll")
          ul.f14
            li(
              v-for="{ name, id }, index in list"
              :key="`${name}_${index}`"
              @click="$go('category/book-list', { sid: id, label: name, nationality: '全部' })"
            ) {{ name }}
</template>
<script>
import { isIos } from '@/common/js/base'
import { mapState, mapActions } from 'vuex'
import HomeNavSearch from '@/components/home/HomeNavSearch'
export default {
  components: { HomeNavSearch },
  computed: {
    ...mapState('category', {
      list: state => state.category_list
    }),
    firtsCategoryName() {
      return (this.list.length && this.list[0].label) || ''
    },
    scrollClass() {
      return `bottom-scroll${isIos()?'--ios': ''}`
    }
  },
  data() {
    return {
      // selectLabel: this.firtsCategoryName || '数字图书',
      selectLabel: '数字图书',
      c_list: [{ label: '数字图书'}],
      sub_list: []
    }
  },
  async mounted() {
    await this.queryCategoryList()
    this.sub_list = this.list[0].chlidren
  },
  methods: {
    ...mapActions('category', ['queryCategoryList']),
    changeHandler(label) {
      let item = this.getItem(label)
      this.sub_list = item.chlidren
    },
    getItem(label) {
      return this.list.find(item => item.label === label)
    }
  }
}
</script>
<style lang="stylus">
.category
  &-wrapper
    .left-panel
      .cube-tab-bar
        .cube-tab
          border 1px solid transparent
    > .right-panel
      background-color #FFF
      ul
        padding 0 0.2rem 0 0.3rem
        color #4d4d4d
        li
          height 0.9rem
          line-height 0.9rem
          border-bottom 1px solid #ebf2f1
          display flex
</style>
