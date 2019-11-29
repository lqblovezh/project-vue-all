import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
import qs from 'qs'
import config from '../config'

let userUpdate = pathToRegexp.compile('/common/api/user/:id')

/**
 * 前台会员 注册（手机号注册）
 * @param {Object} data
 * @param {String} data.phone - 必选 用户名
 * @param {String} data.code_id - 必选 验证码ID
 * @param {String} data.code_val - 必选 验证码
 */
export function register(data = {}) {
  return request_post('/common/api/user/register', data)
}
/**
 * 前台会员登录
 * @param {Object} data
 * @param {String} data.app_id - 必选 要登录的应用ID
 * @param {String} data.user_name - 必选 用户名
 * @param {String} data.user_pass - 必选 密码
 */
export function login(data = {}) {
  return request_post('/common/api/auth/login/user', data).then(res => {
    window.sessionStorage.setItem('token', res.data.token)
    window.localStorage.setItem('token', res.data.token)

    config.token = res.data.token
    return res
  })
}
/**
 * 第三方登录
 * @param {Object} data
 * @param {String} data.app_id - 必选 应用ID
 * @param {String} data.type - 必选 类型 weixin_web(微信 网页) | weixin_mp(微信 微信内部) | qq_web(QQ 网页)
 * @param {String} data.buck_url - 必选 返回址 成功时会带上 token_id=xx,失败会带上 error=xxx
 */
export function thirdLogin(data = {}) {
  //后台没有考虑路径有hash的情况,导致分享出去后登陆, token_id没有拼接正确
  let match = data.back_url.match(/.*(\?.*)#.*/)
  let str = match && match[1]
  if (str) {
    data.back_url = data.back_url.replace(str, '')
  }

  return request_post('/common/api/auth/third/link', data)
}

/**
 * 第三方登录
 * @param {Object} data
 * @param {String} data.code - 必选 应用ID
 * @param {String} data.login_type - 必选 类型 weixin_app(微信 app) | qq_app(QQ app)
 */
export function thirdLoginAPP(data = {}) {
  return request_post('/common/api/auth/third/app_login', data).then(res => {
    window.sessionStorage.setItem('token', res.data.token)
    window.localStorage.setItem('token', res.data.token)
    return res
  })
}
/**
 * 前台会员 手机号登录
 * @param {Object} data
 * @param {String} data.app_id - 必选 注册应用ID
 * @param {String} data.phone - 必选 用户名
 * @param {String} data.code_id - 必选 验证码ID
 * @param {String} data.code_val - 必选 验证码
 */
export function phoneLogin(data = {}) {
  return request_post('/common/api/auth/login_by_phone/phone', data).then(
    res => {
      window.sessionStorage.setItem('token', res.data.token)
      window.localStorage.setItem('token', res.data.token)

      //window.sessionStorage.setItem("userInfo",qs.stringify(res.data.user))
      config.token = res.data.token
      return res
    }
  )
}

/**
 * 验证码-图片
 * @param {Object} data
 */
export function codeImage(data = {}) {
  let code = Math.random().toFixed(3)
  return request_get(`/common/api/captcha/image?code=${code}`)
}

/**
 * 验证码-校验
 * @param {Object} data
 * @param {String} data.code_id - 必选 验证码ID
 * @param {String} data.code_val - 必选 验证码内容
 */
export function codeCheck(data = {}) {
  return request_post('/common/api/captcha/check', data)
}
/**
 * 验证码-手机
 * @param {Object} data
 * @param {String} data.phone - 必选 手机号
 * @param {String} data.not_check_user_exist - 必选 是否不需要检查手机是否存在（注册时传1）
 */
export function codePhone(data = {}) {
  return request_post('/common/api/captcha/mobile', data)
}
/**
 * 验证码-邮箱
 * @param {Object} data
 * @param {String} data.email - 必选 邮箱
 * @param {String} data.not_check_user_exist - 必选 是否不需要检查手机是否存在（注册时传1）
 */
export function codeEmail(data = {}) {
  return request_post('/common/api/captcha/email', data)
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request_get('/api/auth/is_login/user')
}
/**
 * 前台会员 修改个人资料
 * @param {Object} data
 * @param {String} data.nick_name - 必选 昵称
 * @param {String} data.sex - 必选 性别  男|女|保密
 * @param {String} data.date_of_birth - 必选 出生年月 2018-08-12
 * @param {String} data.phone - 必选 手机号
 * @param {String} data.email - 必选 邮箱
 * @param {String} data.picture - 必选 头像（上传返回的path）
 */
export function save(data = {}) {
  return request_put('/common/api/user', data)
}
/**
 * 退出登录
 * @return {Promise}
 * @param {Object} data - 传入对象
 */
export function loginOut(data = {}) {
  return request_post('/common/api/auth/logout', data).then(res => {
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('userInfo')
    config.token = null
    return res
  })
}
/**
 * 修改密码
 * @return {Promise}
 * @param {Object} data - 传入对象
 * @param {Object} data.old_pass - 旧密码（必传）
 * @param {Object} data.new_pass - 新密码（必传）
 * @param {Object} data.new_pass_confirm - 新密码确认（必传）
 */
export function changePass(data = {}) {
  return request_put('/common/api/auth/pass', data).then(res => {
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('userInfo')
    config.token = null
    return res
  })
}

/**
 * 会员资料修改
 * @param {Object} data
 * @param {String} data.nick_name - 必有字段 昵称
 * @param {String} data.phone - 必有字段 手机号
 * @param {String} data.email - 必有字段 邮箱
 * @param {String} data.sex - 必有字段 性别(男|女|保密)
 * @param {String} data.date_of_birth - 必有字段 出生日期
 * @param {String} data.id - 必有字段 用户id
 * @param {String} data.reset_pass - 可选字段 重置密码 123456
 */
export function saveMemberData(data = {}) {
  return request_put(userUpdate(data), data)
}
