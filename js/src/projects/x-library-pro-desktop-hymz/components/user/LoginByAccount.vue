<template lang="pug">
.login-account
  el-form(ref="form" :model="form" label-width="80px")
    el-form-item(label="账户")
      el-input(v-model="form.name.val" :maxlength="form.name.max" :minlength="form.name.min" placeholder="请输入账户")
    el-form-item(label="密码")
      el-input(v-model="form.pass.val" @keyup.enter.native="save" show-password placeholder="请输入密码")
    el-form-item(label="图像码" v-if="customInfo")
      .flex
        el-input(v-model="form.img_code" placeholder="请输入图像验证码" @keyup.enter.native="save")
        img.img(:src="form.img_code_src" @click="getCode")
    el-form-item
      .flex-bs
        a.cp(@click="$toggleRegisterPanel()") 注册新用户
        a.cp(@click="$togglePassPanel()") 忘记密码？
    .btns(style="text-align:center;")
      //- el-button(@click="$toggleLoginPanel(false)" ) 取消
      el-button(type="theme" @click="save" style="width: 200px") 确定
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { user } from 'services/x-library-pro/implement/hymz'
import { SET_USER_INFO } from '@/store/types'
const { ec } = __PROJECT_INFO__

export default {
  data() {
    return {
      form: {
        name: {
          val: '',
          max: 20,
          min: 6,
        },
        pass: {
          val: '',
          max: 20,
          min: 6,
        },
        img_code: '',
        img_code_src: '',
      },
      customInfo: ec,
    }
  },
  computed: {
    ...mapState('panel', {
      visible: state => state.loginStatus,
    }),
  },
  watch: {
    visible: {
      handler() {
        this.form.pass.val = ''
        if (this.visible && this.customInfo) {
          this.form.img_code = ''
          this.getCode()
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations('user', {
      setUserInfo: SET_USER_INFO,
    }),
    ...mapActions('home', ['queryJumpInfo']),
    getCode() {
      user.getImageCard().then(res => {
        this.form.img_code_src = res.data.code_img
        this.form.img_code_id = res.data.code_id
      })
    },
    async save() {
      try {
        const { data } = await this.$services.user.login({
          username: this.form.name.val,
          password: this.form.pass.val,
          code_val_img: this.form.img_code,
          code_id_img: this.form.img_code_id,
        })
        if (this.customInfo) {
          this.queryJumpInfo()
        }
        this.setUserInfo(data)
        this.$toggleLoginPanel(false)
        this.$message({
          message: '登录成功',
          type: 'success',
        })
        // window.location.reload()
      } catch ({ payload, message }) {
        this.$message.error((payload && payload.message) || message)
      }
    },
  },
}
</script>
<style lang="stylus">
.login-account
  padding 0 70px
</style>
