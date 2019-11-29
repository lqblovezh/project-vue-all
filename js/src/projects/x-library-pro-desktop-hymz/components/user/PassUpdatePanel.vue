<template lang="pug">
el-form(ref="form" :model="form" label-width="80px")
  el-form-item(label="密码")
    el-input(v-model="form.pass" placeholder="请设置6-20位登录密码" show-password)
  el-form-item(label="再次输入")
    el-input(v-model="form.repeat_pass" placeholder="请再次输入登录密码" show-password)
  .btns(style="text-align:center;")
    el-button(@click="cancel" ) 取消
    el-button(type="theme" @click="next" ) 下一步
</template>
<script>
export default {
  data() {
    return {
      form: {
        pass: '',
        repeat_pass: '',
      },
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    next() {
      this.$emit('update-event')
    },
  },
}
</script>
<style lang="stylus"></style>
