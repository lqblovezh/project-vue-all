import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 添加订单
 * @param {Object} data
 * @param {Array} data.goods_id 商品id数组
 * @param {String} data.type 商品类型
 * @param {String} data.pay_type 支付方式
 */
export function addOrder(data = {}) {
  return request_post('/api/order/order', data)
}


/**
 * 获取购买记录
 * @param {Object} data 
 */
export function queryOrderList(data = {}) {
  return request_get('/api/home/orders', data)
}