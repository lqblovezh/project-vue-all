import { mock, Random } from 'mockjs'
import * as user from './user'
import UserCenter from 'services/x-library-pro/hymz/UserCenter'
import Book from 'services/x-library-pro/hymz/Book'
/**
 * 阅读历史
 */
export async function queryReadHistoryList(data = {}) {
  return user.queryHistoryList(data)
}
/**
 * 删除阅读历史
 * @param {Object} data
 * @param {Array} data.id
 */
export async function delReadHistory(data = {}) {
  return Book.read_list_del(data)
}
/**
 * 引用列表
 */
export async function queryQuoteList(data = {}) {
  return UserCenter.recordList(data).then(res => {
    const data = res.data.map(el => {
      return {
        ...el,
        id: el.id,
        book_id: el.book_id,
        book_name: el.book_name,
        author: el.book_author,
        chapterName: el.chapter_name,
        content: el.content,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}

/**
 * 批量删除评论
 * @param {Object} data
 */
export async function delComments(data = {}) {
  return UserCenter.commentDel(data)
}

/**
 * 批量删除批注或引用
 * @param {Object} data
 */
export async function delMark(data = {}) {
  return UserCenter.delMark(data)
}
