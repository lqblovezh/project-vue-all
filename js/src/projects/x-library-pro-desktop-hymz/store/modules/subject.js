import { SET_SUBJECT_RECOMMEND_LIST, SET_SUBJECT_INFO } from '../types'
import * as services from 'services/x-library-pro/implement/hymz'

export default {
  namespaced: true,
  state: {
    list: [],
    info: {},
    page: {
      pageOffset: 10,
      total: 0,
      pageNum: 1,
    },
  },
  getters: {
    bookList(state) {
      return state.info.list
    },
    subjectList(state) {
      return state.info.other
    },
  },
  mutations: {
    [SET_SUBJECT_RECOMMEND_LIST](state, data) {
      state.list = data
    },
    [SET_SUBJECT_INFO](state, data) {
      state.info = data
    },
  },
  actions: {
    async querySubjectList({ state, commit }, args) {
      try {
        const { data, page } = await services.subject.queryAllSubjectList({
          ...state.page,
          ...args,
        })
        state.page.total = page && page.total
        state.page.pageNum = page && page.num
        commit('SET_SUBJECT_RECOMMEND_LIST', data)
      } catch (e) {
        console.warn(e.toString())
      }
    },
    async querySubjectInfo({ commit }, payload) {
      try {
        const { data } = await services.subject.querySubjectInfo(payload)
        commit(SET_SUBJECT_INFO, data)
      } catch (e) {
        console.warn(e.toString())
      }
    },
  },
}
