<template lang="pug">
.pass-success-panel.tc
  .icon-pass-success
  p.txt 密码设置成功
  p 请妥善保管您的账户信息
  el-button(@click="reLogin" type="theme-empty") 重新登录
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    reLogin() {
      this.$emit('cancel')
      this.showLogin(true)
    },
    ...mapMutations('panel', {
      showLogin: 'TOGGLE_LOGIN_PANEL',
    }),
  },
}
</script>
<style lang="stylus">
.pass-success-panel
  p
    margin 10px 0
    color #999
    &.txt
      color #666
      font-size 24px
</style>
