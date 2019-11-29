<template lang="pug">
.system-setting
  v-page(title="系统设置")
    .scroll-full.c-bg-main
      .c-bg-f
        ui-cell(label="安全设置" type="jump" to="system-setting/safe-settings" is-link)
        ui-cell(label="帮助中心" type="jump" to="system-setting/help" is-link)
        ui-cell(label="清除缓存" type="jump" to="" is-link)
        ui-cell(label="检查更新" type="jump" to="" is-link)
        ui-cell(label="关于" type="jump" to="" is-link)
      BaseButton(txt="退出当前账号" btn-class="system-btn" @click-event="userLogout" large v-show="'name' in info")
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', {
      info: state => state.userInfo
    })
  },
  methods: {
    ...mapActions('user', ['logout']),
    userLogout() {
      this.logout().then(() => {
        this.$Toast({
          message: '成功退出',
          icon: 'icon-success'
        })
      }).catch(e => {
        this.$Toast({
          message: '退出失败',
          icon: 'icon-failed'
        })
      })
    }
  }
}
</script>
<style lang="stylus">
.system-setting
  .ui-cell
    height 1rem
    border-bottom 1px solid #ebf2f1
  .system-btn
    border none
    height 1rem
    color #009882
    font-size 14px
</style>
