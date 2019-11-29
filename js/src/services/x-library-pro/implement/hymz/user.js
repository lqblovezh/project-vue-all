import { mockSuccess } from '../utils'
import { mock, Random } from 'mockjs'
import User from 'services/x-library-pro/UserInfo'
import Captcha from 'services/common/captcha'
import { request_get, request_post } from '../../../common/request'
import UserInfo from 'services/x-library-pro/UserInfo'
import UserCenter from 'services/x-library-pro/hymz/UserCenter'
import Book from 'services/x-library-pro/hymz/Book'
import Strategy from 'services/x-library-pro/mgr/Strategy'
import { payVipRules, loginRules } from '../../extend/schemas'
import getDeviceId from 'services/x-library-pro/getDeviceId'
import Joi from 'joi'

const { ec } = __PROJECT_INFO__

export async function login(data = {}) {
  await Joi.validate(
    { user_name: data.username, user_pass: data.password },
    loginRules,
    { allowUnknown: true }
  )
  const user = await User.login({
    type: 'user',
    ...data,
    user_name: data.username,
    user_pass: data.password,
  }).then(res => res.data.user)

  const { data: vipInfo } = await request_get('/api/user_vip')
  return {
    data: {
      id: user.id,
      username: user.nick_name,
      name: user.name,
      picture: user.picture_absolute,
      birthday: user.date_of_birth,
      sex: user.sex,
      abs: user.summary,
      phone: user.phone,
      expert: vipInfo.isvip,
      vip: vipInfo.isvip,
      expire_date: vipInfo.vip_end_time,
    },
  }
}
/**
 * 手机号码登录
 * @param {Object} data
 */
export async function loginByPhone(data = {}) {
  // return User.loginByPhone(data)
  let user = {}
  let expert = false
  await User.loginByPhone(data).then(res => {
    user = res.data.user
  })
  const { data: vipInfo } = await request_get('/api/user_vip')
  return {
    data: {
      id: user.id,
      username: user.nick_name,
      name: user.name,
      picture: user.picture_absolute,
      birthday: user.date_of_birth,
      sex: user.sex,
      abs: user.summary,
      phone: user.phone,
      expert: vipInfo.isvip,
      vip: vipInfo.isvip,
      expire_date: vipInfo.vip_end_time,
    },
  }
}

export async function isLogin(data = {}) {
  const { data: vipInfo } = await request_get('/api/user_vip')
  return User.isLogin().then(res => {
    const user = res.data.user
    return {
      data: {
        id: user.id,
        user_name: user.nick_name,
        username: user.nick_name,
        name: user.name,
        picture: user.picture_absolute,
        birthday: user.date_of_birth,
        sex: user.sex,
        abs: user.summary,
        phone: user.phone,
        vip: vipInfo.isvip,
        expire_date: vipInfo.vip_end_time,
      },
    }
  })
}

/**
 * 获取用户阅读权限
 * @param {Object} data
 * @param {String} data.name 登录账号
 * @param {String} data.phone 手机号
 * @param {String} data.code 短信验证码
 * @param {String} data.pass 登录密码
 */
export async function vipInfo() {
  return await request_get('/api/user_vip')
}
/**
 * 注册账号
 * @param {Object} data
 * @param {String} data.name 登录账号
 * @param {String} data.phone 手机号
 * @param {String} data.code 短信验证码
 * @param {String} data.pass 登录密码
 */
export async function register(data = {}) {
  return await User.register(data)
}

/**
 * 修改密码（使用旧密码修改）
 * @param {Object} data
 */
export async function updatePasswordDefault(data = {}) {
  return User.resetPass({
    old_pass: data.old_pass,
    new_pass: data.new_pass,
    new_pass_confirm: data.comfirm_pass,
  })
}
/**
 * 修改手机号
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {String} data.pass 密码
 * @param {String} data.code 手机验证码
 *
 */
export async function updatePhone(data = {}) {
  return UserInfo.save(data)
}
/**
 * 忘记密码(通过手机号更改密码)
 * @param {Object} data
 * @param {String} data.code_val 短信验证码
 * @param {String} data.pass 新密码
 * @param {String} data.pass_confirm 确认新密码
 * @param {String} data.user_id 获取验证码返回的user_id
 */
export async function forgetPwd(data = {}) {
  return User.getOldPass(data)
}

/**
 * 获取找回密码验证码
 * @param {Object} data
 * @param {String} data.phone 手机号（与user_name任选其一，user_name优先）
 * @param {String} data.code_id 验证码ID（图片）
 * @param {String} data.code_val 验证码（图片）
 */
export async function getResetCode(data) {
  return User.getResetCode(data)
}

/**
 * 查询交易记录列表
 * @return {[type]} [description]
 */
export async function queryOrderList(data = {}) {
  const res = await UserCenter.order({ ...data })
  return {
    data: res.data.map(el => {
      return {
        id: el.id,
        order: el.order_number,
        goods: el.goods_name,
        create_time: el.create_time,
        status_type: el.is_pay,
        create_time: el.create_time,
        effective_time: el.pay_time,
        expire_date: el.vip_end_time,
        price: el.pay_price,
        pay_method: el.pay_type_name,
      }
    }),
    page: res.page,
  }
}

/**
 * 获取图像验证码
 */
