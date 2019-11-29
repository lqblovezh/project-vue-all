import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

/**
 * 第三方登陆信息
 * @param {Object} data
 */
export function thirdConf(data = {}) {
  return request_post('/api/current', data).then(res => {
    const { publisher, application } = res.data
    document.title = publisher.name + '-' + application.name
    return res
  })
}

/**
 * 获取微信jdk配置
 * @param {Object} data 
 * @param {String} data.client_url 当前页面地址
 */
export function getWXConfig(data = {}) {
  return request_get('/common/api/third_sdk/wx_jdk_config', data)
}