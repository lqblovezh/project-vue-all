import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'Joi'
import {detailRules} from '../extend/schemas'

class Special { //汉译名著 专题接口类
  /**
   * 数据列表
   * @param {Object} data
   * @param {String} data.name
   * @param {String} data.color
   */
  getList(data){
    return request_get('/home/theme',data)
  }

  /**
   * 数据详情
   * @param {Object} data
   * @param {String} data.id
   */
  async detail(data){
    data = await Joi.validate(data,detailRules)
    return request_get(`/home/theme/${data.id}`)
  }
}

export default new Special()