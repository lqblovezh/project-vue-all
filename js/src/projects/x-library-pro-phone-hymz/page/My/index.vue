<template lang="pug">
.first-my
  v-page(title="我的" hide-back scroll-type="center")
    .scroll-full.c-bg-main
      .my-info.flex-bs.c-bg-f(@click="isLogin")
        .my-info__left.flex-ac
          img(:src="userInfo.picture" v-if="userInfo && userInfo.picture")
          img(src="@/static/img/avatar.png" v-else)
          p {{ userInfo.username }}
            .icon-expert(v-if="userInfo.expert")
        .icon-edit(v-show="'name' in userInfo" @click.stop="$go('my/info')")
      .my-menu.c-bg-f
        ui-cell(label="阅读历史" icon-class="history" type="jump" to="my/read-history" is-link)
        ui-cell(label="我的会员" icon-class="vip" type="jump" to="my/vip" is-link)
        ui-cell(label="引用记录" icon-class="record" type="jump" to="my/quote-record" is-link)
        ui-cell(label="我的批注" icon-class="annotation" type="jump" to="my/annotation" is-link)
        ui-cell(label="我的评论" icon-class="comment" type="jump" to="my/comment" is-link)
        ui-cell(label="系统设置" icon-class="setting" type="jump" to="my/system-setting" is-link)
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo
    })
  },
  methods: {
    isLogin() {
      for (let i in this.userInfo) {
        return false
      }
      this.$push('/login')
    }
  }
}
</script>
<style lang="stylus">
.first-my
  .my-info
    padding 0.5rem 0.3rem
    margin-bottom 0.2rem
    &__left
      p
        margin-left 0.3rem
        span
          margin-left 0.1rem
    img
      width 1.2rem
      height 1.2rem
      border-radius 50%
  .my-menu
    .ui-cell
      height 1rem
  .ui-cell
    &:not(:last-child)
      >div
        border-bottom 1px solid #ebf2f1
</style>
