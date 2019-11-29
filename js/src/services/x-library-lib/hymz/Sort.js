import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {dateRules} from '../extend/schemas'

class Sort {
  getList(data){
    return request_get('/api/home/category',data)
  }
  detail(data){
    return request_put('/api/home/category',data)
  }
  /**
   * 作者国别
   */
  queryCountries(data){
    return request_get('/api/author_nationality',data)
  }
}

export default new Sort
