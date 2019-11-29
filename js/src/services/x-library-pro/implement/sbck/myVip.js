import { mockSuccess, mockFailure } from '../utils'
import { mock, Random } from 'mockjs'
import { request_get, request_post } from '../../../common/request'
import { orderInfo } from '../../sbck'
import { payVipRules } from '../../extend/schemas'
import Joi from 'joi'
/**
 * vip 访问
 */
export async function vipVisit() {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
 * 获取交易记录
 */
export async function getRecordList(page) {
  return orderInfo.getList(page)
}

/**
 * vip类型
 */
export async function getVipType() {
  return orderInfo.getVIPInfo()
}

//支付弹框

/**
 * 确认支付
 * @param {String} data[0] - 开通服务
 * @param {String} data[1] - 开通时长
 * @param {String} data[2] - 支付方式
 * @param {number} data[3] - 支付金额
 */

export async function pay(...paramsArr) {
  let sendData = {
    pay_type: paramsArr[2],
    strategy_id: paramsArr[1],
    rf_url: paramsArr[4],
  }
  await Joi.validate(sendData, payVipRules, { allowUnknown: true })
  let resData = await request_post('/api/order', sendData)
  let data = {
    url: resData.data.pay_link,
  }
  return {
    ...resData,
    data,
  }
}

/**
 * 开通服务
 */
export async function getVipList() {
  return request_get('/api/rule/home_list').then(res => {
    const data = res.data
      .filter(e => e.children.total)
      .map(el => {
        const child = el.children.data.map(e => {
          return {
            price: e.price,
            time: e.day,
            id: e.id,
          }
        })
        return {
          id: el.id,
          name: el.name,
          child,
        }
      })
    return {
      data,
    }
  })
}
// 交易详情弹框

/**
 * 获取交易记录
 */
export async function getDealDetail(id) {
  return orderInfo.getDetail(id)
}
