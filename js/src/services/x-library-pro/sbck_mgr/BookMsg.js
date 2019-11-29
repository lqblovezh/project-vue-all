import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {dateRules} from '../extend/schemas'

class BookMsg {
  /**
   * 后台获取评论列表
   * @param {Object} data
   * @param {String} data.book_name
   * @param {String} data.user_name
   */
  getList(data){
    return request_get('/book_comment/all',data)
  }

  /**
   * 前台获取评论列表
   * @param {Object} data
   * @param {String} data.book_id
   */
  home_list(data){
    return request_get('/book_comment/list',data)
  }
  /**
   * 添加评论
   * @param {Object} data
   * @param {String} data.book_id
   * @param {String} data.content
   */
  add_msg(data){
    return request_post('/book_comment/add',data)
  }
  /**
   * 批量审核评论
   * @param {Object} data
   * @param {Array} data._ids 数组
   * @param {String} data.status  'success', 'fail', 'wait'
   */
  check(data){
    return request_post('/book_comment/check',data)
  }
  /**
   * 批量删除评论
   * @param {Object} data
   * @param {String} data._ids 数组
   */
  del(data){
    return request_post('/book_comment/delete',data)
  }
}
