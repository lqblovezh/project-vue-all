import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

/**
 * 发现
 * @param {Object} data
 * 'column'栏目,'subject'套系,'case'品类,'keyword'关键词,
 * 'fagui'法规,'xueke'学科，'changjing'场景,'anyou'案由,'liucheng'流程
 * @param {String} data.type
 * root为获取第一级，空为获取所有,对应父级ID为获取直系子级
 * @param {String} data.pid
 */
export function getCategory(data = {}) {
  return request_get('/api/data_categorys', data)
}

/**
 * 套系子列表
 * @param {String} data.id 套系id
 */
export function getSubjectList(data = {}) {
  // 涉及到分页的, 参数移动要传
  return request_get(`/api/data_categorys/${data.id}/subjects`, data)
}

/**
 * 套系资源列表
 */
export function getSubjectSources(data = {}) {
  return request_get(`/api/data_subjects/class/books`, data)
}

/**
 * @param {String} data.id 套系id
 */
export function getSubjectDetail(data = {}) {
  return request_get(`/api/data_subjects/${data.id}`)
}
/**
 * @param {String} data.id 套系id
 */
export function getColumnDetail(data = {}) {
  const { book_id } = data
  return request_get(`/api/data_articles/${data.id}`, { book_id })
}

/**
 * 栏目具体分类 的资源列表
 * @param {String} data.id 栏目id
 */
export function getColumnResource(data = {}) {
  return request_get(`/api/data_categorys/class/books`, data)
}

/**
 * 栏目筛选
 * @param {String} data.id 栏目id
 */
export function getColumnKeys(id, data = {}) {
  return request_get(`/api/data_categorys/${id}/filter`, data)
}

/**
 * @param {*} data
 * @param {String} data.id  - 图书id
 * @param {String} data.type  - 1 听读 2 视读 3电子书
 */
export function getAccessCode(data = {}) {
  data.type = 9
  return request_get('/api/books/get_access_code', data)
}

/**
 * 获取套系下的筛选内容
 * @param  {Object} data
 * @param {String} data.product_id 套系ID
 * @param {String} data.class_id
 * @return {[type]}      [description]
 */
export function queryFiltersOfSub(data = {}) {
  return request_get('/api/data_categorys/filter/subject', data)
}