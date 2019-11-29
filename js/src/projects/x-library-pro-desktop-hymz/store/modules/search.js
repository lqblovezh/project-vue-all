import { SET_SEARCH_RESULT } from '../types'
import { Loading } from 'element-ui'
import * as services from 'services/x-library-pro/implement/hymz'

const PAGEOFFSET = 10
module.exports = {
  namespaced: true,
  state: {
    // 搜索结果
    list: [],
    AdvTypes: [],
    types: [],
    pageShow: false,
    page: {
      pageNum: 1,
      pageOffset: PAGEOFFSET,
      total: 1,
    },
  },
  mutations: {
    [SET_SEARCH_RESULT](state, data) {
      state.list = data
    },
    changeType(state, types) {
      state.types = types
    },
    resetPage(state, data) {
      state.pageShow = false
      state.page = {
        pageNum: 1,
        pageOffset: PAGEOFFSET,
        total: 1,
      }
    },
  },
  actions: {
    async searchType({ commit }) {
      await services.search.querySearchType().then(res => {
        commit('changeType', res.data)
        commit('home/setQrcodeUrl', res.qrcodeUrl, { root: true })
      })
    },
    /**
     * 搜索类型
     */
    async searchAdvType({ state }) {
      await services.search.querySearchType({ type: 'advanced' }).then(res => {
        state.AdvTypes = res.data
      })
    },
    /**
     * 搜索类型
     */
    async queryResultWithNormal({ state, commit }, { ...args } = {}) {
      let loading = Loading.service({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: 'Loading',
      })
      try {
        const { data, page } = await services.search.querySearchResultList({
          ...state.page,
          ...args,
        })
        services.search
          .querySearchResultPage({
            ...state.page,
            ...args,
          })
          .then(res => {
            state.page.total = res.data.page_count
            state.page.count = res.data.count
            state.pageShow = true
            state.page.pageNum = parseInt(args.pageNum) || 1
          })
        state.page.pageNum = page.num
        loading.close()
        commit(SET_SEARCH_RESULT, data)
      } catch (e) {
        loading.close()
        console.info(`${e.toString()}`)
      }
    },
    /**
     * 高级搜索
     */
    async queryAdvResultList({ commit, state }, { ...args } = {}) {
      let loading = Loading.service({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: 'Loading',
      })
      try {
        const { data, page } = await services.search.querySearchAdvResultList({
          ...state.page,
          ...args,
        })
        services.search
          .querySearchAdvResultPage({
            ...state.page,
            ...args,
          })
          .then(res => {
            state.page.total = res.data.page_count
            state.page.count = res.data.count
            state.pageShow = true
            state.page.pageNum = parseInt(args.pageNum) || 1
          })
        loading.close()
        // state.page.total = page.total
        state.page.pageNum = page.num
        commit(SET_SEARCH_RESULT, data)
      } catch (e) {
        loading.close()
        console.info(`${e.toString()}`)
      }
    },
  },
}
