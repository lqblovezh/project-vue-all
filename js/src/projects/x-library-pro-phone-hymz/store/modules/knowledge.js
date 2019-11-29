import { SET_KNOWLEDGE_LIST, SET_KNOWLEDGE_INFO, SET_KNOWLEDGE_CHAPTER_LIST } from '../types'
import * as services from 'services/x-library-pro/implement/hymz'
import dataFormat from '@/common/js/formatKnowledgeData'

export default {
  namespaced: true,
  state: {
    knowledge_list: [],
    // 某一知识点的详细数据，包括人名地名表
    info: {},
    // 某一知识点下的关联篇章列表
    konwledge_chapter_list: [],
    knowledge_start: 0,
    page: {
      pageStart: 0,
      pageOffset: 10
    },
    isLoaded: false
  },
  mutations: {
    modify_knowledge_start(state, { clear = false, offset = 0, total = 0}) {
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
    }
  },
  actions: {
    async init({ dispatch }, {
      keep_nav = false,
      ...payload
    }) {
      !keep_nav && await dispatch('queryKnowLedge', { offset: 3 })
      await dispatch('queryRelatedChapter', payload)
    },
    async queryKnowLedge({ state, commit }, {
      clear = false,
      offset = 10
    } = {}) {
      let pageStart = clear ? 0 : state.knowledge_start
      try {
        let { data, page } = await services.knowledge.queryKnowLedgeList({ pageStart,  pageOffset: offset })

        commit('modify_knowledge_start', { clear, offset, total: page.total})
        commit(SET_KNOWLEDGE_LIST, data)
      } catch(e) {
        console.error(`[vuex: queryKnowLedge]: ${e.toString()}`)
      }
    },
    async queryKnowLedgeInfo({ commit }, { bookId, id }) {
      try {
        const { data } = await services.knowledge.queryKnowLedgeDetailInfo({ bookId, id })
        if (data) {
          commit(SET_KNOWLEDGE_INFO, dataFormat(data))
        }
      } catch(e) {
        console.error(`[vuex: queryKnowLedgeInfo]: ${e.toString()}`)
      }
    },
    async queryRelatedChapter({ state, commit }, {
      clean = false,
      offset = 5,
      ...args
    }) {
      clean && commit(SET_KNOWLEDGE_CHAPTER_LIST, [])
      state.page.pageOffset = offset
      try {
        let { data, page } = await services.knowledge.queryRelatedChapter({
          ...state.page,
          ...args
        })
        data = [...state.konwledge_chapter_list, ...data]
        commit(SET_KNOWLEDGE_CHAPTER_LIST, data)
        if (data.length === page.total) {
          state.isLoaded = true
        }
      } catch(e) {
        console.error(`[vuex: queryRelatedChapter]: ${e.toString()}`)
      }
    }
  }
}

function getRandomNum(array, num) {
  let temp = []
  for (let i = 0; i < num; i++) {
    temp.push(...array.splice(parseInt(Math.random()*array.length), 1))
  }
  return temp
}

function covertDataToGraphFormat(data) {
  const temp = {}

}
