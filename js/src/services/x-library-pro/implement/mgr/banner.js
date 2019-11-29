import Banner from '../../mgr/Banner'
/**
 * 获取banner列表
 * @param {Object} data
 * @param {String} data.name - 选填字段 专题名称
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return Banner.getList(data)
}

/**
 * 删除banner
 * @param {Array} data.id - 必有 bannerid
 */
export async function del(data) {
  return Banner.del(data)
}
/**
 * 删除banner
 * @param {Array} data.id - 必有 bannerid
 */
export async function dels(data) {
  return Banner.dels(data)
}
/**
 * 获取banner详情
 * @param {String} data.id - 必有 bannerid
 */
export async function detail(data) {
  return Banner.detail(data)
}

/**
 * 保存数据
 * @param {String} data.id - 必有 bannerid
 */
export async function save(data={}) {
  return Banner.save(data)
}

/**
 * banner排序
 * @param {Object} data
 * @param {String} data.sort - 必填 up down名称
 */
export function sort(data = {}) {
  return Banner.sort(data)
}