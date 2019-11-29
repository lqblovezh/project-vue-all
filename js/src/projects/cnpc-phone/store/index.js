import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import { TOGGLE_EDIT_MODE } from './types'

Vue.use(Vuex)
export function createStore() {
  return new Vuex.Store({
    state: {
      // 各种需要编辑的页面公用的状态
      // 判断是否进入编辑模式
      editMode: false
    },
    mutations: {
      [TOGGLE_EDIT_MODE](state, status) {
        state.editMode = status
      }
    },
    actions: {
      init: ({ commit }, title) => {
        return
      },
    },
    modules: {
      home,
    },
  })
}

