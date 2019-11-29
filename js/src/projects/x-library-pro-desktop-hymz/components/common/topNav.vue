<template lang="pug">
.div
	.home
		.noBasicNav(v-if="!basic")
			img(class="Logo" src='../../assets/img/Logo.png')
			.default
				.user
					img( class="UserImg" @click="go('personal')" v-if="userInfo" :src='userInfo.data.picture')
					a(v-if="userInfo"  @click="go('personal')" ) {{userInfo.data.name}}
				.btn
					a(@click="openLogin()" v-if="!userInfo") 登录
					a(@click="deleteUser" v-if="userInfo") 退出
					a(@click="openRegister()" v-if="!userInfo") 注册
					a(@click="add()") 帮助中心
	.basic
		.BasicNav(v-if="basic")
			img(class="Logo" src='../../assets/img/Logo.png')
			//- span(class="NavTxt") 欢迎光临汉译世界学术名著数据库！
			.default
				.user
					img( class="UserImg"  @click="go('personal')"  v-if="userInfo" :src='userInfo.data.picture')
					a(v-if="userInfo"  @click="go('personal')" ) {{userInfo.data.name}}
				.btn
					a(@click="openLogin()" v-if="!userInfo") 登录
					a(@click="deleteUser" v-if="userInfo") 退出
					a(@click="openRegister()" v-if="!userInfo") 注册
					a(@click="add()") 帮助中心
</template>
<style lang="stylus" scoped>
.basic
  background-color #e3dbc6
.home
  background-color #009882
.noBasicNav
  margin 0 auto
  max-width 1100px
  min-width 970px
  background-color #009882
  >.Logo
    line-height 30px
  >.default
    margin 0 auto
    display inline-block
    float right
    >.btn
      display inline-block
      >a
        cursor pointer
        font-family 'SimSun'
        font-size 12px
        color #ffffff
        line-height 51px
        border-left 1px dashed #ffffff
        padding-left 10px
        padding-right 10px
      >a:nth-of-type(1)
        border-left 0
    >.user
      display inline-block
      >a
        cursor pointer
        font-family 'SimSun'
        font-size 12px
        color #ffffff
        line-height 51px
      >.UserImg
        vertical-align middle
        margin-right 10px
        width 28px
        height 28px
        border-radius 50%
        cursor pointer
.BasicNav
  margin 0 auto
  max-width 1260px
  min-width 970px
  background-color #e3dbc6
  >.NavTxt
    line-height 30px
    font-family 'SimSun'
    font-size 12px
    color #634b33
  >.default
    margin 0 auto
    display inline-block
    float right
    >.btn
      display inline-block
      >a
        cursor pointer
        font-family 'SimSun'
        font-size 12px
        color #634b33
        line-height 30px
        border-left 1px dashed #634b33
        padding-left 10px
        padding-right 10px
      >a:nth-of-type(1)
        border-left 0
    >.user
      display inline-block
      >a
        cursor pointer
        font-family 'SimSun'
        font-size 12px
        color #634b33
        line-height 30px
      >.UserImg
        vertical-align middle
        margin-right 10px
        width 19px
        height 19px
        border-radius 50%
        line-height 30px
        cursor pointer
</style>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    basic() {
      let path = this.$route.path
      let reg = RegExp(/home/)
      if (reg.test(path)) {
        return false
      } else {
        return true
      }
    },
  }),
  methods: {
    go(routePath) {
      this.$router.push({ name: routePath })
    },
    add() {},
    openRegister() {
      this.$store.commit('show2')
    },
    deleteUser() {
      this.$store.commit('clearUserInfo')
      this.$message({
        message: '退出成功',
        type: 'success',
      })
    },
    openLogin() {
      this.$store.commit('show')
    },
  },
  created() {
    console.log(this.state)
  },
}
</script>
