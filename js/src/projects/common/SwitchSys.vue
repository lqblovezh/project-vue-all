<script>
import formSerialize from 'form-serialize'
import { loginOut, changePass } from 'services/common/member'
import {
  loginOut as systemLoginOut,
  changePass as systemChangePass,
} from 'services/system/auth'
import { mapMutations } from 'vuex'
import qs from 'qs'
import urlJoin from 'url-join'
import { platInfo } from 'services/x-publish/common'
import { isLogin } from 'services/common/manager'
import Cookies from 'js-cookie'

const { type, admin, design } = __PROJECT_INFO__

const isSystemAdmin = type == 'system' && admin && design == 'desktop'
export default {
  props: ['leftName', 'title', 'currentPlant'],
  data() {
    return {
      userInfo: null,
      current: '',
      type,
      plantInfo: null,
      loginDialog: false,
      showMoreTop: false,
      outlink: '',
      isBase: true,
      publisher: {},
      passData: {
        old_pass: null,
        new_pass: null,
        new_pass_confirm: null,
      },
    }
  },
  mounted() {
    if (type != 'system') {
      platInfo().then(res => {
        this.publisher = res.data.publisher
        this.outlink = this.publisher.apps
        this.outlink.forEach(e => {
          if (e.is_current) {
            this.isBase = false
          }
        })
      })
    }
    // this.outlink=[{name: '西南交大Publish', base_url: '/_md/pub'}, {name: '西南交大Read', base_url: '/_md/read'}, {name: '西南交大Teach', base_url: '/_md/teach'}]
    this.current = this.currentPlant
    if (!!sessionStorage.userInfo) {
      this.userInfo = qs.parse(sessionStorage.userInfo)
    }

    if (this.$config.userInfo) {
      this.userInfo = this.$config.userInfo
    }
    if (!this.$config.userInfo && !sessionStorage.userInfo) {
      this.checklogin()
    }
  },
  computed: {
    left() {
      return this.leftName || '显示平台'
    },
    isXDataVisible() {
      return this.$store.state.xDataVisible
    },
    isXDataTextVisible() {
      // return !!global.config.xDataUrl
      return true
    },
    userName() {
      return this.userInfo && this.userInfo.user
        ? this.userInfo.user.name
        : null
    },
  },
  methods: {
    async checklogin() {
      await isLogin().then(res => {
        this.userInfo = res.data
      })
    },
    update(data) {
      this.userInfo = data
    },
    handleClose(done) {
      //关闭前的处理
      this.passData.old_pass = null
      this.passDatanew_pass = null
      this.passDatanew_pass_confirm = null
      this.loginDialog = false
    },
    changeCode(e) {
      //修改code
      let node = e.currentTarget
      node.src = node.src
    },
    logout() {
      //退出
      this.$confirm('是否确认退出?')
        .then(_ => {
          ;(isSystemAdmin ? systemLoginOut : loginOut)().then(res => {
            sessionStorage.clear()
            window.location.href = isSystemAdmin ? '/system/admin' : '/admin'
          })
        })
        .catch(_ => {})
    },
    backHome() {
      window.location.href = isSystemAdmin ? '/system/admin' : '/admin'
    },
    changePass() {
      //修改密码弹框
      this.loginDialog = true
    },
    changePassword() {
      //修改密码
      let data = formSerialize(this.$refs.passForm, {
        hash: true,
      })
      ;(isSystemAdmin ? systemChangePass : changePass)(data)
        .then(res => {
          this.$message.success('修改密码成功！')
          this.loginDialog = false
          window.location.href = '../'
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    goPage(item) {
      if (typeof item == 'string') {
        location.href = item
        return
      }
      if (item.name != this.currentPlant) {
        location.href = urlJoin(item.base_url, 'admin')
      } else {
        this.$message.error('你正处在该平台')
      }
    },
    showMore() {
      this.showMoreTop = !this.showMoreTop
    },
    handleCommand(url) {
      Cookies.set('token', sessionStorage.token, {
        expires: 1,
        path: '/',
        domain: global.restUrl_system.replace('http://', '.'),
      })
      location.href = url + '/common/admin'
    },
    ...mapMutations(['updateUser', 'openXData', 'closeXData']),
  },
}
</script>

<template lang="pug">
.div
  //- .alltop(:class="{showMoreTop:showMoreTop}" )
  .alltop(:class="{showMoreTop:showMoreTop}" @mouseleave="showMoreTop=false")
    ul.otherTop
      li(@click='goPage("/common/admin")' :class="{active:isBase}")
        .content
          p.title
          p.name 基础设置
      li(:class='{active:item.is_current}' v-for="item in outlink" @click='goPage(item)')
        .content
          p.title {{item.title}}
          p.name {{item.name}}
    header.header
      .left(v-text="left" @click="showMore")
      .content(v-if="plantInfo && !isXDataVisible") （{{plantInfo.name}}）
      .right(v-if="userInfo")
        el-dropdown(v-if="type != 'system'" @command="handleCommand")
          span(class="el-dropdown-link") 平台切换
            i(class="el-icon-arrow-down el-icon--right")
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(v-for="item in userInfo.publishers" :key="item.id" :command="item.base_url" :disabled="publisher.id==item.id") {{item.name}}
        span.user {{userName}}
        span.logoutBtn(@click="logout") 退出登录
        span.logoutBtn(@click="changePass") 修改密码
        span.logoutBtn(@click="backHome") 返回首页
        //- span.loginBtn(v-if="!$config.userInfo"   @click="loginDialog = true" ) 登录
        //- 修改密码
        el-dialog(
          :visible.sync="loginDialog"
          width="420px"
          :close-on-click-modal="false"
          :lock-scroll= "false"
          :before-close="handleClose"
          :append-to-body="true"
        )
          .top(slot="title")
            el-tabs(value="pass")
              el-tab-pane(label="修改密码" name="pass")
          form.passContent(ref='passForm')
            .group
              .label 旧密码:
              input.form-control(:value="passData.old_pass" name="old_pass" type="password")
            .group
              .label 新密码:
              input.form-control(:value="passData.new_pass" name="new_pass" type="password")
            .group
              .label 新密码确认:
              input.form-control(:value="passData.new_pass_confirm" name="new_pass_confirm" type="password")
              //- img.codeimg( @click="changeCode($event)"  src="/dev/user/getCode" )
          span.dialog-footer(slot="footer")
            el-button(  @click="loginDialog = false" ) 取 消
            el-button(  type="primary" @click="changePassword") 确 定
</template>


<style lang="stylus" scoped>
.el-dropdown-link
  cursor pointer
  color #009882
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover
  color #009882
.el-dropdown-menu__item
  min-width 120px
  text-align center
.el-icon-arrow-down
  font-size 12px
ul, li
  margin 0
  padding 0
.passContent
  .group
    margin-bottom 20px
    line-height 35px
    .label
      width 120px
      padding-right 20px
      display inline-block
      text-align right
    .des
      text-align right
      display inline-block
      width 50px
      margin-right 20px
    input
      width 200px
    .codeimg
      vertical-align middle
.header
  background #373d41
  line-height 50px
  color #fff
  font-size 16px
  min-width 1000px
  text-align center
  height 50px
  .left
    height 50px
    width 250px
    text-align center
    float left
    cursor pointer
    // margin-left 150px
    // &:hover
    // background #202020
  .content
    display inline-block
    text-align center
    height 50px
    background #373d41
    text-align center
  .right
    float right
    user-select none
    .user
      color #009882
    >span
      padding 0 13px
      display inline-block
      height 50px
      cursor pointer
      font-size 14px
      &:hover
        background #202020
.otherTop
  height 70px
  // padding-left 70px
  background #434B5A
  z-index 111
  white-space nowrap
  li
    cursor pointer
    display inline-block
    width 116px
    height 70px
    text-align center
    position relative
    color #8C96A5
    .content
      width 100%
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      .name
        font-size 14px
        margin-top 5px
    &.active
      background #3A4251
      color #44c3aa
.alltop
  position fixed
  top 0px
  width 100%
  height 120px
  z-index 301
  transform translateY(-70px)
  transition transform 0.5s ease-in-out
  &.showMoreTop
    transition transform 0.5s ease-in-out
    transform translateY(0px)
</style>
