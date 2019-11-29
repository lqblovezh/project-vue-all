import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'

export function createApp() {
  const store = createStore()
  const router = createRouter()

  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App),
  })
  return { app, store, router }
}
