import { decorate } from 'core-decorators'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import {delRules} from '../extend/schemas'
import Joi from 'Joi'

class BookHouse { //书房相关数据

  /**
  *@param {Object} data
  *@param {String} data.is_pay 是否购买(0,1)
  *@param {String} data.type 类型
  */
  async bookHouseInfo(data){
    //data = await Joi.validate(data,shareRules) 参数可不传
    return request_get('/bookshelf/books',data)
  }

  /**
  *@param {Object} data
  *@param {String} data.book_id
  *@param {String} data.type 类型( 1 听读   2 视读    3 电子书    6 主题)
  */
  async addHookHouse(data){
    data = await Joi.validate(data,delRules)
    return request_post('/bookshelf/books',data)
  }

  /**
   * @param {Object} data
   * @param {Array} data.id
   */
  async delBookHose(data){
    data = await Joi.validate(data,delRules)
    return request_post('/bookshelf/delete',data)
  }
}


export default new BookHouse()
