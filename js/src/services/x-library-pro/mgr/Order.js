import { request_get, request_post, request_put, request_delete } from '../../common/request'

class Order {
/**
 * 获取订单列表
 * @param {Object} data
 * @param {String} data.order_number
 * @param {String} data.phone
 * @param {String} data.user_name
 * @param {String} data.start_date
 * @param {String} data.end_date
 * @param {String} data.user_id
 * @param {String} data.is_pay
 */
  getList(data){
    data.order_number = data.order
    return request_get('/api/order/list',data)
  }
  /**
   * 订单详情
   */
  detail(data){
    return request_get(`/api/order/${data.id}`,{_id:data.id})
  }
  /**
   * 订单导出
   * @param {Object} data
   * @param {Object} data
   * @param {String} data.order_id
   * @param {String} data.phone
   * @param {String} data.user_name
   * @param {String} data.start_date
   * @param {String} data.end_date
   * @param {String} data.user_id
   * @param {String} data.is_pay
   */
  educe(data){
    return request_get('/api/order/export',data).then(res => {
      return {
        data: res.data.url,
      }
    })
  }
  /**
   * 订单统计
   * @param {String} data.type count  total  默认count
   */
  statistics(data){
    return request_get('/api/order/statistics',data)
  }
  /**
   * 综合统计
   */
  summary_statistics(){
    return request_get('/api/order/summary_statistics')
  }
  /**
   * 添加并支付订单
   * @param {String} data.pay_type  'alipay','wechat'
   * @param {String} data.strategy_id 策略id
   * @param {String} data.rf_url
   * @param {String} data.source 订单来源 默认pc    'pc','mobile'
   */
  save(data){
    return request_post('/api/order',data)
  }
  /**
   * 前台订单支付
   * @param {String} data.order_id
   * @param {String} data.rf_url
   */
  pay(data){
    return request_post('/api/order/pay',data)
  }
  /**
   * 删除
   * @param {Object} data
   * @param {String} data._id
   */
  del(data){
    return request_delete(`/api/order/${data.id}`,{_id:data.id})
  }
  /**
   * 关闭订单
   */
  close(data){
    return request_put('/api/order/close',data)
  }
  /**
   * 添加订单备注
   * @param {String} data.order_id
   * @param {String} data.content
   */
  addMarks(data){
    return request_post('/api/order/mark',data)
  }
  /**
   * 获取订单备注
   * order_id  订单ID
   */
  getMarksInfo(data){
    return request_get('/api/order/mark',data)
  }
}

export default new Order