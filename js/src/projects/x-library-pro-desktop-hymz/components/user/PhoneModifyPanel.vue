<script>
import { mapState, mapMutations } from 'vuex'
import SendCode from './SendCode.vue'
import Captcha from 'services/common/captcha'

export default {
  components: { SendCode },
  data() {
    let valiOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原始密码'))
      } else {
        callback()
      }
    }
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
        pass: '',
        phone: '',
        code: '',
        img_code: '',
        img_code_src: '',
        img_code_id: '',
        code_id: '',
      },
      rules: {
        pass: [{ validator: valiOldPass, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'change' }],
      },
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          Captcha.checkCaptcha({
            code_id: this.ruleForm.code_id,
            code_val: this.ruleForm.code,
          })
            .then(res => {
              this.$services.user
                .updatePhone({
                  id: this.info.id,
                  phone: this.ruleForm.phone,
                  // pass: this.ruleForm.pass,
                  // code: this.ruleForm.pass,
                })
                .then(res => {
                  this.SET_USER_INFO(res.data)
                  this.$message.success('修改成功')
                  this.beforeClose()
                })
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
    beforeClose() {
      this.TOGGLE_PHONE_PANEL(false)
    },
    getImageCode() {
      Captcha.imgCaptcha().then(res => {
        this.ruleForm.img_code_src = res.data.code_img
        this.ruleForm.img_code_id = res.data.code_id
      })
    },
    getCode() {},
    send() {
      Captcha.phoneCaptcha({
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
    ...mapMutations('panel', ['TOGGLE_PHONE_PANEL']),
    ...mapMutations('user', ['SET_USER_INFO']),
  },
  computed: {
    ...mapState('panel', {
      phonePanenVisible: state => state.modifyPhoneStatus,
    }),
    ...mapState('user', ['info']),
  },
  watch: {
    phonePanenVisible: {
      handler() {
        if (this.phonePanenVisible) {
          this.getImageCode()
        }
      },
      immediate: true,
    },
  },
}
</script>
<template lang="pug">
el-dialog(
  title="修改手机号码"
  :visible.sync="phonePanenVisible"
  width="600px"
  :before-close="beforeClose"
  :close-on-click-modal="false"
  append-to-body
  center
)
  el-form(ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px")
    el-form-item(label="原 密 码：" prop="pass")
      el-input(v-model="ruleForm.pass" placeholder="请输入账号密码" show-password)
    el-form-item(label="新的手机号：" prop="phone")
      el-input(v-model="ruleForm.phone" placeholder="请输入新的手机号码")
    el-form-item(label="图像码")
      .flex
        el-input(v-model="ruleForm.img_code" placeholder="请输入图像验证码")
        img.img(:src="ruleForm.img_code_src" @click="getImageCode")
    el-form-item(label="验证码")
      .flex
        el-input(v-model="ruleForm.code" placeholder="请输入短信验证码")
        SendCode(@send="send" ref="SendCode")
    .btns(style="text-align:center;")
      //- el-button(@click="beforeClose" ) 取消
      el-button(type="theme" @click="submitForm" style="width: 200px") 确认
</template>
<style lang="stylus">
.disabled
  background #e0e0e0
  cursor no-drop
  &:hover
    background-color #e0e0e0
    border-color #e0e0e0
.img
  cursor pointer
  width 112px
  height 40px
  border-top-right-radius 5px
  border-bottom-right-radius 5px
</style>
