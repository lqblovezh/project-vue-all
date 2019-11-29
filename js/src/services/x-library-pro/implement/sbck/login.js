import Captcha from 'services/common/captcha'
import { UserInfo } from 'services/x-library-pro/sbck'
import getDeviceId from 'services/x-library-pro/getDeviceId'
import { request_get, request_post } from '../../../common/request'

const { ec } = __PROJECT_INFO__
/**
 * 获取图形验证码
 */

export async function getCodeImg() {
  if (ec) {
    const data = {}
    data.device_id = getDeviceId()
    return request_get('/common/api/ec_user/captcha/image', data)
  }
  return Captcha.imgCaptcha()
}

/**
 * 获取短信验证码
 * @param {String} phone - 手机号
 * @param {Number} not_check_user_exist - 0,1
 * @param {String} code_id_img - 图片验证码id
 * @param {String} code_val_img - 图片验证码
 */

export async function getPhoneCode(data) {
  if (ec) {
    if (!data.phone) {
      throw new Error('手机号不能为空')
      return
    }
    if (!data.code_id_img) {
      throw new Error('图片验证码不能为空')
      return
    }
    data.device_id = getDeviceId()
    return request_post('/common/api/ec_user/captcha/user_register', data)
  }
  return Captcha.phoneCaptcha(data)
}

/**
 * 账户登录
 * @param {String} account - 账户
 * @param {String} pass - 密码
 */

export async function accountLogin({
  account,
  pass,
  code_id_img,
  code_val_img,
}) {
  const {
    data: { token, user },
  } = await UserInfo.login({
    type: 'user',
    user_name: account,
    user_pass: pass,
    code_val_img,
    code_id_img,
  })
  return {
    data: {
      token,
      ...user,
    },
  }
}

/**
 * 手机登录
 * @param {String} phone - 手机号
 * @param {String} code_id - 验证码id
 * @param {String} code_val - 验证码
 * @param {String} code_id_img - 图片验证码id
 * @param {String} code_val_img - 图片验证码
 */

export async function phoneLogin(data) {
  console.log(data)
  const {
    data: { token, user },
  } = await UserInfo.loginByPhone(data)
  return {
    data: {
      token,
      ...user,
    },
  }
}

/**
 * 注册
 * @param {String} account - 账户
 * @param {String} phone - 图片验证码
 * @param {String} pass - 图片验证码
 * @param {String} confirmPass - 图片验证码
 * @param {String} code_id - 验证码id
 * @param {String} code_val_img - 图片验证码id
 * @param {String} code_val - 验证码
 */
export async function register({
  code_val_img,
  account,
  phone,
  code_id,
  code_val,
  pass,
  confirmPass,
}) {
  return UserInfo.register({
    phone,
    name: account,
    code_val_img,
    pass,
    pass_confirm: confirmPass,
    code_id,
    code_val,
  })
}

/**
 * 重置密码中发送验证码
 */
export async function sendCode(data) {
  if(ec){
    data.device_id = getDeviceId()
    data.code_id = data.code_id_img,
    data.code_val = data.code_val_img
    delete data.code_id_img
    delete data.code_val_img
    let result = request_post('/common/api/ec_user/captcha/forget_password', data)    
    console.log(result)
    return result
  }
  return Captcha.phoneCaptcha({
    ...data,
    not_check_user_exist: 0,
  })
}
/**
 * 重置密码
 * @param {String} phone - 图片验证码
 * @param {String} pass - 图片验证码
 * @param {String} confirmPass - 图片验证码
 * @param {String} code_id - 验证码id
 * @param {String} code_val_img - 图片验证码id
 * @param {String} code_val - 验证码
 */
