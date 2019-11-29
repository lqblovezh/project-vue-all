import qs from 'qs';
import {request_post,request_get,request_put,request_delete,request_file} from 'services/common/request';
import config from "../config";
import pathToRegexp from 'path-to-regexp';
let toPath = pathToRegexp.compile('/common/api/files/upload_task/:id');
let toPathManagers = pathToRegexp.compile('/common/api/manager/managers/:id');
let toPathRole = pathToRegexp.compile('/common/api/manager/roles/:id');
let platUrl = pathToRegexp.compile('/common/api/app/apps/:id');
let dragonPath = pathToRegexp.compile('/common/api/dragon_infos/:id')

/**
 * 分片上传文件
 * @return {Promise}
 * @param {Object} file - 文件
 * @param {Object} data
 * @param {String} data.size - 每片的大小
 * @param {Function} callback - 获取任务进度函数，可以不传，必须分片模式下
 */
export function getTask(file, data = {}, callback) {
  console.log('分片', file.size)

  if (file.size >= 1024 * 1024) {
    console.log('分片')
    data.is_chunk = true
    // 清除上次任务缓存
    return request_post(`/common/api/files/upload_task?r=${Math.random(5)}`)
      .then(res => {
        if (res.status) {
          data.task_id = res.data.task_id
          return request_file('/common/api/files/upload', { file, data }, callback)
        } else {
          throw new Error(res.messages)
        }
      })
      .catch(err => {
        throw new Error('上传失败')
      })
  } else {
    data.is_chunk = false
    return request_file('/common/api/files/upload', { file, data })
  }
}

/**
 * 获取供应商信息
 * @return {Promise}
 * @param {Object} data - 传入对象
 * @param {Object} data.name - 供应商名称（必传）
 */
export function getAppId(data = {}) {
  console.log('获取appid')
  return request_get('/common/api/app/search_name', data).then(res => {
    config.app_id = res.data.id
    sessionStorage.app_id = res.data.id
    return res
  })
}

/**
 * 获取token
 * @return {Promise}
 * @param {Object} data - 传入对象
 */
export function getClientToken() {
  return request_post('/common/api/auth/token/pcclient')
}
/**
 * App应用详情
 * @return {Promise}
 * @param {Object} data - 传入对象
 * @param {String} data.id - 传入对象
 */
export function platInfo(data = {}) {
  return request_get(platUrl(data)).then(res => {
    config.app_id = res.data.id
    sessionStorage.app_id = res.data.id
    document.title = res.data.name
    return res
  })
}

let commonPreviewPath = pathToRegexp.compile('/api/preview/:id')

/**
 * 预览详情
 * @param {Object}  data - 传入对象
 * @param {String}  data.id - 传入对象
 */
export function commonPreview(data = {}) {
  return request_get(commonPreviewPath(data))
}

/**
 * 获取默认图片
 * @return {Promise}
 * @param {Object} data - 传入对象
 */
export function getDefaultCover() {
  return request_get('/api/videos/images')
}

/**
 * 二维码生成器
 * @param {Object} data
 * @param {String} data.content - 必有字段 二维码内容
 * @param {String} data.logo -  logo的path
 * @param {String} data.color -  前景色
 * @param {String} data.bg_color -  背景色
 * @param {String} data.size -  大小，默认300
 */
export function generate(data = {}){
	return request_post('/common/api/qr_code/generate',data)
}

/**
 * 生成预览地址和二维码
 * @param {Object}  data - 传入对象
 * @param {Object}  data.entity_type -
 * @param {Object}  data.entity - 传入对象
 */
export function commonPreviewCode(data = {}) {
  return request_post('/api/preview', data)
}

/**
 * 字符串生成二维码
 * @param {*} data
 * @param {*} data.string  字符串
 */
export function getQrcode(data = {}) {
  return request_get('/common/api/get_qrcode', data)
}
/**
 * erp（isbn信息获取）
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必选 isbn号
 */
export function synchronization(data = {}) {
    return request_get(dragonPath(data)).then(res => {
        return res
    })
}
/**
 * 电商-作者（译者）查询
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.author_name - 必选 作者（译者）名（支持模糊搜索）
 */
export function getAuthor(data = {}) {
    return request_get('/api/ecommerce/author',data)
}

/**
 * 电商-作者（译者）添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.author_name - 必选 作者名
 * @param {String} data.author_alias - 选填 作者别名
 */
export function addAuthor(data = {}) {
    return request_post('/api/ecommerce/author',data)
}

/**
 * 获取微信权限配置
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.client_url
 */
export function getWeixinConfig(data) {
	return request_get('/common/api/third/wx_js_sdk/config', data)
}

/**
 * 获取自有登录界面数据
 * @return {Promise}
 */
export function getIndexInfo() {
	return request_get('/common/api/current')
}
