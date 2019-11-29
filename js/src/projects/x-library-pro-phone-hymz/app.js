import './common/css'
import Vue from 'vue'
import { Toast } from 'mint-ui'
import { sync } from 'vuex-router-sync'
import *  as readerService from 'services/common/reader'

import * as services from 'services/x-library-pro/implement/hymz'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { installGlobalComponents } from './components'
import initGlobalFunc from './common/js/initGlobalFunc'
import { recordRoutePath } from './common/js/base'
import libhistory from './common/js/libhistory'

Vue.use(installGlobalComponents)
Vue.use(initGlobalFunc)

Vue.prototype.$Toast = Toast
Vue.prototype.$libhistory = libhistory
Vue.prototype.$readerService = readerService
Vue.prototype.$services = services

export function createApp() {
  const store = createStore()
  const router = createRouter()
  router.beforeEach((to, from, next) => {
    recordRoutePath(to, from)
    if (to.meta.auth) {
      try {
        if (global.localStorage && !global.localStorage.getItem('token')) {
          next({
            name: 'login'
          })
        } else {
          if (to.meta.is_vip) {
            // 检查是否是vip
            if (store.state.user&&store.state.user.userInfo) {
              const { vip } = store.state.user.userInfo
              if (vip) {
                next()
              } else {
                next({ name: 'vip-buy' })
              }
            }
          } else {
            next()
          }
        }
      } catch (e) {
        console.log(`${e.toString()}----`)
      }
    } else {
      next()
    }
  })
  sync(store, router)
  const app = new Vue({
    store,
    router,
    render: h => h(App),
  })

  // 保持对$suer的便捷引用 , 这里是不行的,
  // 因为store.state.user, 一旦重新赋值, 引用就会变化,
  // Vue.prototype.$user = store.state.user
  return { app, store, router }
}

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      })
    }
  },
  computed: {},
})

// 离开浏览器前做些什么...
if (global.localStorage) {
  global.onbeforeunload = function(e) {
    console.log('leave')
    // e.returnValue = '确定离开当前页面吗？'
  }
}
