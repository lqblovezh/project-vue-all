import { SET_QUOTE_LIST } from '../types'
import * as services from 'services/x-library-pro/implement/hymz'
module.exports = {
	namespaced: true,
	state: {
    quote_list: [],
    page: {
			pageStart: 0,
			pageOffset: 5
		},
    isLoaded: false
	},
	mutations: {
		[SET_QUOTE_LIST](state, data) {
			state.quote_list = data
		}
	},
	actions: {
    async queryQuoteList({ state, commit }, {
      clean = false,
			offset = 5
    } = {}) {
      try {
				if (clean) {
					state.page = {
						pageStart: 0,
						pageOffset: offset
					}
					state.isLoaded = false
				}
				const { data, page } = await services.info.queryQuoteList({
					...state.page
				})
				let list = clean ? [] : state.quote_list
				list = [...list, ...data]
				state.page.pageStart = list.length
				if (page.total === list.length) {
					state.isLoaded = true
				}
				commit(SET_QUOTE_LIST, list)
			} catch (e) {
				console.info(e.toString())
      }
		}
	}
}
