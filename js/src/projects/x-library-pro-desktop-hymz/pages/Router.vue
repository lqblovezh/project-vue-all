<script>
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import MainMenu from '@/components/common/MainMenu'
import LoginPanel from '@/components/user/LoginPanel'
import RegisterPanel from '@/components/user/RegisterPanel'
import PassPanel from '@/components/user/PassPanel'
import PhoneModifyPanel from '@/components/user/PhoneModifyPanel'
import VipDetailPanel from '@/components/user/VipDetailPanel'
import { isLogin } from 'services/system/home'
import { mapMutations, mapActions } from 'vuex'
const { ec } = __PROJECT_INFO__

export default {
  components: {
    Header,
    Footer,
    LoginPanel,
    RegisterPanel,
    PassPanel,
    MainMenu,
    PhoneModifyPanel,
    VipDetailPanel,
  },
  data() {
    return {
      customInfo: ec,
    }
  },
  async mounted() {
    let token = sessionStorage.getItem('token')
    if (token) {
      await this.$services.user
        .isLogin()
        .then(res => {
          this.SET_USER_INFO(res.data)
        })
        .catch(err => {
          sessionStorage.clear()
          localStorage.clear()
        })
    }
    this.searchAdvType() //获取高级搜索列表
    this.queryPrivilegeList() //获取权限列表
    this.queryCategoryList() //获取分类列表
    if (this.customInfo) {
      this.queryJumpInfo() //获取跳转列表
    }
  },
  methods: {
    ...mapMutations('user', ['SET_USER_INFO']),
    ...mapActions('search', ['searchAdvType']),
    ...mapActions('home', ['queryPrivilegeList', 'queryJumpInfo']),
    ...mapActions('category', ['queryCategoryList']),
  },
}
</script>

<template lang="pug">
div#first-contailer
  Header
  MainMenu
  keep-alive
    router-view( v-if="$route.meta.keepAlive")
  router-view(v-if="!$route.meta.keepAlive")
  Footer
  LoginPanel
  RegisterPanel
  PassPanel
  PhoneModifyPanel
  VipDetailPanel
</template>
<style lang="stylus">
#first-contailer
  padding-bottom 60px
.nr
  min-width 970px
#router
  min-width 970px
  background-color #f9f7ef
  background-size 1500px 1270px
  background-position 50% 140%
  background-image url('../assets/img/bgImg.png')
  background-repeat no-repeat
</style>
