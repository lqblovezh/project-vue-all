<template lang="pug">
.page-vip
  Header(text="我的会员" :type="headerType")
    a.f14(slot="right" @click="$go('vip/transaction-record')") 交易记录
  .bottom-scroll(:class="{'center-scroll--ios': is_ios}")
    .scroll-full(ref="wrapper" @scroll="scrollHandler")
      .vip-wrapper
        .vip-wrapper__top-panel.vip-bg.pr
          .top-panel__card.pa.container
            .top-panel__card-inner.c-bg-f.flex-bs
              .top-panel__card-left.flex-ac
                img(:src="userInfo.picture")
                .top-panel__card-info
                  p {{ userInfo.username }}
                    span.icon-vip-mark(v-if="userInfo.vip")
                  p.f13(v-if="!userInfo.vip") 开通会员尊享特权
                  p.f13(v-else) {{ userInfo.expire_date }}到期
              button(@click="$go('vip/pay')") {{ userInfo.vip ? '立即续费' : '立即开通'}}
      InfoVipPrivilege
  button.btn-vip(@click="$go('vip/pay')") {{ userInfo.vip ? '立即续费' : '立即开通'}}
</template>
<script>
import { throttle } from '@/common/js/base'
import { mapState } from 'vuex'
import InfoVipPrivilege from '@/components/user/InfoVipPrivilege'
import { isIos } from '@/common/js/base'
export default {
  asyncData({ store, route }) {
    store.dispatch('user/queryVipPrivilege')
  },
  components: { InfoVipPrivilege },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo
    }),
    is_ios () {
      return isIos()
    }
  },
  data () {
    return {
      headerType: ''
    }
  },
  methods: {
    scrollHandler: throttle(function() {
      const target = this.$refs.wrapper
      this.headerType = target.scrollTop > 50 ? 'linear':''
    }, 300)
  }
}
</script>
<style lang="stylus">
.page-vip
  >.center-scroll--ios
    padding-top 0.6rem
  .btn-vip
    position fixed
    bottom 0
  .vip-wrapper
    .top-panel__card
      height 2.2rem
      bottom 0
      width 100%
      box-sizing border-box
      &-info
        margin-left 0.3rem
        >p
          >span
            margin-left 0.1rem
          &:first-child
            color #2e3332
            margin-bottom 0.22rem
          &:last-child
            color #885e25
    .top-panel__card-inner
      height 100%
      padding 0 0.3rem
      border-radius 4px
      box-shadow 0 0 4px rgba(226,199,150, .6)
      img
        width 1.2rem
        height 1.2rem
        border-radius 50%
      button
        width 1.5rem
        height 0.56rem
        border-radius 999px
  button
    width 100%
    height 1rem
    color #5f3702
    background linear-gradient(to right, #f1d29e, #ecc78c, #e7bc79)
</style>
