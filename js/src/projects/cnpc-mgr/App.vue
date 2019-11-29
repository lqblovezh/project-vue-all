<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as authority from 'services/x-publish/menu'
import {getUserInfo} from 'services/x-publish/common'

export default {
  name: "App",
  async created(){
    let user =  getUserInfo()
    await this.getAuthority()//获取权限列表
  },
  methods: {
    async getAuthority() {
      await authority.menu().then(res => {
        this.updateAuthority(res.data)
        this.updateUser(getUserInfo())
      }).catch(({ payload, message }) => {
          this.$message.error((payload && payload.message) || message)
        })
    },
    ...mapMutations(['updateUser','updateAuthority'])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
