import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Joi from 'joi'

import { parsePageFromPHP, toPhpPage } from './pageUtil'

const vipIcons = (() => {
  const list = []
  for (let i = 1; i < 4; i++) {
    list.push(`vip${i}_icon`)
  }
  return list
})()

class OrderInfo {
  async getVIPInfo() {
    const {
      data: { isvip, vip_end_time },
    } = await request_get('/api/user_vip')
    const { data } = await request_get('/api/setting', {
      key: vipIcons,
    })
    return {
      data: data.map(({ name, value, value_src }) => ({
        name,
        logo: value_src,
      })),
      endTime: vip_end_time,
      isVip: isvip,
    }
  }
  async getList(page) {
    const result = await request_get('/api/order/front', toPhpPage(page))
    return {
      data: (result.data || []).map(
        ({
          id,
          create_time,
          order_number,
          goods_name,
          pay_price,
          remarks,
          is_pay,
        }) => ({
          id,
          serialNumber: order_number,
          name: goods_name,
          amount: pay_price,
          orderTime: create_time,
          status: is_pay,
        })
      ),
      page: parsePageFromPHP(result.page),
    }
  }
  async getDetail(id) {
    const {
      data: {
        goods_name,
        pay_price,
        order_number,
        remarks,
        pay_type,
        pay_time,
        vip_end_time,
        vip_start_time,
      },
    } = await request_get(`/api/order/${id}`)
    return {
      name: goods_name,
      price: pay_price,
      payStatus: remarks,
      payMethod: pay_type,
      orderNumber: order_number,
      orderTime: pay_time,
      lefficasyTime: vip_end_time,
      teffectTime: vip_start_time || pay_time,
    }
  }
}

export default new OrderInfo()
