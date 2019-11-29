
<script>
import moduleName from 'vuex'
import { mapState, mapMutations, mapActions } from 'vuex'
import TheFooter from '@/components/common/TheFooter.vue'

export default {
  components: { TheFooter },
  mounted() {
    this.isUserLogin()
  },
  methods: {
    ...mapActions('user', ['isUserLogin'])
  },
}
</script>
<template lang="pug">
#app
  keep-alive
    router-view(v-if="this.$route.meta.alive")
  router-view(v-if="!this.$route.meta.alive")
  TheFooter
</template>
<style lang="stylus">
#app
  font-size 16px
</style>
