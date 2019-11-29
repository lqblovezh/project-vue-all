<template lang="pug">
.register-panel.hy-form
  el-dialog(
    title="用户注册"
    :visible.sync="registerPanenVisible"
    width="600px"
    :before-close="beforeClose"
    append-to-body
    :close-on-click-modal="false"
    center
  )
    el-form(
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      maxlength=16
      label-width="80px"
    )
      el-form-item(label="账户" v-if="!customInfo")
        el-input(v-model="ruleForm.name" placeholder="请输入用户名称")
      el-form-item(label="手机号" prop="phone")
        el-input(v-model="ruleForm.phone" placeholder="请输入手机号")
      el-form-item(label="图像码")
        .flex
          el-input(v-model="ruleForm.img_code" placeholder="请输入图像验证码")
          img.img(:src="ruleForm.img_code_src" @click="getCode")
      el-form-item(label="验证码")
        .flex
          el-input(v-model="ruleForm.code" placeholder="请输入短信验证码")
          SendCode(@send="send" ref="SendCode")
      el-form-item(label="密码" prop="pass")
        el-input(v-model="ruleForm.pass" placeholder="请设置6-20位登录密码" show-password)
      el-form-item(label="再次输入" prop="checkPass")
        el-input(v-model="ruleForm.checkPass" placeholder="请再次输入登录密码" show-password)
      el-form-item
        el-checkbox(v-model="isAgreeProtocol") 勾选同意
          router-link(:to="basePath" target="_blank")
            span.protocols 《用户服务协议》
        //- el-checkbox(v-model="isAgreeProtocol")
        //- span 勾选同意
        //-   span 《用户服务协议》
      .tc
        el-button(type="theme" @click="submitForm" style="width:200px;margin-bottom:20px;") 注册
      .tc.c-theme.cp(@click="TOGGLE_LOGIN_PANEL(true)") 已有账号，立即登录
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { user } from 'services/x-library-pro/implement/hymz'
import { TOGGLE_LOGIN_PANEL, TOGGLE_REGISTER_PANEL } from '@/store/types'
import SendCode from './SendCode.vue'
import urlJoin from 'url-join'

const { ec } = __PROJECT_INFO__

export default {
  components: { SendCode },
  data() {
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
        this.$refs.SendCode.isClickable = false
      } else {
        if (!/^((\+?[0-9]{1,4})|(\(\+86\)))?1\d{10}$/.test(value)) {
          callback(new Error('请输入正确的手机号码'))
          this.$refs.SendCode.isClickable = false
        } else {
          if (!this.$refs.SendCode.time) {
            this.$refs.SendCode.isClickable = true
          }
          callback()
        }
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 6 || value.length > 20) {
          callback(new Error('请输入6至20位登录密码'))
        } else {
          this.$refs.ruleForm.validateField('checkPass')
          callback()
        }
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        phone: '',
        code: '',
        pass: '',
        checkPass: '',
        img_code: '',
        img_code_src: '',
        img_code_id: '',
        code_id: '',
      },
      customInfo: ec,
      isAgreeProtocol: false,
      rules: {
        phone: [{ validator: validatePhone, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
      },
    }
  },
  computed: {
    ...mapState('panel', {
      registerPanenVisible: state => state.registerStatus,
    }),
    basePath() {
      return urlJoin(baseUrl, 'user-services')
    },
  },
  watch: {
    registerPanenVisible: {
      handler() {
        if (this.registerPanenVisible) {
          this.getCode()
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations('panel', [TOGGLE_REGISTER_PANEL, TOGGLE_LOGIN_PANEL]),
    getCode() {
      user.getImageCard().then(res => {
        this.ruleForm.img_code_src = res.data.code_img
        this.ruleForm.img_code_id = res.data.code_id
      })
    },
    beforeClose() {
      this.$refs.ruleForm.resetFields()
      this.TOGGLE_REGISTER_PANEL(false)
    },
    send() {
      user
        .sendPhoneCaptcha({
          phone: this.ruleForm.phone,
          code_id_img: this.ruleForm.img_code_id,
          code_val_img: this.ruleForm.img_code,
          not_check_user_exist: 1,
        })
        .then(res => {
          this.ruleForm.code_id = res.data.code_id
          console.log(this.$refs.SendCode)
          this.$refs.SendCode.wait()
          this.$refs.SendCode.isClickable = false
        })
        .catch(({ payload, message }) => {
          this.$message.error(payload.message || message)
        })
    },
    submitForm() {
      if (!this.isAgreeProtocol) {
        return this.$message.warning('请勾选用户协议')
      }
      let msg = { name: '账户', phone: '手机号' }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$services.user
            .register({
              phone: this.ruleForm.phone,
              code_id: this.ruleForm.code_id,
              code_val: this.ruleForm.code,
              name: this.ruleForm.name,
              nick_name: this.ruleForm.name,
              pass: this.ruleForm.pass,
            })
            .then(res => {
              this.beforeClose()
              this.$message.success('注册成功')
              this.$toggleLoginPanel()
            })
            .catch(e => {
              console.error(e)
              this.$message.error(e.payload ? e.payload.message : e.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="stylus" scoped>
.protocols
  color #009882
.protocol
  >>> .el-checkbox__input.is-checked+.el-checkbox__label
    color #737373
.register-panel
  .tc
    margin 10px
</style>
