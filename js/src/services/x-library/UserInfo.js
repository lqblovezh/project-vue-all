import { decorate } from 'core-decorators'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'Joi'
import config from 'services/config'
import Captcha from 'services/common/captcha'
import {loginRules,registerRules,resetPassQueryRules,getResetCodeRules} from './extend/schemas'
class UserInfo{
  /**
   * 用户是否登录 || 暂时没有作用 先写在这里
   * @param {Object} data
   */
  isLogin(){
    return request_get('/common/api/auth/is_login/user')
  }
  /**
   * 用户登录
   * @param {Object} data
   */
  // @decorate(cache)
  async login (data){
    data = await Joi.validate(data,loginRules)
    return request_post('/common/api/auth/login/user',data).then(res => {
      config.token = res.data.token
      return res
    },err => {
      return err
    })
  }

  /**
   * 会员注册
   * @param {Object} data
   * @param {String} data.phone 手机号
   * @param {String} data.code_id	验证ID
   * @param {String} data.code_val 验证码
   * @param {String} data.name 用户名 不传则以手机号作为用户名
   * @param {String} data.nick_name 昵称 不传则以用户名作为昵称
   * @param {String} data.pass  密码
   */
  async register (data){
    data = await Joi.validate(data,registerRules)
    return request_post('/common/api/user/register',data)
  }
  /**
   * 获取找回密码验证码
   * @param {Object} data
   * @param {String} data.user_name 用户名（与phone任选其一，user_name优先）
   * @param {String} data.phone 手机号（与user_name任选其一，user_name优先）
   * @param {String} data.code_id 验证码ID（图片）
   * @param {String} data.code_val 验证码（图片）
   */
  async getResetCode(data){
    if(!data.code_id) {data.code_id = Captcha.code_id}
    data = await Joi.validate(data,getResetCodeRules)
    return request_post('/common/api/user/pass_reset/send',data)
  }
  /**
   * 找回密码
   * @param {Object} data
   * @param {String} user_id 用户ID （找回密码发送验证码的接口返回的）
   * @param {String} code_val 用户收到的验证码
   * @param {String} pass 密码
   * @param {String} pass_confirm 确认密码
   */
  async resetPass(data){
    data = await Joi.validate(data,resetPassQueryRules)
    return request_post('/common/api/user/pass_reset/set',data)
  }
  /**
   * 获取会员列表
   * @param {Object} data
   */
  getList (data){
    return request_get('/common/api/user/users/user',data)
  }
}

export default new UserInfo()

