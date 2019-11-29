import { decorate } from 'core-decorators'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import {shareRules,keyWordsRules} from '../extend/schemas'
import Joi from 'Joi'

class BaseInfo { //前台网站基本信息
  /**
   * 获取banner信息
   */
  // @decorate(cache)
  getBanner(){
    return request_get('/home/banners')
  }
  /**
   * 分享
   * @param {Object} data
   * @param {String} data.book_id
   */
  async shareInfo(data){
    data = await Joi.validate(data,shareRules)
    return request_put('/home/book_info_share',data)
  }

  /**
   * 关键词列表
   * @param {Object} data
   * @param {String} data.type general => 常规搜索  advanced=> 高级搜索
   */
  async getKeyWords(data){
    data = await Joi.validate(data,keyWordsRules)
    return request_get('/home/keyword',data)
  }
}

export default new BaseInfo
