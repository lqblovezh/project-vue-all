import { SET_RECOMMEND_SUBJECT, SET_HOT_READ_LIST } from '../types'
import * as services from 'services/x-library-pro/implement/hymz'

module.exports = {
  namespaced: true,
  state: {
    recommend_subject: [],
    hot_read_list: [],
    home_hot_read_list: [],
    recommend_home_subject: [],
    qrcodeUrl: '',
    privilegeList: [],
    jumpInfo: [],
    hotList: [],
    contrastChart: '',
    servicesInfo: '',
    page: {
      pageStart: 0,
      pageOffset: 6,
    },
  },
  mutations: {
    [SET_RECOMMEND_SUBJECT](state, data) {
      state.recommend_subject = data
    },
    SET_HOME_HOT_SUBJECT(state, data) {
      state.recommend_home_subject = data
    },
    [SET_HOT_READ_LIST](state, data) {
      state.hot_read_list = data
    },
    setQrcodeUrl(state, data) {
      state.qrcodeUrl = data
    },
    SET_PRIVILEGE_LIST(state, data) {
      state.privilegeList = data
    },
    SET_CONTRAST_CHART(state, data) {
      state.contrastChart = data && data[0] && data[0].img_src
    },
    SET_HOME_HOT_READ_LIST(state, data) {
      state.home_hot_read_list = data
    },
    SET_SERVICES_INFO(state, data) {
      state.servicesInfo = data
    },
    SET_JUMP_INFO(state, data) {
      state.jumpInfo = data
    },
    SET_HOME_HOT_LIST(state, data) {
      state.hotList = data
    },
  },
  actions: {
    async init({ dispatch }) {
      await dispatch('queryRecommendSubjects')
      await dispatch('queryHotReadList')
      await dispatch('queryHotList')
    },
    async queryRecommendSubjects(ctx) {
      try {
        const { data } = await services.home.queryRecommendSubjects({
          // pageOffset: 4,
          pageNum: 1,
        })
        ctx.commit(SET_RECOMMEND_SUBJECT, data)
        ctx.commit('SET_HOME_HOT_SUBJECT', [...data].splice(0, 4))
      } catch (e) {}
    },
    async queryHotReadList({ state, commit }, { offset = 6 } = {}) {
      state.page.pageOffset = offset
      try {
        const { data } = await services.home.queryHotReadList(state.page)
        commit(SET_HOT_READ_LIST, data)
        commit('SET_HOME_HOT_READ_LIST', [...data].splice(0, 6))
      } catch (e) {}
    },
    async queryPrivilegeList({ commit }) {
      try {
        let data = await services.home.queryPrivilegeList()
        commit(
          'SET_CONTRAST_CHART',
          data.filter(item => item.key == 'privilege')
        )
        commit(
          'SET_PRIVILEGE_LIST',
          data.filter(item => item.key != 'privilege')
        )
      } catch (error) {}
    },
    async queryServicesInfo({ commit }) {
      try {
        let { agreement } = await services.home.queryServicesInfo()
        commit('SET_SERVICES_INFO', agreement)
      } catch (error) {}
    },
    async queryHotList({ commit }) {
      try {
        let { data } = await services.home.queryHotList()
        commit('SET_HOME_HOT_LIST', data)
      } catch (error) {}
    },
    async queryJumpInfo({ commit }) {
      // 首页跳转获取
      try {
        let { data } = await services.home.queryJumpInfo()
        commit('SET_JUMP_INFO', data)
      } catch (error) {}
    },
  },
}
