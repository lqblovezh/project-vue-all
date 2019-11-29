import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {dateRules} from '../extend/schemas'


export class Book  {
    /**
   * 书籍统计
   * @param {Object} data
   * @param {String} data.end_date
   * @param {String} data.start_date
   */
  async statistics_list(data){
    data = await Joi.validate(data,dateRules)
    return request_get('/api/book/statistics_list',data)
  }
  /**
   * 书籍详情 前台
   * @param {Object} data
   * @param {String} data._id
   */
  detail_home(data){
    return request_get('/api/book/info_home',data)
  }

  /**
   * 书籍详情 前台
   * @param {Object} data
   * @param {Array} data._ids
   */

  del(data){
    return request_post('/api/books/delete',data)
  }

  /**
   * 首页书籍数量统计
   */
  home_book_count(){
    return request_get('/api/home_book_count')
  }
  /**
   * 书签获取
   * @param {Object} data
   * @param {String} data.book_id
   */
  async book_tag(data){
    return request_get('/api/book_tag',data)
  }
  /**
   * 删除标签
   * @param {Object} data
   * @param {Array} data._ids
   */
  del_book_tag(data){
    return request_post('/api/book_tag/delete',data)
  }
  /**
   * 设置标签
   * @param {Object} data
   * @param {String} data.book_id
   * @param {String} data.tag
   */
  add_book_tag(data){
    return request_post('/api/book_tag',data)
  }
}
