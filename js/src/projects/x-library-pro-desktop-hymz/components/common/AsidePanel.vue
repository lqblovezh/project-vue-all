<template lang="pug">
aside.aside-panel
  h4.tc
    .icon-academic-area
    | 学科领域
  .aside-panel__body
    AsidePanelItem(
      v-for="item,index in list"
      :item="item"
      :key="`${item.id}_${index}`"
    )
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import AsidePanelItem from './AsidePanelItem'
export default {
  components: { AsidePanelItem },
  props: {
    pageType: {
      type: String,
      default: 'knowledge',
    },
    value: {},
    panelType: {
      type: String,
    },
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.info,
    }),
  },
  data() {
    return {
      selectItem: null,
    }
  },
  methods: {
    resetExpand() {
      let item = this.list.find(item => item.expand)
      if (item) {
        this.$set(item, 'expand', false)
      }
    },
    select(item) {
      if (!this.userInfo || !this.userInfo.vip) {
        this.TOGGLE_VIP_PANEL(true)
        return console.log('非会员')
      }
      if (this.selectItem) {
        if (this.selectItem.id === item.id) {
          return
        }
        this.$set(this.selectItem, 'checked', false)
        this.selectItem = item
      }
      if (this.pageType === 'knowledge') {
        this.$emit('change-point', item.id)
      }
      if (
        !item.checked &&
        (!item.chlidren || item.chlidren.length === 0) &&
        this.pageType !== 'knowledge'
      ) {
        this.$go('/category', { id: item.id })
        return
      }
      this.selectItem = item
      this.$set(item, 'checked', true)
    },
    expandChildren(item) {
      console.log('tst', item)
      this.$set(item, 'expand', !item.expand)
    },
    ...mapMutations('panel', ['TOGGLE_VIP_PANEL']),
  },
  provide() {
    return {
      select: this.select,
      expandChildren: this.expandChildren,
      panelType: this.panelType,
    }
  },
}
</script>
<style lang="stylus">
.aside-panel
  margin-right 30px
  width 260px
  border 1px solid #dbceb0
  background-color #fffdf7
  &__body
    padding 10px 20px
    .aside-panel-item
      &:last-child
        .parent
          border none
</style>
