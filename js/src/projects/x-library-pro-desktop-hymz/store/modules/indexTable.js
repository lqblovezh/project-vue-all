import * as services from 'services/x-library-pro/implement/hymz'
import { Loading } from 'element-ui'

export default {
  namespaced: true,
  state: {
    indexTableList: [],
    page: {
      pageNum: 1,
      pageOffset: 10,
      total: 0,
    },
  },
  mutations: {
    SET_INDEX_TABLE_LIST(state, data) {
      state.indexTableList = data
    },
  },
  actions: {
    async queryIndexList({ state, commit }, { clean = false, ...args } = {}) {
      let loading = Loading.service({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: 'Loading',
      })
      try {
        const { data, page } = await services.category.getIndexTableList({
          ...state.page,
          ...args,
        })
        commit('SET_INDEX_TABLE_LIST', data)
        loading.close()
      } catch (e) {
        console.error(e.toString())
        loading.close()
      }
    },
  },
}
