import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Joi from 'joi'
import { detailRules } from '../extend/schemas'

class User {
  /**
   * 用户列表
   * @param {Object} data
   * @param {String} data.name
   * @param {String} data.phone
   */
  getList(data) {
    return request_get('/api/user', data)
  }
  /**
   * 用户导出
   * @param { Object } data
   */
  derivedData() {
    return request_get('/api/user_export').then(res => {
      return {
        data: res.data.url,
      }
    })
  }
  /**
   * 用户详情
   * @param {Object} data
   * @param {String} data.user_id
   */
  detail(data) {
    return request_get('/api/user_info', data)
  }
  /**
   * 判断用户是不是VIP 和VIP 到期时间
   */

  /**
   * 修改用户信息
   */
  update({ id, ...data }) {
    return request_put(`/common/api/user/users/detail/${id}`, data)
  }
  /**
   * 新增用户信息
   */
  add(data) {
    data.name = data.phone
    return request_post('/common/api/user/users/detail/user', data)
  }
  user_vip() {
    return request_get('/api/user_vip')
  }
  /**
   * 用户增长统计
   * @param {Object} data
   * @param {String} data.end_date
   * @param {String} data.start_date
   */
  user_increase(data) {
    return request_get('/api/user_increase', data)
  }
  /**
   * 用户阅读统计
   * @param {Object} data
   * @param {String} data.end_date
   * @param {String} data.start_date
   */
  user_read_distribution(data) {
    return request_get('/api/user_read_distribution', data)
  }
  //  下面接口还未单元测试

  /**
   * 添加用户等级
   * @param {Object} data
   * @param {String} data.name
   * @param {String} data.abs
   * @param {String} data.display true false 默认true
   * @param {String} data.tag_img
   */
  rule_add(data) {
    return request_post('/api/rule', data)
  }
  /**
   * 用户等级详情
   * @param { Object } data
   * @param { String } data.id
   */
  rule_detail(data) {
    return request_get(`/api/rule/info/${data.id}`, data)
  }
  /**
   * 编辑用户等级
   * @param {Object} data
   * @param {String} data._id
   * @param {String} data.name
   * @param {String} data.abs
   * @param {String} data.tag_img
   */
  rule_edit(data) {
    return request_post('/api/rule/edit', data)
  }
  /**
   * 获取用户等级
   */
  rule_info() {
    return request_get('/api/rule')
  }
  /**
   * 用户等级删除
   * @param { Object } data
   * @param { String } data.id
   */
  rule_del(data) {
    return request_post('/api/rule/delete', data)
  }
  /**
   * 规则设置
   * @param {Object} data
   * @param {String} data._id
   * @param {String} data.read_chapter_count 阅读章节
   * @param {String} data.definition 分辨率
   * @param {String} data.study_count 书房数量
   * @param {String} data.copy_count 书籍单次可复制字数
   * @param {String} data.double_screen_read 双屏阅读
   * @param {String} data.picture_text_contrast 图文对照
   * @param {String} data.language_contrast 多语言对照
   * @param {String} data.quote_count 书籍单次可引用字数
   */
  rule_rul(data) {
    return request_post('/api/rul_rule', data)
  }

  /**
   * 设置用户等级
   * @param {Object} data
   * @param {String} data.grade - id
   * @param {String} data.user_id
   */
  user_grade(data) {
    return request_post('/api/user/create_default', data)
  }
}

export default new User()
