import System from '../../mgr/System'
import { mock } from 'mockjs'
/**
 * 获取系统设置基本信息
 * @param {Object} data
 * @param {String} data.img - 必有字段 logo上传地址
 * @param {String} data.img_src - 必有字段 logo显示地址
 * @param {String} data.name - 必有字段 平台名称
 * @param {String} data.abs - 简介
 * @param {String} data.key - 第7个数据的可以为privilege 表示:特权对比图
 */
export function getVipList(data = {}) {
  return System.getList()
}

/**
 * 获取系统设置基本信息
 * @param {Object} data
 * @param {String} data.img - 必有字段 logo上传地址
 * @param {String} data.img_src - 必有字段 logo显示地址
 * @param {String} data.name - 必有字段 平台名称
 * @param {String} data.abs - 简介
 * @param {String} data.key - 第7个数据的可以为privilege 表示:特权对比图
 */
export function saveVip(data) {
  return System.save(data)
}

/**
 * 获取系统设置基本信息
 * @param {Object} data
 * @param {String} data.agreement - 必有字段 用户协议 - html|String
 * @param {String} data.code - 必有字段 二维码上传地址
 * @param {String} data.code_src - 必有字段 二维码显示地址
 * @param {String} data.img - 必有字段 logo上传地址
 * @param {String} data.img_src - 必有字段 logo显示地址
 * @param {String} data.name - 必有字段 平台名称
 * @param {String} data.radio - 必有字段 是否需要审核 '1/2'
 * @param {String} data.time - 必有字段 订单超时关闭时长
 */
export function getList(data = {}) {
  return System.getInfo()
}

/**
 * 修改系统设置基本信息
 * @param {Object} data
 * @param {String} data.agreement - 必有字段 用户协议 - html|String
 * @param {String} data.code - 必有字段 二维码上传地址
 * @param {String} data.img - 必有字段 logo上传地址
 * @param {String} data.name - 必有字段 平台名称
 * @param {String} data.radio - 必有字段 是否需要审核
 * @param {String} data.time - 必有字段 订单超时关闭时长
 */
export function save(data = {}) {
  return System.saveInfo(data)
}
