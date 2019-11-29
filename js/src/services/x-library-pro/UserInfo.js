import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Joi from 'joi'
import config from 'services/config'
import {
  loginRules,
  loginEcRules,
  loginByPhoneRule,
  registerRules,
  registerEcRules,
  changePhoneRules,
  modifyPassRules,
  resetPassQueryRules,
  getResetCodeRules,
} from './extend/schemas'
import getDeviceId from 'services/x-library-pro/getDeviceId'

const { ec } = __PROJECT_INFO__


export class UserInfo {
  _user = null
  async getUserData() {
    if (!this._user) {
      const { data } = await this.isLogin()
      this._user = data.user
    }
    return this._user
  }

  /**
   * 用户是否登录 || 暂时没有作用 前端需要
   * @param {Object} data
   */
  isLogin() {
    return request_get('/common/api/auth/is_login/user')
  }
  /**
   * 用户登录
   * @param {Object} data
   * @param {String} data.type user|manager|teacher
   * @param {String} data.user_name
   * @param {String} data.user_pass
.   */
  async login({ type, ...data }) {
    console.log('userinfo')
    let url = `/common/api/auth/login/${type}`
    if (ec) {
      data.device_id = getDeviceId()
      url = '/common/api/ec_user/users/login'
      data = await Joi.validate(data, loginEcRules, { allowUnknown: true })
    } else {
      data = await Joi.validate(data, loginRules, { allowUnknown: true })
    }

    return request_post(url, data).then(res => {
      if (isBrowser) {
        window.localStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('token', res.data.token)
      } else {
        config.token = res.data.token
        this.user_info = res.data
      }
      return res
    })
  }

  async logout() {
    window.localStorage.setItem('token', '')
    window.sessionStorage.setItem('token', '')
  }
  /**
   * 手机登录
   * @param {Object} data
   * @param {String} data.phone 手机号
   * @param {String} data.code_id	验证ID
   * @param {String} data.code_val 验证码
   */
  async loginByPhone({ code_id, code_val, phone }) {
    let data = {
      phone,
      code_id,
      code_val,
    }
    await Joi.validate(data, loginByPhoneRule)
    return request_post('/common/api/auth/login_by_phone/phone', data).then(
      res => {
        if (isBrowser) {
          window.localStorage.setItem('token', res.data.token)
          window.sessionStorage.setItem('token', res.data.token)
        } else {
          config.token = res.data.token
          this.user_info = res.data
        }
        return res
      }
    )
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
  async register(data) {
    let { nick_name, name, ...restData } = data
    if (name == undefined) {
      name = ''
    }
    let sendData
    if (ec) {
      sendData = { pass_confirm: data.pass, ...restData }
      await Joi.validate(sendData, registerEcRules)
    } else {
      sendData = { pass_confirm: data.pass, name, ...restData }
      await Joi.validate(sendData, registerRules)
    }
    let url = '/common/api/user/register'
    if (ec) {
      sendData.device_id = getDeviceId()
      url = '/common/api/ec_user/users/register'
    }
    console.log(sendData)
    console.log('sendData')
    return request_post(url, sendData)
  }
  /**
   * 修改当前用户密码
   * @param {Object} data
   * @param {String} data.old_pass
   * @param {String} data.new_pass
   * @param {String} data.new_pass_confirm
   */
  async resetPass(data) {
    data = await Joi.validate(data, modifyPassRules)
    return request_post('/common/api/auth/pass', data)
  }
  /**
   * 获取找回密码验证码
   * @param {Object} data
   * @param {String} data.user_name 用户名（与phone任选其一，user_name优先）
   * @param {String} data.phone 手机号（与user_name任选其一，user_name优先）
   * @param {String} data.code_id 验证码ID（图片）
   * @param {String} data.code_val 验证码（图片）
   */
  async getResetCode(data) {
    data = await Joi.validate(data, getResetCodeRules)
    if (ec) {
      data.device_id = getDeviceId()
      return request_post('/common/api/ec_user/captcha/forget_password', data)
    }
    return request_post('/common/api/user/pass_reset/send', data)
  }
  /**
   * 找回密码
   * @param {Object} data
   * @param {String} user_id 用户ID （找回密码发送验证码的接口返回的）
   * @param {String} code_val 用户收到的验证码
   * @param {String} pass 密码
   * @param {String} pass_confirm 确认密码
   */
  async getOldPass(data) {
    // data = await Joi.validate(data,resetPassQueryRules)
    if (ec) {
      data.device_id = getDeviceId()
      return request_post('/common/api/ec_user/users/reset_password', data)
    }
    return request_post('/common/api/user/pass_reset/set', data)
  }
  /**
   * 获取会员列表
   * @param {Object} data
   */
  getList(data) {
    return request_get('/common/api/user/users/user', data)
  }
  /**
   * 用户修改
   * @param {Object} data
   * @param {String} data.nick_name
   * @param {String} data.name
   * @param {String} data.phone
   * @param {String} data.email
   * @param {String} data.picture,
   * @param {String} data.sex
   * @param {String} data.address
   * @param {String} data.date_of_birth
   * @param {String} data.education 学历
   * @param {String} data.company 单位
   * @param {String} data.duties 职务
   * @param {String} data.summary 简介
   * @param {String} data.pass 密码
   * @param {String} data.school
   * @param {String} data.college 学院
   * @param {Number} data.reset_pass 传入1则把密码重置为123456
   * */
  async save(data) {
    if (data.id) {
      return request_put(`/common/api/user/users/detail/${data.id}`, data)
    }
  }
}

export default new UserInfo()
