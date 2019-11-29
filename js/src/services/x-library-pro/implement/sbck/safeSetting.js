import { mock, Random } from 'mockjs'
import { mockSuccess } from '../utils'
import { UserInfo } from 'services/x-library-pro/sbck'
import Captcha from 'services/common/captcha'
import { courseSetInfo } from '../../../x-read/mediaPPT';
import { changePhoneRules } from '../../extend/schemas'
import Joi from 'joi'

/**
  * 安全设置访问
*/

export async function safeSettingVisit () {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
 * 安全设置-修改密码
 */
export async function changePass({
  oldPass,
  newPass,
  confirmPass
}) {
  return UserInfo.resetPass({
    old_pass: oldPass,
    new_pass: newPass,
    new_pass_confirm: confirmPass
  })
}
/**
 * 安全设置-获取图片验证码
 */

export async function getCodeImg() {
  const resData = await Captcha.imgCaptcha();
  let tempData = {
    ...resData,
    data: {
      code_img: resData.data.code_img,
      code_img_id: resData.data.code_id
    }

  }
  return tempData;
}

/**
 * 安全设置-发送短信验证码
 */

export async function sendCode({
  phone,
  code_img_id,
  code_val_img
}) {
  if (false) {
    return mockFailure(
      mock({
        message: '@csentence',
        details: {
          code_id: '@csentence', // 原密码错误
          code_val_img: '@csentence', //手机号输入错误
          code_val: '@csentence', // 短信验证码错误
        },
      })
    )
  }
  let data = {
    phone,
    code_id_img: code_img_id,
    code_val_img
  }
  return Captcha.phoneCaptcha(data)
}


/**
 * 安全设置-修改手机号
 */

export async function changePhone({
  pass,
  phone,
  code_val_img,
  code_val,
}) {
  await Joi.validate({pass, phone,code_val_img,code_val}, changePhoneRules)
  let userData = await UserInfo.getUserData()
  let login_info = await UserInfo.login({
    type: userData.login_info.user_type,
    user_name: userData.name,
    user_pass: pass,
  })
  if (login_info.status) {
    return UserInfo.save({
      id: userData.login_info.user_id,
      phone,
    })
  } else {
    throw new Error("密码错误");
  }
}
