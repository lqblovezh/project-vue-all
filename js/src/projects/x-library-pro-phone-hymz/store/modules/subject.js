import { SET_SUBJECT_LIST, SET_SUBJECT_DETAIL } from '../types'
import * as services from 'services/x-library-pro/implement/hymz'

module.exports = {
	namespaced: true,
	state: {
		list: [],
		info: {},
		page: {},
		isLoaded: false
	},
	mutations: {
		[SET_SUBJECT_LIST](state, data) {
			state.list = data
		},
		[SET_SUBJECT_DETAIL](state, data) {
			state.info = data
		}
	},
	actions: {
		async queryAllSubjectList({ commit, state }, {
			clean = false,
			offset = 10,
			...arg
		} = {}) {
			try {
				if (clean) {
					state.page = {
						pageStart: 0,
						pageOffset: offset
					}
					state.isLoaded = false
				}
				const { data, page } = await services.subject.queryAllSubjectList({ ...state.page })
				let list = clean ? [] : state.list
				list = [...list, ...data]
				state.page.pageStart = list.length
				if (page.total === list.length) {
					state.isLoaded = true
				}
				commit(SET_SUBJECT_LIST, list)
			} catch (e) {
				console.info(e.toString())
			}
		},
		async querySubjectInfo(ctx, payload) {
			try {
				const { data } = await services.subject.querySubjectInfo(payload)
				ctx.commit(SET_SUBJECT_DETAIL, data)
			} catch (e) {}
		}
	}
}