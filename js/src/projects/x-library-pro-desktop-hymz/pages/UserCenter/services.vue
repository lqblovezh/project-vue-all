<script>
import { mapState } from 'vuex'

export default {
  asyncData({ store, route }) {
    store.dispatch('home/queryServicesInfo')
  },
  computed: {
    ...mapState('home', {
      info: state => state.servicesInfo,
    }),
  },
}
</script>

<template lang="pug">
.services.container
  .content(v-html="info")
</template>

<style lang="stylus" scoped>
.services
  padding 90px 0
  .content
    >>> p
      margin 5px 0
      line-height 1.5em
</style>
