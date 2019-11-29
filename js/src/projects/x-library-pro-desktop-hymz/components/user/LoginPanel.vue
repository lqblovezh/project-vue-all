<template lang="pug">
el-dialog(
  title="用户登录"
  :visible.sync="visible"
  width="600px"
  :before-close="beforeClose"
  :close-on-click-modal="false"
  append-to-body
  center
)
  .tab(v-if="customInfo")
    LoginByAccount
  .tab(v-else)
    el-tabs(v-model="activeName" :stretch="stretch")
      el-tab-pane(label="账户登录" name="1")
        LoginByAccount
      el-tab-pane(label="短信登录" name="2")
        LoginByMessage
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import LoginByAccount from './LoginByAccount'
import LoginByMessage from './LoginByMessage'
const { ec } = __PROJECT_INFO__

export default {
  components: { LoginByAccount, LoginByMessage },
  computed: {
    ...mapState('panel', {
      visible: state => state.loginStatus,
    }),
  },
  data() {
    return {
      activeName: '1',
      stretch: true,
      customInfo: ec,
    }
  },
  methods: {
    beforeClose() {
      this.activeName = '1'
      this.$toggleLoginPanel(false)
    },
  },
}
</script>
<style lang="stylus"></style>
