import * as globalFunctions from './utils'
import * as directives from './directives'

const utils = {
  install(Vue) {
    injectGlobalDir(Vue)
    injectGloablFunc(Vue)
  }
}


function injectGloablFunc(Vue) {
  for (let name in globalFunctions) {
    if (Vue.prototype[`$${name}`]) {
      throw new Error(`You had defined a repated function named ${name}`)
    } else {
      Vue.prototype[`$${name}`] = globalFunctions[name]
    }
  }
}

function injectGlobalDir(Vue) {
  for (let directive in directives) {
    Vue.directive(directive, directives[directive])
  }
}

export default utils