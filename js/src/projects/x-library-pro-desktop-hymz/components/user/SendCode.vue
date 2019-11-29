<script>
export default {
  data() {
    return {
      time: 0,
      isClickable: false,
    }
  },
  computed: {
    showVal() {
      if (this.time === 0) {
        return '发送验证码'
      } else {
        return 61 - this.time + 's后重发'
      }
    },
  },
  created() {
    console.log(this.isClickable,222222);
  },
  methods: {
    send() {
      if (this.time == 0) {
        this.$emit('send')
      }
    },
    wait() {
      if (this.time !== 0) return
      this.time++
      let timer = setInterval(() => {
        if (this.time < 61) {
          this.time++
        } else {
          this.time = 0
          this.isClickable = true
          this.$emit('remove')
          clearInterval(timer)
        }
      }, 1000)
    },
  },
}
</script>

<template lang="pug">
el-button.btn(type="theme" @click="send" style='width:135px' :disabled="!isClickable") {{showVal}}
</template>

<style lang="stylus" scoped>
.btn
  &:active
    color #fff
    border-color #e0e0e0
    outline 0
  &:focus
    color #fff
    border-color #e0e0e0
    outline 0
</style>

