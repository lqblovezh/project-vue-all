import { createApp } from './app'
import setToken from 'projects/common/util/setToken'

setToken()
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})
