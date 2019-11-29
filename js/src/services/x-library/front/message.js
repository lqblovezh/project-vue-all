import {request_post,request_get,request_put,request_delete} from 'services/common/request'

/**
 * 消息列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getReplyList(data={}){
  return request_get('/api/home/book_circles_user_reply',data)
}

/**
 * 获取系统通知
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export function getSysList (data = {}) {
  return request_get('/api/messages/home_list', data)
}