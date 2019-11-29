<script type="text/javascript">
export default {
  data(){
    return {
      url: global.config.xDataUrl
    }
  },
}
</script>

<template lang="pug">
div
  iframe(:src="url")
</template>

<style lang="stylus" scoped>
div
  position relative
  iframe
    margin-top 50px
    min-width 1903px
    height 100%
    min-height 906px
</style>
