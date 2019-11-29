import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Joi from 'joi'
import { dateRules } from '../extend/schemas'

class Knowledge {
  /**
   * 首页知识点
   * @param {Object} data
   * @param {String} data.depth  深度 即显示条数
   */
  getNavList(data) {
    return request_get('/api/home/knowledge', data)
  }
  /**
   * 知识点导航
   * @param {Object} data
   * @param {String} data.depth  深度 即显示条数
   */
  getList(data) {
    // return request_get('/api/home/knowledge/category')
    return request_get('/api/home/knowledge/category_rel', data)
  }
  /**
   * 获取知识点详情
   * @param {Object} data
   */
  detail(data = {}) {
    return request_get(`/api/home/indexes_info`, data)
    // return request_get(`/api/home/knowledge_info/${id}`, rest)
  }
  /**
   * 获取图书知识点详情
   * @param {Object} data
   * @param {String} data.book_id
   * @param {String} data.Knowledge_id
   */
  bookdetail(data) {
    return request_get('/api/home/book/knowledge_info', data)
  }
  /**
   * 获取图书相关知识点
   */
  getBookKnowledge({ id }) {
    return request_get(`/api/home/book/knowledge/${id}`)
  }
}

export default new Knowledge()
