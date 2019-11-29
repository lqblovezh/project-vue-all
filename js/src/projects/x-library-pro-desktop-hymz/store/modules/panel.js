// import { home } from 'services/x-library/implement/hymz'
import * as types from '../types'

export default {
  namespaced: true,
  state: {
    loginStatus: false,
    registerStatus: false,
    passStatus: false,
    modifyStatus: false,
    modifyPhoneStatus: false,
    vipVisible: false,
  },
  mutations: {
    [types.TOGGLE_LOGIN_PANEL](state, status) {
      if (status) {
        state.registerStatus = state.passStatus = state.modifyStatus = false
      }
      state.loginStatus = status
    },
    [types.TOGGLE_REGISTER_PANEL](state, status) {
      if (status) {
        state.loginStatus = state.passStatus = state.modifyStatus = false
      }
      state.registerStatus = status
    },
    [types.TOGGLE_PASS_PANEL](state, status) {
      if (status) {
        state.loginStatus = state.registerStatus = state.modifyStatus = false
      }
      state.passStatus = status
    },
    [types.TOGGLE_MODIFY_PANEL](state, status) {
      if (status) {
        state.loginStatus = state.registerStatus = state.passStatus = false
      }
      state.modifyStatus = status
    },
    [types.TOGGLE_PHONE_PANEL](state, status) {
      state.modifyPhoneStatus = status
    },
    TOGGLE_VIP_PANEL(state, status = false) {
      state.vipVisible = status
    },
  },
  actions: {},
}
