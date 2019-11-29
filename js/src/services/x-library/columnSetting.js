import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

let bookDetail = pathToRegexp.compile('/api/data_categorys/:id')
let sortUrl = pathToRegexp.compile('/api/data_categorys/sort/:id')

/**
 * 获取分类列表
 * @param {Object} data
 * @param {String} data.type - 类型，'column'栏目,'subject'套系,'case'案例,'keyword'关键词
 * @param {String} data.pid - 选填 顶级为root,
 * @param {String} data.name - 选填 名称
 */
export function getList(data = {}){
  return request_get('/api/data_categorys',data)
}

/**
 * 分类详情
 * @param {Object} data
 * @param {String} data.category_id - 必有字段 分类id
 * @param {String} data.type - 必有字段 分类类型
 */
export function detail(data = {}){
  return request_get('/api/data_categorys/class/books',data)
}

/**
 * 分类详情添加
 * @param {Object} data
 * @param {String} data.category_id - 必有字段 分类id
 * @param {String} data.type - 必有字段 分类类型
 * @param {Array} data.rel_id - 必有字段 资源id,数组
 */
export function add(data = {}){
  return request_post('/api/data_categorys/class/books',data)
}

/**
 * 分类详情删除
 * @param {Object} data
 * @param {String} data.category_id - 必有字段 分类id
 * @param {String} data.type - 必有字段 分类类型
 * @param {Array} data.rel_id - 必有字段 资源id,数组
 */
export function dels(data = {}){
  return request_post('/api/data_categorys/class/books/delete',data)
}

/**
 * 删除分类
 * @param {Object} data
 * @param {Array} data.id - 必有字段 分类id
 */
export function del(data = {}){
  return request_delete(bookDetail(data))
}

/**
 * @param {Object} data
 * @param {String} data.type - 类型，'column'栏目,'subject'套系,'case'案例,'keyword'关键词
 * @param {String} data.pid - 选填 顶级为root,
 * @param {String} data.name - 选填 名称
 */
export function save({id,...data} = {}) {
	if(id){
		return request_put(bookDetail({id}),data)
	}
	return request_post('/api/data_categorys',data)
}

/**
 * @param {Object} data
 * @param {String} data.type - 类型，'column'栏目,'subject'套系,'case'案例,'keyword'关键词
 * @param {String} data.id - 选填 顶级为root,
 * @param {String} data.sort - 必填 up down名称
 */
export function sort({id,...data} = {}) {
	return request_put(sortUrl({id}),data)
}

/**
 * 分类筛选新增
 * @param  {id}    options.id   [description]
 * @param  {...[type]} options.data [description]
 * @return {[type]}                 [description]
 */
export function categoryFilterSave({id,...data} = {}) {
  if (!data.is_add) {
    return request_put(`/api/data_categorys/filter/${id}`,data)
  }
  return request_post(`/api/data_categorys/${id}/filter`, data)
}

/**
 * 获取分类筛选列表
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function getCFList ({id, ...data} = {}) {
  return request_get(`api/data_categorys/${id}/filter`, data)
}

/**
 * 关键词详情
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function describe ({id, ...data} = {}) {
  return request_get(`api/data_categorys/${id}/describe`, data)
}

/**
 * 关键词保存
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function saveDescribe (data = {}) {
  return request_put('api/data_categorys/describe', data)
}

/**
 * 获取顶级分类
 * @param {Object} data 
 */
export function getTopCategory(data = {}) {
  return request_get('api/data_category_types', data = {})
}