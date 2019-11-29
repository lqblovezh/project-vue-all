import * as util from './util'
import config from '@/config'
import router from '../router'
import comps from '@/components/common'
import { platInfo } from 'services/x-publish/common'
import { isLogin } from 'services/common/manager'
import { addFavicon } from 'projects/common/util'
import progress from 'projects/x-publish-mgr/util/progress'

export default function(Vue) {
  for (const key in util) {
    if (util.hasOwnProperty(key)) {
      Vue.prototype['$' + key] = util[key]
      // console.log(Vue.prototype['$' + key])
    }
  }
  installGlobalComponents(Vue)
  initMain(Vue)
}

export function installGlobalComponents(Vue) {
  for (const comp in comps) {
    if (comps.hasOwnProperty(comp)) {
      const item = comps[comp]
      if (item.name) {
        Vue.use(item)
        // Vue.component(item.name, item)
      } else {
        Vue.component(comp, item)
      }
    }
  }
}

function initMain(Vue) {
  Vue.prototype.$config = config //全局配置文件
  Vue.use(progress) //进度插件
  if (process.env.NODE_ENV === 'development') {
    global.log = console.log
    global.dir = console.dir
  } else {
    global.log = _ => ''
    global.dir = _ => ''
  }
  router.beforeEach(async (to, from, next) => {
    try {
      await isLogin().then(res => {
        sessionStorage.userFlag = 'true'
        Vue.prototype.$config.userInfo = res.data
      })
      if (!Vue.prototype.$config.plantInfo) {
        await platInfo().then(res => {
          const { application } = res.data
          Vue.prototype.$config.plantInfo = application
          let icon = application && application.icon_absolute
          addFavicon(icon)
        })
      }
      next()
    } catch (error) {
      console.log(error)
      // location.href = '../'
    }
  })

  // 用于关闭全局input输入时的默认提示
  Vue.mixin({
    data() {
      return {
        searchQuery: {},
      }
    },
    mounted() {
      this.$nextTick(() => {
        let node = document.querySelectorAll('input')
        node.forEach(item => {
          item.setAttribute('autocomplete', 'off')
        })
      })
    },
    methods: {},
  })
}
