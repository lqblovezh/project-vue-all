import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {payRules,createOrderRules,dateRules} from '../extend/schemas'

class Order {
  /**
   * 后台订单列表
   * @param {Object} data
   * @param {String} data.order_id
   * @param {String} data.phone
   * @param {String} data.user_name
   * @param {String} data.start_date
   * @param {String} data.end_date
   */
  getList(data){
    return request_get('/order/list',data)
  }
  /**
   * 关闭订单
   * @param {Object} data
   * @param {String} data.order_id
   */
  orderClose(){
    return request_put('/order/close')
  }
  /**
   * 综合统计
   * @param {Object} data
   * @param {String} data.end_date
   * @param {String} data.start_date
   */
  async summary_statistics(data){
    data = await Joi.validate(data,dateRules)
    return request_get('/order/summary_statistics',data)
  }
  /**
   * 订单统计 销售额 和 销售单数
   * @param {Object} data
   * @param {String} data.end_date
   * @param {String} data.start_date
   * @param {String} data.type count  total  默认count
   */
  async statistics(data){
    data = await Joi.validate(data,dateRules)
    return request_get('/order/statistics',data)
  }
  /**
   * 订单详情
   * @param {Object} data
   * @param {String} data._id
   */
  detail(data){
    return request_get(`/order/${data._id}`,data)
  }
  /**
   * 订单策略-添加规则
   * @param {Object} data
   * @param {String} data.name
   * @param {String} data.day
   * @param {String} data.price
   * @param {String} data.remarks
   * @param {String} data.rule_id
   */
  strategy_add(data){
    return request_post('/strategy',data)
  }
  /**
   * 订单策略-删除规则
   * @param {Object} data
   * @param {String} data._id
   */
  strategy_del(data){
    return request_delete(`/strategy/${data._id}`,data)
  }
  /**
   * 订单策略-规则列表
   * @param {Object} data
   * @param {String} data.rule_id
   */
  strategy_list(data){
    return request_get('/strategy',data)
  }

  /**
   * 订单策略-编辑规则
   * @param {Object} data
   * @param {String} data._id
   * @param {String} data.name
   * @param {String} data.day
   * @param {String} data.price
   * @param {String} data.remarks
   * @param {String} data.rule_id
   */
  strategy_edit(data){
    return request_post('/strategy/edit',data)
  }
  //==================前台 =========================
  /**
   * 前台订单
   */
  list(){
    return request_get('/order/front')
  }
  /**
   * 支付订单
   * @param {Object} data
   * @param {String} data.order_id
   * @param {String} data.rf_url
   */
  async pay(data){
    data = await Joi.validate(data,payRules)
    return request_post('/order/pay',data)
  }
  /**
   * 添加并支付订单
   * @param {Object} data
   * @param {String} data.pay_type 'alipay','wechat'
   * @param {String} data.strategy_id 策略id
   * @param {String} data.rf_url
   */
  async createOrder(data){
    data = await Joi.validate(data,createOrderRules)
    return request_post('/order',data)
  }

}
