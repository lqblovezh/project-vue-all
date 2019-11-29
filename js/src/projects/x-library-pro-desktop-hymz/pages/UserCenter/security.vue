<script>
import { mapGetters } from 'vuex'
const { ec } = __PROJECT_INFO__

export default {
  data() {
    return {
      detailInfo: {},
      customInfo: ec,
    }
  },
  computed: {
    ...mapGetters('user', {
      info: 'userInfo',
    }),
  },
  created() {
    console.log(this.info)
  },
  methods: {
    changePass() {
      if (this.customInfo) {
        this.$togglePassPanel()
      } else {
        this.$toggleModifyPanel()
      }
    },
  },
  filters: {
    setPhone(phone) {
      return phone && phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
    },
  },
}
</script>

<template lang="pug">
.rightBox
  UserTitlePanel(name="安全设置" :icon="false")
  ul.set
    li
      .icon.icon-password
      .title 登录密码
      .tips 建议您定期更换密码，设置安全性高的密码可以使账号更安全
      .btn
        el-button(type="theme" size="small" @click="changePass" plain) 修改
    li(v-if="!customInfo")
      .icon.icon-uphone
      .title 手机号码
        span 当前绑定手机号：{{info.phone|setPhone}}
      .tips 如果您已更换手机号码，您可以通过登录密码来更换绑定手机号
      .btn
        el-button(type="theme" size="small" @click="$togglePhonePanel()" plain) 修改
</template>

<style lang="stylus" scoped>
.rightBox
  min-height 480px
  .set
    li
      color #878787
      border-bottom 1px solid #e6dace
      padding 30px 0
      position relative
      margin-left 50px
      &:last-child
        border none
      .title
        font-size 18px
        margin-bottom 18px
        span
          color #666
          font-size 14px
          margin-left 10px
      .tips
        font-size 14px
      .btn
        position absolute
        top 50%
        right 0
        margin-top -16px
      .icon
        position absolute
        left -50px
        top 50%
        margin-top -16px
</style>

