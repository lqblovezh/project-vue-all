<template lang="pug">
.layout
  Header(
    :text="title"
    :type="headerType"
    :hide-back="hideBack"
    :user-back="userBack"
    :is-user-defined="userDefine"
    @back-event="$emit('back-event')"
  )
    template(#center)
      slot(name="centerContent")
    template(#right)
      slot(name="rightBtn")
  div(:class="scrollClass")
    slot
</template>
<script>
import { isIos } from '@/common/js/base'
export default {
  name: 'v-page',
  props: {
    title: String,
    headerType: String,
    hideBack: {
      type: Boolean,
      default: false
    },
    scrollType: {
      type: String,
      default: 'top'
    },
    userBack: {
      type: Boolean,
      default: false
    },
    userDefine: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    scrollClass() {
      return `${this.scrollType}-scroll${isIos()?'--ios': ''}`
    }
  }
}
</script>
<style lang="stylus">

</style>
