<template lang="pug">
el-form(ref="ruleForm" :rules="rules" :model="ruleForm" label-width="90px")
  el-form-item(label="原 密 码：" prop="oldpass")
    el-input(v-model="ruleForm.oldpass" placeholder="请输入原始密码" show-password)
  el-form-item(label="新 密 码：" prop="pass")
    el-input(v-model="ruleForm.pass" placeholder="请设置6至20位登录密码" show-password)
  el-form-item(label="再次输入：" prop="checkPass")
    el-input(v-model="ruleForm.checkPass" placeholder="请再次输入登录密码" show-password)
  .btns(style="text-align:center;")
    //- el-button(@click="cancel") 取消
    el-button(type="theme" @click="submitForm" style="width: 200px") 确认
</template>
<script>
export default {
  data() {
    let valiOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原始密码'))
      } else {
        callback()
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
        oldpass: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        oldpass: [{ validator: valiOldPass, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$services.user
            .updatePasswordDefault({
              old_pass: this.ruleForm.oldpass,
              new_pass: this.ruleForm.pass,
              comfirm_pass: this.ruleForm.checkPass,
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
