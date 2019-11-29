
<script>
export default {
  components: {},
  mounted() {},
  methods: {},
}
</script>
<template lang="pug">
#app
  keep-alive
    router-view(v-if="this.$route.meta.alive")
  router-view(v-if="!this.$route.meta.alive")
</template>
<style lang="stylus"></style>
