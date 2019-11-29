<template lang="pug">
p.seearch-result-title(v-html="innerStr")
</template>
<script>
export default {
  props: {
    keyName: String,
    str: {
      type: String,
      required: true,
    },
  },
  computed: {
    innerStr() {
      return this.str.replace(this.keyName, `<span>${this.keyName}</span>`)
    },
  },
}
</script>
<style lang="stylus">
.seearch-result-title
  margin-bottom 20px
  font-size 18px
  color #c79846
  >span
    color #f00
</style>
