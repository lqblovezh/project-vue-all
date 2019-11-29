import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {dateRules} from '../extend/schemas'

class SySet { //系统设置
  /**
   * 获取系统设置
   * @param {Object} data
   * @param {String} data.key 默认name
   */
  getList(data){
    return request_get('/setting',data)
  }
  /**
   * 添加系统设置
   * @param {Object} data
   * @param {String} data.name
   * @param {String} data.key
   * @param {String} data.value
   */
  add(data){
    return request_post('/setting',data)
  }
  /**
   * 编辑系统设置
   * @param {Object} data
   * @param {String} data._id
   * @param {String} data.name
   * @param {String} data.key
   * @param {String} data.value
   */
  edit(data){
    return request_post('/setting/edit',data)
  }
  /**
   * 删除
   */
  del(data){
    return request_get(`/setting/${data._id}`,data)
  }
}
