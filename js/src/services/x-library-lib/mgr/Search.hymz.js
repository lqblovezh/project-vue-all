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
   * 获取浏览IP数量
   * @param {Object} data
   * @param {String} data.end_date
   * @param {String} data.start_date
   */
  async getScanInfo(data) {
    data = await Joi.validate(data, dateRules)
    return request_get('/api/visit', data)
  }
  /**
   * 设置访问记录
   * @param {Object} data
   */
  async visitAdit(data) {
    return request_get('/api/visit', data)
  }
  /**
   * 获取搜索设置
   * @param {Object} data
   * @param {String} data.simp 搜索时简体文字
   * @param {String} data.start_time 开始时间
   * @param {String} data.end_time
   */
  async get_search_setting(data = {}) {
    debugger
    return request_get('/api/keyword', data).then(res => {
      const arr1 = []
      const arr2 = []
      const advanced_list = res.data.advanced_list.map(el => {
        if (el.is_true == 'true') {
          arr1.push(el.id)
        }
        el.name = el.keyword_name
        return el
      })
      const general_list = res.data.general_list.map(el => {
        if (el.is_true == 'true') {
          arr2.push(el.id)
        }
        el.name = el.keyword_name
        return el
      })
      return {
        data: {
          checkedSenior: arr1,
          checkedSearch: arr2,
          searchList: general_list,
          seniorList: advanced_list,
        },
      }
    })
  }
  /**
   * 编辑
   * @param {Object} data
   * @param {String} data._ids 数组
   * @param {String} data.state true  false  默认true
   */
  async edit_search_setting(data) {
    data = {
      advanced: [...data.checkedSenior],
      general: [...data.checkedSearch],
    }
    return request_post('/api/keyword', data)
  }
  /**
   * 搜索记录-添加搜索记录
   * @param {Object} data
   * @param {String} data.keyword
   */
  add_search_record(data) {
    return request_post('/api/search_record', data)
  }
  /**
   * 搜索统计
   * @param {Object} data
   * @param {String} data.order 'all', 'month', 'week', 'day'  默认all
   */
  statistics_search_record(data) {
    return request_get('/api/search_record', data)
  }
  /**
   * 前台搜索提示接口
   * @param {Object} data
   * @param {String} data.keyword
   */
  search_tips(data) {
    return request_get('/api/search_tips', data)
  }
  /**
   * 删除搜索关键字记录 （根据关键字删除）
   * @param {Object} data
   * @param {String} data.keyword
   */
  del_search_record(data) {
    return request_post('/api/search_record/delete', data)
  }
}

export default new Search()
