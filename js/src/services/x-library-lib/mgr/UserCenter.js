import { decorate } from 'core-decorators'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import {delRules} from '../extend/schemas'
import Joi from 'Joi'

class UserCenter { //中户中心相关数据
  /**
	 *引用记录
  */
  async refererLog(){
		this.UserInfo = '1234'
		return request_get('/home/user_center/quote')
  }
}

export default new UserCenter()
