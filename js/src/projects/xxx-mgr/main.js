import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI)

async function main () {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}

main()
