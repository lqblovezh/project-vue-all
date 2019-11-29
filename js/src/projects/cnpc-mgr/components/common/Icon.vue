<script>

export default {
  props:['type','click'],
  data() {
    return {
    };
  },
  methods:{
    callMethod(param) {
      this.$emit('click')
    }
  },
};
</script>

<template lang="pug">
  span.icon
    i(:class="type" @click='callMethod')
</template>

<style lang="stylus" scoped>
  .icon
    cursor pointer
    margin-right 10px
    color #44c3aa
</style>


