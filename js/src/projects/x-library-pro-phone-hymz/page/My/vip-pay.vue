<template lang="pug">
.vip-pay
  v-page(title="开通会员")
    .pr.c-bg-main
      InfoVipDay(@selectMemberLevel="selectMemberLevel")
      InfoVipPayMethod(v-model="payMethod")
      .pay-footer.flex-bs.c-bg-f
        .pay-footer__left.flex
          p.f15 共计：
          p.price
            span.f16 ￥
            |{{ tatalPrice }}
        button(@click="sendRequest") 确认支付
</template>
<script>
import { mapState } from 'vuex'
import InfoVipDay from '@/components/user/InfoVipDay'
import InfoVipPayMethod from '@/components/user/InfoVipPayMethod'
export default {
  components: { InfoVipDay, InfoVipPayMethod },
  data () {
    return {
      memberLevel: [],
      payMethod: 'alipay'
    }
  },
  computed: {
    tatalPrice() {
      if (this.memberLevel && this.memberLevel.length) {
        const { price } = this.memberLevel[1]
        return price
      }
      return 0
    }
  },
  mounted() {
    const { status } = this.$route.query
    status && this.toast(status)
  },
  methods: {
    toast (status) {
      if (typeof status !== "undefined") {
        this.$Toast({
          message: status ==='success' ? '恭喜您，支付成功' : '支付失败，请重试',
          iconClass: `icon-${status === 'success' ? 'pay-success' : 'pay-failed'}`
        })
      }
    },
    sendRequest() {
      if (this.memberLevel.length < 2) {
        this.$Toast('请选择一项套餐')
        return
      }
      let sid = this.memberLevel[0].id,
          duration = this.memberLevel[1].id
      this.$services.user.pay({
        sid,
        duration,
        source: 'mobile',
        url: window.location.href,
        payType: this.payMethod
      }).then(res => {
        const { data: { url }} = res
        location.href = url
      }).catch(e => {
        console.error(e.toString())
        this.toast('failed')
      })
    },
    selectMemberLevel (data) {
      this.memberLevel = data
    }
  }
}
</script>
<style lang="stylus">
.vip-pay
  &__title
    padding 0.3rem
  .pay-footer
    position fixed
    bottom 0
    height 0.98rem
    width 100%
    box-shadow 0 0 3px #f0f0f0
    &__left
      margin-left 0.3rem
      align-items flex-end
      .price
        color #cc9b44
        font-size 27px
    button
      width 2.4rem
      height 100%
      color #5f3702
      background linear-gradient(to right, #f1d29e, #ecc78c, #e7bc79)
</style>
