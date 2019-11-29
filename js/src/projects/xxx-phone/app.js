import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import 'element-ui/'
import './assets/css/reset.css'

import { createStore } from './store'
import { createRouter } from './router'

export function createApp () {
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return { app, store, router }
}
