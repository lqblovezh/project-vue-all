import Vue from 'vue'
import Vuex from 'vuex'
import panel from './modules/panel'
import user from './modules/user'
import book from './modules/book'
import subject from './modules/subject'
import knowledge from './modules/knowledge'
import userCenter from './modules/userCenter'
import category from './modules/category'
import home from './modules/home'
import search from './modules/search'
import indexTable from './modules/indexTable'

Vue.use(Vuex)
export function createStore() {
  return new Vuex.Store({
    state: {
      showLoginPanel: false,
      showRegisterPanel: false,
    },
    mutations: {},
    actions: {},
    modules: {
      home,
      panel,
      user,
      book,
      subject,
      knowledge,
      userCenter,
      category,
      search,
      indexTable,
    },
  })
}
