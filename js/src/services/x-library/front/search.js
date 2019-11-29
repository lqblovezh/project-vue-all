import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

export function search({ name: keyword, cid: class_id, ...data } = {}) {
  // data.keyword = data.name
  if (!keyword) return
  return request_get('/api/data_articles/search', {
    keyword,
    class_id,
    ...data,
  })
}

// 添加热词
export function addHot({ name: keyword, ...data } = {}) {
  // data.keyword = data.name
  if (!keyword) return
  return request_post('/api/hot_words', { ...data, keyword })
}

// 获取热词列表
export function getHot(data = {}) {
  return request_get('/api/hot_words', data)
}

// 精确匹配关键词
export function searchAdvanceKey(data = {}) {
  return request_get('/api/data_articles/searchKeyword', data)
}

// exactWords
export function exactWords(data = {}) {
  return request_get('/api/data_articles/keywordSearch', data)
}
// exactWords
export function advSearch(data = {}) {
  return request_post('/api/data_articles/search_advanced', data)
}

/**
 * 获取单一项的备选词
 * @param {String} id
 */
export function getItemSubInfo(id) {
  return request_get(`/api/data_articles/keywordRelation/${id}`)
}