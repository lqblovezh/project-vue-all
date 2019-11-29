import Typeface from '../../mgr/Typeface'
/**
 * 获取繁简字列表
 * @param {Object} data
 * @param {String} data.simp - 选填字段 简体
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return Typeface.getList(data).then(res => {
    const data = res.data.map(el => {
      return {
        id: el.id,
        simp: el.simp,
        trad: el.trads,
        create_time: el.create_time,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}

/**
 * 删除繁简字
 * @param {Array} data.id - 必有 繁简字id
 */
export async function del(data) {
  return Typeface.del(data)
}

/**
 * 获取繁简字详情
 * @param {String} data.id - 必有 繁简字id
 */
export async function detail(data) {
  return Typeface.detail(data)
}

/**
 * 保存
 * @param {String} data.id - 必有 繁简字id
 */
export async function save(data) {
  return Typeface.save(data)
}

/**
 * 删除繁体字
 * @param {String} data.id - 必有 繁简字id
 */
export async function dels(data) {
  return Typeface.dels(data)
}
