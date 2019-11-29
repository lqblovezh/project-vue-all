import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Joi from 'joi'

class Examine {
  /**
   * 用户列表
   * @param {Object} data
   * @param {String} data.name
   * @param {String} data.phone
   */
  getList(data) {
    return request_get('/api/authentication', data)
  }
  /**
   * 用户详情
   * @param {Object} data
   * @param {String} data.user_id
   */
  detail({ id }) {
    return request_get(`/api/authentication/${id}`)
  }

  /**
   * 审核
   */
  check(data) {
    if (data.type) {
      return request_put('/api/authentication/pass', data)
    }
    return request_put('/api/authentication/reject', data)
  }
}

export default new Examine()
