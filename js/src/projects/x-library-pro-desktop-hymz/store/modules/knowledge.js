import {
  SET_KNOWLEDGE_LIST,
  SET_KNOWLEDGE_INFO,
  SET_KNOWLEDGE_CHAPTER_LIST,
} from '../types'
import * as services from 'services/x-library-pro/implement/hymz'
import { pickDataRelationShip } from '@/utils/helpers'
import formatKnowledgeData from '@/utils/formatKnowledgeData'

export default {
  namespaced: true,
  state: {
    knowledge_list: [],
    // 某一知识点的详细数据，包括人名地名表
    info: {},
    // 某一知识点下的关联篇章列表
    konwledge_chapter_list: [],
    home_knowledge_list: [], //首页知识点
    knowledge_start: 0,
    page: {
      pageOffset: 10,
      total: 0,
      pageNum: 1,
    },
    isLoaded: false,
  },
  mutations: {
    modify_knowledge_start(state, { clear = false, offset = 0, total = 0 }) {
      let start = clear ? 0 : state.knowledge_start
      state.knowledge_start = start + offset > total ? 0 : start + offset
    },
    [SET_KNOWLEDGE_LIST](state, data) {
      state.knowledge_list = data
    },
    [SET_KNOWLEDGE_INFO](state, data) {
      state.info = data
    },
    [SET_KNOWLEDGE_CHAPTER_LIST](state, data) {
      state.konwledge_chapter_list = data
    },
    RESET_page(state) {
      state.page = {
        pageOffset: 10,
        total: 0,
        pageNum: 1,
      }
    },
    SET_HOME_KNOWLEDGE_LIST(state, data) {
      state.home_knowledge_list = data
    },
  },
  actions: {
    async init({ dispatch }, payload) {
      await dispatch('queryKnowLedge', { clear: true })
    },
    async queryKnowLedge(
      { state, commit },
      { clear = false, offset = 6 } = {}
    ) {
      let pageStart = clear ? 0 : state.knowledge_start
      try {
        const { data, page } = await services.knowledge.queryKnowLedgeList({
          pageStart,
          pageOffset: offset,
        })
        commit('modify_knowledge_start', { clear, offset, total: page.total })
        commit(SET_KNOWLEDGE_LIST, data)
      } catch (e) {
        console.error(`[vuex: queryKnowLedge]: ${e.toString()}`)
      }
    },
    async queryHomeKnowLedge({ commit }) {
      try {
        const { data } = await services.knowledge.queryKnowLedgeList({
          pageStart: 0,
          pageOffset: 30,
        })
        commit('SET_HOME_KNOWLEDGE_LIST', data)
      } catch (e) {
        console.error(`[vuex: home_knowledge_list]: ${e.toString()}`)
      }
    },
    async queryKnowLedgeInfo(
      { commit },
      { bookId, id, category_id, depth } = {}
    ) {
      try {
        const { data } = await services.knowledge.queryKnowLedgeDetailInfo({
          bookId,
          id,
          category_id,
          depth,
        })
        let temp = (data && formatKnowledgeData(data)) || {}
        commit(SET_KNOWLEDGE_INFO, temp)
      } catch (e) {
        console.error(`[vuex: queryKnowLedgeInfo]: ${e.toString()}`)
      }
    },
    async queryRelatedChapter(
      { state, commit },
      { clean = false, offset = 10, ...args }
    ) {
      clean && commit(SET_KNOWLEDGE_CHAPTER_LIST, [])
      state.page.pageOffset = offset
      try {
        let { data, page } = await services.knowledge.queryRelatedChapter({
          ...state.page,
          ...args,
        })
        state.page.pageNum = page.num
        state.page.total = page.total
        data = [...state.konwledge_chapter_list, ...data]
        commit(SET_KNOWLEDGE_CHAPTER_LIST, data)
        if (data.length === page.total) {
          state.isLoaded = true
        }
      } catch (e) {
        console.error(`[vuex: queryRelatedChapter]: ${e.toString()}`)
      }
    },
  },
}

function randomNum(list, num) {
  let temp = []
  if (num < list.length) {
    for (let i = 0; i < num; i++) {
      temp.push(...list.splice(Math.floor(Math.random() * list.length), 1))
    }
  } else {
    temp = list
  }
  return temp
}
