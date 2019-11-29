import { SET_USER_INFO, SET_ORDER_LIST, SET_HISTORY_LIST, SET_COMMENT_LIST, SET_ANNOTATION_LIST, SET_VIP_PRIVILEGE } from '../types'
import * as services from 'services/x-library-pro/implement/hymz'
module.exports = {
	namespaced: true,
	state: {
		userInfo: {},
		orderList: [],
		history_list: [],
		comment_list: [],
		annotation_list: [],
		vip_privilege: [],
		vip_list: [],
		page: {
			pageStart: 0,
			pageOffset: 15
		},
		isLoaded: false
	},
	mutations: {
		[SET_USER_INFO](state, data) {
			state.userInfo = data
		},
		[SET_ORDER_LIST](state, data) {
			state.orderList = data
		},
		[SET_HISTORY_LIST](state, data) {
			state.history_list = data
		},
		[SET_COMMENT_LIST](state, data) {
			state.comment_list = data
		},
		[SET_ANNOTATION_LIST](state, data) {
			state.annotation_list = data
		},
		[SET_VIP_PRIVILEGE](state, data) {
			state.vip_privilege = data
		}
	},
	actions: {
		async isUserLogin(ctx) {
			try {
				const { data } = await services.user.isLogin()
				ctx.commit(SET_USER_INFO, data)
			} catch (e) {
				console.error(`[vuex isUserLogin]: ${e.toString()}`)
			}
		},
		async logout({ commit }) {
			sessionStorage.setItem('token', '')
			localStorage.setItem('token', '')
			commit(SET_USER_INFO, {})
		},
		/**
		 * 交易记录
		 */
		async queryOrderList({ state, commit }, {
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
				const { data, page } = await services.user.queryOrderList({
					...state.page
				})
				let list = clean ? [] : state.orderList
				list = [...list, ...data]
				state.page.pageStart = list.length
				if (page.total === list.length) {
					state.isLoaded = true
				}
				commit(SET_ORDER_LIST, list)
			} catch (e) {
				console.info(e.toString())
			}
		},
		/**
		 * 阅读历史
		 */
		async queryHistoryList({ state, commit }, {
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
				const { data, page } = await services.user.queryHistoryList({
					...state.page
				})
				let list = clean ? [] : state.history_list
				list = [...list, ...data]
				state.page.pageStart = list.length
				if (page.total === list.length) {
					state.isLoaded = true
				}
				commit(SET_HISTORY_LIST, list)
			} catch (e) {
				console.info(e.toString())
			}
		},
		/**
		 * 评论列表
		 */
		async queryCommentList({ state, commit }, {
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
				const { data, page } = await services.user.queryCommentList({
					...state.page
				})
				let list = clean ? [] : state.comment_list
				list = [...list, ...data]
				state.page.pageStart = list.length
				if (page.total === list.length) {
					state.isLoaded = true
				}
				commit(SET_COMMENT_LIST, list)
			} catch (e) {
				console.info(e.toString())
			}
		},
		/**
		 * 我的批注
		 */
		async queryAnnotationList({ state, commit }, {
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
				const { data, page } = await services.user.queryAnnotationList({
					...state.page
				})
				let list = clean ? [] : state.annotation_list
				list = [...list, ...data]
				state.page.pageStart = list.length
				if (page.total === list.length) {
					state.isLoaded = true
				}
				commit(SET_ANNOTATION_LIST, list)
			} catch (e) {
				console.info(e.toString())
			}
		},
		/**
		 * 特权介绍
		 * @param  {[type]}  commit [description]
		 * @return {Promise}        [description]
		 */
		async queryVipPrivilege({ commit }) {
			try {
				const { data } = await services.user.queryVipPrivilege()
				commit(SET_VIP_PRIVILEGE, data)
			} catch(e) {}
		}
	}
}
