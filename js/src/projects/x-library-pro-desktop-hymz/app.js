import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/stylus'
import { Message } from 'element-ui'
import * as services from 'services/x-library-pro/implement/hymz'
import { getRouteObj } from './utils/utils'
import GlobalFunc from './utils'
import GlobalComponents from './components'
Vue.use(ElementUI)
Vue.use(GlobalFunc)
Vue.use(GlobalComponents)
Vue.prototype.$services = services

export function createApp() {
  const store = createStore()
  const router = createRouter()
  router.beforeEach(async (to, from, next) => {
    let token = sessionStorage.getItem('token')
    let user = store.getters['user/userInfo']
    if (token && !Object.entries(user).length) {
      await services.user
        .isLogin()
        .then(res => {
          store.commit('user/SET_USER_INFO', res.data)
        })
        .catch(err => {
          sessionStorage.clear()
          localStorage.clear()
        })
    }
    globalRouterHandler({ to, from, next }, router, store)
  })
  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App),
  })
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

function globalRouterHandler({ to, from, next }, router, store) {
  if (to.matched && to.matched.some(record => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    if (global.sessionStorage) {
      if (!sessionStorage.getItem('token')) {
        store.commit('panel/TOGGLE_LOGIN_PANEL', true)
        // Message({ message: '请先登录!', type: 'warning', showClose: true })
        if (location.href.indexOf(to.path) > -1) {
          next(getRouteObj('/home'))
        }
      } else {
        let user = store.getters['user/userInfo']
        let checkVip =
          to.matched && to.matched.some(record => record.meta.checkVip)
        if ((!user || !user.vip) && checkVip) {
          store.commit('panel/TOGGLE_VIP_PANEL', true)
          if (location.href.indexOf(to.path) > -1) {
            next(getRouteObj('/home'))
          }
          return
        }
        next()
      }
    } else if (global.apitoken) {
      next()
    } else {
      store.commit('panel/TOGGLE_LOGIN_PANEL', true)
      // Message({ message: '请先登录!', type: 'warning', showClose: true })
      next(getRouteObj('/home'))
    }
  } else {
    next()
  }
}