export async function getImageCard() {
  if (ec) {
    const data = {}
    data.device_id = getDeviceId()
    return request_get('/common/api/ec_user/captcha/image', data)
  }
  return Captcha.imgCaptcha().then(res => {
    return {
      data: {
        picture: res.data.code_img,
        code_img: res.data.code_img,
        code_id: res.data.code_id,
      },
    }
  })
}
export async function sendPhoneCaptcha(data) {
  if (ec) {
    data.device_id = getDeviceId()
    return request_post('/common/api/ec_user/captcha/user_register', data)
  }
  return Captcha.phoneCaptcha(data)
}
/**
 * 阅读历史
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function queryHistoryList(data = {}) {
  return Book.read_history(data).then(res => {
    const data = res.data.map(el => {
      let latest = {}
      try {
        latest = JSON.parse(el.data)._latest
      } catch (error) {
        console.warn('chapterName -> 获取失败')
      }
      return {
        id: el.id,
        book_name: el.book_name,
        book_id: el.book_id,
        bookname: el.book_name,
        picture: el.img_src,
        author: el.author_name,
        end_time: el.update_time,
        speed: latest.chapterName || '尚未阅读',
        chapterRid: latest.chapterRid,
        chapterId: latest.chapterId,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}
/**
 * 我的评论
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function queryCommentList(data = {}) {
  return UserCenter.assessList(data).then(res => {
    const data = res.data.map(el => {
      return {
        id: el.id,
        bookname: el.book_name,
        book_name: el.book_name,
        author: el.author,
        create_time: el.create_time,
        content: el.content,
        speed: '',
        picture: el.picture,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}
/**
 * 我的批注
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function queryAnnotationList(data = {}) {
  return UserCenter.annotList(data).then(res => {
    const data = res.data.map(el => {
      return {
        ...el,
        id: el.id,
        book_name: el.book_name,
        book_id: el.book_id,
        bookname: el.book_name,
        select: el.content,
        content: el.mark,
        create_time: el.create_time,
      }
    })
    console.log(data, 'xxxxx')
    return {
      data,
      page: res.page,
    }
  })
}
/**
 * 修改用户信息 **** 返回结构同登录结构
 * @param  {Object} [data={}] [description]
 * @return {[img]}           [传入头像]
 * @return {[username]}           [用户昵称]
 * @return {[birthday]}           [生日]
 * @return {[sex]}           [性别]
 * @return {[abs]}           [个人简介]
 */
export async function modifyUserInfo(data = {}) {
  const obj = {
    id: data.id,
    nick_name: data.username,
    picture: data.picture,
    date_of_birth: data.birthday,
    sex: data.sex,
    summary: data.abs,
  }
  const { data: vipInfo } = await request_get('/api/user_vip')
  return UserInfo.save(obj).then(res => {
    const user = res.data
    return {
      data: {
        id: user.id, // Error: id获取错误
        user_name: user.nick_name,
        username: user.nick_name,
        name: user.name,
        picture: user.picture_absolute,
        birthday: user.date_of_birth,
        sex: user.sex,
        abs: user.summary,
        expert: vipInfo.isvip,
        vip: vipInfo.isvip,
        expire_date: vipInfo.vip_end_time,
      },
    }
  })
}

/**
 * 开通Vip服务 **** 返回结构同登录结构-更新用户状态
 * @param  {Object} [data={}]  [description]
 * @param {[serve]}           data.sid 服务id
 * @param {[duration]}        data.strategy_id 策略id
 * @param {[duration]}        data.source 订单来源 默认pc    'pc','mobile'
 * @param {[duration]}        data.rf_url 订单支付后返回的地址
 * @param {[payType]}         data.pay_type [支付方式-alipay/wechat]
 */
export async function pay(data) {
  let resData = await request_post('/api/order', {
    pay_type: data.payType || 'alipay',
    strategy_id: data.duration,
    source: data.source || 'pc',
    rf_url: data.url,
  })
  return {
    ...resData,
    data: {
      url: resData.data.pay_link,
    },
  }
}

/**
 * 开通Vip服务 **** 返回结构同登录结构-更新用户状态
 * @param  {Object} [data={}]  [description]
 * @param {[serve]}           data.order_id 订单id
 * @param {[duration]}        data.rf_url 订单支付后返回的地址
 */
export async function payAgain(data) {
  let resData = await request_post('/api/order/pay', {
    order_id: data.id,
    rf_url: data.url,
  })
  return {
    data: {
      url: resData.data.pay_link,
    },
  }
}

/**
 * 获取vip列表信息
 */
export async function getVipList(data) {
  return request_get('/api/rule/home_list').then(res => {
    const data = res.data.map(el => {
      const child = el.children.data.map(e => {
        return {
          price: e.price,
          time: e.day,
          id: e.id,
        }
      })
      return {
        id: el.id,
        type: el.type,
        name: el.name,
        child,
      }
    })
    return {
      data: data.length ? data.filter(item => item.type != 'default') : [],
    }
  })
}

/**
 * 查询vip特权的介绍
 */
export async function queryVipPrivilege() {
  return await request_get('/api/setting', {
    key: [
      'vip1_icon',
      'vip2_icon',
      'vip3_icon',
      'vip4_icon',
      'vip5_icon',
      // 'vip6_icon',
    ],
  })
}

/**
 * 复制统计-用户阅读
 */
export async function copyStatistics() {
  return await UserCenter.copyStatistics()
}

/**
 * 引用统计-用户阅读
 */
export async function quoteStatistics() {
  return await UserCenter.quoteStatistics()
}

/**
 * 复制统计-用户阅读
 */
export async function copyAdd(data) {
  return await UserCenter.copy_record(data)
}

/**
 * 引用统计-用户阅读
 */
export async function quoteAdd(data) {
  return await UserCenter.add(data)
}
