<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('user', {
      userInfo: state => state.info,
    }),
  },
  methods: {
    ...mapMutations('panel', ['TOGGLE_LOGIN_PANEL', 'TOGGLE_VIP_PANEL']),
  },
}
</script>

<template lang="pug">
.purchase(v-if="!userInfo.vip")
  .tips
    el-button(type="theme" @click="TOGGLE_VIP_PANEL(true)") 购买
    p 成为付费会员后可查看全部内容
</template>

<style lang="stylus" scoped>
.purchase
  background-color #ffffff
  opacity 0.85
  min-height 20vh
  width 100%
  text-align center
  display table
  .tips
    display table-cell
    vertical-align middle
    color #333
    font-size 16px
    >p
      color #666
      font-size 14px
      margin-top 23px
</style>
