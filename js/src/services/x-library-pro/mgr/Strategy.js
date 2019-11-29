import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {detailRules} from '../extend/schemas'

class Strategy {
  /**
   * 等级价格列表
   * @param {Object} data
   * @param {String} data.rule_id
   */
  getList(data){
    return request_get('/api/strategy',data)
  }
  /**
   * 获取详情
   */
  detail(data){
    return request_get(`/api/strategy/${data.id}`,data)
  }
  /**
   * 添加 修改 策略
   * @param {Object} data
   * @param {String} data.name
   * @param {String} data.day
   * @param {String} data.price
   * @param {String} data.remarks
   * @param {String} data.rule_id
   */
  save(data){
    if(data.id){
      data._id = data.id
      return request_post('/api/strategy/edit',data)
    }
    return request_post('/api/strategy',data)
  }
  del(data){
    return request_delete(`/api/strategy/${data.id}`,{_id:data.id})
  }
}

export default new Strategy
