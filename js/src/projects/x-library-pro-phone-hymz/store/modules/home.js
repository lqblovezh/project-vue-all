import { SET_BANNER, SET_RECOMMEND_SUBJECT, SET_HOT_READ_LIST } from '../types'
import * as services from 'services/x-library-pro/implement/hymz'

module.exports = {
	namespaced: true,
	state: {
		banners: [],
		recommend_subject: [],
		hot_read_list: []
	},
	mutations: {
		[SET_BANNER](state, data) {
			state.banners = data
		},
		[SET_RECOMMEND_SUBJECT](state, data) {
			state.recommend_subject = data
		},
		[SET_HOT_READ_LIST](state, data) {
			state.hot_read_list = data
		}
	},
	actions: {
		async init({ dispatch }) {
			await dispatch('queryBannerList')
			await dispatch('queryRecommendSubjects')
			await dispatch('queryHotReadList')
		},
		async queryBannerList(ctx) {
			try {
				const { data } = await services.home.queryBannerList()
				ctx.commit(SET_BANNER, data)
			} catch(e) {}
		},
		async queryRecommendSubjects(ctx) {
			try {
				const { data } = await services.home.queryRecommendSubjects({ pageOffset: 2 })
				ctx.commit(SET_RECOMMEND_SUBJECT, data)
			} catch(e) {}
		},
		async queryHotReadList(ctx) {
			try {
        const { data } = await services.home.queryHotReadList({
          pageStart: 0,
          pageOffset: 3
        })
				ctx.commit(SET_HOT_READ_LIST, data)
			} catch(e) {}
		}
	}
}
