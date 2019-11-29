import * as services from 'services/x-library-pro/implement/hymz'
import storage from '../../common/js/storage'

const state = {
	// 搜索结果
	list: [],
  type: [],
  page: {
    pageStart: 0,
    pageOffset: 10,
    total: 0
  },
  isLoaded: false,
  isComplete: false
}
const mutations = {
  set_result(state, { clear = false, data, page } = {}) {
    if (clear) {
      state.list = []
      state.page = {
        pageStart: 0,
        pageOffset: 10
      }
      state.isComplete = false
    } else {
      const { offset, start } = page
      state.list = [...state.list, ...data]
      state.page.pageStart = start + offset
      if (state.list.length >= state.page.total) {
        state.isLoaded = true
      }
      state.isComplete = true
    }
	},
	changeType(state,type){
		state.type = type
	}
}
const actions = {
	async searchType({ commit }, args) {
		commit('changeType', [])
		await services.search.querySearchType({ ...args }).then(res=>{
			commit('changeType',res.data)
		})
	},

  async queryResultWithNormal({ state, commit }, {
    keyword,
    clean = false,
    ...arg
  } = {}) {
    storage.add(keyword)
    if (clean) {
      state.isLoaded = false
      state.list = []
    }
    try {
      const { data: { count } } = await services.search.querySearchResultPage({
        keyword,
        ...arg
      })
      state.page.total = count
      const { data, page } = await services.search.querySearchResultList({
        pageStart: state.page.pageStart,
        pageOffset: state.page.pageOffset,
        keyword,
        ...arg
      })
			commit('set_result', { data, page })
		} catch (e) {
			console.info(`${e.toString()}`)
		}
	},
	/**
	 * 高级搜索
	 */
  async queryAdvResultList({ commit }, {
    clean = false,
    ...form
  } = {}) {
    if (clean) {
      state.isLoaded = false
      state.list = []
    }
    try {
      services.search
        .querySearchResultPage({
          keyword,
          ...arg
        }).then(res => {
          const {
            data
          } = res
          state.page.total = data.count
        })
      const { data, page } = await services.search.querySearchAdvResultList({
        pageStart: state.page.pageStart,
        pageOffset: state.page.pageOffset,
        ...form
      })
			commit('set_result', { data , page })
		} catch(e) {
			console.info(`${e.toString()}`)
		}
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}
