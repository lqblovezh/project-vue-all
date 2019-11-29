<template lang="pug">
v-page(title="帮助中心" class="page-of-help" hide-right)
  .content(v-html="content")
</template>
<script>
import * as services from 'services/x-library-pro/implement/sbck/helpCenter'
export default {
  data () {
    return {
      content: ''
    }
  },
  mounted() {
    this.queryInfo()
  },
  methods: {
    async queryInfo () {
      try {
        const content = await services.getHelpInfo()
        this.content = content
      } catch(e) {}
    }
  }
}
</script>
<style lang="stylus" scoped>
.page-of-help
  .content
    padding 0.3rem
    color #333
    font-size 14px
    line-height 1.5
</style>
