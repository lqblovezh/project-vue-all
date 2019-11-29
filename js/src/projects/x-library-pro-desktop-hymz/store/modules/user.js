// import { home } from 'services/x-library/implement/hymz'
import { SET_USER_INFO } from '../types'

export default {
  namespaced: true,
  state: {
    info: null
  },
  getters: {
    userInfo(state) {
      return state.info || {}
    }
  },
  mutations: {
    [SET_USER_INFO](state, data) {
      state.info = data
    }
  },
  actions: {}
}
