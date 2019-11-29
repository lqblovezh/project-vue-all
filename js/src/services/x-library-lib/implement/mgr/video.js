import { mockSuccess } from '../utils'
import { mock } from 'mockjs'
import Video from '../../mgr/Video'

/**
 * 获取书籍列表
 * @param {Object} data
 * @param {String} data.book_name - 选填字段 书籍名称
 * @param {String} data.status - 选填字段 书籍id 0-未上架 1-已上架
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return Video.getList(data)
}

/**
 * 删除书籍
 * @param {Array} data.id - 必有 书籍id xx
 */
export async function del(data) {
  return Video.del(data)
}

/**
 * 获取书籍详情
 * @param {String} data.id - 必有 书籍id
 */
export async function detail(data) {
  return Video.detail(data)
}

/**
 * 获取设置详情
 * @param {String} data.id - 必有 书籍id
 */
export async function putInfo(data) {
  return Video.putInfo(data)
}

/**
 * 获取设置上架
 * @param {String} data.id - 必有 书籍id
 */
export async function putSave(data) {
  return Video.putSave(data)
}

/**
 * 上、下架
 * @param {Array} data.id - 必有 书籍ids
 * @param {type} data.id - 必有 上架up 下架down
 */
export async function shelf(data) {
  return Video.online(data)
}
