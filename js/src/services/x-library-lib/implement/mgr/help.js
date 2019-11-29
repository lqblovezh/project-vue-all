import extra from 'services/x-library-lib/hymz/extra'
/**
 * 获取帮助列表
 * @param {Object} data
 * @param {String} data.name - 选填字段 专题名称
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return extra.getHelpInfo().then(res => {
    return {
      data: {
        id: res.data.id,
        text: res.data.content,
        create_time: res.data.create_time,
      },
    }
  })
}

/**
 * 获取帮助详情
 * @param {String} data.id - 必有 帮助id
 */
export async function save(data) {
  return extra.setHelpInfo({
    content: data.text,
  })
}
