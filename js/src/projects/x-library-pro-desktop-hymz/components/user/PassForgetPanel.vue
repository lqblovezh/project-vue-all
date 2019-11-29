<template lang="pug">
.forget-pass-panel.hy-form
  el-form(ref="ruleForm" :rules="rules" :model="ruleForm" label-width="80px")
    el-form-item(label="手机号" prop="phone")
      el-input(v-model="ruleForm.phone" placeholder="请输入手机号")
    el-form-item(label="图像码")
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
    .btns(style="text-align:center;")
      //- el-button(@click="cancel" ) 取消
      el-button(type="theme" @click="submitForm" style="width: 200px") 保存
</template>
<script>
import SendCode from './SendCode.vue'
import Captcha from 'services/common/captcha'
import { user } from 'services/x-library-pro/implement/hymz'

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
        img_code: '',
        img_code_src: '',
        img_code_id: '',
        user_id: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
      },
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    next() {
      this.$emit('phone-event')
    },
    getCode() {
      user.getImageCard().then(res => {
        this.ruleForm.img_code_src = res.data.code_img
        this.ruleForm.img_code_id = res.data.code_id
      })
    },
    send() {
      this.$services.user
        .getResetCode({
          phone: this.ruleForm.phone,
          code_id: this.ruleForm.img_code_id,
          code_val: this.ruleForm.img_code,
        })
        .then(res => {
          console.log(res.data)
          this.getCode()
          // this.ruleForm.user_id = res.data.user_id
          this.$refs.SendCode.wait()
          this.$refs.SendCode.isClickable = false
        })
        .catch(({ payload, message }) => {
          this.getCode()
          this.$message.error(payload.message || message)
        })
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$services.user
            .forgetPwd({
              phone: this.ruleForm.phone,
              code_val: this.ruleForm.code,
              pass: this.ruleForm.pass,
              pass_confirm: this.ruleForm.checkPass,
              user_id: this.ruleForm.user_id,
            })
            .then(res => {
              this.$resetUserInfo()
              this.$emit('update-event')
            })
            .catch(({ payload, message }) => {
              this.$message.error(payload.message || message)
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
<style lang="stylus"></style>
