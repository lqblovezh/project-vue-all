// import { Message, MessageBox } from 'element-ui'
import comps from './comps'
let gbFunObj

export function installGlobalComponents(Vue) {
  for (const comp in comps) {
    if (comps.hasOwnProperty(comp)) {
      const item = comps[comp]
      // console.log(comp.name)
      Vue.component(item.name || comp, item)
    }
  }
  addMethods(Vue)
}
function addMethods(Vue) {
  // Vue.prototype.$prompt = MessageBox.prompt
  // Vue.prototype.$confirm = MessageBox.confirm
  // Vue.prototype.$alert = MessageBox.alert
}

function getCompConstructor(Vue) {
  if (global.localStorage) {
    let funObj = {}
    for (const name in funComp) {
      if (funComp.hasOwnProperty(name)) {
        //console.log('fun comp', name)
        let CompContructor = Vue.extend(funComp[name])

        funObj[name] = new CompContructor({
          el: document.createElement('div'),
        })
        document.body.appendChild(funObj[name].$el)
      }
    }
    gbFunObj = funObj
  }
}