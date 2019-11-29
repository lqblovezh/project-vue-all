import * as globalComponents from './modules'

let modules = {
  install(Vue) {
    for (let i in globalComponents) {
      Vue.component(globalComponents[i].name || i, globalComponents[i])
    }
  },
}

export default modules
