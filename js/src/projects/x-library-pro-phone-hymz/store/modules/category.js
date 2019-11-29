import { SET_COUNTRIES, SET_CATEGORY_LIST, SET_CATEGORY_BOOK_LIST } from '../types'
import * as services from 'services/x-library-pro/implement/hymz'

module.exports = {
  namespaced: true,
  state: {
    countries: [],
    category_list: [],
    page: {
      pageStart: 0,
      pageOffset: 10,
      pageNum: 1,
      total: 0,
    },
    isLoaded: false
  },
  mutations: {
    [SET_COUNTRIES](state, data) {
      state.countries = data
    },
    [SET_CATEGORY_LIST](state, data) {
      state.category_list = data
    }
  },
  actions: {
    async queryCountries({ commit }) {
      try {
        const { data } = await services.category.queryCountries()
        commit(SET_COUNTRIES, data)
      } catch(e) {
        console.error(e.toString())
      }
    },
    async queryCategoryList({ commit, dispatch }, {
      autoQuerySub = false,
      ...args
    } = {}) {
      try {
        const { data } = await services.category.queryCategoryList()
        commit(SET_CATEGORY_LIST, convertListFormat(data))
      } catch (e) {
        console.error(`[vuex queryCategoryList]: ${e.toString()}`)
      }
    }
  }
}

function convertListFormat(list) {
  return list.map(item => {
    return {
      label: item.name,
      ...item
    }
  })
}
