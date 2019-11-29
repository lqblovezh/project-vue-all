import {request_post,request_get,request_put,request_delete} from 'services/common/request'
/**
 * 会员反馈
 * @param {Object} data
 * @param {String} data.content - 必有字段 文字
 */
export function save(data = {}){
  return request_post('/api/user/feedback',data)
}