<template lang="pug">
.safe-settings.c-bg-main
  v-page(title="安全设置")
    .safe-settings__body.c-bg-f.container
      InfoSafeSettingItem(label="账户密码" tips="建议您定期更换密码，以提高账户安全性" to="safe-settings/update-password")
      InfoSafeSettingItem(label="手机号码" tips="您可通过登录密码来更换账户绑定的手机号" :value="info.phone" to="safe-settings/update-phone")
</template>
<script>
import { mapState } from 'vuex'
import InfoSafeSettingItem from '@/components/user/InfoSafeSettingItem'
export default {
  components: { InfoSafeSettingItem },
  computed: {
    ...mapState('user', {
      info: state => state.userInfo
    })
  }
}
</script>
<style lang="stylus">
.safe-settings
  .safe-settings__body
    >.info-safe-setting-item
      &:not(:last-child)
        border-bottom 1px solid #ebf2f1
</style>
