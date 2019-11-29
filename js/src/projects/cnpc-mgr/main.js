import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import globalUtil from './util'
import vali from './util/vali'
import './assets/css/index'

Vue.use(ElementUI)
Vue.use(globalUtil)
Vue.use(vali)

async function main() {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  })
}

main()
