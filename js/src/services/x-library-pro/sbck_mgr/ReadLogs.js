import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {shareRules,readLogRules,delRules} from '../extend/schemas'

class ReadLogs {
  /**
   * 获取某个用户的阅读记录
   * @param {Object} data
   * @param {String} data.book_id
   * @param {String} data.user_id 不传就是自己  （传了只能是后台管理员可查看其它用户阅读记录）
   */
  async getList(data){
    data = await Joi.validate(data,shareRules)
    return request_get('/user_read_record',data)
  }
  /**
   * 设置阅读记录
   * @param {Object} data
   * @param {String} data.user_id 默认当前用户
   * @param {String} data.book_id
   * @param {String} data.data  其他数据(备用数据)
   * @param {String} data.chapter 章节名
   */
  async add(data){
    data = await Joi.validate(data,readLogRules)
    return request_post('/user_read_record',data)
  }
  /**
   * 批量删除阅读记录
   * @param {Object} data
   * @param {Array} data.ids 删除 ['id']
   */
  async del(data){
    data.id = data.ids || data._ids
    data = await Joi.validate(data,delRules)
    if(!data._ids){
      data._ids = data.ids
    }
    return request_post('/user_read_record/delete',data)
  }
}

export default new ReadLogs
