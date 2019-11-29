import {
  SET_BOOK_LIST,
  SET_BOOK_INFO,
  STE_CATALOG,
  SET_RELATED_BOOK_LIST,
  SET_COMMENTS,
} from '../types'
import * as services from 'services/x-library-pro/implement/hymz'
import { Loading } from 'element-ui'
import { pickDataRelationShip } from '@/utils/helpers'
import formatKnowledgeData from '@/utils/formatKnowledgeData'

export default {
  namespaced: true,
  state: {
    info: {},
    list: [],
    catalog: [],
    comment: {
      list: [],
      page: {
        pageStart: 0,
        pageOffset: 10,
        total: 0,
        pageNum: 1,
      },
    },
    related_list: [],
    book_knowledge_list: {},
    page: {
      pageStart: 0,
      pageOffset: 10,
    },
  },
  mutations: {
    [SET_BOOK_INFO](state, data) {
      state.info = data
    },
    [SET_BOOK_LIST](state, data) {
      state.list = data
    },
    [SET_COMMENTS](state, data) {
      state.comment.list = data
    },
    [STE_CATALOG](state, data) {
      state.catalog = data
    },
    [SET_RELATED_BOOK_LIST](state, data) {
      state.related_list = data
    },
    set_book_knowledge(state, data) {
      state.book_knowledge_list = data
    },
  },
  actions: {
    async init({ dispatch }, payload) {
      let loading = Loading.service({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: 'Loading',
      })
      try {
        await dispatch('getDetailBookInfo', payload)
        await dispatch('getComments', { ...payload, clean: true })
        await dispatch('getCatalog', payload)
        await dispatch('queryRelatedBookList', payload)
        loading.close()
      } catch (error) {
        loading.close()
      }
    },
    async getDetailBookInfo(ctx, payload) {
      try {
        const res = await services.book.getDetailBookInfo(payload)
        ctx.commit(SET_BOOK_INFO, res)
      } catch (e) {
        console.error(`[vuex getDetailBookInfo]: ${e.toString()}`)
      }
    },
    async queryBookKnowledge({ commit }, payload) {
      try {
        const {
          data: { person, address, knowledge },
        } = await services.book.queryBookKnowledge(payload)
        let temp = formatKnowledgeData(knowledge) || {}
        commit('set_book_knowledge', { info: temp, person, address })
      } catch (e) {
        console.error(`[vuex: queryBookKnowledge]: ${e.toString()}`)
      }
    },
    async getComments({ state, commit }, { clean = false, ...args }) {
      try {
        if (clean) {
          state.comment.page.pageStart = 0
        }
        const {
          data,
          page: { offset, start, total },
        } = await services.book.getComments({
          ...state.comment.page,
          ...args,
        })
        state.comment.page.pageStart = start + offset
        state.comment.page.pageNum = Math.floor(start / offset) + 1
        state.comment.page.total = total
        commit(SET_COMMENTS, data)
      } catch (e) {}
    },
    async queryRelatedBookList({ commit }, { offset = 3, ...payload } = {}) {
      try {
        const { data } = await services.book.queryRelatedBookList({
          ...payload,
          pageStart: 0,
          pageOffset: offset,
        })
        commit(SET_RELATED_BOOK_LIST, data)
      } catch (e) {}
    },
    async getCatalog({ commit }, payload) {
      try {
        const res = await services.book.getCatalog(payload)
        commit(STE_CATALOG, res.data)
      } catch (e) {
        console.error(`[vuex getComments]: ${e.toString()}`)
      }
    },
    async queryBookList(
      { state, commit },
      { clean = false, offset = 10, ...arg } = {}
    ) {
      state.page.pageOffset = offset
      clean && commit(SET_BOOK_LIST, [])
      try {
        const { data } = await services.book.queryBookList({
          ...state.page,
          ...arg,
        })
        commit(SET_BOOK_LIST, data)
      } catch (e) {
        console.warn(e.toString())
      }
    },
  },
}
