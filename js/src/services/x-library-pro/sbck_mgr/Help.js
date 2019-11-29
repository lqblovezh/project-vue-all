import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {dateRules} from '../extend/schemas'

class Help {
  /**
   * 获取帮助
   */
  getHelp(){
    return request_get('/help')
  }
  /**
   * 设置帮助
   * @param {Object} data
   * @param {String} data.content
   */
  setHelp(data){
    return request_post('/help',data)
  }
}
