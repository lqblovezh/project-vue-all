<script>
import { isIos } from '@/common/js/base'
export default {
  computed: {
    isShowLine() {
      return isIos()
    }
  }
}
</script>
<template lang="pug">
.second-router
  .page-line(v-if="isShowLine")
  router-view
</template>
<style lang="stylus">
.second-router
  font-size 16px
  .page-line
    position fixed
    top 0
    left 0
    width 100%
    height 0.6rem
    background-color #009882
    z-index 99
</style>
