<template lang="pug">
.pass-panel
  el-dialog(
    :title="title"
    :visible.sync="visible"
    width="600px"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    append-to-body
    center
  )
    component(
      v-if="visible"
      :is="curName"
      @phone-event="validatePhone"
      @update-event="updatePass"
      @cancel="beforeClose"
    )
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import PassForgetPanel from './PassForgetPanel'
import PassUpdatePanel from './PassUpdatePanel'
import PassSuccessPanel from './PassSuccessPanel'
import PassModifyPanel from './PassModifyPanel'
export default {
  components: {
    PassForgetPanel,
    PassUpdatePanel,
    PassSuccessPanel,
    PassModifyPanel,
  },
  computed: {
    ...mapState('panel', {
      passStatus: state => state.passStatus,
      modifyStatus: state => state.modifyStatus,
    }),
    visible() {
      return this.passStatus || this.modifyStatus
    },
  },
  data() {
    return {
      title: '忘记密码',
      curName: 'PassForgetPanel',
    }
  },
  created() {},
  watch: {
    modifyStatus() {
      if (this.modifyStatus) {
        this.title = '修改密码'
        this.curName = 'PassModifyPanel'
      }
    },
  },
  methods: {
    ...mapMutations('panel', {
      togglePanelStatus: 'TOGGLE_PASS_PANEL',
      toggleModifyPanel: 'TOGGLE_MODIFY_PANEL',
    }),
    beforeClose() {
      this.togglePanelStatus(false)
      this.toggleModifyPanel(false)
      this.title = '忘记密码'
      this.curName = 'PassForgetPanel'
    },
    validatePhone() {
      this.title = '修改密码'
      this.curName = 'PassUpdatePanel'
      // console.log('test')
    },
    updatePass() {
      this.title = ''
      this.curName = 'PassSuccessPanel'
    },
  },
}
</script>
<style lang="stylus"></style>
