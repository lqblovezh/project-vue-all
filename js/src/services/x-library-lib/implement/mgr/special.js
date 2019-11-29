
import Special from '../../mgr/Special'
/**
 * 获取专题列表
 * @param {Object} data
 * @param {String} data.name - 选填字段 专题名称
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return Special.getList(data)
}

/**
 * 删除专题
 * @param {Array} data.id - 必有 专题id
 */
export async function del(data) {
  return Special.del(data)
}

/**
 * 获取专题详情
 * @param {String} data.id - 必有 专题id
 */
export async function detail(data) {
  return Special.detail(data)
}

/**
 * 专题保存
 * @param {String} data.id - 必有 专题id
 */
export async function save(data) {
  return Special.save(data)
}
