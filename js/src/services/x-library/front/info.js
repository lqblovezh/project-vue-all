import {request_post,request_get,request_put,request_delete} from 'services/common/request'

/**
 * 用户中心我的书签
 * @param {Object} data
 * @param {String} data.book_id
 * @param {String} data.user_id
 */

export function getBookMarkList(data={}){
  return request_get('/api/book_marks',data)
}

/**
	* 历史记录列表
	* @param {Object} data
	* @param {String} data.pageStart
	* @param {String} data.pageOffset
	* @param {String} data.pageNum
*/
export function getHistoryList(data={}){
	return request_get('/api/read_list', data)
}
/**
 * 删除阅读历史
 * @param {Object} data 
 * @param {Array} data.id 需要删除的id集合
 */
export function delHistory (data = {}) {
	return request_post('/api/read_list/delete', data)
}

/**
 * 用户笔记
 * @param {Object} data
 * @param {Number} data.type 笔记类型（案例、法规、文献、裁判）
 */
export function getNotes (data = {}) {
	return request_get('/api/book_notes', data)
}

/**
 * 删除用户笔记
 * @param {Object} data
 * @param {Array} data.id 需要删除的笔记id数组
 */
export function delNotes (data = {}) {
	return request_post('/api/book_exegesis/delete', data)
}

/**
 * 获取购买记录
 * @param {Object} data 
 * @param {Number} data.type 笔记类型（案例、法规、文献、裁判）
 */
export function getRecord (data = {}) {
	return request_get('/api/', data)
}