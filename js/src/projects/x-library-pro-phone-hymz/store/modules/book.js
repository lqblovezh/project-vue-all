import { SET_BOOKINFO, SET_COMMENTS, STE_CATALOG, SET_BOOKSHELF, SET_BOOK_KNOWLEDGE_POINT, SET_CATEGORY_BOOKLIST, SET_HOT_BOOK_LIST, SET_CHAPTER_LIST, SET_RELATED_BOOK_LIST } from '../types'
import * as services from 'services/x-library-pro/implement/hymz'
import dataFormat from '@/common/js/formatKnowledgeData'
module.exports = {
	namespaced: true,
	state: {
		// 书籍详情信息
		bookInfo: {},
		related_list: [],
		commentList: [],
		catalog: [],
		// 书籍页面知识点详情
		knowledge_point: {},
		// 书房列表
		bookshelf_list: [],
		// 分类下的书籍列表
		book_list_category: [],
		// 热门阅读列表
		hot_book_list: [],
		// 知识点列表
		knowledeg_chapter_list: [],
		book_knowledge_list: {},
		page: {
			pageStart: 0,
			pageOffset: 10
		},
		isLoaded: false
	},
	mutations: {
		[SET_BOOKINFO](state, data) {
			state.bookInfo = data
		},
		[SET_RELATED_BOOK_LIST](state, data) {
			state.related_list = data
		},
		[SET_COMMENTS](state, data) {
			state.commentList = data
		},
		[STE_CATALOG](state, data) {
			state.catalog = data
		},
		[SET_BOOKSHELF](state, data) {
			state.bookshelf_list = data
		},
		[SET_BOOK_KNOWLEDGE_POINT](state, data) {
			state.knowledge_point = data
		},
		[SET_CATEGORY_BOOKLIST](state, data) {
			state.book_list_category = data
		},
		[SET_HOT_BOOK_LIST](state, data) {
			state.hot_book_list = data
		},
		[SET_CHAPTER_LIST](state, data) {
			state.knowledeg_chapter_list = data
		},
		set_book_knowledge(state, data) {
      state.book_knowledge_list = data
    }
	},
	actions: {
		init({ dispatch }, args) {
			Promise.all([
				dispatch('getDetailBookInfo', args),
				dispatch('getComments', { ...args, clean: true, offset: 3 }),
				dispatch('queryRelatedBookList', args)
			]).catch(e => {
				console.log(`[vuex init]: ${e.toString()}`)
			})
		},
		async queryBookKnowledge({ commit }, payload) {
      try {
        const { data: { person, address, knowledge } } = await services.book.queryBookKnowledge(payload)
        let temp = dataFormat(knowledge) || {}
        commit('set_book_knowledge', { info: temp, person, address })
      } catch(e) {
        console.error(`[vuex: queryBookKnowledge]: ${e.toString()}`)
      }
    },
		async getDetailBookInfo(ctx, payload) {
			try {
				const res = await services.book.getDetailBookInfo(payload)
				ctx.commit(SET_BOOKINFO, res)
			} catch (e) {
				console.error(`[vuex getDetailBookInfo]: ${e.toString()}`)
			}
		},
		async queryRelatedBookList(ctx, {
      offset = 6,
      ...queries
		} = {}) {
			try {
        const { data } = await services.book.queryRelatedBookList({ ...queries, pageStart: 0, pageOffset: offset })
        if (data && data.length) {
          ctx.commit(SET_RELATED_BOOK_LIST, data)
        }
      } catch (e) {
        console.log(e.toString())
      }
		},
		async getComments({ state, commit }, {
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
				const { data, page } = await services.book.getComments({
					...state.page,
					...arg
				})
				let list = clean ? [] : state.commentList
				list = [...list, ...data]
				state.page.pageStart = list.length
				if (page.total === list.length) {
					state.isLoaded = true
				}
				commit(SET_COMMENTS, list)
			} catch (e) {
				console.error(`[vuex getComment]: ${e.toString()}`)
			}
		},
		async getCatalog(ctx, payload) {
			try {
				const res = await services.book.getCatalog(payload)
				ctx.commit(STE_CATALOG, res.data)
			} catch(e) {
				console.error(`[vuex getComments]: ${e.toString()}`)
			}
		},
		async queryBookShelfList(ctx, payload) {
			try {
				const { data } = await services.book.queryBookShelfList()
				ctx.commit(SET_BOOKSHELF, data)
			} catch (e) {
				console.error(`[vuex queryBookShelfList]: ${e.toString()}`)
			}
		},
		async queryBookKnowledgePointsInfo(ctx, payload) {
			try {
				const { data } = await services.book.queryBookKnowledgePointsInfo()
				ctx.commit(SET_BOOK_KNOWLEDGE_POINT, data)
			} catch (e) {
				console.error(`[vuex queryBookKnowledgePointsInfo]: ${e.toString()}`)
			}
		},
		async queryHotList({ state, commit }, {
			clean = false,
			offset = 10
		} = {}) {
			try {
				if (clean) {
					state.page = {
						pageStart: 0,
						pageOffset: offset
					}
					state.isLoaded = false
				}
				const { data, page } = await services.home.queryHotReadList({
					...state.page
				})
				let list = clean ? [] : state.hot_book_list
				list = [...list, ...data]
				state.page.pageStart = list.length
				if (page.total === list.length) {
					state.isLoaded = true
				}
				commit(SET_HOT_BOOK_LIST, list)
			} catch (e) {
				console.info(e.toString())
			}
		},
		async queryKnowledegeList({ state, commit }, {
			clean = false,
			offset = 10,
			...args
		} = {}) {
			try {
				if (clean) {
					state.page = {
						pageStart: 0,
						pageOffset: offset
					}
					state.isLoaded = false
				}
				const { data, page } = await services.knowledge.queryRelatedChapter({
					...state.page,
					...args
				})
				let list = clean ? [] : state.knowledeg_chapter_list
				list = [...list, ...data]
				state.page.pageStart = list.length
				if (page.total === list.length) {
					state.isLoaded = true
				}
				commit(SET_CHAPTER_LIST, list)
			} catch (e) {
				console.info(e.toString())
			}
		}
	}
}
