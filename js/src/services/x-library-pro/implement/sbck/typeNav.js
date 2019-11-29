import { bookClassify } from '../../sbck'
import { mockSuccess } from '../utils'
import { mock } from 'mockjs'

/**
 * 分类导航访问
 *
 */
export async function typeVisit() {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
  * 分类导航信息
  * @param {String} type -- 所属分类
*/

export async function getTypeTree (versions) {
  return bookClassify.getTree(versions)
}

/**
  * 右侧书籍详情列表
  * @param {String} id - 所属目录id
*/
export async function getList (id, page) {
  return bookClassify.findBooks(id, page)
}

/**
  * 左侧大分类下的书籍列表
  * @param {String} id - 所属分类id
*/
export async function getBookClassifyList (id,version, page) {
  return bookClassify.findClassifyBooks(id,version, page)
}

