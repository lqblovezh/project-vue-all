import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

/**
 * 发现
 * @param {Object} data
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function find() {
  return request_get('/api/data_discover')
}

/**
 * 推荐书籍
 */
export function recommend(data = {}) {
  return request_get('/api/books/recommend', data)
}

/**
 * 关键词  关联资源 关联法规
 * {keyword:'xx'}
 * {laws:'xx'}
 * {resource:'xx'}
 */
export function getLinks(data = {}) {
  return request_get('/api/data_articles/link_books', data)
}
