import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {dateRules} from '../extend/schemas'

class Comments {
  /**
   * 后台评论列表
   * @param {String} data.user_name
   * @param {String} data.user_name
   */
  getList(data){
    return request_get('/api/book_comment/all',data)
  }

  /**
   * 前台评论列表
   * @param {Object} data
   * @param {String} data.book_id
   */
  list(data){
    return request_get('/api/book_comment/list',data)
  }
  /**
   * 添加评论
   * @param {Object} data
   * @param {String} data.book_id
   * @param {String} data.content
   */
  add(data){
    return request_post('/api/book_comment/add',data)
  }
  /**
   * 评论审核
   */
  check(data){
    return request_post('/api/book_comment/check',data)
  }
  /**
   * 批量删除评论
   * @param {Object} data
   * @param {Array} data._ids
   */
  del(data){
    return request_post('/api/book_comment/delete',data)
  }
}

export default new Comments
