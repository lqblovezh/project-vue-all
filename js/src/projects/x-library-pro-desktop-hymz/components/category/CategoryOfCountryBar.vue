<template lang="pug">
.category-country-bar.f14 作者国籍：
  a.cp(
    :class="{ active: '' == value }"
    @click="selectItem()"
  ) 全部
  a.cp(
    v-for="{ id, label } in countriesList"
    :key="id"
    :class="{ active: label === value }"
    @click="selectItem({id, label})"
  ) {{ label }}
  a.cp(@click="loadMore" v-if="countriesList.length<list.length") 更多
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    value: String,
  },
  data() {
    return {
      countriesList: [],
    }
  },
  computed: {
    ...mapState('category', {
      list: state => state.countries,
    }),
    ...mapState('user', {
      userInfo: state => state.info,
    }),
    ...mapGetters('category', ['getListByLength']),
  },
  methods: {
    selectItem({ id, label = '' } = {}) {
      if (!id && !label) {
        this.$emit('input', '')
      }
      if (label == this.value) {
        this.$emit('input', '')
      } else {
        this.$emit('input', label)
      }
      this.$emit('click-event')
    },
    loadMore() {
      if (!this.userInfo || !this.userInfo.vip) {
        this.TOGGLE_VIP_PANEL(true)
        return
      }
      this.countriesList = this.getListByLength(true)
    },
    ...mapMutations('panel', ['TOGGLE_VIP_PANEL']),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length) {
          this.countriesList = this.getListByLength(false)
        }
      },
      immediate: true,
    },
  },
}
</script>
<style lang="stylus">
.category-country-bar
  color #878787
  >a
    display inline-block
    margin-right 10px
    margin-bottom 10px
    height 24px
    line-height 24px
    padding 0 11px
    border 1px solid rgba(55, 129, 102, 0.32)
    border-radius 3px
    font-size 12px
    &.active
      color #fff
      background-color #009882
</style>
