<template lang="pug">
.login-account.hy-form
  el-form(ref="ruleForm" :rules="rules" :model="ruleForm" label-width="80px")
    el-form-item(label="手机号" prop="phone")
      el-input(v-model="ruleForm.phone" placeholder="请输入手机号码")
    el-form-item(label="图像码")
      .flex
        el-input(v-model="ruleForm.img_code" placeholder="请输入图像验证码")
        img.img(:src="ruleForm.img_code_src" @click="getCode")
    el-form-item(label="验证码")
      .flex
        el-input(v-model="ruleForm.code" placeholder="请输入短信验证码")
        SendCode(@send="send" ref="SendCode")
    el-form-item
      .flex-bs
        a.cp(@click="$toggleRegisterPanel()") 注册新用户
        a.cp(@click="$togglePassPanel()") 忘记密码？
    .btns(style="text-align:center;")
      //- el-button(@click="$toggleLoginPanel(false)" ) 取消
      el-button(type="theme" @click="submitForm" style="width: 200px") 确定
</template>
<script>
import Captcha from 'services/common/captcha'
import { user } from 'services/x-library-pro/implement/hymz'
import SendCode from './SendCode.vue'
import { mapMutations, mapState } from 'vuex'

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
    return {
      ruleForm: {
        phone: '',
        code: '',
        img_code: '',
        img_code_src: '',
        img_code_id: '',
        code_id: '',
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'change' }],
      },
    }
  },
  watch: {
    visible: {
      handler() {
        if (this.visible) {
          console.log(this.visible, 21212)
          this.getCode()
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState('panel', {
      visible: state => state.loginStatus,
    }),
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$services.user
            .loginByPhone({
              phone: this.ruleForm.phone,
              code_id: this.ruleForm.code_id,
              code_val: this.ruleForm.code,
            })
            .then(res => {
              this.setUserInfo(res.data)
              this.$toggleLoginPanel(false)
              this.$message.success('登录成功')
            })
            .catch(({ message, payload }) => {
              this.$message.error(payload.message || message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCode() {
      user.getImageCard().then(res => {
        this.ruleForm.img_code_src = res.data.code_img
        this.ruleForm.img_code_id = res.data.code_id
      })
    },
    send() {
      Captcha.phoneCaptcha({
        phone: this.ruleForm.phone,
        code_id_img: this.ruleForm.img_code_id,
        code_val_img: this.ruleForm.img_code,
      })
        .then(res => {
          this.ruleForm.code_id = res.data.code_id
          this.getCode()
          this.$refs.SendCode.wait()
          this.$refs.SendCode.isClickable = false
        })
        .catch(({ payload, message }) => {
          this.$message.error(payload.message || message)
        })
    },
    ...mapMutations('user', {
      setUserInfo: 'SET_USER_INFO',
    }),
  },
}
</script>
<style lang="stylus"></style>
