import {
  SET_COUNTRIES,
  SET_CATEGORY_LIST,
  SET_CATEGORY_BOOK_LIST,
} from '../types'
import { Loading } from 'element-ui'
import * as services from 'services/x-library-pro/implement/hymz'

export default {
  namespaced: true,
  state: {
    countries: [],
    category_list: [],
    book_list: [],
    page: {
      pageNum: 1,
      pageOffset: 10,
      total: 1,
    },
    pageShow: false,
  },
  getters: {
    getListByLength: state => type => {
      let data = JSON.parse(JSON.stringify(state.countries))
      if (type) {
        return state.countries
      } else {
        return data.splice(0, 5)
      }
    },
  },
  mutations: {
    [SET_COUNTRIES](state, data) {
      state.countries = data
    },
    [SET_CATEGORY_LIST](state, data) {
      state.category_list = data
    },
    [SET_CATEGORY_BOOK_LIST](state, data) {
      state.book_list = data
    },
  },
  actions: {
    async init({ state, dispatch, commit }, args) {
      await dispatch('queryCountries')
      await dispatch('queryCategoryList', args.id)
      const list = state.category_list
      let id = !args.id ? list[0].id : args.id
      await dispatch('queryBookList', { ...args, id })
      // if (array && array.length === 2) {
      //   let sid = state.category_list[array[0]].chlidren[array[1]].id
      // }
    },
    async queryCountries({ commit }) {
      try {
        const { data } = await services.category.queryCountries()
        commit(SET_COUNTRIES, data)
      } catch (e) {
        console.error(e.toString())
      }
    },
    async queryCategoryList({ commit }, id) {
      try {
        const { data } = await services.category.queryCategoryList()
        commit(SET_CATEGORY_LIST, data)
      } catch (e) {
        console.error(e.toString())
      }
    },
    async queryBookList({ state, commit }, { clean = false, ...args } = {}) {
      let loading = Loading.service({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: 'Loading',
      })
      try {
        if (clean) {
          state.page.pageNum = 1
        }
        if (!args.id) {
          args.sid = state.category_list && state.category_list[0].id
        } else {
          args.sid = args.id
        }
        const { data, page } = await services.book.queryBookListByCategoryId({
          ...state.page,
          ...args,
        })
        state.page.total = page.total
        state.page.pageNum = page.num
        state.pageShow = true
        commit(SET_CATEGORY_BOOK_LIST, data)
        loading.close()
      } catch (e) {
        loading.close()
        console.error(e.toString())
      }
    },
  },
}

function getSubCategoryId(list) {
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i] && list[i].chlidren && list[i].chlidren.length) {
      return [i, 0]
    } else {
      continue
    }
  }
  return
}
