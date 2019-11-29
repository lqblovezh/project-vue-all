<template lang="pug">
.page-login.ui-user
  v-page(title="用户登录" @back-event="$router.go(-1)" user-back)
    .scroll-full.c-bg-f.container.pr
      .panel.flex-tc
        .icon-logo
      form
        InputControl(type="text" v-model="form.username" icon-class="user" placeholder="请输入用户名" )
        InputControl(type="password" v-model="form.password" icon-class="lock" placeholder="请输入登陆密码" )
        InputControl(type="img-code" icon-class="envelope" :img-src="picUrl" v-model="imgCode" placeholder="请输入图片验证码" @click-event="getImgCode")
        button.btn-theme.btn-form.f15(type="submit" @click.prevent="submit_login") 登录
      .flex-bs.c-6.f14.form-line
        a(@click="$replaceWithPath('register')") 注册新用户
        a(@click="$push('login/forget-password')") 忘记密码
      .link-register.tc.f14
        a(@click="$replaceWithPath('login/phone')" v-show="!excute_ctx") 短信登录
</template>
<script>
import { SET_USER_INFO } from '@/store/types'
import { phoneCode } from '@/mixins'
import { mapState, mapMutations } from 'vuex'
const { ec } = __PROJECT_INFO__
export default {
  mixins: [phoneCode],
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      excute_ctx: ec
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo
    })
  },
  mounted() {
    for (let i in this.userInfo) {
      this.$router.go(-1)
      return
    }
  },
  methods: {
    ...mapMutations('user', [SET_USER_INFO]),
    async submit_login() {
      try {
        const {
          data
        } = await this.$services.user.login({
            ...this.form,
            code_id_img: this.imgCodeId,
            code_val_img: this.imgCode
          })
        data && this[SET_USER_INFO](data)
        this.$router.go(-1)
      } catch(e) {
        this.$catchError(e)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.page-login
  touch-action none
  overflow hidden
  min-height 100vh
  form
    .btn-form
      margin-top 1.26rem
  .link-register
    margin-top 0.3rem
</style>
