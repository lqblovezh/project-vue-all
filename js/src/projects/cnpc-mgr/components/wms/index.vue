<script>
import Top from 'projects/x-publish-mgr/components/common/Top'
import Menu from '@/components/common/Menu'
import { mapMutations } from 'vuex'

export default {
  components:{Top,Menu},
  data () {
    return {
    }
  },
  computed:{
  },
}
</script>

<template lang="pug">
.div
  Top
  Menu
  .content#content
    router-view
</template>

<style lang="stylus" scoped>
.content
  margin-left 200px
  padding-top 50px
  box-sizing border-box
  transition  all  0.2s ease
  &.mini
    margin-left 51px
    transition  all  0.2s ease
</style>
