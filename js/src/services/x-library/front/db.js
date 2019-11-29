import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

/**
 * 首页数据
 * @param {Object} data
 */
export function home(data = {}) {
  return request_get('/api/home/new/address', data)
}

/**
 * 所有搜索
 * @param {Object} data
 * @param {String} data.keyword - 选填 关键词
 * @param {String} data.name - 选填 名称,
 * @param {String} data.abs - 选填 简介
 * @param {String} data.author - 选填 作者
 * @param {String} data.text - 选填 内容
 * @param {String} data.where_type - 选填 高级检索（类型）and but or
 * @param {String} data.where_type - 选填 高级检索（类型）and but or
 * @param {Array} data.where_all.name - 选填
 * @param {String} data.where_all.value - 选填
 */
export function search(data = {}) {
  return request_get('/api/home/books_fast', data)
}

/**
 * 书籍详情
 * @param {Object} data
 * @param {String} data.id - 选填 书id
 */
export function bookInfo(data = {}) {
  return request_get(`/api/home/article_product/${data.id}`)
}
