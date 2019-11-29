<template lang="pug">
.ui-header.flex-ac.c-f.f18(:class="['c-bg-'+type, {'ui-header--ios': isShowLine}]")
  .ui-header__left
    .icon-back(@click="back" v-show="!hideBack")
    slot
  .ui-header__center.tc.ellipsis(v-if="!isUserDefined") {{ text }}
  .ui-header__center.tc(v-else)
    slot(name="center")
  .ui-header__right.tr
    slot(name="right")
</template>
<script>
import { isIos } from '@/common/js/base'
import { mapState } from 'vuex'
export default {
  props: {
    type: {
      type:String,
      default: 'theme'
    },
    hideBack: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
    },
    // 用户是否自定义返回事件
    userBack: {
      type: Boolean,
      default: false
    },
    // 使用用户定义的中心内容
    isUserDefined: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      isEditMode: state => state.editMode
    }),
    isShowLine() {
      return isIos()
    }
  },
  methods: {
    back() {
      if (this.isEditMode) {
        return
      } else if (this.userBack) {
        this.$emit('back-event')
      } else {
        this.$back()
      }
    }
  }
}
</script>
<style lang="stylus">
.ui-header--ios
  top 0.6rem
.ui-header
  position fixed
  width 100%
  height 0.88rem
  padding 0 0.3rem
  box-sizing border-box
  box-shadow 0 0 3px rgba(0,0,0,.1)
  z-index 11
  &.c-bg-transparent
    background-color transparent
  &__left
    min-width 20%
    >.icon-back
      margin-right 0.2rem
  &__center
    flex 1
  &__right
    min-width 20%
  .header-link
    font-size 14px
</style>
