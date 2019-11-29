import {
  TOGGLE_LOGIN_PANEL,
  TOGGLE_REGISTER_PANEL,
  TOGGLE_PASS_PANEL,
} from '../store/types'
import urlJoin from 'url-join'
import Reader from 'projects/x-library-pro-desktop-hymz/components/common/Reader'
import Vue from 'vue'
const { ec } = __PROJECT_INFO__

export {
  globalUpdateFile,
  isFileBig,
} from 'projects/x-library-pro-mgr/util/util'

export function toggleLoginPanel(status = true) {
  this.$store.commit(`panel/${TOGGLE_LOGIN_PANEL}`, status)
}

export function toggleRegisterPanel(status = true) {
  this.$store.commit(`panel/${TOGGLE_REGISTER_PANEL}`, status)
}

export function togglePassPanel(status = true) {
  this.$store.commit(`panel/${TOGGLE_PASS_PANEL}`, status)
}

export function toggleModifyPanel(status = true) {
  this.$store.commit('panel/TOGGLE_MODIFY_PANEL', status)
}

export function togglePhonePanel(status = true) {
  this.$store.commit('panel/TOGGLE_PHONE_PANEL', status)
}

export function resetUserInfo() {
  if (this.$route.meta && this.$route.meta.requireAuth) {
    this.$go('/home')
  }
  sessionStorage.setItem('token', '')
  localStorage.setItem('token', '')
  this.$store.commit('user/SET_USER_INFO', null)
  if (ec) {
    this.$store.dispatch('home/queryJumpInfo')
  }
}

export function push(path, query = {}, params = {}) {
  this.$router.push({ path, query, params })
}

export function pushWithName(name, query = {}, params = {}) {
  this.$router.push({ name, query, params })
}

export function go(path, query = {}, params = {}) {
  let obj = getRouteObj(path, query, params)
  this.$router.push(obj)
}
export function getRouteObj(path, query = {}, params = {}) {
  return {
    path: urlJoin(baseUrl, path),
    query,
    params,
  }
}

export function recursive(array) {
  let temp = array.find(item => item.expand)
  return []
}

// return (temp.chlidren && temp.chlidren.length) ? [temp] : [temp, ...recursive(temp.chlidren)]

/**
 * 获取书籍的access_code
 * 并进入阅读器
 * @param {String} id 默认id
 * @param {String} product_id 产品id
 * @param {String} book_id 书籍id
 */
export async function goRead({ readerId, params = {} } = {}) {
  try {
    let ReaderPanel = Vue.extend(Reader)
    let panel = new ReaderPanel({
      propsData: {
        readerId,
        params,
      },
      methods: {
        close() {
          document.body.removeChild(panel.$el)
          panel.reader.unmount()
          panel.reader = null
          panel.readerDialog = false
        },
      },
    })
    panel.readerDialog = true
    panel.$mount()
    document.body.appendChild(panel.$el)
  } catch (e) {
    this.$message({
      message: e.toString(),
      type: 'error',
    })
  }
}

export function isUserLogin() {
  if (this.$store.state.user.info) {
    return true
  }
  toggleLoginPanel.call(this)
  return false
}

export function highlight(str, keyword, num = 200) {
  let oldStr = str
  if (!str) {
    return str
  }
  if (keyword) {
    let index = str.indexOf(keyword)
    if (index > -1) {
      str = str.substring(index - num / 2, index + num / 2)
    } else {
      str = str.substring(0, num)
    }
    if (str.length >= num) {
      str += '...'
    }
  } else {
    str = str.substring(0, num)
    if (oldStr.length > num) {
      str += '...'
    }
  }
  return typeof keyword !== 'undefined'
    ? str.replace(new RegExp(keyword, 'g'), `<span>${keyword}</span>`)
    : str
}
