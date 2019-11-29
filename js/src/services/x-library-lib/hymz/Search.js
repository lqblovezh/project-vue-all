import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Joi from 'joi'
import { dateRules } from '../extend/schemas'

class Search {
  /**
   * 搜索
   * @param {Object} data
   * @param {String} data.keyword
   * @param {String} data.search_type book_name书名  author作者  translator译者  isbn   year出版年代  auth_nationality国别  all全部
   */
  get_info(data) {
    data.search_type = data.type
    return request_get('/api/home/search', data)
  }
  /**
   * 高级检索
   * @param {Object} data
   * @param {String} data.book_name
   * @param {String} data.author
   * @param {String} data.isbn
   */
  advanced_search(data) {
    return request_post('/api/home/advanced_search', data)
  }
  /**
   * 搜索关键字列表
   * @param {String} data.type general => 常规搜索  advanced=> 高级搜索
   */
  getKeyWord(data = {}) {
    if (!data.type) {
      data.type = 'general'
    }
    return request_get('/api/home/keyword', data)
  }
}

export default new Search()
