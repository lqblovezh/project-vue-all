import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {dateRules} from '../extend/schemas'

class Hot {
  /**
   * 前台 热门资源数据
	 * @param {Object} data
	 * @param {String} data.top
   */
  hot_resources(data){
    return request_get('/api/hot_resources',data)
  }
}

export default new Hot
